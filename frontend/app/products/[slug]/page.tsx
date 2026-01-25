'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Star, Heart, Share2, Truck, RotateCcw, Shield, ShoppingCart, Plus, Minus } from 'lucide-react'
import { useAuth } from '@/context/auth-context'

// Sample product database
const productDatabase: Record<string, any> = {
  'robinetterie-pro': {
    id: 1,
    name: 'Robinetterie Professionnelle Premium',
    slug: 'robinetterie-pro',
    category: 'Plomberie',
    price: 45.99,
    originalPrice: 65.99,
    rating: 4.8,
    reviews: 143,
    stock: 25,
    image: '🚰',
    description: 'Robinetterie professionnelle de haute qualité, idéale pour les installations résidentielles et commerciales. Fabriquée avec des matériaux durables et conçue pour une longévité maximale.',
    features: [
      'Matériau: Laiton chromé haute performance',
      'Dimensions: 15cm de hauteur',
      'Débit: 8-10 litres/minute',
      'Température max: 60°C',
      'Garantie: 3 ans',
      'Certification: Conforme aux normes CE',
    ],
    specifications: {
      'Matériau': 'Laiton chromé',
      'Poids': '0.8 kg',
      'Couleur': 'Chrome/Nickel',
      'Hauteur': '15 cm',
      'Type': 'Mitigeur simple',
      'Installation': 'Murale',
    },
    reviews_list: [
      { author: 'Ali M.', rating: 5, text: 'Excellent produit, très robuste et facile à installer.' },
      { author: 'Fatima B.', rating: 4, text: 'Bonne qualité, livraison rapide.' },
      { author: 'Ahmed K.', rating: 5, text: 'Recommandé! Vraiment satisfait de mon achat.' },
    ],
  },
  'cable-electricite': {
    id: 2,
    name: 'Câble Électrique 2.5mm²',
    slug: 'cable-electricite',
    category: 'Électricité',
    price: 12.50,
    originalPrice: 18.00,
    rating: 4.7,
    reviews: 89,
    stock: 150,
    image: '⚡',
    description: 'Câble électrique haute performance certifié aux normes internationales. Parfait pour les installations résidentielles et petits commerces.',
    features: [
      'Section: 2.5mm²',
      'Tension: 300/500V',
      'Matériau: Cuivre pur',
      'Longueur: 100 mètres',
      'Couleur: Noir',
      'Certification: Norme IEC 60227',
    ],
    specifications: {
      'Section': '2.5 mm²',
      'Tension': '300/500 V',
      'Matériau': 'Cuivre pur',
      'Longueur': '100 m',
      'Poids': '2.5 kg',
      'Température': '-10°C à +60°C',
    },
    reviews_list: [
      { author: 'Mohamed D.', rating: 5, text: 'Très bonne qualité de câble, conforme aux normes.' },
      { author: 'Salma L.', rating: 4, text: 'Bon rapport qualité-prix.' },
    ],
  },
  'tuyauterie-cuivre': {
    id: 3,
    name: 'Tuyauterie Cuivre Haute Pression',
    slug: 'tuyauterie-cuivre',
    category: 'Plomberie',
    price: 28.00,
    originalPrice: 38.00,
    rating: 4.9,
    reviews: 156,
    stock: 80,
    image: '🔧',
    description: 'Tuyauterie en cuivre rigide de haute qualité, adaptée aux systèmes de plomberie résidentiels et commerciaux.',
    features: [
      'Diamètre: 22mm',
      'Matériau: Cuivre écroui',
      'Longueur: 5 mètres',
      'Pression max: 30 bars',
      'Température: -10°C à +90°C',
      'Certification: ISO 1412',
    ],
    specifications: {
      'Diamètre': '22 mm',
      'Type': 'Rigide',
      'Matériau': 'Cuivre écroui',
      'Longueur': '5 m',
      'Pression max': '30 bars',
      'Poids': '1.2 kg',
    },
    reviews_list: [
      { author: 'Hassan M.', rating: 5, text: 'Excellent, pas de fuites, installation facile.' },
      { author: 'Laila T.', rating: 5, text: 'Livré rapidement en bon état.' },
    ],
  },
  'thermostat-digital': {
    id: 4,
    name: 'Thermostat Numérique WiFi',
    slug: 'thermostat-digital',
    category: 'Chauffage',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 234,
    stock: 45,
    image: '🌡️',
    description: 'Thermostat intelligent connecté WiFi pour contrôle optimal de votre chauffage. Économisez jusqu\'à 25% d\'énergie.',
    features: [
      'Connectivité: WiFi 2.4GHz',
      'Application mobile: Oui',
      'Écran: LED tactile 3.5"',
      'Programmation: 7 jours',
      'Capteur: Numérique précis',
      'Alimentation: Pile AA (2)',
    ],
    specifications: {
      'Connectivité': 'WiFi 2.4 GHz',
      'Écran': 'LED tactile 3.5"',
      'Programmation': '7 jours / 4 périodes',
      'Plage': '5°C à 35°C',
      'Précision': '±0.5°C',
      'Durée pile': '12 mois',
    },
    reviews_list: [
      { author: 'Karim S.', rating: 5, text: 'Installation simple, économies d\'énergie réelles!' },
      { author: 'Ines R.', rating: 5, text: 'L\'app fonctionne très bien, très satisfait.' },
      { author: 'Omar N.', rating: 4, text: 'Bon produit mais le WiFi peut être instable.' },
    ],
  },
  'radiateur-alu': {
    id: 5,
    name: 'Radiateur Aluminium 600x10',
    slug: 'radiateur-alu',
    category: 'Chauffage',
    price: 120.00,
    originalPrice: 165.00,
    rating: 4.6,
    reviews: 98,
    stock: 32,
    image: '🔥',
    description: 'Radiateur en aluminium haute performance pour chauffage central. Design moderne et efficacité énergétique optimale.',
    features: [
      'Type: Panneaux horizontaux',
      'Dimensions: 600x10 mm',
      'Matériau: Aluminium moulé',
      'Puissance: 1200W',
      'Pression: 10 bars',
      'Garantie: 5 ans',
    ],
    specifications: {
      'Hauteur': '600 mm',
      'Profondeur': '10 mm',
      'Largeur': 'Variable',
      'Puissance': '1200 W',
      'Poids': '8 kg',
      'Type d\'eau': 'Chauffage central',
    },
    reviews_list: [
      { author: 'Nabil P.', rating: 5, text: 'Très bon radiateur, restitution de chaleur excellente.' },
      { author: 'Samira Q.', rating: 4, text: 'Conforme à la description, bien emballé.' },
    ],
  },
  'disjoncteur-16a': {
    id: 6,
    name: 'Disjoncteur 16A Type C',
    slug: 'disjoncteur-16a',
    category: 'Électricité',
    price: 8.99,
    originalPrice: 12.50,
    rating: 4.7,
    reviews: 167,
    stock: 200,
    image: '⚙️',
    description: 'Disjoncteur modulaire haute performance pour protection des circuits électriques. Certifié aux normes en vigueur.',
    features: [
      'Calibre: 16 Ampères',
      'Type: C',
      'Tension: 230/400V',
      'Courbe: C (6 à 10 In)',
      'Nombre de pôles: 1',
      'Norme: EN 60898',
    ],
    specifications: {
      'Calibre': '16 A',
      'Type': 'C',
      'Nombre pôles': '1',
      'Tension': '230/400 V',
      'Courant court circuit': '6000 A',
      'Poids': '0.1 kg',
    },
    reviews_list: [
      { author: 'Riadh V.', rating: 5, text: 'Très bon produit, installation facile.' },
      { author: 'Yasmine W.', rating: 5, text: 'Correspond exactement à mes attentes.' },
    ],
  },
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = productDatabase[params.slug]
  const { isAuthenticated } = useAuth()
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  if (!product) {
    return (
      <>
        <section className="py-8 bg-muted/50 border-b">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Produit non trouvé</h1>
          </div>
        </section>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground mb-6">Désolé, ce produit n'existe pas.</p>
          <Link href="/products">
            <Button>Retour aux produits</Button>
          </Link>
        </div>
      </>
    )
  }

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <>
      {/* Header */}
      <section className="py-8 bg-muted/50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/products" className="hover:text-primary">Produits</Link>
            <span>/</span>
            <Link href={`/products`} className="hover:text-primary">{product.category}</Link>
            <span>/</span>
            <span>{product.name}</span>
          </div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
        </div>
      </section>

      {/* Product Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Product Image */}
          <div className="lg:col-span-1">
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center text-9xl p-8 sticky top-4">
              {product.image}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-2">
            {/* Category & Rating */}
            <div className="mb-6">
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{product.category}</span>
            </div>

            {/* Title & Price */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
              
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-bold text-primary">{product.price.toFixed(2)} DT</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">{product.originalPrice.toFixed(2)} DT</span>
                    <span className="text-sm font-semibold bg-accent text-accent-foreground px-3 py-1 rounded-full">
                      -{discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Rating & Stock */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} avis)</span>
                </div>

                <div className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-destructive'}`}>
                  {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none mb-8">
              <p>{product.description}</p>
            </div>

            {/* Features List */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4">Caractéristiques principales</h3>
              <ul className="grid grid-cols-2 gap-3">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-primary font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="bg-muted/50 p-6 rounded-lg mb-8">
              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">Quantité</label>
                <div className="flex items-center gap-4 w-fit">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-transparent"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-lg font-semibold min-w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="bg-transparent"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button className="w-full gap-2 mb-3" disabled={product.stock === 0}>
                <ShoppingCart className="w-5 h-5" />
                {isAuthenticated ? 'Ajouter au panier' : 'Se connecter pour acheter'}
              </Button>

              {/* Secondary Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent gap-2"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-destructive text-destructive' : ''}`} />
                  {isWishlisted ? 'Sauvegardé' : 'Sauvegarder'}
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent gap-2">
                  <Share2 className="w-4 h-4" />
                  Partager
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">Livraison gratuite</p>
                <p className="text-xs text-muted-foreground">Pour commandes &gt;100DT</p>
              </Card>
              <Card className="p-4 text-center">
                <RotateCcw className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">Retours gratuits</p>
                <p className="text-xs text-muted-foreground">Jusqu\'à 30 jours</p>
              </Card>
              <Card className="p-4 text-center">
                <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">Garantie</p>
                <p className="text-xs text-muted-foreground">2 ans minimum</p>
              </Card>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-t pt-12">
          {/* Tab Navigation */}
          <div className="flex gap-8 mb-8 border-b">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-medium border-b-2 transition-colors ${
                  activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
                }`}
              >
                {tab === 'description' ? 'Description' : tab === 'specifications' ? 'Spécifications' : 'Avis'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none">
                <p>{product.description}</p>
                <h3>Caractéristiques</h3>
                <ul>
                  {product.features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specifications' && (
              <div className="space-y-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b">
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground">{String(value)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Avis clients ({product.reviews})</h3>
                  {product.reviews_list.map((review: any, index: number) => (
                    <Card key={index} className="p-4 mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{review.author}</p>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.text}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20 pt-12 border-t">
          <h2 className="text-2xl font-bold mb-8">Produits similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(productDatabase)
              .filter((p: any) => p.category === product.category && p.slug !== product.slug)
              .slice(0, 4)
              .map((p: any) => (
                <Link key={p.slug} href={`/products/${p.slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center text-6xl">
                      {p.image}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{p.category}</p>
                      <h3 className="font-semibold mb-2 line-clamp-2 text-sm">{p.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary text-sm">{p.price.toFixed(2)} DT</span>
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{p.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
