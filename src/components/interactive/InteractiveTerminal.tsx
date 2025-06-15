
import { useState, useRef, useEffect } from 'react';
import { Terminal, Send, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface TerminalMessage {
  id: string;
  type: 'user' | 'system';
  content: string;
  timestamp: Date;
}

export const InteractiveTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<TerminalMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const commands = {
    help: () => language === 'fr' 
      ? 'Commandes disponibles: help, about, skills, experience, contact, clear, theme'
      : 'Available commands: help, about, skills, experience, contact, clear, theme',
    about: () => language === 'fr'
      ? 'Je suis Mohamed IBRAHIMI, étudiant ingénieur passionné par le développement logiciel et l\'innovation technologique.'
      : 'I am Mohamed IBRAHIMI, an engineering student passionate about software development and technological innovation.',
    skills: () => language === 'fr'
      ? 'Compétences: React, TypeScript, Three.js, Python, Java, C++, Machine Learning, Cloud Computing'
      : 'Skills: React, TypeScript, Three.js, Python, Java, C++, Machine Learning, Cloud Computing',
    experience: () => language === 'fr'
      ? 'Actuellement stagiaire en développement logiciel chez OCP Group, travaillant sur des solutions innovantes.'
      : 'Currently a software development intern at OCP Group, working on innovative solutions.',
    contact: () => language === 'fr'
      ? 'Email: mohamed.ibrahimi@example.com | LinkedIn: linkedin.com/in/mohamedibrahimi'
      : 'Email: mohamed.ibrahimi@example.com | LinkedIn: linkedin.com/in/mohamedibrahimi',
    clear: () => 'CLEAR',
    theme: () => language === 'fr' ? 'Utilise le commutateur en haut pour changer le thème' : 'Use the theme toggle in the header to change themes'
  };

  const addMessage = (content: string, type: 'user' | 'system') => {
    const message: TerminalMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
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
                  <span className="break-words">{message.content}</span>
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
