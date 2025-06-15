
import { motion } from 'framer-motion';
import { TechCategory } from '@/types/techStack';
import TechMoon from './TechMoon';

interface TechPlanetProps {
  category: TechCategory;
  planetIndex: number;
}

const TechPlanet = ({ category, planetIndex }: TechPlanetProps) => {
  const Icon = category.icon;

  // Calculate orbital speed based on distance (farther planets move slower)
  const orbitalSpeed = 20 + (planetIndex * 8); // Slower for outer planets
  
  // Planet self-rotation speed (independent of orbital speed)
  const rotationSpeed = 8 + (planetIndex * 2);

  const planetVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
        delay: planetIndex * 0.3
      }
    }
  };

  return (
    <motion.div 
      key={category.name} 
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
        className="absolute border border-gray-600/20 rounded-full pointer-events-none"
        style={{
          width: category.orbitRadius * 2,
          height: category.orbitRadius * 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Orbital motion container */}
      <motion.div 
        className="absolute"
        style={{
          width: category.orbitRadius * 2,
          height: category.orbitRadius * 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{ 
          rotate: 360 
        }}
        transition={{
          duration: orbitalSpeed,
          repeat: Infinity,
          ease: "linear",
          delay: planetIndex * 0.5
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
            rotate: -360 // Counter-rotate to keep planet upright during orbit
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
              boxShadow: `0 0 20px ${category.color}40, 0 0 40px ${category.color}20`
            }}
          >
            <Icon size={category.size * 0.4} />
          </div>
          
          {/* Planet label */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/80 px-2 py-1 rounded backdrop-blur-sm">
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
