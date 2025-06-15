
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Briefcase, CheckCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const Experience = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const achievements = [
    "Déploiement et configuration des solutions GLPI (ITSM), Mercator (SIEM & cartographie SI) et OpenProject (gestion de projet agile)",
    "Mise en place d'une infrastructure virtualisée",
    "Gestion des bases de données MySQL (création des schémas, gestion des privilèges, optimisation des requêtes)",
    "Intégration de l'authentification centralisée avec LDAP et Active Directory",
    "Optimisation des performances des applications via Apache2, PHP et configurations spécifiques",
    "Rédaction de guides d'utilisation détaillés pour chaque solution déployée",
    "Présentation et démonstration des outils et solutions auprès des équipes IT et métiers"
  ];

  return (
    <section id="experience" className="py-16 bg-gradient-to-b from-background to-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className={`mb-8 group hover:shadow-xl transition-all duration-500 border-l-4 border-l-primary/20 hover:border-l-primary ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <CardHeader className="relative">
              <div className="absolute -left-3 top-6 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg"></div>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Stagiaire en Urbanisation des Systèmes d'Information
                  </CardTitle>
                  <CardDescription className="text-lg font-medium text-muted-foreground">
                    Trésorerie Générale du Royaume
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                    <Calendar className="h-4 w-4 text-primary" />
                    July 2024 (1 month)
                  </div>
                  <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-full">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    Rabat, Maroc
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pl-8">
              <div className="relative">
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  Au sein de la Trésorerie Générale du Royaume, j'ai participé à l'urbanisation du SI, 
                  visant à structurer et optimiser l'architecture des systèmes informatiques pour une meilleure 
                  interopérabilité et gestion des ressources IT.
                </p>
                
                <h4 className="font-semibold mb-4 text-primary flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Missions réalisées :
                </h4>
                <div className="grid gap-3">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm leading-relaxed">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Experience;
