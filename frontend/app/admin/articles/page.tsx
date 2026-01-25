'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react'

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState([
    { id: 1, title: 'Guide complet d\'installation de chauffage', category: 'Chauffage', author: 'Ahmed Beni', date: '15 Jan 2024', views: 234, status: 'Publié' },
    { id: 2, title: 'Conseils de maintenance pour vos plomberies', category: 'Plomberie', author: 'Fatima Saidi', date: '10 Jan 2024', views: 156, status: 'Publié' },
    { id: 3, title: 'Sécurité électrique : ce que vous devez savoir', category: 'Électricité', author: 'Karim Ben', date: '05 Jan 2024', views: 89, status: 'Brouillon' },
    { id: 4, title: 'Économies d\'énergie : optimisez votre thermostat', category: 'Chauffage', author: 'Mariem Khamis', date: '01 Jan 2024', views: 412, status: 'Publié' },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr?')) {
      setArticles(articles.filter(a => a.id !== id))
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gestion des Articles</h1>
          <Link href="/admin/articles/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nouvel article
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Chercher un article..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Articles Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-semibold">Titre</th>
                <th className="text-left p-4 font-semibold">Catégorie</th>
                <th className="text-left p-4 font-semibold">Auteur</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-left p-4 font-semibold">Vues</th>
                <th className="text-left p-4 font-semibold">Statut</th>
                <th className="text-left p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr key={article.id} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{article.title}</td>
                  <td className="p-4">{article.category}</td>
                  <td className="p-4 text-sm text-muted-foreground">{article.author}</td>
                  <td className="p-4 text-sm text-muted-foreground">{article.date}</td>
                  <td className="p-4">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-semibold">
                      {article.views} vues
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      article.status === 'Publié'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Link href={`/admin/articles/${article.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(article.id)}
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
