
import { motion } from 'framer-motion';

interface TechMoonProps {
  tech: string;
  planetIndex: number;
  moonIndex: number;
  planetSize: number;
}

const TechMoon = ({ tech, planetIndex, moonIndex, planetSize }: TechMoonProps) => {
  // Calculate moon orbit radius based on planet size and moon index
  const baseOrbitRadius = planetSize * 0.7;
  const moonOrbitRadius = baseOrbitRadius + (moonIndex * 15);
  
  // Moon size decreases with distance from planet
  const moonSize = Math.max(8, 14 - (moonIndex * 1.5));
  
  // Moon orbital speed (closer moons orbit faster)
  const moonOrbitalSpeed = 6 + (moonIndex * 1.5);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: moonOrbitRadius * 2,
        height: moonOrbitRadius * 2,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      animate={{ 
        rotate: 360 
      }}
      transition={{
        duration: moonOrbitalSpeed,
        repeat: Infinity,
        ease: "linear",
        delay: (planetIndex * 0.2) + (moonIndex * 0.3)
      }}
    >
      {/* Moon positioned at orbit edge */}
      <motion.div 
        className="absolute group pointer-events-auto"
        style={{
          width: moonSize,
          height: moonSize,
          left: '50%',
          top: 0,
          transform: 'translate(-50%, -50%)'
        }}
        whileHover={{ scale: 1.3 }}
        animate={{
          rotate: -360 // Counter-rotate to keep moon upright
        }}
        transition={{
          rotate: {
            duration: moonOrbitalSpeed * 0.8, // Slightly different rotation speed
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <div 
          className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-lg transition-all duration-300 hover:from-blue-200 hover:to-blue-400 cursor-pointer"
          title={tech}
          style={{
            boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)'
          }}
        />
        
        {/* Moon tooltip */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none backdrop-blur-sm">
          {tech}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TechMoon;
