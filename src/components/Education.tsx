
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, GraduationCap, Award, BookOpen } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";

const Education = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { t } = useLanguage();

  const educationItems = [
    {
      degree: t('education.engineering'),
      institution: t('education.engineering.school'),
      period: t('education.engineering.period'),
      type: t('education.type.engineering'),
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-600",
      status: t('education.status.inProgress'),
      description: t('education.engineering.description')
    },
    {
      degree: t('education.prep'),
      institution: t('education.prep.school'),
      period: t('education.prep.period'),
      type: t('education.type.preparatory'),
      icon: BookOpen,
      color: "from-purple-500 to-violet-600",
      status: t('education.status.completed'),
      description: t('education.prep.description')
    },
    {
      degree: t('education.bac'),
      institution: t('education.bac.school'),
      period: t('education.bac.period'),
      type: t('education.type.highSchool'),
      icon: Award,
      color: "from-green-500 to-emerald-600",
      status: t('education.status.completed'),
      description: t('education.bac.description')
    }
  ];

  return (
    <section id="education" className="py-16 bg-gradient-to-b from-background to-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {t('education.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-blue-500 to-green-500"></div>
            
            <div className="space-y-8">
              {educationItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card 
                    key={index}
                    className={`relative ml-12 md:ml-20 group hover:shadow-xl transition-all duration-500 border-l-4 border-l-transparent hover:border-l-primary hover:scale-[1.02] ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    {/* Timeline dot */}
                    <div className={`absolute -left-16 md:-left-24 top-6 w-8 h-8 bg-gradient-to-br ${item.color} rounded-full border-4 border-background shadow-lg flex items-center justify-center group-hover:scale-125 transition-transform duration-300`}>
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    
                    <CardHeader>
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {item.degree}
                            </CardTitle>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              item.status === t('education.status.inProgress')
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                          <CardDescription className="text-base font-medium mb-2">
                            {item.institution}
                          </CardDescription>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                            <Calendar className="h-4 w-4 text-primary" />
                            {item.period}
                          </div>
                          <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            {item.type}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
