
import { TechCategory } from '@/types/techStack';

interface TechLegendProps {
  techData: TechCategory[];
}

const TechLegend = ({ techData }: TechLegendProps) => {
  return (
    <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
      {techData.map((category) => {
        const Icon = category.icon;
        return (
          <div key={category.name} className="flex items-center gap-2 text-white">
            <div 
              className="w-4 h-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: category.color }}
            >
              <Icon size={10} />
            </div>
            <span className="text-sm">{category.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TechLegend;
