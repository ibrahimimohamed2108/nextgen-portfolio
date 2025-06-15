
interface HeroImageProps {
  isInView: boolean;
}

const HeroImage = ({ isInView }: HeroImageProps) => {
  return (
    <div className={`relative group transition-all duration-1000 overflow-hidden ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className="relative">
        {/* Modern geometric frame with enhanced hover effects - Made non-interactive */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-blue-500/10 to-primary/20 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-all duration-700 group-hover:scale-110 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/20 via-primary/10 to-blue-500/20 rounded-2xl transform -rotate-6 group-hover:-rotate-12 transition-all duration-700 group-hover:scale-110 pointer-events-none"></div>
        
        {/* Clean professional image container with enhanced hover effects */}
        <div className="relative bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-2xl group-hover:shadow-4xl transition-all duration-500 group-hover:scale-105 pointer-events-none">
          <img 
            src="/lovable-uploads/03afd6d9-cfb1-458d-9190-2d0547094144.png"
            alt="Mohamed IBRAHIMI"
            className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-xl object-cover grayscale-0 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110 transition-all duration-500 pointer-events-none"
          />
          
          {/* Enhanced overlay for depth - Made non-interactive */}
          <div className="absolute inset-3 rounded-xl bg-gradient-to-tr from-transparent via-transparent to-primary/5 group-hover:to-primary/20 transition-all duration-500 pointer-events-none"></div>
        </div>
        
        {/* Enhanced accent elements - Made non-interactive */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-80 group-hover:scale-150 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full opacity-60 group-hover:scale-150 group-hover:opacity-90 transition-all duration-300 pointer-events-none" style={{ animationDelay: '0.1s' }}></div>
        
        {/* Additional glow effect on hover - Made non-interactive */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-blue-500/10 group-hover:to-primary/10 transition-all duration-500 blur-xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default HeroImage;
