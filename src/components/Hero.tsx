
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Code, Cloud, Database } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = [
    "Software Engineer",
    "DevOps Enthusiast", 
    "Cloud Computing Specialist",
    "System Architect"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Code className="absolute top-1/4 left-1/4 w-6 h-6 text-primary/20 animate-bounce delay-300" />
        <Cloud className="absolute top-1/3 right-1/4 w-5 h-5 text-blue-500/20 animate-bounce delay-700" />
        <Database className="absolute bottom-1/3 left-1/3 w-4 h-4 text-green-500/20 animate-bounce delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className={`flex-shrink-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative group">
              <Avatar className="w-48 h-48 lg:w-64 lg:h-64 ring-4 ring-primary/10 transition-all duration-300 group-hover:ring-primary/30 group-hover:scale-105">
                <AvatarImage 
                  src="https://media.licdn.com/dms/image/v2/D4D03AQHF0N9FWLh_UA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1672424593087?e=1755734400&v=beta&t=k5GPitXqeM6C9n57L-hqqajOyYsHUx-_yExf1Q6ZX5o" 
                  alt="Mohamed IBRAHIMI"
                />
                <AvatarFallback>MI</AvatarFallback>
              </Avatar>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            </div>
          </div>
          
          <div className={`flex-1 text-center lg:text-left transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-600 to-green-600 bg-clip-text text-transparent">
              Mohamed IBRAHIMI
            </h1>
            
            <div className="h-16 mb-6">
              <h2 className="text-xl lg:text-2xl text-muted-foreground mb-2">
                Génie Informatique - École Mohammadia d'Ingénieurs
              </h2>
              <div className="text-lg lg:text-xl font-medium text-primary/80 transition-all duration-500">
                {roles[currentRole]}
              </div>
            </div>
            
            <p className="text-lg mb-8 max-w-3xl leading-relaxed text-muted-foreground">
              Élève ingénieur en informatique passionné par le développement logiciel et le cloud computing, 
              je me spécialise dans les pratiques DevOps, l'automatisation des pipelines CI/CD et les technologies cloud. 
              J'ai conçu et mis en œuvre un pipeline CI/CD entièrement automatisé sur AWS, intégrant Jenkins, 
              Kubernetes et Terraform (Infrastructure as Code), afin d'assurer des déploiements fiables, 
              reproductibles et sécurisés.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button asChild className="group hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                <a href="mailto:ibrahimimohamed2108@gmail.com">
                  <Mail className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  Contact Me
                </a>
              </Button>
              <Button variant="outline" asChild className="group hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary/40">
                <a href="https://www.linkedin.com/in/ibrahimimohamed" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4 group-hover:text-blue-600 transition-colors" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild className="group hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary/40">
                <a href="https://github.com/ibrahimimohamed2108" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4 group-hover:text-gray-800 dark:group-hover:text-white transition-colors" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
