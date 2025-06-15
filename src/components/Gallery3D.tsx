import { useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';

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

  const galleryItems = [
    {
      title: "AWS DevOps",
      description: "Cloud Infrastructure & CI/CD",
      icon: "☁️",
      color: "from-orange-500 to-yellow-500"
    },
    {
      title: "React Development",
      description: "Modern Frontend Applications",
      icon: "⚛️",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Database Systems",
      description: "MySQL & Data Management",
      icon: "🗄️",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Spring Boot",
      description: "Backend API Development",
      icon: "🍃",
      color: "from-green-600 to-lime-500"
    },
    {
      title: "Docker & K8s",
      description: "Containerization & Orchestration",
      icon: "🐳",
      color: "from-blue-600 to-indigo-500"
    },
    {
      title: "TypeScript",
      description: "Type-Safe Development",
      icon: "📘",
      color: "from-blue-700 to-purple-500"
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

    // Initial entrance animation
    window.anime({
      targets: cubeRefs.current.filter(Boolean),
      scale: [0, 1],
      rotateY: [-90, 0],
      rotateX: [45, 0],
      translateZ: [100, 0],
      opacity: [0, 1],
      delay: window.anime.stagger(200),
      duration: 1000,
      easing: 'easeOutExpo'
    });

    // Continuous floating animation
    animationRef.current = window.anime({
      targets: cubeRefs.current.filter(Boolean),
      rotateY: '+=360',
      rotateX: [-5, 5, -5],
      translateY: [-10, 10, -10],
      duration: 4000,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
      delay: window.anime.stagger(300)
    });
  };

  const handleCubeHover = (index: number, isHover: boolean) => {
    if (!window.anime || !cubeRefs.current[index]) return;

    window.anime({
      targets: cubeRefs.current[index],
      scale: isHover ? 1.1 : 1,
      rotateX: isHover ? 15 : 0,
      rotateY: isHover ? 15 : 0,
      translateZ: isHover ? 30 : 0,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  return (
    <section 
      id="gallery3d" 
      className="py-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden"
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Updated Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore my technical expertise through this interactive 3D showcase. 
            Each cube represents a key area of my development skills.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* 3D Gallery Container */}
        <div 
          ref={containerRef}
          className="relative"
          style={{
            perspective: '1000px',
            perspectiveOrigin: 'center center'
          }}
        >
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {galleryItems.map((item, index) => (
              <div
                key={index}
                ref={el => cubeRefs.current[index] = el}
                className="relative group cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(0)'
                }}
                onMouseEnter={() => handleCubeHover(index, true)}
                onMouseLeave={() => handleCubeHover(index, false)}
              >
                {/* 3D Cube Container */}
                <div 
                  className="relative w-64 h-64 mx-auto"
                  style={{
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Front Face */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white p-6 border border-white/20`}
                    style={{
                      transform: 'translateZ(50px)',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-center">{item.title}</h3>
                    <p className="text-sm text-center opacity-90">{item.description}</p>
                  </div>

                  {/* Back Face */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-tl ${item.color} rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white p-6 border border-white/20`}
                    style={{
                      transform: 'translateZ(-50px) rotateY(180deg)',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="text-3xl mb-4">✨</div>
                    <h3 className="text-lg font-bold mb-2 text-center">Interactive</h3>
                    <p className="text-sm text-center opacity-90">Hover to explore</p>
                  </div>

                  {/* Top Face */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-b ${item.color} rounded-2xl shadow-xl opacity-80 border border-white/10`}
                    style={{
                      transform: 'rotateX(90deg) translateZ(50px)',
                      backfaceVisibility: 'hidden'
                    }}
                  ></div>

                  {/* Bottom Face */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t ${item.color} rounded-2xl shadow-xl opacity-60 border border-white/10`}
                    style={{
                      transform: 'rotateX(-90deg) translateZ(50px)',
                      backfaceVisibility: 'hidden'
                    }}
                  ></div>

                  {/* Left Face */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl shadow-xl opacity-70 border border-white/10`}
                    style={{
                      transform: 'rotateY(-90deg) translateZ(50px)',
                      backfaceVisibility: 'hidden'
                    }}
                  ></div>

                  {/* Right Face */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-l ${item.color} rounded-2xl shadow-xl opacity-70 border border-white/10`}
                    style={{
                      transform: 'rotateY(90deg) translateZ(50px)',
                      backfaceVisibility: 'hidden'
                    }}
                  ></div>
                </div>

                {/* Reflection Effect */}
                <div 
                  className="absolute top-full left-1/2 transform -translate-x-1/2 w-64 h-32 opacity-20 pointer-events-none"
                  style={{
                    background: `linear-gradient(to bottom, transparent, ${item.color.includes('orange') ? '#f97316' : item.color.includes('blue') ? '#3b82f6' : '#10b981'})`,
                    transform: 'translateX(-50%) scaleY(-0.5) translateZ(-10px)',
                    filter: 'blur(2px)'
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Instructions */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-muted-foreground">
            <span className="inline-block animate-pulse mr-2">💡</span>
            Hover over the cubes to see them transform in 3D space
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gallery3D;
