'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ArrowLeft,
  FileText,
  Clock,
  User,
  CheckCircle,
  MapPin,
  Phone,
  Star,
  Wrench,
  AlertCircle,
} from 'lucide-react'
import { useState } from 'react'

export default function ServicePage({ params }: { params: { slug: string } }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  // Map slug to service data
  const serviceData: Record<
    string,
    {
      title: string
      description: string
      icon: string
      rating: number
      reviews: number
      price: number
      priceUnit: string
      duration: string
      availability: string
    }
  > = {
    plumbing: {
      title: 'Service de Plomberie',
      description:
        'Services complèts de plomberie incluant installation, réparation et maintenance de systèmes de plomberie résidentiels et commerciaux.',
      icon: '💧',
      rating: 4.9,
      reviews: 234,
      price: 150,
      priceUnit: 'intervention',
      duration: '2-3 heures',
      availability: 'Lun-Dim 7h-20h',
    },
    electrical: {
      title: 'Service Électricité',
      description:
        'Services électriques professionnels incluant installation, réparation et mise aux normes de sécurité de votre installation électrique.',
      icon: '⚡',
      rating: 4.8,
      reviews: 189,
      price: 120,
      priceUnit: 'intervention',
      duration: '1-2 heures',
      availability: 'Lun-Sam 8h-19h',
    },
    heating: {
      title: 'Service Chauffage',
      description:
        'Installation et maintenance de systèmes de chauffage modernes pour assurer votre confort thermique toute l\'année.',
      icon: '🔥',
      rating: 4.9,
      reviews: 167,
      price: 200,
      priceUnit: 'intervention',
      duration: '3-4 heures',
      availability: 'Lun-Dim 7h-20h',
    },
    boilers: {
      title: 'Service Installation Chaudières',
      description:
        'Expertise complète en installation, maintenance et dépannage de chaudières haute performance et économes en énergie.',
      icon: '🔧',
      rating: 4.9,
      reviews: 145,
      price: 300,
      priceUnit: 'intervention',
      duration: '4-6 heures',
      availability: 'Lun-Sam 8h-18h',
    },
  }

  const service = serviceData[params.slug] || serviceData.plumbing

  const features = [
    'Techniciens certifiés et expérimentés',
    'Travaux garantis 2 ans minimum',
    'Devis gratuit sans engagement',
    'Intervention rapide (24-48h)',
    'Respect des normes de sécurité',
    'Transparence tarifaire totale',
  ]

  const process = [
    {
      step: 1,
      title: 'Demande de devis',
      description: 'Remplissez le formulaire avec les détails de votre projet',
    },
    {
      step: 2,
      title: 'Évaluation',
      description: 'Nos experts évaluent votre demande et proposent un devis',
    },
    {
      step: 3,
      title: 'Planification',
      description: 'Choisissez une date et heure qui vous convient',
    },
    {
      step: 4,
      title: 'Intervention',
      description: 'Notre technicien effectue le travail avec profesionnalisme',
    },
    {
      step: 5,
      title: 'Suivi',
      description: 'Nous assurons le suivi post-intervention et la satisfaction',
    },
  ]

  const reviews = [
    {
      author: 'Mohamed Ben',
      rating: 5,
      date: 'Il y a 2 semaines',
      text: 'Travail de très bonne qualité. Technicien très professionnel et courtois. Je recommande vivement!',
    },
    {
      author: 'Amira S.',
      rating: 5,
      date: 'Il y a 1 mois',
      text: 'Service rapide et efficace. Le devis était conforme au prix final. Excellent rapport qualité-prix.',
    },
    {
      author: 'Karim Saïdi',
      rating: 4,
      date: 'Il y a 6 semaines',
      text: 'Très satisfait du service. Quelques améliorations possibles sur la communication, mais résultat excellent.',
    },
  ]

  return (
    <>
      {/* Header */}
      <section className="py-8 bg-gradient-to-r from-primary/10 via-background to-accent/10 border-b">
        <div className="container mx-auto px-4">
          <Link href="/services" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
            <ArrowLeft className="w-4 h-4" />
            Retour aux services
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-6xl mb-4">{service.icon}</div>
              <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(service.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{service.rating}</span>
                  <span className="text-muted-foreground">({service.reviews} avis)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card className="p-4 text-center border-0 bg-muted/50">
                  <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold mb-1">Durée moyenne</p>
                  <p className="text-xs text-muted-foreground">{service.duration}</p>
                </Card>
                <Card className="p-4 text-center border-0 bg-muted/50">
                  <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold mb-1">Disponibilité</p>
                  <p className="text-xs text-muted-foreground">{service.availability}</p>
                </Card>
                <Card className="p-4 text-center border-0 bg-muted/50">
                  <Wrench className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold mb-1">Tarif de base</p>
                  <p className="text-xs text-muted-foreground">{service.price} TND</p>
                </Card>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-8 leading-relaxed text-lg">{service.description}</p>

              {/* Tabs */}
              <div className="mb-8">
                <div className="flex gap-8 border-b mb-8">
                  {['overview', 'process', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 font-semibold transition-colors ${
                        activeTab === tab
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {tab === 'overview' && 'Aperçu'}
                      {tab === 'process' && 'Processus'}
                      {tab === 'reviews' && 'Avis clients'}
                    </button>
                  ))}
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-6">Pourquoi choisir ce service?</h3>
                    <ul className="space-y-4">
                      {features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Process Tab */}
                {activeTab === 'process' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-8">Notre processus</h3>
                    <div className="space-y-6">
                      {process.map((item) => (
                        <div key={item.step} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                              {item.step}
                            </div>
                            {item.step < process.length && (
                              <div className="w-1 h-12 bg-primary/20 mt-2" />
                            )}
                          </div>
                          <div className="pb-4">
                            <h4 className="font-semibold mb-1">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-8">Avis clients</h3>
                    <div className="space-y-6">
                      {reviews.map((review, i) => (
                        <Card key={i} className="p-6 border-0 bg-muted/50">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-semibold">{review.author}</p>
                              <div className="flex gap-1 mt-1">
                                {[...Array(5)].map((_, j) => (
                                  <Star
                                    key={j}
                                    className={`w-4 h-4 ${
                                      j < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-muted-foreground'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-muted-foreground">{review.text}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24 border-0 bg-gradient-to-br from-primary/5 to-accent/5">
                {/* Price */}
                <div className="mb-8">
                  <p className="text-sm text-muted-foreground mb-2">À partir de</p>
                  <p className="text-3xl font-bold text-primary mb-1">{service.price} TND</p>
                  <p className="text-xs text-muted-foreground">par {service.priceUnit}</p>
                  <p className="text-xs text-muted-foreground mt-4 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                    Le prix final peut varier selon votre demande spécifique
                  </p>
                </div>

                {/* CTA Button */}
                <Link href="/services/request" className="block mb-4">
                  <Button className="w-full gap-2" size="lg">
                    <FileText className="w-5 h-5" />
                    Demander un devis
                  </Button>
                </Link>

                {/* Contact Info */}
                <div className="space-y-3 pt-6 border-t">
                  <p className="text-sm font-semibold mb-3">Questions?</p>
                  <div className="space-y-2">
                    <a href="tel:+21629999999" className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <Phone className="w-4 h-4" />
                      +216 29 999 999
                    </a>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Réponse en moins de 2h
                    </p>
                  </div>
                </div>
              </Card>

              {/* Trust Badges */}
              <div className="mt-6 space-y-3">
                <Card className="p-4 text-center border-0 bg-muted/50">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Experts certifiés</p>
                </Card>
                <Card className="p-4 text-center border-0 bg-muted/50">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Garantie 2 ans</p>
                </Card>
                <Card className="p-4 text-center border-0 bg-muted/50">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Satisfaction 100%</p>
                </Card>
              </div>
            </div>
          </div>

          {/* Related Services */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8">Autres services</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {Object.entries(serviceData)
                .filter(([slug]) => slug !== params.slug)
                .map(([slug, svc]) => (
                  <Link key={slug} href={`/services/${slug}`}>
                    <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-2 cursor-pointer h-full flex flex-col">
                      <div className="text-6xl mb-4">{svc.icon}</div>
                      <h4 className="font-semibold mb-2 flex-1">{svc.title}</h4>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{svc.rating}</span>
                        <span className="text-muted-foreground">({svc.reviews})</span>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
