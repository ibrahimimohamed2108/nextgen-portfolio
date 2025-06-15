
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, MapPin, Send, Phone } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { toast } = useToast();

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "ibrahimimoahamed2108@gmail.com",
      href: "mailto:ibrahimimoahamed2108@gmail.com",
      color: "from-red-500 to-pink-600",
      description: "Drop me a line anytime"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/ibrahimimohamed",
      href: "https://www.linkedin.com/in/ibrahimimohamed",
      color: "from-blue-600 to-blue-700",
      description: "Let's connect professionally"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/ibrahimimohamed2108",
      href: "https://github.com/ibrahimimohamed2108",
      color: "from-gray-700 to-gray-900",
      description: "Check out my projects"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Rabat, Rabat-Salé-Kénitra, Morocco",
      href: null,
      color: "from-green-500 to-emerald-600",
      description: "Based in Morocco"
    }
  ];

  const handleContactClick = (method: typeof contactMethods[0]) => {
    if (method.href) {
      try {
        if (method.href.startsWith('mailto:')) {
          window.location.href = method.href;
        } else {
          window.open(method.href, '_blank', 'noopener,noreferrer');
        }
        toast({
          title: `Opening ${method.label}`,
          description: method.description,
        });
        console.log(`Clicked on ${method.label}: ${method.href}`);
      } catch (error) {
        console.error(`Error opening ${method.label}:`, error);
        toast({
          title: "Error",
          description: `Unable to open ${method.label}. Please try again.`,
          variant: "destructive"
        });
      }
    } else {
      // For location, copy to clipboard
      navigator.clipboard?.writeText(method.value).then(() => {
        toast({
          title: "Location copied",
          description: "Address copied to clipboard",
        });
      }).catch(() => {
        toast({
          title: "Location",
          description: method.value,
        });
      });
    }
  };

  const handleEmailButtonClick = () => {
    try {
      window.location.href = 'mailto:ibrahimimoahamed2108@gmail.com';
      toast({
        title: "Opening Email",
        description: "Launching your email client",
      });
      console.log('Opening email client');
    } catch (error) {
      console.error('Error opening email:', error);
      // Fallback: copy email to clipboard
      navigator.clipboard?.writeText('ibrahimimoahamed2108@gmail.com').then(() => {
        toast({
          title: "Email copied",
          description: "Email address copied to clipboard",
        });
      });
    }
  };

  const handleLinkedInButtonClick = () => {
    try {
      window.open('https://www.linkedin.com/in/ibrahimimohamed', '_blank', 'noopener,noreferrer');
      toast({
        title: "Opening LinkedIn",
        description: "Redirecting to LinkedIn profile",
      });
      console.log('Opening LinkedIn profile');
    } catch (error) {
      console.error('Error opening LinkedIn:', error);
      toast({
        title: "Error",
        description: "Unable to open LinkedIn. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-background to-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Let's Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Ready to start a conversation? I'm always open to discussing new opportunities, 
            innovative projects, or just having a chat about technology.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              
              return (
                <Card 
                  key={method.label}
                  className={`group hover:shadow-xl transition-all duration-500 border-0 overflow-hidden cursor-pointer ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onClick={() => handleContactClick(method)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleContactClick(method);
                    }
                  }}
                  aria-label={`Contact via ${method.label}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${method.color} group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                          {method.label}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">{method.description}</p>
                        <p className="text-sm text-muted-foreground break-all">
                          {method.value}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className={`text-center transition-all duration-1000 delay-600 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="border-0 bg-gradient-to-br from-primary/5 to-blue-500/5 p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3">Ready to Start a Project?</h3>
                  <p className="text-muted-foreground">
                    Whether you have a project in mind or just want to chat about technology, 
                    I'd love to hear from you.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 hover:scale-105 transition-all duration-300"
                    onClick={handleEmailButtonClick}
                  >
                    <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    Send Email
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="group hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary/40"
                    onClick={handleLinkedInButtonClick}
                  >
                    <Linkedin className="mr-2 h-5 w-5 group-hover:text-blue-600 transition-colors" />
                    Connect on LinkedIn
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
