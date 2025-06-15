
import { Button } from "@/components/ui/button";
import { Download, Mail, Github, Linkedin, ChevronDown } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";
import { ParticleBackground } from "@/components/ParticleBackground";

const Hero = () => {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const { t, language } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadCV = () => {
    // Create different CV versions based on language
    const cvUrl = language === 'fr' ? '/cv-mohamed-ibrahimi-fr.pdf' : '/cv-mohamed-ibrahimi-en.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = `Mohamed_IBRAHIMI_CV_${language.toUpperCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5" ref={ref}>
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Modern Professional Profile Image */}
          <div className={`relative group transition-all duration-1000 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative">
              {/* Modern geometric frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-blue-500/10 to-primary/20 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/20 via-primary/10 to-blue-500/20 rounded-2xl transform -rotate-6 group-hover:-rotate-12 transition-transform duration-700"></div>
              
              {/* Clean professional image container */}
              <div className="relative bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <img 
                  src="/lovable-uploads/03afd6d9-cfb1-458d-9190-2d0547094144.png"
                  alt="Mohamed IBRAHIMI"
                  className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-xl object-cover grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                
                {/* Subtle overlay for depth */}
                <div className="absolute inset-3 rounded-xl bg-gradient-to-tr from-transparent via-transparent to-primary/5 group-hover:to-primary/10 transition-all duration-500"></div>
              </div>
              
              {/* Modern accent elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-80 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full opacity-60 group-hover:scale-125 transition-transform duration-300" style={{ animationDelay: '0.1s' }}></div>
            </div>
          </div>

          {/* Content */}
          <div className={`flex-1 text-center lg:text-left transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-6">
              <div className={`transition-all duration-700 ${language === 'fr' ? 'animate-fade-in' : 'animate-fade-in'}`}>
                <p className="text-lg text-muted-foreground mb-2 animate-fade-in">
                  {t('hero.greeting')}
                </p>
                <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">
                    Mohamed IBRAHIMI
                  </span>
                </h1>
                <h2 className="text-2xl lg:text-3xl font-semibold text-muted-foreground mb-2">
                  {t('hero.title')}
                </h2>
                <p className="text-xl text-primary font-medium">
                  {t('hero.subtitle')}
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {t('hero.description')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={downloadCV}
                  className="group bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  {t('hero.downloadCV')}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollToSection('contact')}
                  className="group border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105"
                >
                  <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  {t('hero.contactMe')}
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 justify-center lg:justify-start">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                  onClick={() => window.open('https://github.com/mohamedibrahimi', '_blank')}
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                  onClick={() => window.open('https://linkedin.com/in/mohamedibrahimi', '_blank')}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                  onClick={() => scrollToSection('contact')}
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown 
            className="h-6 w-6 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
            onClick={() => scrollToSection('experience')}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
