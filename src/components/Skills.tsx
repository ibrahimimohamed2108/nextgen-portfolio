
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Code, Database, Cloud } from "lucide-react";

const Skills = () => {
  const topSkills = [
    "Spring Framework",
    "MongoDB", 
    "Computer Networking"
  ];

  const certifications = [
    "Java Programming I",
    "Introduction to Cybersecurity Tools & Cyberattacks",
    "AWS Cloud Practitioner (CLF-C02)",
    "Introduction to Cloud Computing",
    "Introduction to Containers w/ Docker, Kubernetes & OpenShift"
  ];

  const technicalSkills = [
    { category: "Backend", icon: Code, skills: ["Java", "Spring Framework", "PHP"] },
    { category: "Database", icon: Database, skills: ["MongoDB", "MySQL"] },
    { category: "Cloud & DevOps", icon: Cloud, skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"] },
    { category: "Other", icon: Award, skills: ["Computer Networking", "LDAP", "Active Directory", "Apache2"] }
  ];

  return (
    <section id="skills" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Skills & Certifications</h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Top Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {topSkills.map((skill) => (
                    <Badge key={skill} variant="default" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {certifications.map((cert) => (
                    <li key={cert} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalSkills.map((skillGroup) => {
              const IconComponent = skillGroup.icon;
              return (
                <Card key={skillGroup.category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <IconComponent className="h-5 w-5" />
                      {skillGroup.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
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
