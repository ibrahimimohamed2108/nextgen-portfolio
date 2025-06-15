import { useState, useEffect, useRef } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { Languages } from "@/components/Languages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlignJustify, Moon, Sun } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      const currentScrollPos = window.pageYOffset;

      setIsScrolled(currentScrollPos > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsSidebarOpen(false);
  };

  const navItems = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.education'), href: '#education' },
    { label: t('nav.skills'), href: '#skills' },
    { label: "3D Gallery", href: '#gallery3d' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-300 border-b ${isScrolled ? 'border-border/40' : 'border-transparent'} ${isSidebarOpen ? 'md:border-none' : ''}`}
    >
      <div className="container flex items-center justify-between py-4">
        <Button variant="ghost" className="font-bold text-xl px-2">
          Mohamed <span className="text-primary">Ibrahimi</span>
        </Button>

        {isMobile ? (
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="ml-auto">
                <AlignJustify className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-3/4 md:w-2/5 p-6">
              <SheetHeader className="text-left">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate through the sections
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className="justify-start"
                    onClick={() => scrollToSection(item.href.slice(1))}
                  >
                    {item.label}
                  </Button>
                ))}
                <div className="flex items-center justify-between">
                  <Languages />
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="mx-auto">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection(item.href.slice(1))}
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {isMounted && !isMobile ? (
          <div className="flex items-center gap-2">
            <Languages />
            <ModeToggle />
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
