
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
  const orbitAnimationRef = useRef<any>(null);

  const galleryItems = [
    {
      title: "AWS DevOps",
      description: "Cloud Infrastructure & CI/CD",
      content: "Deployed scalable applications using EC2, S3, and Lambda. Implemented automated CI/CD pipelines with Jenkins and Docker for seamless deployments.",
      icon: "☁️",
      color: "from-orange-500 to-yellow-500",
      orbitRadius: 120,
      orbitSpeed: 30
    },
    {
      title: "React Development",
      description: "Modern Frontend Applications",
      content: "Built responsive web applications using React, TypeScript, and modern state management. Expertise in component architecture and performance optimization.",
      icon: "⚛️",
      color: "from-blue-500 to-cyan-500",
      orbitRadius: 160,
      orbitSpeed: 25
    },
    {
      title: "Database Systems",
      description: "MySQL & Data Management",
      content: "Designed and optimized database schemas, implemented complex queries, and managed data integrity across multiple applications and systems.",
      icon: "🗄️",
      color: "from-green-500 to-emerald-500",
      orbitRadius: 200,
      orbitSpeed: 20
    },
    {
      title: "Spring Boot",
      description: "Backend API Development",
      content: "Developed RESTful APIs and microservices using Spring Boot. Implemented security, authentication, and integrated with various databases and external services.",
      icon: "🍃",
      color: "from-green-600 to-lime-500",
      orbitRadius: 140,
      orbitSpeed: 35
    },
    {
      title: "Docker & K8s",
      description: "Containerization & Orchestration",
      content: "Containerized applications with Docker and orchestrated them using Kubernetes. Managed scaling, load balancing, and service discovery in production environments.",
      icon: "🐳",
      color: "from-blue-600 to-indigo-500",
      orbitRadius: 180,
      orbitSpeed: 28
    },
    {
      title: "TypeScript",
      description: "Type-Safe Development",
      content: "Leveraged TypeScript for building robust, maintainable codebases. Implemented advanced type systems and integrated with modern development workflows.",
      icon: "📘",
      color: "from-blue-700 to-purple-500",
      orbitRadius: 220,
      orbitSpeed: 18
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
      if (orbitAnimationRef.current) {
        orbitAnimationRef.current.pause();
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
      rotateY: [-180, 0],
      rotateX: [90, 0],
      translateZ: [200, 0],
      opacity: [0, 1],
      delay: window.anime.stagger(300),
      duration: 1500,
      easing: 'easeOutElastic(1, .6)'
    });

    // Continuous orbital motion
    cubeRefs.current.forEach((cube, index) => {
      if (!cube) return;
      const item = galleryItems[index];
      
      // Set initial orbital position
      const angle = (index / galleryItems.length) * 360;
      const x = Math.cos(angle * Math.PI / 180) * item.orbitRadius;
      const z = Math.sin(angle * Math.PI / 180) * item.orbitRadius;
      
      cube.style.transform = `translate3d(${x}px, 0, ${z}px)`;
    });

    // Orbital animation
    orbitAnimationRef.current = window.anime({
      targets: cubeRefs.current.filter(Boolean),
      rotateY: 360,
      duration: (el: HTMLElement, i: number) => galleryItems[i].orbitSpeed * 1000,
      loop: true,
      easing: 'linear',
      update: (anim: any) => {
        cubeRefs.current.forEach((cube, index) => {
          if (!cube) return;
          const item = galleryItems[index];
          const progress = anim.progress / 100;
          const angle = (index / galleryItems.length) * 360 + (progress * 360);
          const x = Math.cos(angle * Math.PI / 180) * item.orbitRadius;
          const z = Math.sin(angle * Math.PI / 180) * item.orbitRadius;
          const y = Math.sin(progress * Math.PI * 4) * 20; // Vertical bobbing
          
          cube.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${angle}deg) rotateX(${Math.sin(progress * Math.PI * 2) * 15}deg)`;
        });
      }
    });

    // Individual rotation animation
    animationRef.current = window.anime({
      targets: cubeRefs.current.filter(Boolean),
      rotateX: [-5, 5, -5],
      rotateZ: [-2, 2, -2],
      scale: [1, 1.05, 1],
      duration: 4000,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
      delay: window.anime.stagger(500)
    });
  };

  const handleCubeHover = (index: number, isHover: boolean) => {
    if (!window.anime || !cubeRefs.current[index]) return;

    window.anime({
      targets: cubeRefs.current[index],
      scale: isHover ? 1.3 : 1,
      translateY: isHover ? -30 : 0,
      duration: 400,
      easing: 'easeOutQuart'
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Dive into my professional journey through these interactive showcases. 
            Each piece represents real projects and achievements that define my expertise in modern software development.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* 3D Solar System Container */}
        <div 
          ref={containerRef}
          className="relative min-h-[600px] flex items-center justify-center"
          style={{
            perspective: '1200px',
            perspectiveOrigin: 'center center'
          }}
        >
          {/* Central Core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-2xl shadow-yellow-500/30"></div>
          </div>

          {/* Orbital Paths */}
          {galleryItems.map((item, index) => (
            <div
              key={`orbit-${index}`}
              className="absolute inset-0 flex items-center justify-center opacity-20"
            >
              <div 
                className="border border-primary/20 rounded-full"
                style={{
                  width: item.orbitRadius * 2,
                  height: item.orbitRadius * 2,
                }}
              ></div>
            </div>
          ))}

          {/* Orbiting Elements */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {galleryItems.map((item, index) => (
              <div
                key={index}
                ref={el => cubeRefs.current[index] = el}
                className="absolute group cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={() => handleCubeHover(index, true)}
                onMouseLeave={() => handleCubeHover(index, false)}
              >
                {/* 3D Card */}
                <div 
                  className="relative w-48 h-48"
                  style={{
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Front Face */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white p-4 border border-white/20 backdrop-blur-sm`}
                    style={{
                      transform: 'translateZ(25px)',
                      backfaceVisibility: 'visible'
                    }}
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="text-lg font-bold mb-2 text-center">{item.title}</h3>
                    <p className="text-xs text-center opacity-90">{item.description}</p>
                  </div>

                  {/* Back Face */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-tl ${item.color} rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white p-3 border border-white/20 backdrop-blur-sm`}
                    style={{
                      transform: 'translateZ(-25px) rotateY(180deg)',
                      backfaceVisibility: 'visible'
                    }}
                  >
                    <h3 className="text-sm font-bold mb-2 text-center">{item.title}</h3>
                    <p className="text-xs text-center leading-relaxed opacity-95">{item.content}</p>
                  </div>
                </div>

                {/* Floating info tooltip */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-background/90 backdrop-blur-sm border rounded-lg px-3 py-2 text-xs text-foreground whitespace-nowrap">
                    {item.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Instructions */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-muted-foreground">
            <span className="inline-block animate-pulse mr-2">🌟</span>
            Watch my skills orbit in this interactive solar system - hover to explore each technology in detail
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gallery3D;
