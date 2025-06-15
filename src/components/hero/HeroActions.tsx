import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const HeroActions = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    console.log(`Attempting to scroll to section: ${sectionId}`);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      toast({
        title: "Navigating",
        description: `Scrolling to ${sectionId} section`,
      });
      console.log(`Successfully scrolling to section: ${sectionId}`);
    } else {
      console.error(`Section with id '${sectionId}' not found`);
      toast({
        title: "Navigation Error",
        description: "Section not found",
        variant: "destructive"
      });
    }
  };

  const downloadCV = () => {
    console.log('Download CV button clicked - Debug log');
    const cvContent = `# 👨‍💻 Mohamed Ibrahimi  
**Engineering Student | Software Development | Cloud & DevOps Enthusiast**  
📍 Morocco | 🎓 École Mohammadia d'Ingénieurs  
📧 ibrahimimoahamed2108@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/ibrahimimohamed) · [GitHub](https://github.com/ibrahimimohamed2108)

---

## 🧭 Summary

Driven and passionate engineering student currently in the **2nd year of Software & Digitalization Engineering** at EMI.  
Strong expertise in **software development**, **cloud computing**, and **DevOps** practices including CI/CD, containerization, infrastructure as code (IaC), and automation.  
Currently working on an **automated CI/CD pipeline** on AWS using Jenkins, Kubernetes, and Terraform.

Actively seeking a **2-month internship (PFA)** for **July–August 2025** to apply my skills in real-world projects and deepen my professional experience.

---

## 💼 Experience

### 🏛️ Trésorerie Générale du Royaume — *Intern, IT Urbanization*  
📍 Rabat, Morocco | 🗓️ Feb 2025  
> Participated in the modernization of the Information System (SI) by deploying and demonstrating key IT solutions.

**Key Contributions:**
- 🚀 Deployed & configured **GLPI**, **Mercator**, and **OpenProject**
- 🧰 Set up a **virtualized infrastructure**
- 🗃️ Managed **MySQL databases**
- 🔐 Integrated **LDAP** with **Active Directory** for centralized authentication
- ⚙️ Configured **Apache2**, **MySQL**, and **PHP**

---

## 🎓 Education

| Degree | Institution | Period |
|--------|-------------|--------|
| 🎓 **Engineer's Degree – Computer Science & Digitalization** | École Mohammadia d'Ingénieurs | *2023 – 2026* |
| 📘 **Classes Préparatoires – Mathematics & Physics** | CPGE (Grandes Écoles Prep) | *2021 – 2023* |
| 🎓 **Baccalaureate – Mathematics A** | Lycée Mohammed VI, Oujda | *2020 – 2021* |

---

## 🛠️ Skills

**Languages & Frameworks**  
\`Java\` · \`Spring Boot\` · \`JavaFX\` · \`React\` · \`TypeScript\` · \`Python\` · \`C/C++\`

**DevOps & Cloud**  
\`AWS\` · \`Docker\` · \`Kubernetes\` · \`Terraform\` · \`Git\` · \`GitHub\` · \`CI/CD\` · \`Infrastructure as Code\` · \`Automation\`

**Databases & Tools**  
\`MySQL\` · \`OpenProject\` · \`GLPI\` · \`LDAP\` · \`Apache2\`

**Soft Skills & Methodologies**  
\`Agile\` · \`Scrum\` · \`Sprint Planning\` · \`Software Design Patterns\`

---

## 📂 Projects

### 🔧 [Automated CI/CD Pipeline on AWS](https://github.com/ibrahimimohamed2108/erp-clone)
> Built a full CI/CD pipeline using Jenkins, Kubernetes & Terraform with AWS ECR/EKS integration.

### 🛍️ [E-commerce App (Angular + Firebase)](https://github.com/ibrahimimohamed2108/angEcom1)
> Developed a functional e-commerce app with authentication, product browsing, and cart functionality.

### 🍽️ [Restaurant Management System in C](https://github.com/ibrahimimohamed2108/ProjetRestau_C)
> Console-based ticketing and restaurant reservation system.

---

## 📜 Certifications

- 🧠 **AWS Cloud Practitioner** — *DataCamp*
- ☁️ **Introduction to Cloud Computing** — *IBM*
- 🐳 **Containers: Docker, Kubernetes & OpenShift** — *IBM*
- 🔁 **CI/CD & DevOps Automation** — *IBM*
- 🧰 **Git & GitHub** — *IBM*
- 📡 **Computer Networks** — *Huawei*
- 👨‍🏫 **Agile & Scrum Fundamentals** — *IBM*
- 🔐 **Cybersecurity Tools & Attacks** — *IBM*
- ☕ **Java Programming I & II** — *University of Helsinki*

---

## 📬 Contact

| Platform | Link |
|----------|------|
| 📧 Email | [ibrahimimoahamed2108@gmail.com](mailto:ibrahimimoahamed2108@gmail.com) |
| 🔗 LinkedIn | [linkedin.com/in/ibrahimimohamed](https://linkedin.com/in/ibrahimimohamed) |
| 💻 GitHub | [github.com/ibrahimimohamed2108](https://github.com/ibrahimimohamed2108) |

---

> 🔍 *Available for collaboration, internships, and innovative tech projects.*`;

    try {
      const blob = new Blob([cvContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `Mohamed_IBRAHIMI_CV_${language.toUpperCase()}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      toast({
        title: "CV Downloaded",
        description: "Your CV has been downloaded successfully",
      });
      console.log('CV downloaded successfully');
    } catch (error) {
      console.error('Error downloading CV:', error);
      toast({
        title: "Download Failed",
        description: "Unable to download CV. Opening email instead.",
        variant: "destructive"
      });
      // Fallback: open mailto with CV content
      window.open(`mailto:?subject=Mohamed IBRAHIMI - CV&body=${encodeURIComponent(cvContent.substring(0, 1000) + '...')}`);
    }
  };

  const handleContactClick = () => {
    console.log('Contact Me button clicked - Debug log');
    scrollToSection('contact');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pointer-events-auto">
      <Button 
        size="lg" 
        onClick={downloadCV}
        className="group bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 relative z-50 cursor-pointer pointer-events-auto"
        type="button"
      >
        <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
        {t('hero.downloadCV')}
      </Button>
      <Button 
        size="lg" 
        variant="outline"
        onClick={handleContactClick}
        className="group border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105 relative z-50 cursor-pointer pointer-events-auto"
        type="button"
      >
        <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
        {t('hero.contactMe')}
      </Button>
    </div>
  );
};

export default HeroActions;
