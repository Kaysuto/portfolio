import { useState, useEffect } from "react"
import { ArrowSquareOut, Star, GitBranch, Calendar, Code } from "@phosphor-icons/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProjects } from "@/lib/supabase"

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  status: 'En production' | 'En développement' | 'Alpha' | 'Beta';
  type: string;
  github_url?: string;
  demo_url?: string;
  stars: number;
  forks: number;
  created_at: string;
  image_url?: string;
}

export function ProjectCards() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getProjects()
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data)
        } else {
          setProjects([])
        }
      })
      .catch(() => {
        setProjects([])
      })
      .finally(() => setLoading(false))
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
      month: 'long',
    })
  }

  const projectsToRender = Array.isArray(projects) ? projects : []

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {projectsToRender.length > 0 ? (
          projectsToRender.map((project, index) => (
            <div
              key={project.id}
              className={`animate-fadeIn animate-delay-${index * 100 + 200}`}
            >
              <Card className="group h-full bg-card border-2 border-border hover:border-accent/50 hover:shadow-xl hover:shadow-accent/20 transition-all duration-500 relative overflow-hidden hover:scale-105">
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
                      {Array.isArray(project.tech_stack) && project.tech_stack.length > 0 ? (
                        project.tech_stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 bg-muted/70 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent/20 hover:text-accent transition-all duration-200 cursor-default border border-transparent hover:border-accent/30"
                          >
                            {tech}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">Aucune technologie renseignée</span>
                      )}
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
                          <ArrowSquareOut size={16} className="mr-2 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
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
          ))
        ) : (
          <div className="col-span-3 text-center text-muted-foreground py-12">
            Aucun projet à afficher.
          </div>
        )}
      </div>
    </div>
  )
}