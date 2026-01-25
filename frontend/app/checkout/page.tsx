import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card as UIComponent } from '@/components/ui/card'
import { Truck, Edit as Credit, Car, Lock } from 'lucide-react'

export default function CheckoutPage() {
  return (
    <>
      {/* Header */}
      <section className="py-8 bg-muted/50 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Paiement</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-8">
              {[
                { number: 1, title: 'Panier', active: false },
                { number: 2, title: 'Livraison', active: false },
                { number: 3, title: 'Paiement', active: true },
              ].map((step) => (
                <div
                  key={step.number}
                  className="flex items-center flex-1"
                >
                  <div
                    className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full font-bold ${
                      step.active
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step.number}
                  </div>
                  {step.number < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step.active ? 'bg-primary' : 'bg-muted'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* Shipping Address */}
            <UIComponent className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Adresse de livraison
              </h2>
              <div className="bg-muted p-4 rounded mb-4">
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">
                  123 Rue de la Paix, Tunis 1000
                </p>
                <p className="text-sm text-muted-foreground">Tel: +216 XX XXX XXX</p>
              </div>
              <Link href="/checkout/shipping">
                <Button variant="outline" size="sm">
                  Modifier l'adresse
                </Button>
              </Link>
            </UIComponent>

            {/* Payment Method */}
            <UIComponent className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Credit className="w-5 h-5" />
                Méthode de paiement
              </h2>

              <div className="space-y-4">
                {[
                  { id: 'card', name: 'Carte bancaire', description: 'Visa, MasterCard, etc.' },
                  { id: 'bank', name: 'Virement bancaire', description: 'Transfert direct depuis votre banque' },
                  { id: 'delivery', name: 'Paiement à la livraison', description: 'Payer le livreur' },
                ].map((method) => (
                  <label key={method.id} className="flex items-center p-4 border rounded cursor-pointer hover:bg-muted/50">
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      defaultChecked={method.id === 'card'}
                      className="w-4 h-4"
                    />
                    <div className="ml-3">
                      <p className="font-medium">{method.name}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Card Form */}
              <div className="mt-6 p-6 bg-muted/50 rounded border">
                <h4 className="font-semibold mb-4">Informations de carte</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Numéro de carte</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiration</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </UIComponent>

            {/* Terms */}
            <label className="flex items-start gap-3 mb-6">
              <input type="checkbox" className="w-4 h-4 rounded mt-1" defaultChecked />
              <span className="text-sm text-muted-foreground">
                J'accepte les <Link href="/legal/terms" className="text-primary hover:underline">conditions générales</Link> et la
                <Link href="/legal/privacy-policy" className="text-primary hover:underline"> politique de confidentialité</Link>
              </span>
            </label>

            {/* Submit */}
            <Link href="/checkout/confirmation">
              <Button size="lg" className="w-full gap-2">
                <Lock className="w-5 h-5" />
                Confirmer et payer
              </Button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <UIComponent className="p-6 sticky top-20">
              <h3 className="font-bold text-lg mb-4">Résumé de commande</h3>

              <div className="space-y-3 mb-4 pb-4 border-b">
                {[
                  { name: 'Robinetterie professionnelle', qty: 2, price: '45.99' },
                  { name: 'Tuyauterie cuivre', qty: 1, price: '28.00' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground">Qtd: {item.qty}</p>
                    </div>
                    <p className="font-medium">{item.price} DT</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span>119.98 DT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Livraison</span>
                  <span>12.00 DT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxe</span>
                  <span>19.20 DT</span>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="text-xl font-bold text-primary">151.18 DT</span>
              </div>
            </UIComponent>
          </div>
        </div>
      </div>
    </>
  )
}
