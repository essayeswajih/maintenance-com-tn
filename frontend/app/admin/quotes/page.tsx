'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Search, Eye, CheckCircle, XCircle } from 'lucide-react'

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState([
    { id: 'Q001', service: 'Plomberie', customer: 'Ahmed Hassan', date: '22 Jan 2024', amount: 350, status: 'Pending' },
    { id: 'Q002', service: 'Électricité', customer: 'Fatima Ali', date: '21 Jan 2024', amount: 500, status: 'Accepted' },
    { id: 'Q003', service: 'Chauffage', customer: 'Mohamed Ben', date: '20 Jan 2024', amount: 800, status: 'Pending' },
    { id: 'Q004', service: 'Chaudières', customer: 'Sara Khalil', date: '19 Jan 2024', amount: 1200, status: 'Rejected' },
    { id: 'Q005', service: 'Plomberie', customer: 'Ali Mansour', date: '18 Jan 2024', amount: 450, status: 'Accepted' },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const filteredQuotes = quotes.filter(q =>
    q.id.includes(searchQuery) || q.customer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAccept = (id: string) => {
    setQuotes(quotes.map(q => q.id === id ? { ...q, status: 'Accepted' } : q))
  }

  const handleReject = (id: string) => {
    setQuotes(quotes.map(q => q.id === id ? { ...q, status: 'Rejected' } : q))
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Accepted': return 'bg-green-100 text-green-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Gestion des Devis</h1>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Chercher un devis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Quotes Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-semibold">Devis</th>
                <th className="text-left p-4 font-semibold">Service</th>
                <th className="text-left p-4 font-semibold">Client</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-left p-4 font-semibold">Montant</th>
                <th className="text-left p-4 font-semibold">Statut</th>
                <th className="text-left p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{quote.id}</td>
                  <td className="p-4">{quote.service}</td>
                  <td className="p-4">{quote.customer}</td>
                  <td className="p-4 text-sm text-muted-foreground">{quote.date}</td>
                  <td className="p-4 font-semibold">{quote.amount} DT</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(quote.status)}`}>
                      {quote.status === 'Pending' ? 'En attente' : quote.status === 'Accepted' ? 'Accepté' : 'Rejeté'}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    {quote.status === 'Pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => handleAccept(quote.id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleReject(quote.id)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
