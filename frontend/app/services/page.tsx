'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DevisRequestModal } from '@/components/devis-request-modal'
import { Droplet, Zap, Flame, Wrench, Clock, Users, Shield } from 'lucide-react'

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string>('')
  const services = [
    {
      id: 1,
      title: 'Plomberie',
      slug: 'plumbing',
      icon: Droplet,
      description: 'Installation, réparation et maintenance de systèmes de plomberie.',
      subcategories: ['Installation tuyauterie', 'Réparation fuites', 'Débouchage'],
      image: '🚰',
    },
    {
      id: 2,
      title: 'Électricité',
      slug: 'electrical',
      icon: Zap,
      description: 'Services électriques professionnels et installation certifiée.',
      subcategories: ['Installation électrique', 'Diagnostique électrique', 'Mise aux normes'],
      image: '⚡',
    },
    {
      id: 3,
      title: 'Chauffage',
      slug: 'heating',
      icon: Flame,
      description: 'Installation et maintenance de systèmes de chauffage.',
      subcategories: ['Installation radiateurs', 'Maintenance chaudière', 'Diagnostic thermique'],
      image: '🔥',
    },
    {
      id: 4,
      title: 'Chaudières',
      slug: 'boilers',
      icon: Wrench,
      description: 'Expertise en installation et maintenance de chaudières.',
      subcategories: ['Installation chaudière', 'Révision annuelle', 'Ramonage'],
      image: '🔧',
    },
  ]

  const features = [
    {
      icon: Clock,
      title: 'Intervention rapide',
      description: 'Disponibilité 24h/24, 7j/7 pour les urgences',
    },
    {
      icon: Users,
      title: 'Experts qualifiés',
      description: 'Équipe certifiée et expérimentée',
    },
    {
      icon: Shield,
      title: 'Garantie satisfaction',
      description: 'Travail garanti avec suivi client',
    },
  ]

  return (
    <>
      {/* Header */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos Services</h1>
          <p className="text-lg text-muted-foreground">
            Services professionnels de maintenance et d'installation
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link key={service.id} href={`/services/${service.slug}`}>
                <Card className="h-full p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-12 h-12 text-primary" />
                    <span className="text-3xl">{service.image}</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Nos spécialités:</p>
                    <div className="flex flex-wrap gap-2">
                      {service.subcategories.map((sub) => (
                        <span key={sub} className="text-xs bg-muted px-2 py-1 rounded">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedService(service.title)
                      setIsModalOpen(true)
                    }}
                  >
                    Demander une intervention
                  </Button>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi nos services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="text-center">
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-12">
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Besoin d'un devis?</h2>
          <p className="text-muted-foreground mb-6">
            Demandez un devis gratuit et sans engagement auprès de nos experts
          </p>
          <Button
            size="lg"
            onClick={() => {
              setSelectedService('')
              setIsModalOpen(true)
            }}
          >
            Demander un devis
          </Button>
        </Card>
      </section>

      {/* Devis Modal */}
      <DevisRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceType={selectedService}
      />
    </>
  )
}
