
import { useState, useRef, useEffect } from 'react';
import { Terminal, Send, User, Bot, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface TerminalMessage {
  id: string;
  type: 'user' | 'system';
  content: string;
  timestamp: Date;
  isLink?: boolean;
}

export const InteractiveTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<TerminalMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const commands = {
    help: () => language === 'fr' 
      ? 'Commandes disponibles: help, about, skills, experience, education, certifications, projects, contact, clear, theme, stage, github, linkedin'
      : 'Available commands: help, about, skills, experience, education, certifications, projects, contact, clear, theme, stage, github, linkedin',
    
    about: () => language === 'fr'
      ? 'Je suis Mohamed IBRAHIMI, étudiant ingénieur à l\'École Mohammadia d\'Ingénieurs, spécialisé en Génie Logiciel et Digitalisation. Je suis passionné par le développement logiciel, le cloud computing et les pratiques DevOps.'
      : 'I am Mohamed IBRAHIMI, an engineering student at École Mohammadia d\'Ingénieurs, specializing in Software Engineering and Digitalization. I am passionate about software development, cloud computing, and DevOps practices.',
    
    skills: () => language === 'fr'
      ? 'Compétences: Java, Spring Boot, React, TypeScript, Python, C, C++, Git, GitHub, Docker, Kubernetes, Terraform, AWS, Agile, CI/CD, DevOps, MySQL, Architecture Cloud Native'
      : 'Skills: Java, Spring Boot, React, TypeScript, Python, C, C++, Git, GitHub, Docker, Kubernetes, Terraform, AWS, Agile, CI/CD, DevOps, MySQL, Cloud Native Architecture',
    
    experience: () => language === 'fr'
      ? '- Stagiaire, Trésorerie Générale du Royaume\n  Participation à l\'urbanisation des systèmes d\'information:\n    • Déploiement de GLPI, Mercator et OpenProject\n    • Mise en place d\'infrastructure virtualisée\n    • Configuration Apache2, MySQL & PHP\n    • Intégration authentification LDAP et Active Directory'
      : '- Intern, Trésorerie Générale du Royaume\n  Participated in information systems urbanization:\n    • Deployed GLPI, Mercator, and OpenProject\n    • Set up virtualized infrastructure\n    • Configured Apache2, MySQL & PHP\n    • Integrated LDAP and Active Directory authentication',
    
    education: () => language === 'fr'
      ? '- Diplôme d\'Ingénieur, École Mohammadia d\'Ingénieurs (2023–2026)\n- Classes Préparatoires, Maths/Physique (2021–2023)\n- Baccalauréat, Sciences Mathématiques A (2020–2021)'
      : '- Engineering Degree, École Mohammadia d\'Ingénieurs (2023–2026)\n- Classes Préparatoires, Maths/Physics (2021–2023)\n- Baccalaureate, Sciences Mathématiques A (2020–2021)',
    
    certifications: () => language === 'fr'
      ? '- AWS Cloud Practitioner (DataCamp)\n- CI/CD, Cloud, Git & GitHub, Agile, Cybersécurité (IBM)\n- Réseaux Informatiques (Huawei)\n- Programmation Java I & II (Université d\'Helsinki)'
      : '- AWS Cloud Practitioner (DataCamp)\n- CI/CD, Cloud, Git & GitHub, Agile, Cybersecurity (IBM)\n- Computer Network (Huawei)\n- Java Programming I & II (University of Helsinki)',
    
    projects: () => language === 'fr'
      ? '- Pipeline CI/CD automatisé sur AWS avec Jenkins, Kubernetes & Terraform\n- Application e-commerce utilisant Angular & Firebase\n- Système de restaurant & billetterie en C'
      : '- Automated CI/CD pipeline on AWS with Jenkins, Kubernetes & Terraform\n- E-commerce application using Angular & Firebase\n- Restaurant & ticketing system in C',
    
    contact: () => language === 'fr'
      ? 'Email: ibrahimimoahamed2108@gmail.com\nLinkedIn: linkedin.com/in/ibrahimimohamed\nGitHub: github.com/ibrahimimohamed2108'
      : 'Email: ibrahimimoahamed2108@gmail.com\nLinkedIn: linkedin.com/in/ibrahimimohamed\nGitHub: github.com/ibrahimimohamed2108',
    
    stage: () => language === 'fr'
      ? 'Actuellement à la recherche d\'un stage PFA de 2 mois (Juillet–Août 2025) pour appliquer mes compétences DevOps, cloud et génie logiciel dans des projets concrets.'
      : 'Currently seeking a 2-month PFA internship (July–August 2025) to apply my DevOps, cloud, and software engineering skills in real-world projects.',
    
    github: () => 'LINK:https://github.com/ibrahimimohamed2108',
    
    linkedin: () => 'LINK:https://linkedin.com/in/ibrahimimohamed',
    
    clear: () => 'CLEAR',
    
    theme: () => language === 'fr' 
      ? 'Utilisez le commutateur en haut pour changer le thème' 
      : 'Use the theme toggle in the header to change themes'
  };

  const addMessage = (content: string, type: 'user' | 'system', isLink: boolean = false) => {
    const message: TerminalMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      isLink
    };
    setMessages(prev => [...prev, message]);
  };

  const handleCommand = (command: string) => {
    addMessage(`$ ${command}`, 'user');
    
    const cmd = command.toLowerCase().trim();
    if (cmd in commands) {
      const response = (commands as any)[cmd]();
      if (response === 'CLEAR') {
        setMessages([]);
      } else if (response.startsWith('LINK:')) {
        const url = response.replace('LINK:', '');
        const linkText = language === 'fr' 
          ? `Ouverture du profil ${cmd === 'github' ? 'GitHub' : 'LinkedIn'}...\n→ ${url}`
          : `Opening ${cmd === 'github' ? 'GitHub' : 'LinkedIn'} profile...\n→ ${url}`;
        setTimeout(() => {
          addMessage(linkText, 'system', true);
          window.open(url, '_blank');
        }, 500);
      } else {
        setTimeout(() => addMessage(response, 'system'), 500);
      }
    } else {
      const errorMsg = language === 'fr' 
        ? `Commande inconnue: ${cmd}. Tapez 'help' pour voir les commandes disponibles.`
        : `Unknown command: ${cmd}. Type 'help' to see available commands.`;
      setTimeout(() => addMessage(errorMsg, 'system'), 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg = language === 'fr'
        ? "Bienvenue dans le terminal interactif! Tapez 'help' pour commencer."
        : "Welcome to the interactive terminal! Type 'help' to get started.";
      addMessage(welcomeMsg, 'system');
    }
  }, [isOpen, language]);

  return (
    <>
      {/* Terminal Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary to-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Terminal className="h-6 w-6" />
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-20 right-6 w-96 h-80 bg-black/90 backdrop-blur-md rounded-lg border border-primary/20 z-40 overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="bg-primary/20 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-white text-sm font-mono">terminal</span>
            </div>

            {/* Terminal Content */}
            <div className="h-56 overflow-y-auto p-4 font-mono text-sm">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`mb-2 flex items-start gap-2 ${
                    message.type === 'user' ? 'text-green-400' : 'text-blue-400'
                  }`}
                >
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="break-words whitespace-pre-line flex-1">
                    {message.isLink && message.content.includes('→') ? (
                      <div>
                        {message.content.split('→')[0]}
                        <span className="text-cyan-400 underline cursor-pointer flex items-center gap-1">
                          → {message.content.split('→')[1]}
                          <ExternalLink className="h-3 w-3" />
                        </span>
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-primary/20">
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-mono">$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-white font-mono outline-none"
                  placeholder={language === 'fr' ? "Tapez une commande..." : "Type a command..."}
                  autoFocus
                />
                <button type="submit" className="text-primary hover:text-blue-400">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
