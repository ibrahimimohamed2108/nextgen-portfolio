
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Code, Database, Cloud, Star, Building2, GraduationCap } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";

const Skills = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { t } = useLanguage();

  const topSkills = [
    { name: "Spring Framework", level: 90 },
    { name: "MongoDB", level: 85 }, 
    { name: "Computer Networking", level: 88 }
  ];

  const certifications = [
    {
      title: "Introduction to MongoDB",
      issuer: "MongoDB",
      skills: ["MongoDB"]
    },
    {
      title: "AWS Cloud Practitioner (CLF-C02)",
      issuer: "DataCamp",
      skills: ["Cloud Computing", "Amazon Web Services (AWS)"]
    },
    {
      title: "Continuous Integration and Continuous Delivery (CI/CD)",
      issuer: "IBM",
      skills: ["CI/CD", "IaC", "Continuous Development", "Automation"]
    },
    {
      title: "Getting Started with Git and GitHub",
      issuer: "IBM",
      skills: ["Git", "GitHub"]
    },
    {
      title: "Introduction to Cloud Computing",
      issuer: "IBM",
      skills: ["Cloud Computing"]
    },
    {
      title: "Introduction to Containers w/ Docker, Kubernetes & OpenShift",
      issuer: "IBM",
      skills: ["DevOps", "OpenShift", "Cloud Native", "Containerization", "Docker", "Kubernetes"]
    },
    {
      title: "Introduction to Agile Development and Scrum",
      issuer: "IBM",
      skills: ["Agile Methodologies", "Scrum", "Sprint Planning"]
    },
    {
      title: "Computer Network",
      issuer: "Huawei",
      skills: ["Computer Networking"]
    },
    {
      title: "Introduction to Cybersecurity Tools & Cyberattacks",
      issuer: "IBM",
      skills: []
    },
    {
      title: "Java Programming II",
      issuer: "University of Helsinki",
      skills: ["Java", "Java 8", "OOP", "Software Design Patterns", "JavaFX"]
    },
    {
      title: "Java Programming I",
      issuer: "University of Helsinki",
      skills: ["Java", "Java 8", "OOP"]
    }
  ];

  const technicalSkills = [
    { category: "Backend", icon: Code, skills: ["Java", "Spring Framework", "PHP"], color: "from-green-500 to-emerald-600" },
    { category: "Database", icon: Database, skills: ["MongoDB", "MySQL"], color: "from-blue-500 to-cyan-600" },
    { category: "Cloud & DevOps", icon: Cloud, skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"], color: "from-purple-500 to-violet-600" },
    { category: "Other", icon: Award, skills: ["Computer Networking", "LDAP", "Active Directory", "Apache2"], color: "from-orange-500 to-red-600" }
  ];

  const getIssuerIcon = (issuer: string) => {
    const lowerIssuer = issuer.toLowerCase();
    if (lowerIssuer.includes('ibm')) return Building2;
    if (lowerIssuer.includes('university') || lowerIssuer.includes('helsinki')) return GraduationCap;
    if (lowerIssuer.includes('mongodb')) return Database;
    if (lowerIssuer.includes('datacamp')) return Code;
    if (lowerIssuer.includes('huawei')) return Building2;
    return Award;
  };

  const getIssuerColor = (issuer: string) => {
    const lowerIssuer = issuer.toLowerCase();
    if (lowerIssuer.includes('ibm')) return 'from-blue-600 to-blue-700';
    if (lowerIssuer.includes('university') || lowerIssuer.includes('helsinki')) return 'from-indigo-600 to-purple-700';
    if (lowerIssuer.includes('mongodb')) return 'from-green-600 to-green-700';
    if (lowerIssuer.includes('datacamp')) return 'from-orange-600 to-red-700';
    if (lowerIssuer.includes('huawei')) return 'from-red-600 to-pink-700';
    return 'from-gray-600 to-gray-700';
  };

  return (
    <section id="skills" className="py-16 bg-gradient-to-b from-muted/30 to-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {t('skills.title')}
          </h2>
          <p className="text-muted-foreground text-lg mb-6">{t('skills.description')}</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          {/* Top Skills with Progress */}
          <div className={`mb-12 transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/5 to-blue-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Star className="h-6 w-6 text-yellow-500" />
                  Top Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {topSkills.map((skill, index) => (
                    <div key={skill.name} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: isInView ? `${skill.level}%` : '0%',
                            transitionDelay: `${index * 200}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Certifications Grid */}
          <div className={`mb-12 transition-all duration-1000 delay-400 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Award className="h-6 w-6 text-green-600" />
                {t('skills.technical')} Certifications
              </h3>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {certifications.map((cert, index) => {
                const IconComponent = getIssuerIcon(cert.issuer);
                const colorClass = getIssuerColor(cert.issuer);
                
                return (
                  <Card 
                    key={cert.title} 
                    className={`overflow-hidden hover:shadow-xl transition-all duration-500 group border-0 hover:scale-[1.02] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className={`bg-gradient-to-br ${colorClass} text-white relative p-4`}>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="relative z-10">
                        <div className="flex items-start gap-3 mb-2">
                          <IconComponent className="h-5 w-5 mt-1 flex-shrink-0" />
                          <div className="min-w-0">
                            <CardTitle className="text-sm font-semibold leading-tight line-clamp-2">
                              {cert.title}
                            </CardTitle>
                            <p className="text-xs opacity-90 mt-1">{cert.issuer}</p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      {cert.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {cert.skills.map((skill, skillIndex) => (
                            <Badge 
                              key={skill} 
                              variant="outline" 
                              className={`text-xs px-2 py-1 hover:scale-105 transition-all duration-300 group-hover:border-primary/40 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                              style={{ transitionDelay: `${(index * 100) + (skillIndex * 50)}ms` }}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground italic">
                          Cybersecurity & Risk Assessment
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Technical Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalSkills.map((skillGroup, groupIndex) => {
              const IconComponent = skillGroup.icon;
              return (
                <Card 
                  key={skillGroup.category} 
                  className={`overflow-hidden hover:shadow-xl transition-all duration-500 group border-0 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${groupIndex * 200}ms` }}
                >
                  <CardHeader className={`bg-gradient-to-br ${skillGroup.color} text-white relative`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <CardTitle className="flex items-center gap-3 text-lg relative z-10">
                      <IconComponent className="h-5 w-5" />
                      {skillGroup.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map((skill, skillIndex) => (
                        <Badge 
                          key={skill} 
                          variant="outline" 
                          className={`text-xs hover:scale-105 transition-all duration-300 group-hover:border-primary/40 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                          style={{ transitionDelay: `${(groupIndex * 200) + (skillIndex * 50)}ms` }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
