
import { ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HeroScrollIndicator = () => {
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    console.log(`Attempting to scroll to section: ${sectionId} - Debug log`);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      toast({
        title: "Navigating",
        description: `Scrolling to ${sectionId} section`,
      });
      console.log(`Successfully scrolling to section: ${sectionId}`);
    } else {
      console.error(`Section with id '${sectionId}' not found`);
      toast({
        title: "Navigation Error",
        description: "Section not found",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-auto">
      <ChevronDown 
        className="h-6 w-6 text-muted-foreground cursor-pointer hover:text-primary transition-colors relative z-50 pointer-events-auto"
        onClick={() => scrollToSection('experience')}
      />
    </div>
  );
};

export default HeroScrollIndicator;
