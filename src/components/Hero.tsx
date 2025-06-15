
import { useInView } from "@/hooks/useInView";
import HeroBackground from "@/components/hero/HeroBackground";
import HeroImage from "@/components/hero/HeroImage";
import HeroContent from "@/components/hero/HeroContent";
import HeroActions from "@/components/hero/HeroActions";
import HeroSocialLinks from "@/components/hero/HeroSocialLinks";
import HeroScrollIndicator from "@/components/hero/HeroScrollIndicator";

const Hero = () => {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5" ref={ref}>
      <HeroBackground />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <HeroImage isInView={isInView} />

          <div className="flex-1">
            <HeroContent isInView={isInView} />
            
            <div className="mt-6">
              <HeroActions />
            </div>

            <div className="mt-6">
              <HeroSocialLinks />
            </div>
          </div>
        </div>

        <HeroScrollIndicator />
      </div>
    </section>
  );
};

export default Hero;
