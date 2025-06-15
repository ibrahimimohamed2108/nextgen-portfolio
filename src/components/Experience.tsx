
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

const Experience = () => {
  return (
    <section id="experience" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>
        
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                <div>
                  <CardTitle className="text-xl">Stagiaire en Urbanisation des Systèmes d'Information</CardTitle>
                  <CardDescription className="text-lg font-medium">Trésorerie Générale du Royaume</CardDescription>
                </div>
                <div className="flex flex-col text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    July 2024 (1 month)
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Rabat, Maroc
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Au sein de la Trésorerie Générale du Royaume, j'ai participé à l'urbanisation du SI, 
                visant à structurer et optimiser l'architecture des systèmes informatiques pour une meilleure 
                interopérabilité et gestion des ressources IT.
              </p>
              
              <h4 className="font-semibold mb-3">Missions réalisées :</h4>
              <ul className="space-y-2 text-sm">
                <li>• Déploiement et configuration des solutions GLPI (ITSM), Mercator (SIEM & cartographie SI) et OpenProject (gestion de projet agile)</li>
                <li>• Mise en place d'une infrastructure virtualisée</li>
                <li>• Gestion des bases de données MySQL (création des schémas, gestion des privilèges, optimisation des requêtes)</li>
                <li>• Intégration de l'authentification centralisée avec LDAP et Active Directory</li>
                <li>• Optimisation des performances des applications via Apache2, PHP et configurations spécifiques</li>
                <li>• Rédaction de guides d'utilisation détaillés pour chaque solution déployée</li>
                <li>• Présentation et démonstration des outils et solutions auprès des équipes IT et métiers</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Experience;
