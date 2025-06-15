
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  return (
    <section id="about" className="pt-24 pb-16 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-shrink-0">
            <Avatar className="w-48 h-48 lg:w-64 lg:h-64">
              <AvatarImage 
                src="https://media.licdn.com/dms/image/v2/D4D03AQHF0N9FWLh_UA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1672424593087?e=1755734400&v=beta&t=k5GPitXqeM6C9n57L-hqqajOyYsHUx-_yExf1Q6ZX5o" 
                alt="Mohamed IBRAHIMI"
              />
              <AvatarFallback>MI</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Mohamed IBRAHIMI</h1>
            <h2 className="text-xl lg:text-2xl text-muted-foreground mb-6">
              Génie Informatique - École Mohammadia d'Ingénieurs
            </h2>
            <p className="text-lg mb-8 max-w-3xl">
              Élève ingénieur en informatique passionné par le développement logiciel et le cloud computing, 
              je me spécialise dans les pratiques DevOps, l'automatisation des pipelines CI/CD et les technologies cloud. 
              J'ai conçu et mis en œuvre un pipeline CI/CD entièrement automatisé sur AWS, intégrant Jenkins, 
              Kubernetes et Terraform (Infrastructure as Code), afin d'assurer des déploiements fiables, 
              reproductibles et sécurisés.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button asChild>
                <a href="mailto:ibrahimimohamed2108@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://www.linkedin.com/in/ibrahimimohamed" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/ibrahimimohamed2108" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
