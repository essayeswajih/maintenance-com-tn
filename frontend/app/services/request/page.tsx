import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function ServiceRequestPage() {
  const services = [
    {
      id: 1,
      name: 'Plomberie',
      icon: '🚰',
      description: 'Installation, réparation, maintenance de plomberie',
    },
    {
      id: 2,
      name: 'Électricité',
      icon: '⚡',
      description: 'Installation électrique, diagnostique, mise aux normes',
    },
    {
      id: 3,
      name: 'Chauffage',
      icon: '🔥',
      description: 'Installation radiateurs, maintenance, diagnostic',
    },
    {
      id: 4,
      name: 'Chaudières',
      icon: '🔧',
      description: 'Installation chaudière, révision, ramonage',
    },
  ]

  return (
    <>
      {/* Header */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Demander un devis</h1>
          <p className="text-lg text-muted-foreground">
            Obtenez un devis gratuit et sans engagement pour vos besoins de maintenance
          </p>
        </div>
      </section>

      {/* Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8">
            <form className="space-y-8">
              {/* Service Selection */}
              <div>
                <h2 className="text-xl font-bold mb-4">Sélectionnez le service</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className="flex items-start p-4 border rounded cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="service"
                        value={service.id}
                        className="w-4 h-4 mt-1"
                      />
                      <div className="ml-3">
                        <p className="font-semibold text-lg">{service.icon} {service.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-bold mb-4">Vos informations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom</label>
                    <input
                      type="text"
                      placeholder="Votre nom"
                      required
                      className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Prénom</label>
                    <input
                      type="text"
                      placeholder="Votre prénom"
                      required
                      className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="votre@email.com"
                      required
                      className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Téléphone</label>
                    <input
                      type="tel"
                      placeholder="+216 XX XXX XXX"
                      required
                      className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h2 className="text-xl font-bold mb-4">Localisation</h2>
                <div>
                  <label className="block text-sm font-medium mb-2">Adresse</label>
                  <input
                    type="text"
                    placeholder="Votre adresse"
                    required
                    className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ville</label>
                    <input
                      type="text"
                      placeholder="Tunis"
                      required
                      className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Code postal</label>
                    <input
                      type="text"
                      placeholder="1000"
                      className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Details */}
              <div>
                <h2 className="text-xl font-bold mb-4">Détails du projet</h2>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Décrivez votre projet
                  </label>
                  <textarea
                    placeholder="Donnez-nous les détails de votre projet..."
                    rows={6}
                    required
                    className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">
                    Délai souhaité
                  </label>
                  <select className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Sélectionnez un délai</option>
                    <option>Urgent (1-2 jours)</option>
                    <option>Normal (1-2 semaines)</option>
                    <option>Sans urgence (2+ semaines)</option>
                  </select>
                </div>
              </div>

              {/* Contact Preference */}
              <div>
                <h2 className="text-xl font-bold mb-4">Préférence de contact</h2>
                <div className="space-y-3">
                  {['Téléphone', 'Email', 'SMS'].map((method) => (
                    <label key={method} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="contact"
                        value={method}
                        defaultChecked={method === 'Téléphone'}
                        className="w-4 h-4"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3">
                <input type="checkbox" className="w-4 h-4 rounded mt-1" required />
                <span className="text-sm text-muted-foreground">
                  J'accepte que Maintenance.com.tn me contacte pour envoyer un devis
                </span>
              </label>

              {/* Submit */}
              <Link href="/services/request/confirmation">
                <Button size="lg" className="w-full">
                  Envoyer la demande de devis
                </Button>
              </Link>
            </form>
          </Card>

          {/* Info */}
          <Card className="mt-8 p-6 bg-muted/50">
            <h3 className="font-bold text-lg mb-4">À savoir</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Devis gratuit et sans engagement</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Réponse rapide dans les 24h</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Experts certifiés et expérimentés</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Service disponible 24h/24 pour les urgences</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  )
}
