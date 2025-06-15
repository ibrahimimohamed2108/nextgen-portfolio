
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HeroSocialLinks = () => {
  const { toast } = useToast();

  const handleGitHubClick = () => {
    console.log('GitHub icon clicked - Debug log');
    try {
      window.open('https://github.com/ibrahimimohamed2108', '_blank', 'noopener,noreferrer');
      toast({
        title: "Opening GitHub",
        description: "Redirecting to GitHub profile",
      });
      console.log('Opening GitHub profile');
    } catch (error) {
      console.error('Error opening GitHub:', error);
      toast({
        title: "Error",
        description: "Unable to open GitHub",
        variant: "destructive"
      });
    }
  };

  const handleLinkedInClick = () => {
    console.log('LinkedIn icon clicked - Debug log');
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
        description: "Unable to open LinkedIn",
        variant: "destructive"
      });
    }
  };

  const handleEmailClick = () => {
    console.log('Email icon clicked - Debug log');
    try {
      window.location.href = 'mailto:ibrahimimoahamed2108@gmail.com';
      toast({
        title: "Opening Email",
        description: "Launching email client",
      });
      console.log('Opening email client');
    } catch (error) {
      console.error('Error opening email:', error);
      toast({
        title: "Email Error",
        description: "Unable to open email client",
        variant: "destructive"
      });
      // Fallback: copy email to clipboard
      navigator.clipboard?.writeText('ibrahimimoahamed2108@gmail.com').then(() => {
        toast({
          title: "Email Copied",
          description: "Email address copied to clipboard",
        });
      });
    }
  };

  return (
    <div className="flex gap-4 justify-center lg:justify-start pointer-events-auto">
      <Button 
        size="icon" 
        variant="ghost" 
        className="hover:bg-primary/10 hover:scale-110 transition-all duration-300 relative z-50 cursor-pointer pointer-events-auto"
        onClick={handleGitHubClick}
        aria-label="Visit GitHub Profile"
        type="button"
      >
        <Github className="h-5 w-5" />
      </Button>
      <Button 
        size="icon" 
        variant="ghost" 
        className="hover:bg-primary/10 hover:scale-110 transition-all duration-300 relative z-50 cursor-pointer pointer-events-auto"
        onClick={handleLinkedInClick}
        aria-label="Visit LinkedIn Profile"
        type="button"
      >
        <Linkedin className="h-5 w-5" />
      </Button>
      <Button 
        size="icon" 
        variant="ghost" 
        className="hover:bg-primary/10 hover:scale-110 transition-all duration-300 relative z-50 cursor-pointer pointer-events-auto"
        onClick={handleEmailClick}
        aria-label="Send Email"
        type="button"
      >
        <Mail className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default HeroSocialLinks;
