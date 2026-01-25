'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, User, Clock, ArrowLeft, Share2, Heart } from 'lucide-react'
import { useState } from 'react'

const articles = {
  'maintenir-plomberie': {
    id: 1,
    title: 'Conseils pour maintenir votre système de plomberie',
    excerpt: 'Apprenez les meilleures pratiques pour entretenir votre système de plomberie et éviter les problèmes coûteux.',
    category: 'Plomberie',
    author: 'Ahmed Hassan',
    date: '20 Jan 2024',
    readTime: '8 min',
    image: '🚰',
    content: `
      <h2>Introduction</h2>
      <p>Votre système de plomberie est l'une des parties les plus importantes de votre maison. Un entretien régulier peut vous aider à éviter des réparations coûteuses et des urgences plomberie.</p>

      <h2>1. Nettoyez régulièrement vos tuyaux</h2>
      <p>Les accumulations de débris, de cheveux et de savon peuvent bloquer vos tuyaux. Nettoyez régulièrement vos drains en utilisant une brosse ou un nettoyant naturel. Versez de l'eau chaude régulièrement pour maintenir vos tuyaux libres.</p>

      <h2>2. Vérifiez les fuites d'eau</h2>
      <p>Les fuites mineures peuvent devenir de gros problèmes rapidement. Vérifiez régulièrement vos robinets, tuyaux et joints pour détecter tout signe de fuite. Écoutez les gouttes d'eau et recherchez des taches d'humidité.</p>

      <h2>3. Entretenez votre chauffe-eau</h2>
      <p>Vidangez votre chauffe-eau une fois par an pour éliminer les sédiments. Cela améliorera son efficacité et prolongera sa durée de vie.</p>

      <h2>4. Évitez les bouchons</h2>
      <p>Ne versez pas de graisses ou d'huiles dans vos drains. Utilisez des tamis pour retenir les débris. Ces petites actions peuvent prévenir les bouchons coûteux.</p>

      <h2>5. Faites une inspection professionnelle</h2>
      <p>Une inspection annuelle par un plombier professionnel peut identifier les problèmes avant qu'ils deviennent graves. C'est un investissement qui peut vous faire économiser de l'argent à long terme.</p>

      <h2>Conclusion</h2>
      <p>L'entretien régulier de votre système de plomberie est essentiel pour prévenir les problèmes coûteux et garder votre maison en bon état. En suivant ces conseils, vous pouvez prolonger la durée de vie de votre plomberie et économiser de l'argent.</p>
    `,
  },
  'normes-electricite': {
    id: 2,
    title: 'Installation électrique: les normes de sécurité à respecter',
    excerpt: 'Découvrez les normes de sécurité essentielles pour l\'installation électrique dans votre maison.',
    category: 'Électricité',
    author: 'Fatima Ben',
    date: '18 Jan 2024',
    readTime: '10 min',
    image: '⚡',
    content: `
      <h2>Introduction</h2>
      <p>La sécurité électrique est primordiale dans votre maison. Les normes électriques existent pour vous protéger, vous et votre famille, contre les risques d'incendie et de choc électrique.</p>

      <h2>Normes de base</h2>
      <p>Les installations électriques doivent respecter les normes tunisiennes et internationales. Ces normes couvrent tout, de la taille des fils à la mise à la terre des appareils.</p>

      <h2>Disjoncteurs différentiels</h2>
      <p>Chaque circuit doit être protégé par un disjoncteur approprié. Les disjoncteurs différentiels (DDR) détectent les fuites de courant et coupent le circuit automatiquement.</p>

      <h2>Prise de terre</h2>
      <p>Une prise de terre correcte est essentielle pour la sécurité. Elle dirige les courants de fuite loin de vous et de votre maison.</p>

      <h2>Fils et câbles</h2>
      <p>La taille des fils doit être appropriée à l'ampérage du circuit. Des fils trop petits peuvent surchauffer et causer un incendie.</p>

      <h2>Installation professionnelle</h2>
      <p>Pour toute installation ou modification électrique importante, faites appel à un électricien certifié. Ils connaissent les normes et garantissent votre sécurité.</p>

      <h2>Conclusion</h2>
      <p>Respecter les normes de sécurité électrique n'est pas facultatif - c'est essentiel pour la protection de votre maison et de votre famille.</p>
    `,
  },
  'economiser-chauffage': {
    id: 3,
    title: 'Économiser l\'énergie: optimisez votre système de chauffage',
    excerpt: 'Des conseils pratiques pour réduire votre consommation d\'énergie en optimisant votre système de chauffage.',
    category: 'Chauffage',
    author: 'Mohamed Ali',
    date: '15 Jan 2024',
    readTime: '7 min',
    image: '🔥',
    content: `
      <h2>Introduction</h2>
      <p>Le chauffage représente une part importante de vos factures d'énergie. En optimisant votre système et vos habitudes, vous pouvez réaliser des économies importantes.</p>

      <h2>Programmez votre thermostat</h2>
      <p>Utilisez un thermostat programmable pour ajuster la température selon votre horaire. Baissez la température quand vous êtes absent et la nuit.</p>

      <h2>Isolez votre maison</h2>
      <p>Une bonne isolation réduit les pertes de chaleur. Vérifiez vos portes, fenêtres et combles. L'isolation est un investissement qui se rentabilise rapidement.</p>

      <h2>Entretenez votre système</h2>
      <p>Un système bien entretenu fonctionne plus efficacement. Nettoyez ou remplacez régulièrement les filtres, et faites une révision annuelle.</p>

      <h2>Utilisez le chauffage intelligemment</h2>
      <p>Portez des vêtements chauds et utilisez des couvertures. Fermez les portes des pièces inutilisées. Ces petits gestes font une grande différence.</p>

      <h2>Envisagez un thermostat intelligent</h2>
      <p>Les thermostats intelligents apprennent vos habitudes et optimisent automatiquement la température. Certains peuvent vous faire économiser jusqu'à 15% sur le chauffage.</p>

      <h2>Conclusion</h2>
      <p>Optimiser votre chauffage est bon pour votre portefeuille et pour l'environnement. Commencez dès aujourd'hui et voyez les économies.</p>
    `,
  },
  'remplacer-chaudiere': {
    id: 4,
    title: 'Quand faut-il remplacer votre chaudière?',
    excerpt: 'Signes d\'alerte et critères pour déterminer si votre chaudière doit être remplacée.',
    category: 'Chaudières',
    author: 'Ahmed Hassan',
    date: '12 Jan 2024',
    readTime: '6 min',
    image: '🔧',
    content: `
      <h2>Signes que votre chaudière doit être remplacée</h2>
      <p>Une chaudière dure généralement 15 à 20 ans. Voici les signes qu'il est temps de la remplacer.</p>

      <h2>L'âge</h2>
      <p>Si votre chaudière a plus de 15 ans, pensez à la remplacer. Les modèles plus anciens sont moins efficaces et plus coûteux à exploiter.</p>

      <h2>Réparations fréquentes</h2>
      <p>Si vous réparez votre chaudière plus d'une fois par an, le coût des réparations dépasse rapidement celui d'un remplacement.</p>

      <h2>Bruits étranges</h2>
      <p>Des bruits de cliquetis, de clic ou de grondement indiquent un problème. Faites inspecter votre chaudière par un professionnel.</p>

      <h2>Fuites d'eau</h2>
      <p>Toute fuite d'eau autour de la chaudière est un signe que le remplacement est nécessaire.</p>

      <h2>Inefficacité énergétique</h2>
      <p>Une augmentation de vos factures de chauffage peut indiquer que votre chaudière devient inefficace.</p>

      <h2>Conclusion</h2>
      <p>Remplacer une vieille chaudière par un modèle moderne peut réduire votre consommation d'énergie et améliorer votre confort.</p>
    `,
  },
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug as keyof typeof articles]
  const [isLiked, setIsLiked] = useState(false)

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
        <p className="text-muted-foreground mb-6">Désolé, cet article n'existe pas.</p>
        <Link href="/blog">
          <Button>Retour au blog</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <section className="py-8 bg-muted/50 border-b">
        <div className="container mx-auto px-4">
          <Link href="/blog" className="flex items-center gap-2 text-primary hover:underline mb-4">
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
              {article.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground text-sm flex-wrap">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Image */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-20 text-9xl flex items-center justify-center mb-8">
              {article.image}
            </div>

            {/* Article Text */}
            <Card className="p-8 prose prose-sm dark:prose-invert max-w-none">
              <div
                className="space-y-4 text-foreground"
                dangerouslySetInnerHTML={{
                  __html: article.content
                    .replace(/<h2>/g, '<h2 class="text-2xl font-bold mt-6 mb-4">')
                    .replace(/<p>/g, '<p class="text-base leading-relaxed mb-4">')
                    .replace(/<\/p>/g, '</p>')
                    .replace(/<\/h2>/g, '</h2>'),
                }}
              />
            </Card>

            {/* Share and Like */}
            <div className="flex gap-4 mt-8">
              <Button
                variant="outline"
                className={`gap-2 flex-1 ${isLiked ? 'bg-red-50 dark:bg-red-950' : ''}`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                {isLiked ? 'J\'aime' : 'Aimer'}
              </Button>
              <Button variant="outline" className="gap-2 flex-1 bg-transparent">
                <Share2 className="w-5 h-5" />
                Partager
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Info */}
            <Card className="p-6 mb-6">
              <h3 className="font-semibold mb-4">À propos de l'auteur</h3>
              <div className="text-center">
                <div className="text-5xl mb-3">👤</div>
                <h4 className="font-semibold mb-2">{article.author}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Expert en {article.category.toLowerCase()} avec plus de 10 ans d'expérience.
                </p>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  Voir plus d'articles
                </Button>
              </div>
            </Card>

            {/* Related Articles */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Articles similaires</h3>
              <div className="space-y-4">
                {Object.entries(articles)
                  .filter(([slug, art]) => art.category === article.category && slug !== params.slug)
                  .slice(0, 3)
                  .map(([slug, art]) => (
                    <Link key={slug} href={`/blog/${slug}`} className="block">
                      <div className="hover:bg-muted p-3 rounded transition-colors">
                        <p className="font-medium text-sm line-clamp-2 hover:text-primary">
                          {art.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{art.date}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
