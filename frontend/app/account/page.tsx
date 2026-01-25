import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User, ShoppingBag, FileText, MapPin, Lock, LogOut } from 'lucide-react'

export default function AccountPage() {
  const accountMenus = [
    {
      icon: User,
      title: 'Profil',
      description: 'Gérer vos informations personnelles',
      href: '/account/profile',
    },
    {
      icon: ShoppingBag,
      title: 'Mes commandes',
      description: 'Suivi de vos commandes de produits',
      href: '/account/orders',
    },
    {
      icon: FileText,
      title: 'Mes devis',
      description: 'Historique des devis et services',
      href: '/account/devis',
    },
    {
      icon: FileText,
      title: 'Mes factures',
      description: 'Télécharger vos factures',
      href: '/account/invoices',
    },
    {
      icon: MapPin,
      title: 'Adresses',
      description: 'Gérer vos adresses de livraison',
      href: '/account/addresses',
    },
    {
      icon: Lock,
      title: 'Sécurité',
      description: 'Modifier votre mot de passe',
      href: '/account/security',
    },
  ]

  return (
    <>
      {/* Header */}
      <section className="py-12 bg-muted/50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Mon compte</h1>
              <p className="text-muted-foreground">
                Gérez votre profil et vos commandes
              </p>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </section>

      {/* User Info Card */}
      <section className="container mx-auto px-4 py-8">
        <Card className="p-6 mb-8 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl text-primary-foreground font-bold">
              JD
            </div>
            <div>
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-muted-foreground">john@example.com</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Membre depuis</p>
              <p className="font-semibold">15 Janvier 2024</p>
            </div>
            <div>
              <p className="text-muted-foreground">Commandes totales</p>
              <p className="font-semibold">12 commandes</p>
            </div>
            <div>
              <p className="text-muted-foreground">Montant total</p>
              <p className="font-semibold">1,250 DT</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Account Menu Grid */}
      <section className="container mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-8">Gérer mon compte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accountMenus.map((menu) => {
            const Icon = menu.icon
            return (
              <Link key={menu.href} href={menu.href}>
                <Card className="h-full p-6 hover:shadow-lg transition-shadow cursor-pointer hover:border-primary">
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-lg mb-2">{menu.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{menu.description}</p>
                  <Button variant="ghost" size="sm" className="gap-2">
                    Accéder →
                  </Button>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="container mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">Activité récente</h2>
        <Card className="divide-y">
          {[
            {
              date: '22 Janvier 2024',
              action: 'Commande #12345 confirmée',
              status: 'Complétée',
            },
            {
              date: '20 Janvier 2024',
              action: 'Intervention plomberie effectuée',
              status: 'Complétée',
            },
            {
              date: '18 Janvier 2024',
              action: 'Devis #98765 accepté',
              status: 'Acceptée',
            },
          ].map((activity, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.date}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  activity.status === 'Complétée'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {activity.status}
              </span>
            </div>
          ))}
        </Card>
      </section>
    </>
  )
}
