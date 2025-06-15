import { motion } from 'framer-motion';
import { TechCategory } from '@/types/techStack';
import TechMoon from './TechMoon';

interface TechPlanetProps {
  category: TechCategory;
  planetIndex: number;
}

const TechPlanet = ({ category, planetIndex }: TechPlanetProps) => {
  const Icon = category.icon;

  // Calculate uniform angular distribution around the sun
  const totalPlanets = 6; // Total number of planets in the solar system
  const baseAngle = (360 / totalPlanets) * planetIndex;
  // Add some randomization for more natural look while keeping uniform distribution
  const angleVariation = (Math.sin(planetIndex * 2.5) * 15); // ±15 degrees variation
  const finalAngle = baseAngle + angleVariation;

  // Calculate orbital speed based on distance (farther planets move slower)
  const orbitalSpeed = 25 + (planetIndex * 6); // Slower for outer planets
  
  // Planet self-rotation speed (independent of orbital speed)
  const rotationSpeed = 8 + (planetIndex * 2);

  const planetVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0,
      rotate: finalAngle - 45 // Start rotated back a bit
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: finalAngle,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 80,
        delay: planetIndex * 0.2,
        duration: 0.8
      }
    }
  };

  return (
    <motion.div 
      className="absolute top-1/2 left-1/2"
      style={{
        transform: 'translate(-50%, -50%)'
      }}
      variants={planetVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Orbit ring - visual guide */}
      <div 
        className="absolute border border-gray-600/15 rounded-full pointer-events-none"
        style={{
          width: category.orbitRadius * 2,
          height: category.orbitRadius * 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Orbital motion container with initial positioning */}
      <motion.div 
        className="absolute"
        style={{
          width: category.orbitRadius * 2,
          height: category.orbitRadius * 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ rotate: finalAngle }}
        animate={{ 
          rotate: finalAngle + 360 
        }}
        transition={{
          duration: orbitalSpeed,
          repeat: Infinity,
          ease: "linear",
          delay: planetIndex * 0.3
        }}
      >
        {/* Planet positioned at orbit edge */}
        <motion.div 
          className="absolute group cursor-pointer"
          style={{
            width: category.size,
            height: category.size,
            left: '50%',
            top: 0,
            transform: 'translate(-50%, -50%)'
          }}
          whileHover={{ scale: 1.15 }}
          animate={{
            rotate: -(finalAngle + 360) // Counter-rotate to keep planet upright during orbit
          }}
          transition={{
            rotate: {
              duration: rotationSpeed,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          <div 
            className="w-full h-full rounded-full shadow-xl flex items-center justify-center text-white font-semibold transition-all duration-300 hover:shadow-2xl"
            style={{ 
              backgroundColor: category.color,
              boxShadow: `0 0 20px ${category.color}40, 0 0 40px ${category.color}20, inset 0 2px 4px rgba(255,255,255,0.1)`
            }}
          >
            <Icon size={category.size * 0.4} />
          </div>
          
          {/* Planet label */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/80 px-2 py-1 rounded backdrop-blur-sm z-50">
            {category.name}
          </div>

          {/* Moons orbit around this planet */}
          {category.technologies.map((tech, moonIndex) => (
            <TechMoon
              key={tech}
              tech={tech}
              planetIndex={planetIndex}
              moonIndex={moonIndex}
              planetSize={category.size}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TechPlanet;
