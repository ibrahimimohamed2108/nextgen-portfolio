
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, ShoppingCart, Utensils, ExternalLink, Github } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";

const Projects = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { t } = useLanguage();

  const projects = [
    {
      id: 'cicd',
      icon: Cloud,
      color: 'from-orange-500 to-red-600',
      skills: ['Jenkins', 'Kubernetes', 'Terraform', 'AWS', 'CI/CD', 'DevOps'],
      githubUrl: 'https://github.com/ibrahimimohamed2108/erp-clone'
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600',
      skills: ['Angular', 'Firebase', 'TypeScript', 'Web Development'],
      githubUrl: 'https://github.com/ibrahimimohamed2108/angEcom1'
    },
    {
      id: 'restaurant',
      icon: Utensils,
      color: 'from-green-500 to-emerald-600',
      skills: ['C Programming', 'System Design', 'Database Management'],
      githubUrl: 'https://github.com/ibrahimimohamed2108/ProjetRestau_C'
    }
  ];

  return (
    <section 
      ref={ref} 
      id="projects"
      className="relative w-full py-20 bg-gradient-to-b from-muted/30 to-background overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {t('projects.title')}
          </h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">{t('projects.description')}</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <Card 
                  key={project.id}
                  className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 hover:scale-[1.02] bg-card/95 backdrop-blur-sm ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ 
                    transitionDelay: `${index * 200}ms`,
                    zIndex: 10
                  }}
                >
                  <CardHeader className={`bg-gradient-to-br ${project.color} text-white relative p-6`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10">
                      <IconComponent className="h-8 w-8 mb-3" />
                      <CardTitle className="text-xl font-bold mb-2">
                        {t(`projects.${project.id}.title`)}
                      </CardTitle>
                      <CardDescription className="text-white/90 text-sm">
                        {t(`projects.${project.id}.description`)}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 bg-card">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide">
                          {t('projects.technologies')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.skills.map((skill, skillIndex) => (
                            <Badge 
                              key={skill} 
                              variant="outline" 
                              className={`text-xs hover:scale-105 transition-all duration-300 group-hover:border-primary/40 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                              style={{ transitionDelay: `${(index * 200) + (skillIndex * 50)}ms` }}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-muted">
                        <p className="text-sm text-muted-foreground mb-4">
                          {t(`projects.${project.id}.details`)}
                        </p>
                        
                        <div className="flex gap-2">
                          <button 
                            onClick={() => window.open(project.githubUrl, '_blank')}
                            className="flex items-center gap-2 text-xs px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {t('projects.viewProject')}
                          </button>
                          <button 
                            onClick={() => window.open(project.githubUrl, '_blank')}
                            className="flex items-center gap-2 text-xs px-3 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
                          >
                            <Github className="h-3 w-3" />
                            {t('projects.sourceCode')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
