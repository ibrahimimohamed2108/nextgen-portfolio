
import { TechCategory } from '@/types/techStack';
import TechMoon from './TechMoon';

interface TechPlanetProps {
  category: TechCategory;
  planetIndex: number;
}

const TechPlanet = ({ category, planetIndex }: TechPlanetProps) => {
  const Icon = category.icon;

  return (
    <div key={category.name} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {/* Orbit ring */}
      <div 
        className="absolute border border-gray-600/30 rounded-full"
        style={{
          width: category.orbitRadius * 2,
          height: category.orbitRadius * 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Planet orbit container */}
      <div 
        className={`planet planet-${planetIndex} absolute`}
        style={{
          width: category.orbitRadius * 2,
          height: category.orbitRadius * 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Planet */}
        <div 
          className="planet-container absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          style={{
            width: category.size,
            height: category.size
          }}
        >
          <div 
            className="w-full h-full rounded-full shadow-lg flex items-center justify-center text-white font-semibold text-xs transition-transform hover:scale-110"
            style={{ backgroundColor: category.color }}
          >
            <Icon size={category.size * 0.4} />
          </div>
          
          {/* Planet label */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {category.name}
          </div>

          {/* Moons orbit around planet */}
          {category.technologies.map((tech, moonIndex) => (
            <TechMoon
              key={tech}
              tech={tech}
              planetIndex={planetIndex}
              moonIndex={moonIndex}
              planetSize={category.size}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechPlanet;
