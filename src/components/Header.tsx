
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Languages } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'about', label: t('nav.about') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'education', label: t('nav.education') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'contact', label: t('nav.contact') }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer"
              onClick={() => scrollToSection('about')}>
            Mohamed IBRAHIMI
          </h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-2">
              {navItems.map((item) => (
                <Button 
                  key={item.id}
                  variant="ghost" 
                  onClick={() => scrollToSection(item.id)}
                  className="relative group hover:bg-primary/10 transition-all duration-300"
                >
                  {item.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </Button>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <div className="flex items-center gap-2 bg-muted/50 rounded-full p-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              <Switch 
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-slate-600"
              />
              <Moon className="h-4 w-4 text-blue-500" />
            </div>
            
            {/* Language Toggle */}
            <div className="flex items-center gap-2 bg-muted/50 rounded-full p-2">
              <span className="text-sm font-medium">EN</span>
              <Switch 
                checked={language === 'fr'}
                onCheckedChange={toggleLanguage}
                className="data-[state=checked]:bg-blue-600"
              />
              <span className="text-sm font-medium">FR</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-background/95 backdrop-blur-md rounded-lg border animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Button 
                    key={item.id}
                    variant="ghost" 
                    onClick={() => scrollToSection(item.id)}
                    className="justify-start hover:bg-primary/10 transition-all duration-300"
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
              
              {/* Mobile Toggles */}
              <div className="flex flex-col gap-3 px-4 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Theme</span>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <Switch 
                      checked={theme === 'dark'}
                      onCheckedChange={toggleTheme}
                    />
                    <Moon className="h-4 w-4 text-blue-500" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Language</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">EN</span>
                    <Switch 
                      checked={language === 'fr'}
                      onCheckedChange={toggleLanguage}
                    />
                    <span className="text-sm">FR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
