
import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Mohamed IBRAHIMI</h1>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => scrollToSection('about')}>About</Button>
            <Button variant="ghost" onClick={() => scrollToSection('experience')}>Experience</Button>
            <Button variant="ghost" onClick={() => scrollToSection('education')}>Education</Button>
            <Button variant="ghost" onClick={() => scrollToSection('skills')}>Skills</Button>
            <Button variant="ghost" onClick={() => scrollToSection('contact')}>Contact</Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
