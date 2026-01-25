'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Devis {
  id: string
  userId: string
  serviceType: string
  title: string
  description: string
  location: string
  phoneNumber: string
  email: string
  preferredDate: string
  preferredTime: string
  status: 'pending' | 'accepted' | 'rejected' | 'completed'
  estimatedPrice?: number
  finalPrice?: number
  notes?: string
  createdAt: string
  updatedAt: string
  category?: string
}

interface DevisContextType {
  devisList: Devis[]
  addDevis: (devis: Omit<Devis, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateDevis: (id: string, updates: Partial<Devis>) => void
  getDevisByUserId: (userId: string) => Devis[]
  getDevisById: (id: string) => Devis | undefined
}

const DevisContext = createContext<DevisContextType | undefined>(undefined)

export function DevisProvider({ children }: { children: React.ReactNode }) {
  const [devisList, setDevisList] = useState<Devis[]>([
    {
      id: 'DEV-001',
      userId: 'user-1',
      serviceType: 'Plomberie',
      title: 'Installation robinetterie cuisine',
      description: 'Installation complète d\'une robinetterie haute avec douchette dans la cuisine',
      location: 'Tunis - Menzah',
      phoneNumber: '+216 90 123 456',
      email: 'user@example.com',
      preferredDate: '2024-02-15',
      preferredTime: '09:00',
      status: 'accepted',
      estimatedPrice: 450,
      finalPrice: 450,
      notes: 'Travail accepté. Date confirmée pour le 15 février à 9h.',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-22',
      category: 'Plomberie',
    },
    {
      id: 'DEV-002',
      userId: 'user-1',
      serviceType: 'Chauffage',
      title: 'Révision thermostat',
      description: 'Révision et nettoyage complet du système de chauffage et thermostat',
      location: 'Tunis - La Marsa',
      phoneNumber: '+216 90 123 456',
      email: 'user@example.com',
      preferredDate: '2024-02-10',
      preferredTime: '14:00',
      status: 'pending',
      estimatedPrice: 280,
      notes: 'En attente de confirmation.',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18',
      category: 'Chauffage',
    },
    {
      id: 'DEV-003',
      userId: 'user-1',
      serviceType: 'Électricité',
      title: 'Installation prise électrique supplémentaire',
      description: 'Installation de 2 prises électriques supplémentaires dans le salon',
      location: 'Tunis - Belvedere',
      phoneNumber: '+216 90 123 456',
      email: 'user@example.com',
      preferredDate: '2024-01-25',
      preferredTime: '10:00',
      status: 'completed',
      estimatedPrice: 200,
      finalPrice: 220,
      notes: 'Travail terminé avec satisfaction du client.',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-23',
      category: 'Électricité',
    },
  ])

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('devis-list')
    if (saved) {
      try {
        setDevisList(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load devis:', error)
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('devis-list', JSON.stringify(devisList))
  }, [devisList])

  const addDevis = (devis: Omit<Devis, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDevis: Devis = {
      ...devis,
      id: `DEV-${String(devisList.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setDevisList([newDevis, ...devisList])
  }

  const updateDevis = (id: string, updates: Partial<Devis>) => {
    setDevisList(
      devisList.map((devis) =>
        devis.id === id
          ? {
              ...devis,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : devis
      )
    )
  }

  const getDevisByUserId = (userId: string) => {
    return devisList.filter((devis) => devis.userId === userId)
  }

  const getDevisById = (id: string) => {
    return devisList.find((devis) => devis.id === id)
  }

  return (
    <DevisContext.Provider
      value={{
        devisList,
        addDevis,
        updateDevis,
        getDevisByUserId,
        getDevisById,
      }}
    >
      {children}
    </DevisContext.Provider>
  )
}

export function useDevis() {
  const context = useContext(DevisContext)
  if (!context) {
    throw new Error('useDevis must be used within DevisProvider')
  }
  return context
}
