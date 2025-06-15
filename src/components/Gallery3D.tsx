import { useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    anime: any;
  }
}

const Gallery3D = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const cubeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);
  const floatingAnimationRef = useRef<any>(null);
  const { toast } = useToast();

  const galleryItems = [
    {
      title: "AWS DevOps",
      description: "Cloud Infrastructure & CI/CD",
      icon: "☁️",
      color: "from-orange-500 to-yellow-500",
      link: "https://github.com/ibrahimimohamed2108/erp-clone",
      details: "Automated CI/CD pipeline on AWS using Jenkins, Kubernetes & Terraform"
    },
    {
      title: "React Development",
      description: "Modern Frontend Applications",
      icon: "⚛️",
      color: "from-blue-500 to-cyan-500",
      link: "https://github.com/ibrahimimohamed2108",
      details: "Building responsive and interactive web applications"
    },
    {
      title: "Database Systems",
      description: "MySQL & Data Management",
      icon: "🗄️",
      color: "from-green-500 to-emerald-500",
      link: "https://github.com/ibrahimimohamed2108",
      details: "Database design, optimization and management"
    },
    {
      title: "Spring Boot",
      description: "Backend API Development",
      icon: "🍃",
      color: "from-green-600 to-lime-500",
      link: "https://github.com/ibrahimimohamed2108",
      details: "RESTful APIs and microservices architecture"
    },
    {
      title: "Docker & K8s",
      description: "Containerization & Orchestration",
      icon: "🐳",
      color: "from-blue-600 to-indigo-500",
      link: "https://github.com/ibrahimimohamed2108",
      details: "Container deployment and orchestration"
    },
    {
      title: "TypeScript",
      description: "Type-Safe Development",
      icon: "📘",
      color: "from-blue-700 to-purple-500",
      link: "https://github.com/ibrahimimohamed2108",
      details: "Building scalable applications with type safety"
    }
  ];

  useEffect(() => {
    // Load anime.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
    script.async = true;
    script.onload = () => {
      if (isInView && window.anime) {
        initializeAnimations();
      }
    };
    document.head.appendChild(script);

    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
      if (floatingAnimationRef.current) {
        floatingAnimationRef.current.pause();
      }
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isInView && window.anime) {
      initializeAnimations();
    }
  }, [isInView]);

  const initializeAnimations = () => {
    if (!window.anime || !containerRef.current) return;

    const validCubes = cubeRefs.current.filter(Boolean);
    
    // Clear any existing animations
    if (animationRef.current) animationRef.current.pause();
    if (floatingAnimationRef.current) floatingAnimationRef.current.pause();

    // Reset all cubes to initial state
    window.anime.set(validCubes, {
      scale: 0,
      rotateY: -90,
      rotateX: 45,
      translateZ: 100,
      opacity: 0
    });

    // Staggered entrance animation
    window.anime({
      targets: validCubes,
      scale: [0, 1],
      rotateY: [-90, 0],
      rotateX: [45, 0],
      translateZ: [100, 0],
      opacity: [0, 1],
      delay: window.anime.stagger(150, { start: 300 }),
      duration: 800,
      easing: 'easeOutExpo',
      complete: () => {
        startFloatingAnimation();
      }
    });
  };

  const startFloatingAnimation = () => {
    if (!window.anime) return;
    
    const validCubes = cubeRefs.current.filter(Boolean);
    
    // Continuous gentle floating animation
    floatingAnimationRef.current = window.anime({
      targets: validCubes,
      rotateY: [0, 10, 0, -10, 0],
      rotateX: [0, 5, 0, -5, 0],
      translateY: [0, -8, 0, 8, 0],
      translateZ: [0, 5, 0, -5, 0],
      duration: 6000,
      loop: true,
      easing: 'easeInOutSine',
      delay: window.anime.stagger(800)
    });
  };

  const handleCubeHover = (index: number, isHover: boolean) => {
    if (!window.anime || !cubeRefs.current[index]) return;

    // Pause floating animation temporarily for this cube
    if (isHover && floatingAnimationRef.current) {
      window.anime({
        targets: cubeRefs.current[index],
        scale: 1.15,
        rotateX: 20,
        rotateY: 20,
        translateZ: 40,
        duration: 400,
        easing: 'easeOutQuart'
      });
    } else {
      window.anime({
        targets: cubeRefs.current[index],
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        translateZ: 0,
        duration: 400,
        easing: 'easeOutQuart'
      });
    }
  };

  const handleCubeClick = (item: typeof galleryItems[0]) => {
    try {
      window.open(item.link, '_blank', 'noopener,noreferrer');
      toast({
        title: `Opening ${item.title}`,
        description: item.details,
      });
      console.log(`Clicked on ${item.title}: ${item.link}`);
    } catch (error) {
      console.error('Error opening link:', error);
      toast({
        title: "Error",
        description: "Unable to open the link. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <section 
      id="gallery3d" 
      className="py-24 bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden"
      ref={ref}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary/2 to-blue-500/2 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore my technical expertise through this interactive 3D showcase. 
            Each cube represents a key area of my development skills. Click to explore!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* 3D Gallery Container */}
        <div 
          ref={containerRef}
          className="relative"
          style={{
            perspective: '1200px',
            perspectiveOrigin: 'center center'
          }}
        >
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16"
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {galleryItems.map((item, index) => (
              <div
                key={index}
                ref={el => cubeRefs.current[index] = el}
                className="relative group cursor-pointer mx-auto"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(0)'
                }}
                onMouseEnter={() => handleCubeHover(index, true)}
                onMouseLeave={() => handleCubeHover(index, false)}
                onClick={() => handleCubeClick(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCubeClick(item);
                  }
                }}
                aria-label={`Open ${item.title} project`}
              >
                {/* 3D Cube Container */}
                <div 
                  className="relative w-60 h-60 mx-auto"
                  style={{
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Front Face */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl shadow-xl flex flex-col items-center justify-center text-white p-6 border border-white/20 backdrop-blur-sm group-hover:shadow-2xl transition-shadow duration-300`}
                    style={{
                      transform: 'translateZ(30px)',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="text-4xl mb-4 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-center drop-shadow-md">{item.title}</h3>
                    <p className="text-sm text-center opacity-90 drop-shadow-sm">{item.description}</p>
                    <div className="mt-3 text-xs opacity-75 text-center">Click to explore</div>
                  </div>

                  {/* Back Face */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-tl ${item.color} rounded-2xl shadow-xl flex flex-col items-center justify-center text-white p-6 border border-white/20 backdrop-blur-sm`}
                    style={{
                      transform: 'translateZ(-30px) rotateY(180deg)',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="text-3xl mb-4 filter drop-shadow-lg">✨</div>
                    <h3 className="text-lg font-bold mb-2 text-center drop-shadow-md">Interactive</h3>
                    <p className="text-sm text-center opacity-90 drop-shadow-sm">Hover to explore</p>
                  </div>

                  {/* Top Face */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-b ${item.color} rounded-2xl shadow-lg opacity-70 border border-white/10`}
                    style={{
                      transform: 'rotateX(90deg) translateZ(30px)',
                      backfaceVisibility: 'hidden'
                    }}
                  ></div>

                  {/* Bottom Face */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t ${item.color} rounded-2xl shadow-lg opacity-50 border border-white/10`}
                    style={{
                      transform: 'rotateX(-90deg) translateZ(30px)',
                      backfaceVisibility: 'hidden'
                    }}
                  ></div>

                  {/* Left Face */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl shadow-lg opacity-60 border border-white/10`}
                    style={{
                      transform: 'rotateY(-90deg) translateZ(30px)',
                      backfaceVisibility: 'hidden'
                    }}
                  ></div>

                  {/* Right Face */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-l ${item.color} rounded-2xl shadow-lg opacity-60 border border-white/10`}
                    style={{
                      transform: 'rotateY(90deg) translateZ(30px)',
                      backfaceVisibility: 'hidden'
                    }}
                  ></div>
                </div>

                {/* Enhanced Reflection Effect */}
                <div 
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 w-60 h-20 opacity-10 pointer-events-none rounded-2xl blur-sm`}
                  style={{
                    background: `linear-gradient(to bottom, ${item.color.includes('orange') ? '#f97316' : item.color.includes('blue') ? '#3b82f6' : '#10b981'}, transparent)`,
                    transform: 'translateX(-50%) scaleY(-0.3) translateZ(-5px)',
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Instructions */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-muted-foreground text-lg">
            <span className="inline-block animate-pulse mr-2 text-xl">💡</span>
            Hover over the cubes to see them transform in 3D space, click to explore projects
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gallery3D;
