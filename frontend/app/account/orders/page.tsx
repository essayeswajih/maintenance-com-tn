'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Package, Truck, Clock, CheckCircle, AlertCircle, Eye, Download } from 'lucide-react'

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState('all')

  const orders = [
    {
      id: '#12345',
      date: '22 Janvier 2024',
      status: 'Livré',
      items: 'Radiateur Aluminium Premium x2, Tuyauterie Cuivre 22mm',
      total: 450.50,
      trackingNumber: 'TN123456789',
    },
    {
      id: '#12340',
      date: '18 Janvier 2024',
      status: 'En livraison',
      items: 'Thermostat Intelligent WiFi',
      total: 199.99,
      trackingNumber: 'TN123456788',
    },
    {
      id: '#12335',
      date: '15 Janvier 2024',
      status: 'Préparation',
      items: 'Câble Électrique 2.5mm² x5, Robinet Thermostatique x2',
      total: 320.00,
      trackingNumber: 'TN123456787',
    },
    {
      id: '#12330',
      date: '10 Janvier 2024',
      status: 'Livré',
      items: 'Disjoncteur Différentiel x4',
      total: 180.00,
      trackingNumber: 'TN123456786',
    },
    {
      id: '#12325',
      date: '8 Janvier 2024',
      status: 'Livré',
      items: 'Radiateur Aluminium Premium',
      total: 149.99,
      trackingNumber: 'TN123456785',
    },
  ]

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Livré':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'En livraison':
        return <Truck className="w-5 h-5 text-blue-600" />
      case 'Préparation':
        return <Clock className="w-5 h-5 text-yellow-600" />
      default:
        return <Package className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Livré':
        return 'bg-green-100 text-green-800'
      case 'En livraison':
        return 'bg-blue-100 text-blue-800'
      case 'Préparation':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
      {/* Header */}
      <section className="py-8 bg-muted/50 border-b">
        <div className="container mx-auto px-4">
          <Link href="/account" className="flex items-center gap-2 text-primary hover:underline mb-4 w-fit">
            <ArrowLeft className="w-4 h-4" />
            Retour au compte
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Mes commandes</h1>
          <p className="text-muted-foreground">Suivez et gérez vos commandes</p>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { value: 'all', label: 'Toutes les commandes' },
            { value: 'Livré', label: 'Livrées' },
            { value: 'En livraison', label: 'En livraison' },
            { value: 'Préparation', label: 'En préparation' },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedStatus(filter.value)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                selectedStatus === filter.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Orders List */}
      <section className="container mx-auto px-4 pb-12">
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Card key={order.id} className="p-4 md:p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">
                      {getStatusIcon(order.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">Commande {order.id}</h3>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{order.items}</p>
                      <p className="text-xs text-muted-foreground">
                        Commande du {order.date}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Numéro de suivi: {order.trackingNumber}
                      </p>
                    </div>
                  </div>

                  {/* Total and Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{order.total.toFixed(2)} DT</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/account/orders/${order.id.replace('#', '')}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 bg-transparent"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline">Détails</span>
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Facture</span>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                {order.status !== 'Livré' && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progression</span>
                      <span className="font-medium">
                        {order.status === 'Préparation' ? '33%' : order.status === 'En livraison' ? '66%' : '100%'}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-primary h-full transition-all"
                        style={{
                          width: order.status === 'Préparation' ? '33%' : order.status === 'En livraison' ? '66%' : '100%'
                        }}
                      />
                    </div>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucune commande trouvée</p>
              <Link href="/products" className="mt-4 inline-block">
                <Button>Continuer le shopping</Button>
              </Link>
            </Card>
          )}
        </div>

        {/* Summary */}
        {filteredOrders.length > 0 && (
          <Card className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5">
            <h3 className="font-bold mb-4">Résumé des commandes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nombre de commandes</p>
                <p className="text-2xl font-bold">{filteredOrders.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Montant total</p>
                <p className="text-2xl font-bold text-primary">
                  {filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)} DT
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Commande moyenne</p>
                <p className="text-2xl font-bold">
                  {(filteredOrders.reduce((sum, order) => sum + order.total, 0) / filteredOrders.length).toFixed(2)} DT
                </p>
              </div>
            </div>
          </Card>
        )}
      </section>
    </>
  )
}
