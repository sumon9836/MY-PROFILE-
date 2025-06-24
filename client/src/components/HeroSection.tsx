import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  profileImage: string;
  aboutImage: string;
  email: string;
  phone: string;
  location: string;
  instagramUrl: string;
  facebookUrl: string;
  whatsappUrl: string;
  linkedinUrl: string;
  skills: string[];
}

interface HeroSectionProps {
  personalInfo: PersonalInfo;
}

export default function HeroSection({ personalInfo }: HeroSectionProps) {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          className="mb-8"
          animate={{
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img 
            src={personalInfo.profileImage} 
            alt="Professional portrait" 
            className="w-48 h-48 md:w-64 md:h-64 rounded-full mx-auto object-cover shadow-2xl border-4 border-white/20 transition-all duration-500 hover:scale-105 hover:brightness-110" 
          />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-gradient">Hello, I'm {personalInfo.name}</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-8 text-white/90 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {personalInfo.title}
        </motion.p>
        
        <motion.p 
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-white/80"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {personalInfo.description}
        </motion.p>
        
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button 
            onClick={scrollToAbout}
            className="bg-white/20 hover:bg-white/30 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 glass-effect hover:transform hover:scale-105 text-white flex items-center gap-2"
          >
            Discover More
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown size={20} />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
