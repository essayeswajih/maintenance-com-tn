'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Package, Truck, Clock, CheckCircle, AlertCircle, Download, PrinterIcon, MapPin, Phone, Mail, Calendar } from 'lucide-react'

const ordersDatabase = {
  '12345': {
    id: '#12345',
    date: '22 Janvier 2024',
    status: 'Livré',
    deliveryDate: '25 Janvier 2024',
    items: [
      { name: 'Radiateur Aluminium Premium', quantity: 2, price: 149.99, total: 299.98 },
      { name: 'Tuyauterie Cuivre 22mm', quantity: 1, price: 150.52, total: 150.52 },
    ],
    subtotal: 450.50,
    shipping: 0,
    tax: 45.05,
    total: 495.55,
    trackingNumber: 'TN123456789',
    estimatedDelivery: '25 Janvier 2024',
    customerInfo: {
      name: 'Ahmed Hassan',
      email: 'ahmed@example.com',
      phone: '+216 98 123 456',
      address: '123 Rue Mohamed Ali, Tunis 1000',
    },
  },
  '12340': {
    id: '#12340',
    date: '18 Janvier 2024',
    status: 'En livraison',
    deliveryDate: '24 Janvier 2024',
    items: [
      { name: 'Thermostat Intelligent WiFi', quantity: 1, price: 199.99, total: 199.99 },
    ],
    subtotal: 199.99,
    shipping: 15.00,
    tax: 21.50,
    total: 236.49,
    trackingNumber: 'TN123456788',
    estimatedDelivery: '24 Janvier 2024',
    customerInfo: {
      name: 'Ahmed Hassan',
      email: 'ahmed@example.com',
      phone: '+216 98 123 456',
      address: '123 Rue Mohamed Ali, Tunis 1000',
    },
  },
  '12335': {
    id: '#12335',
    date: '15 Janvier 2024',
    status: 'Préparation',
    deliveryDate: '22 Janvier 2024',
    items: [
      { name: 'Câble Électrique 2.5mm²', quantity: 5, price: 12.00, total: 60.00 },
      { name: 'Robinet Thermostatique', quantity: 2, price: 79.99, total: 159.98 },
    ],
    subtotal: 319.98,
    shipping: 15.00,
    tax: 33.60,
    total: 368.58,
    trackingNumber: 'TN123456787',
    estimatedDelivery: '22 Janvier 2024',
    customerInfo: {
      name: 'Ahmed Hassan',
      email: 'ahmed@example.com',
      phone: '+216 98 123 456',
      address: '123 Rue Mohamed Ali, Tunis 1000',
    },
  },
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = ordersDatabase[params.id as keyof typeof ordersDatabase]
  const [isLoading, setIsLoading] = useState(false)

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Commande non trouvée</h1>
        <p className="text-muted-foreground mb-6">La commande que vous recherchez n'existe pas.</p>
        <Link href="/account/orders">
          <Button>Retour aux commandes</Button>
        </Link>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Livré':
        return <CheckCircle className="w-6 h-6 text-green-600" />
      case 'En livraison':
        return <Truck className="w-6 h-6 text-blue-600" />
      case 'Préparation':
        return <Clock className="w-6 h-6 text-yellow-600" />
      default:
        return <Package className="w-6 h-6 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Livré':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'En livraison':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'Préparation':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  const handleDownloadInvoice = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert('Facture téléchargée avec succès!')
    }, 1000)
  }

  const handlePrintOrder = () => {
    window.print()
  }

  return (
    <>
      {/* Header */}
      <section className="py-8 bg-muted/50 border-b">
        <div className="container mx-auto px-4">
          <Link href="/account/orders" className="flex items-center gap-2 text-primary hover:underline mb-4 w-fit">
            <ArrowLeft className="w-4 h-4" />
            Retour aux commandes
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Commande {order.id}</h1>
          <p className="text-muted-foreground">Détails complets de votre commande</p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                {getStatusIcon(order.status)}
                <div>
                  <h2 className="text-2xl font-bold">{order.status}</h2>
                  <p className="text-muted-foreground">Commandée le {order.date}</p>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium">Commande confirmée</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                </div>

                <div className="ml-3 pb-4 border-l-2 border-muted" />

                <div className="flex items-center gap-4">
                  {order.status !== 'Préparation' ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <Clock className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">En préparation</p>
                    <p className="text-sm text-muted-foreground">Votre commande est en cours de préparation</p>
                  </div>
                </div>

                <div className="ml-3 pb-4 border-l-2 border-muted" />

                <div className="flex items-center gap-4">
                  {order.status === 'Livré' || order.status === 'En livraison' ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">Expédiée</p>
                    <p className="text-sm text-muted-foreground">
                      {order.status === 'Livré' || order.status === 'En livraison' ? `Numéro de suivi: ${order.trackingNumber}` : 'En attente'}
                    </p>
                  </div>
                </div>

                <div className="ml-3 pb-4 border-l-2 border-muted" />

                <div className="flex items-center gap-4">
                  {order.status === 'Livré' ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">Livrée</p>
                    <p className="text-sm text-muted-foreground">
                      {order.status === 'Livré' ? `Livrée le ${order.deliveryDate}` : 'En attente'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Items Card */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-6">Détails de la commande</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-4 border-b last:border-0">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.total.toFixed(2)} DT</p>
                      <p className="text-sm text-muted-foreground">{item.price.toFixed(2)} DT x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-6 space-y-3 border-t pt-6">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="font-medium">{order.subtotal.toFixed(2)} DT</span>
                </div>
                {order.shipping > 0 && (
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span className="font-medium text-green-600">Gratuit</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Taxe (10%)</span>
                  <span className="font-medium">{order.tax.toFixed(2)} DT</span>
                </div>
                <div className="flex justify-between text-lg font-bold bg-primary/10 p-3 rounded">
                  <span>Total</span>
                  <span className="text-primary">{order.total.toFixed(2)} DT</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Actions</h3>
              <div className="space-y-3">
                <Button
                  onClick={handleDownloadInvoice}
                  disabled={isLoading}
                  className="w-full gap-2"
                >
                  <Download className="w-4 h-4" />
                  {isLoading ? 'Téléchargement...' : 'Télécharger la facture'}
                </Button>
                <Button
                  onClick={handlePrintOrder}
                  variant="outline"
                  className="w-full gap-2 bg-transparent"
                >
                  <PrinterIcon className="w-4 h-4" />
                  Imprimer
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Contacter le support
                </Button>
              </div>
            </Card>

            {/* Delivery Info */}
            <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Livraison
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Adresse de livraison</p>
                  <p className="font-medium flex items-start gap-2 mt-1">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                    <span>{order.customerInfo.address}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Livraison estimée</p>
                  <p className="font-medium flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    {order.estimatedDelivery}
                  </p>
                </div>
                {order.trackingNumber && (
                  <div>
                    <p className="text-sm text-muted-foreground">Numéro de suivi</p>
                    <p className="font-medium text-primary">{order.trackingNumber}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Customer Info */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Informations de contact</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Nom</p>
                  <p className="font-medium">{order.customerInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="w-4 h-4" /> Téléphone
                  </p>
                  <p className="font-medium">{order.customerInfo.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="w-4 h-4" /> Email
                  </p>
                  <p className="font-medium text-primary">{order.customerInfo.email}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
