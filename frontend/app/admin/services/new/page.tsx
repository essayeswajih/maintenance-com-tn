'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'
import { apiFetch } from '@/lib/api'
import { ServiceCategory, Service } from '@/lib/types'

export default function NewServicePage() {
    const router = useRouter()
    const [categories, setCategories] = useState<ServiceCategory[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState<Partial<Service>>({
        name: '',
        description: '',
        slug: '',
        price: 0,
        price_unit: 'DT/heure',
        disponiblity: '7j/7, 24h/24',
        moyDuration: 1,
        category_id: 0,
        features: [],
        process: [],
        image_url: '',
        rating: 5,
        num_ratings: 1,
    })

    // State for new feature/step
    const [newFeature, setNewFeature] = useState('')
    const [newStep, setNewStep] = useState({ title: '', description: '' })

    useEffect(() => {
        apiFetch<ServiceCategory[]>('/service/categories/')
            .then(data => {
                setCategories(data || [])
                if (data && data.length > 0) {
                    setFormData(prev => ({ ...prev, category_id: data[0].id }))
                }
            })
            .catch(err => console.error('Failed to fetch service categories:', err))
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }))
    }

    const addFeature = () => {
        if (!newFeature.trim()) return
        setFormData(prev => ({
            ...prev,
            features: [...(prev.features || []), newFeature.trim()]
        }))
        setNewFeature('')
    }

    const removeFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features?.filter((_, i) => i !== index)
        }))
    }

    const addStep = () => {
        if (!newStep.title.trim()) return
        const nextStepNum = (formData.process?.length || 0) + 1
        setFormData(prev => ({
            ...prev,
            process: [...(prev.process || []), { step: nextStepNum, ...newStep }]
        }))
        setNewStep({ title: '', description: '' })
    }

    const removeStep = (index: number) => {
        setFormData(prev => ({
            ...prev,
            process: prev.process?.filter((_, i) => i !== index).map((s, i) => ({ ...s, step: i + 1 }))
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const submissionData = {
            ...formData,
            slug: formData.slug || formData.name?.toLowerCase().replace(/ /g, '-')
        }

        try {
            await apiFetch('/service/', {
                method: 'POST',
                body: JSON.stringify(submissionData)
            })
            router.push('/admin/services')
        } catch (err) {
            console.error('Failed to create service:', err)
            alert('Erreur lors de la création du service')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <Link href="/admin/services" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 w-fit">
                    <ArrowLeft className="w-4 h-4" />
                    Retour à la liste
                </Link>
                <h1 className="text-3xl font-bold">Nouveau Service</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">Nom du service</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Prix de base</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Unité de prix</label>
                                    <input
                                        type="text"
                                        name="price_unit"
                                        value={formData.price_unit}
                                        onChange={handleChange}
                                        placeholder="ex: DT/heure"
                                        className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Disponibilité</label>
                                    <input
                                        type="text"
                                        name="disponiblity"
                                        value={formData.disponiblity}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Durée moyenne (heures)</label>
                                    <input
                                        type="number"
                                        name="moyDuration"
                                        value={formData.moyDuration}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">Catégorie</label>
                                    <select
                                        name="category_id"
                                        value={formData.category_id}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Dynamic Sections */}
                            <div className="space-y-4 pt-4 border-t">
                                <h3 className="text-lg font-semibold">Caractéristiques (Points forts)</h3>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newFeature}
                                        onChange={(e) => setNewFeature(e.target.value)}
                                        placeholder="Ajouter une caractéristique..."
                                        className="flex-1 px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <Button type="button" variant="outline" onClick={addFeature} className="bg-transparent">
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <ul className="space-y-2">
                                    {formData.features?.map((f, i) => (
                                        <li key={i} className="flex items-center justify-between bg-muted/50 p-2 rounded-lg pl-4">
                                            <span>{f}</span>
                                            <Button type="button" variant="ghost" size="sm" onClick={() => removeFeature(i)} className="text-red-500 hover:text-red-700 bg-transparent">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-4 pt-4 border-t">
                                <h3 className="text-lg font-semibold">Étapes du processus</h3>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={newStep.title}
                                        onChange={(e) => setNewStep(prev => ({ ...prev, title: e.target.value }))}
                                        placeholder="Titre de l'étape"
                                        className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <div className="flex gap-2">
                                        <textarea
                                            value={newStep.description}
                                            onChange={(e) => setNewStep(prev => ({ ...prev, description: e.target.value }))}
                                            placeholder="Description de l'étape"
                                            className="flex-1 px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        <Button type="button" variant="outline" onClick={addStep} className="h-auto bg-transparent">
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {formData.process?.map((s, i) => (
                                        <div key={i} className="bg-muted/50 p-4 rounded-lg relative">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                                    {s.step}
                                                </span>
                                                <h4 className="font-semibold">{s.title}</h4>
                                            </div>
                                            <p className="text-sm text-muted-foreground ml-9">{s.description}</p>
                                            <Button type="button" variant="ghost" size="sm" onClick={() => removeStep(i)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-transparent">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6 border-t">
                                <Button type="submit" className="gap-2" disabled={isLoading}>
                                    <Save className="w-4 h-4" />
                                    {isLoading ? 'Enregistrement...' : 'Enregistrer le service'}
                                </Button>
                                <Link href="/admin/services">
                                    <Button variant="outline" type="button" className="bg-transparent">
                                        Annuler
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card className="p-6 sticky top-6">
                        <h3 className="text-lg font-semibold mb-4">Aide au paramétrage</h3>
                        <div className="space-y-4 text-sm text-muted-foreground">
                            <p>
                                <strong>Slug:</strong> Identifiant unique pour l'URL. Si vide, il sera généré à partir du nom.
                            </p>
                            <p>
                                <strong>Unité de prix:</strong> Définit comment le client est facturé (ex: par heure, par forfait).
                            </p>
                            <p>
                                <strong>Processus:</strong> Détaillez les étapes de l'intervention pour rassurer le client.
                            </p>
                            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                                <p className="text-primary font-medium mb-1">Conseil Pro</p>
                                Ajoutez au moins 3 caractéristiques pour améliorer la conversion.
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
