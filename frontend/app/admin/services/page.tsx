'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

export default function AdminServicesPage() {
  const [services, setServices] = useState([
    { id: 1, name: 'Plomberie', description: 'Installation et réparation de plomberie', status: 'Actif', requests: 45 },
    { id: 2, name: 'Électricité', description: 'Services électriques professionnels', status: 'Actif', requests: 38 },
    { id: 3, name: 'Chauffage', description: 'Installation et maintenance de chauffage', status: 'Actif', requests: 52 },
    { id: 4, name: 'Chaudières', description: 'Installation et maintenance de chaudières', status: 'Actif', requests: 21 },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr?')) {
      setServices(services.filter(s => s.id !== id))
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gestion des Services</h1>
          <Link href="/admin/services/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter un service
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Chercher un service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Services Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-semibold">Service</th>
                <th className="text-left p-4 font-semibold">Description</th>
                <th className="text-left p-4 font-semibold">Demandes</th>
                <th className="text-left p-4 font-semibold">Statut</th>
                <th className="text-left p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{service.name}</td>
                  <td className="p-4 text-sm text-muted-foreground">{service.description}</td>
                  <td className="p-4">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-semibold">
                      {service.requests}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                      {service.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <Link href={`/admin/services/${service.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="w-4 h-4" />
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
