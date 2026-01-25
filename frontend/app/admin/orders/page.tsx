'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Search, Eye, Edit } from 'lucide-react'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([
    { id: '#12345', customer: 'Ahmed Hassan', date: '22 Jan 2024', amount: 450, status: 'Expédiée' },
    { id: '#12346', customer: 'Fatima Ali', date: '21 Jan 2024', amount: 320, status: 'En traitement' },
    { id: '#12347', customer: 'Mohamed Ben', date: '20 Jan 2024', amount: 680, status: 'Livrée' },
    { id: '#12348', customer: 'Sara Khalil', date: '19 Jan 2024', amount: 255, status: 'En traitement' },
    { id: '#12349', customer: 'Ali Mansour', date: '18 Jan 2024', amount: 525, status: 'Expédiée' },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('Tous')

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.includes(searchQuery) || o.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'Tous' || o.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Livrée': return 'bg-green-100 text-green-800'
      case 'Expédiée': return 'bg-blue-100 text-blue-800'
      case 'En traitement': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Gestion des Commandes</h1>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Chercher une commande..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>Tous</option>
            <option>En traitement</option>
            <option>Expédiée</option>
            <option>Livrée</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-semibold">Commande</th>
                <th className="text-left p-4 font-semibold">Client</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-left p-4 font-semibold">Montant</th>
                <th className="text-left p-4 font-semibold">Statut</th>
                <th className="text-left p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4 text-sm text-muted-foreground">{order.date}</td>
                  <td className="p-4 font-semibold">{order.amount} DT</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <Link href={`/admin/orders/${order.id.replace('#', '')}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
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
