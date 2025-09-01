import { useState, useEffect } from "react"
import { ExternalLink, Star, GitBranch, Calendar, Code } from "@phosphor-icons/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  status: 'En production' | 'En développement' | 'Alpha' | 'Beta'
  type: string
  github_url?: string
  demo_url?: string
  stars: number
  forks: number
  created_at: string
  image_url?: string
}

export function ProjectCards() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  // Données temporaires en attendant la connexion Supabase
  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'Clover Games',
      description: 'Serveur Minecraft communautaire avec des fonctionnalités avancées et une expérience de jeu personnalisée. Architecture scalable supportant des centaines de joueurs simultanés avec système de plugins personnalisés.',
      tech_stack: ['Java', 'MySQL', 'Redis', 'Docker', 'Kubernetes'],
      status: 'En production',
      type: 'Gaming',
      github_url: 'https://github.com/Kaysuto/clover-games',
      demo_url: 'https://clovergames.net',
      stars: 24,
      forks: 8,
      created_at: '2023-01-15T00:00:00Z',
      image_url: undefined
    },
    {
      id: '2',
      title: 'Jelly',
      description: 'Plateforme de streaming moderne avec interface élégante et performances optimisées. Streaming haute qualité avec gestion avancée du contenu, chat en temps réel et expérience utilisateur fluide.',
      tech_stack: ['React', 'Node.js', 'WebRTC', 'PostgreSQL', 'Socket.io'],
      status: 'En développement',
      type: 'Streaming',
      github_url: 'https://github.com/Kaysuto/jelly-streaming',
      demo_url: 'https://jelly-demo.vercel.app',
      stars: 15,
      forks: 5,
      created_at: '2023-08-20T00:00:00Z',
      image_url: undefined
    },
    {
      id: '3',
      title: 'Mirum Orbis',
      description: 'RPG 2D immersif avec monde ouvert et système de progression complexe. Graphismes soignés et gameplay innovant combinant exploration, combat stratégique et crafting avancé.',
      tech_stack: ['Unity', 'C#', 'SQLite', 'Photon', 'Spine2D'],
      status: 'Alpha',
      type: 'Game Dev',
      github_url: 'https://github.com/Kaysuto/mirum-orbis',
      stars: 31,
      forks: 12,
      created_at: '2022-11-10T00:00:00Z',
      image_url: undefined
    }
  ]

  useEffect(() => {
    // Simulation de la récupération des données depuis Supabase
    const fetchProjects = async () => {
      try {
        // TODO: Remplacer par l'appel Supabase réel
        // const { data, error } = await supabase
        //   .from('projects')
        //   .select('*')
        //   .order('created_at', { ascending: false })
        //   .limit(3)

        // Simulation d'un délai d'API
        setTimeout(() => {
          setProjects(mockProjects)
          setLoading(false)
        }, 1000)

      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error)
        setProjects(mockProjects) // Fallback vers les données mock
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En production':
        return 'bg-green-500'
      case 'En développement':
        return 'bg-yellow-500'
      case 'Alpha':
        return 'bg-blue-500'
      case 'Beta':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-8 h-96 bg-card border-2 border-border">
            <div className="animate-pulse">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-3">
                  <div className="h-6 bg-muted rounded-lg w-32"></div>
                  <div className="h-5 bg-muted rounded-full w-20"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-muted rounded-full"></div>
                  <div className="h-4 bg-muted rounded w-16"></div>
                </div>
              </div>
              <div className="space-y-3 mb-8">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-8 bg-muted rounded-lg w-16"></div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-border">
                <div className="h-10 bg-muted rounded-lg w-32"></div>
                <div className="flex space-x-4">
                  <div className="h-6 bg-muted rounded w-8"></div>
                  <div className="h-6 bg-muted rounded w-8"></div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {projects.map((project, index) => (
        <div key={project.id} className={`animate-scaleIn animate-delay-${(index + 1) * 100}`}>
          <Card className="group h-full bg-card border-2 border-border hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-700 hover:-translate-y-3 relative overflow-hidden backdrop-blur-sm">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1200"></div>
            
            <div className="p-8 h-full flex flex-col relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge 
                      variant="secondary" 
                      className="bg-accent/15 text-accent border-accent/30 text-sm font-medium group-hover:bg-accent/25 transition-colors duration-300 px-3 py-1"
                    >
                      {project.type}
                    </Badge>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(project.created_at)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full animate-pulse ${getStatusColor(project.status)}`}></div>
                  <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-8 flex-grow group-hover:text-foreground/80 transition-colors duration-300 line-clamp-4">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <Code size={16} className="mr-2 text-accent" />
                  <span className="text-sm font-medium text-muted-foreground">Technologies</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1.5 bg-muted/70 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent/20 hover:text-accent transition-all duration-200 cursor-default border border-transparent hover:border-accent/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-border group-hover:border-accent/50 transition-colors duration-300 mt-auto">
                <div className="flex gap-2">
                  {project.demo_url && (
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 group/btn font-medium"
                      onClick={() => window.open(project.demo_url, '_blank')}
                    >
                      <ExternalLink size={16} className="mr-2 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                      Demo
                    </Button>
                  )}
                  {project.github_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent px-4 py-2 group/btn font-medium"
                      onClick={() => window.open(project.github_url, '_blank')}
                    >
                      <Code size={16} className="mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
                      Code
                    </Button>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center space-x-1.5 hover:text-accent transition-colors duration-200">
                    <Star size={16} />
                    <span className="text-sm font-medium">{project.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 hover:text-accent transition-colors duration-200">
                    <GitBranch size={16} />
                    <span className="text-sm font-medium">{project.forks}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}