'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X, Calendar, Clock, MapPin, Phone, Mail } from 'lucide-react'
import { useDevis } from '@/context/devis-context'
import { useAuth } from '@/context/auth-context'

interface DevisRequestModalProps {
  isOpen: boolean
  onClose: () => void
  serviceType?: string
}

export function DevisRequestModal({
  isOpen,
  onClose,
  serviceType = 'Maintenance',
}: DevisRequestModalProps) {
  const { addDevis } = useDevis()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    serviceType,
    title: '',
    description: '',
    location: '',
    phoneNumber: user?.phone || '',
    email: user?.email || '',
    preferredDate: '',
    preferredTime: '09:00',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      addDevis({
        userId: user?.id || 'user-1',
        serviceType: formData.serviceType,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        status: 'pending',
      })

      // Reset form and close modal
      setFormData({
        serviceType,
        title: '',
        description: '',
        location: '',
        phoneNumber: user?.phone || '',
        email: user?.email || '',
        preferredDate: '',
        preferredTime: '09:00',
      })
      onClose()
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between border-b p-6 bg-background">
          <h2 className="text-2xl font-bold">Demander un devis</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isLoading}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Service Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Type de service</label>
            <input
              type="text"
              value={formData.serviceType}
              onChange={(e) =>
                setFormData({ ...formData, serviceType: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Titre du travail</label>
            <input
              type="text"
              placeholder="Ex: Installation robinetterie cuisine"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description détaillée</label>
            <textarea
              placeholder="Décrivez le travail que vous souhaitez faire effectuer..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={4}
              className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Localisation
            </label>
            <input
              type="text"
              placeholder="Ex: Tunis - Menzah"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Numéro de téléphone
              </label>
              <input
                type="tel"
                placeholder="+216 XX XXX XXX"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                required
                className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date préférée
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) =>
                  setFormData({ ...formData, preferredDate: e.target.value })
                }
                required
                className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Heure préférée
              </label>
              <input
                type="time"
                value={formData.preferredTime}
                onChange={(e) =>
                  setFormData({ ...formData, preferredTime: e.target.value })
                }
                required
                className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-transparent"
            >
              Annuler
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? 'Envoi en cours...' : 'Demander un devis'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
