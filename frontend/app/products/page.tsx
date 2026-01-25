import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Search, Filter } from 'lucide-react'

export default function ProductsPage() {
  const categories = [
    { name: 'Plomberie', slug: 'plumbing', count: 45 },
    { name: 'Électricité', slug: 'electrical', count: 38 },
    { name: 'Chauffage', slug: 'heating', count: 32 },
    { name: 'Chaudières', slug: 'boilers', count: 18 },
    { name: 'Outils', slug: 'tools', count: 67 },
    { name: 'Pièces détachées', slug: 'parts', count: 120 },
  ]

  const products = [
    {
      id: 1,
      name: 'Robinetterie professionnelle',
      category: 'Plomberie',
      price: '45.99',
      slug: 'robinetterie-pro',
      image: '🚰',
    },
    {
      id: 2,
      name: 'Câble électrique 2.5mm²',
      category: 'Électricité',
      price: '12.50',
      slug: 'cable-electricite',
      image: '⚡',
    },
    {
      id: 3,
      name: 'Tuyauterie cuivre',
      category: 'Plomberie',
      price: '28.00',
      slug: 'tuyauterie-cuivre',
      image: '🔧',
    },
    {
      id: 4,
      name: 'Thermostat numérique',
      category: 'Chauffage',
      price: '89.99',
      slug: 'thermostat-digital',
      image: '🌡️',
    },
    {
      id: 5,
      name: 'Radiateur aluminium',
      category: 'Chauffage',
      price: '120.00',
      slug: 'radiateur-alu',
      image: '🔥',
    },
    {
      id: 6,
      name: 'Disjoncteur 16A',
      category: 'Électricité',
      price: '8.99',
      slug: 'disjoncteur-16a',
      image: '⚙️',
    },
  ]

  return (
    <>
      {/* Header */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos Produits</h1>
          <p className="text-lg text-muted-foreground">
            Large gamme de matériel et équipements professionnels pour tous vos besoins
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Catégories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/products/${category.slug}`}
                    className="block p-2 rounded hover:bg-muted transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-xs text-muted-foreground">({category.count})</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
              <h4 className="font-semibold mb-4">Prix</h4>
              <div className="space-y-2">
                {['0 - 25 DT', '25 - 50 DT', '50 - 100 DT', '100+ DT'].map((range) => (
                  <label key={range} className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm">{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center text-5xl">
                      {product.image}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">{product.price} DT</span>
                        <Button size="sm">Ajouter</Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              {[1, 2, 3, 4].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? 'default' : 'outline'}
                  size="sm"
                >
                  {page}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
