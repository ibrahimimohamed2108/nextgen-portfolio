
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroContentProps {
  isInView: boolean;
}

const HeroContent = ({ isInView }: HeroContentProps) => {
  const { t, language } = useLanguage();

  return (
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
      </div>
    </div>
  );
};

export default HeroContent;
