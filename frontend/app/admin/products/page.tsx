'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Radiateur Aluminium Premium', category: 'Chauffage', price: 149.99, stock: 45, status: 'Actif' },
    { id: 2, name: 'Tuyauterie Cuivre 22mm', category: 'Plomberie', price: 89.50, stock: 120, status: 'Actif' },
    { id: 3, name: 'Câble Électrique 2.5mm²', category: 'Électricité', price: 59.99, stock: 0, status: 'Rupture' },
    { id: 4, name: 'Thermostat Intelligent WiFi', category: 'Chauffage', price: 199.99, stock: 32, status: 'Actif' },
    { id: 5, name: 'Robinet Thermostatique', category: 'Plomberie', price: 79.99, stock: 67, status: 'Actif' },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gestion des Produits</h1>
          <Link href="/admin/products/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter un produit
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Chercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Products Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-semibold">Produit</th>
                <th className="text-left p-4 font-semibold">Catégorie</th>
                <th className="text-left p-4 font-semibold">Prix</th>
                <th className="text-left p-4 font-semibold">Stock</th>
                <th className="text-left p-4 font-semibold">Statut</th>
                <th className="text-left p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4 font-semibold">{product.price.toFixed(2)} DT</td>
                  <td className="p-4">
                    <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                      {product.stock} unités
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      product.status === 'Actif'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(product.id)}
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
