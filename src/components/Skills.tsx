
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Code, Database, Cloud, Star } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const Skills = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const topSkills = [
    { name: "Spring Framework", level: 90 },
    { name: "MongoDB", level: 85 }, 
    { name: "Computer Networking", level: 88 }
  ];

  const certifications = [
    "Java Programming I",
    "Introduction to Cybersecurity Tools & Cyberattacks",
    "AWS Cloud Practitioner (CLF-C02)",
    "Introduction to Cloud Computing",
    "Introduction to Containers w/ Docker, Kubernetes & OpenShift"
  ];

  const technicalSkills = [
    { category: "Backend", icon: Code, skills: ["Java", "Spring Framework", "PHP"], color: "from-green-500 to-emerald-600" },
    { category: "Database", icon: Database, skills: ["MongoDB", "MySQL"], color: "from-blue-500 to-cyan-600" },
    { category: "Cloud & DevOps", icon: Cloud, skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"], color: "from-purple-500 to-violet-600" },
    { category: "Other", icon: Award, skills: ["Computer Networking", "LDAP", "Active Directory", "Apache2"], color: "from-orange-500 to-red-600" }
  ];

  return (
    <section id="skills" className="py-16 bg-gradient-to-b from-muted/30 to-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Skills & Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto">
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

          {/* Certifications */}
          <div className={`mb-12 transition-all duration-1000 delay-400 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="overflow-hidden border-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Award className="h-6 w-6 text-green-600" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {certifications.map((cert, index) => (
                    <div 
                      key={cert} 
                      className={`flex items-center gap-3 p-4 rounded-lg bg-background/60 hover:bg-background/80 transition-all duration-300 group ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="w-3 h-3 bg-green-500 rounded-full group-hover:scale-125 transition-transform"></div>
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
