
interface TechMoonProps {
  tech: string;
  planetIndex: number;
  moonIndex: number;
  planetSize: number;
}

const TechMoon = ({ tech, planetIndex, moonIndex, planetSize }: TechMoonProps) => {
  const moonOrbitRadius = planetSize * 0.8 + (moonIndex % 3) * 20;
  const moonSize = 16 - (moonIndex % 3) * 2;

  return (
    <div
      className={`moon moon-${planetIndex}-${moonIndex} absolute`}
      style={{
        width: moonOrbitRadius * 2,
        height: moonOrbitRadius * 2,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group"
        style={{
          width: moonSize,
          height: moonSize
        }}
      >
        <div 
          className="w-full h-full rounded-full bg-gray-300 shadow-md transition-all hover:scale-125 hover:bg-white cursor-pointer"
          title={tech}
        />
        
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none">
          {tech}
        </div>
      </div>
    </div>
  );
};

export default TechMoon;
