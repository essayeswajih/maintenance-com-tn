from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from db.database import get_db
from models.servicesModels import Quotation, QuotationProposal, Service
from models.Oauth2Models import User
from models.freelancer import Freelancer
from controller.Oauth2C import get_current_user
from pydantic import BaseModel

router = APIRouter()

# --- Pydantic Schemas for Request Body ---

class QuotationCreate(BaseModel):
    service_id: int
    first_name: str
    last_name: str
    email: str
    phone: str
    address: str
    city: str
    postal_code: Optional[str] = None
    description: str
    preferred_timeline: Optional[str] = None

class ProposalCreate(BaseModel):
    price: float
    message: Optional[str] = None

class InviteFreelancer(BaseModel):
    freelancer_id: int

# --- Endpoints ---

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_quotation_request(
    quote_in: QuotationCreate, 
    db: Session = Depends(get_db),
    # Optional: current_user: User = Depends(get_current_user) # If user must be logged in
):
    # Verify service exists
    service = db.query(Service).filter(Service.id == quote_in.service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    new_quote = Quotation(
        service_id=quote_in.service_id,
        first_name=quote_in.first_name,
        last_name=quote_in.last_name,
        email=quote_in.email,
        phone=quote_in.phone,
        address=quote_in.address,
        city=quote_in.city,
        postal_code=quote_in.postal_code,
        description=quote_in.description,
        preferred_timeline=quote_in.preferred_timeline,
        status="PENDING"
    )
    db.add(new_quote)
    db.commit()
    db.refresh(new_quote)
    return new_quote


@router.get("/")
def get_quotations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Role-based access
    if current_user.role == "admin":
        return db.query(Quotation).all()
    elif current_user.role == "freelancer":
        # Freelancers only see quotations they are invited to (have a proposal)
        # Or open quotations if we had an open marketplace logic.
        # Here we follow: Admin invites Freelancer -> Freelancer sees it.
        if not current_user.freelancer:
             raise HTTPException(status_code=403, detail="User is not a linked freelancer profile")
        
        freelancer_id = current_user.freelancer.id
        return (
            db.query(Quotation)
            .join(QuotationProposal)
            .filter(QuotationProposal.freelancer_id == freelancer_id)
            .all()
        )
    else:
        # Client sees their own? (Need to link Quotation to User ID if logged in, currently no User ID in Quotation)
        # For now, restrict to Admin/Freelancer or return empty for basic users
        return []

@router.post("/{quotation_id}/invite")
def invite_freelancer_to_quote(
    quotation_id: int, 
    invite: InviteFreelancer,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can invite freelancers")
    
    quotation = db.query(Quotation).filter(Quotation.id == quotation_id).first()
    if not quotation:
        raise HTTPException(status_code=404, detail="Quotation not found")
        
    freelancer = db.query(Freelancer).filter(Freelancer.id == invite.freelancer_id).first()
    if not freelancer:
        raise HTTPException(status_code=404, detail="Freelancer not found")
        
    # Check if already invited
    existing = db.query(QuotationProposal).filter(
        QuotationProposal.quotation_id == quotation_id,
        QuotationProposal.freelancer_id == invite.freelancer_id
    ).first()
    
    if existing:
        return {"message": "Freelancer already invited"}
        
    # Create empty proposal (Invitation)
    new_proposal = QuotationProposal(
        quotation_id=quotation_id,
        freelancer_id=invite.freelancer_id,
        price=0, # Placeholder
        status="PENDING",
        message="Invited by Admin"
    )
    
    quotation.status = "OPEN" # Update status
    db.add(new_proposal)
    db.commit()
    return {"message": "Freelancer invited successfully"}

@router.post("/{quotation_id}/bid")
def submit_bid(
    quotation_id: int,
    bid: ProposalCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "freelancer" or not current_user.freelancer:
        raise HTTPException(status_code=403, detail="Only freelancers can bid")
        
    freelancer_id = current_user.freelancer.id
    
    # Find the proposal (invitation) or create new if open market
    proposal = db.query(QuotationProposal).filter(
        QuotationProposal.quotation_id == quotation_id,
        QuotationProposal.freelancer_id == freelancer_id
    ).first()
    
    if not proposal:
        raise HTTPException(status_code=404, detail="You were not invited to this quotation")
        
    # Update proposal
    proposal.price = bid.price
    proposal.message = bid.message
    proposal.status = "SUBMITTED"
    
    db.commit()
    return {"message": "Bid submitted successfully"}

@router.post("/{quotation_id}/accept/{proposal_id}")
def accept_bid(
    quotation_id: int,
    proposal_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can accept bids")
        
    quotation = db.query(Quotation).filter(Quotation.id == quotation_id).first()
    if not quotation:
        raise HTTPException(status_code=404, detail="Quotation not found")
        
    proposal = db.query(QuotationProposal).filter(
        QuotationProposal.id == proposal_id, 
        QuotationProposal.quotation_id == quotation_id
    ).first()
    
    if not proposal:
        raise HTTPException(status_code=404, detail="Proposal not found for this quotation")
        
    # Accept logic
    proposal.status = "ACCEPTED"
    quotation.selected_proposal_id = proposal.id
    quotation.status = "ASSIGNED"
    
    # Send notification logic here (email to User with Freelancer info)
    
    db.commit()
    return {"message": "Bid accepted and Freelancer assigned"}
