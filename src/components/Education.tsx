
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar, GraduationCap } from "lucide-react";

const Education = () => {
  const educationItems = [
    {
      degree: "Ingénieur d'état, Génie Informatique et Digitalisation",
      institution: "École mohammedia d'ingénieurs",
      period: "2023 - 2026",
      type: "Engineering Degree"
    },
    {
      degree: "Mathématiques et Physique",
      institution: "CPGE - Classes préparatoires aux grandes écoles",
      period: "2021 - 2023",
      type: "Preparatory Classes"
    },
    {
      degree: "Baccalauréat, Sciences Mathématiques A",
      institution: "Lycée Mohammed VI, Oujda",
      period: "September 2020 - June 2021",
      type: "High School Diploma"
    }
  ];

  return (
    <section id="education" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Education</h2>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {educationItems.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg">{item.degree}</CardTitle>
                    <CardDescription className="text-base font-medium">{item.institution}</CardDescription>
                  </div>
                  <div className="flex flex-col text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {item.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      {item.type}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
