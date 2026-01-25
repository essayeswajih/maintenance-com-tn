'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Trash2, Plus, Minus } from 'lucide-react'

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Robinetterie professionnelle',
      price: 45.99,
      quantity: 2,
      image: '🚰',
      category: 'Plomberie',
    },
    {
      id: 2,
      name: 'Tuyauterie cuivre',
      price: 28.0,
      quantity: 1,
      image: '🔧',
      category: 'Plomberie',
    },
  ]

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const shipping = 12.0
  const tax = subtotal * 0.16
  const total = subtotal + shipping + tax

  return (
    <>
      {/* Header */}
      <section className="py-8 bg-muted/50 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Mon panier</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 flex items-center gap-6 hover:bg-muted/50 transition-colors"
                    >
                      {/* Product Image */}
                      <div className="text-4xl flex-shrink-0">{item.image}</div>

                      {/* Product Info */}
                      <div className="flex-grow">
                        <Link
                          href={`/products/${item.category.toLowerCase()}/${item.name
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                        >
                          <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {item.category}
                        </p>
                        <p className="text-lg font-bold text-primary mt-2">
                          {item.price.toFixed(2)} DT
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-2 bg-muted rounded">
                        <button className="p-2 hover:bg-background rounded">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button className="p-2 hover:bg-background rounded">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right min-w-24">
                        <p className="text-sm text-muted-foreground">Sous-total</p>
                        <p className="font-bold">
                          {(item.price * item.quantity).toFixed(2)} DT
                        </p>
                      </div>

                      {/* Delete */}
                      <button className="p-2 hover:text-destructive text-muted-foreground transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link href="/products">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continuer vos achats
                  </Button>
                </Link>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Résumé</h2>

                <div className="space-y-3 mb-4 pb-4 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{subtotal.toFixed(2)} DT</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span>{shipping.toFixed(2)} DT</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxe (16%)</span>
                    <span>{tax.toFixed(2)} DT</span>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-muted/50 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      {total.toFixed(2)} DT
                    </span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6 space-y-2">
                  <label className="block text-sm font-medium">Code promo</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Entrez le code"
                      className="flex-1 px-4 py-2 border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button variant="outline" size="sm">
                      Appliquer
                    </Button>
                  </div>
                </div>

                {/* Checkout */}
                <Link href="/checkout">
                  <Button className="w-full mb-3">Procéder au paiement</Button>
                </Link>
                <Button variant="outline" className="w-full bg-transparent">
                  Panier en attente
                </Button>

                {/* Security */}
                <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1">
                  🔒 Paiement sécurisé SSL
                </p>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-2">Votre panier est vide</h2>
            <p className="text-muted-foreground mb-6">
              Découvrez notre large gamme de produits et services
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/products">
                <Button>Parcourir les produits</Button>
              </Link>
              <Link href="/services">
                <Button variant="outline">Voir les services</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CartPage
