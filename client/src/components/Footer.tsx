import { motion } from "framer-motion";

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

interface FooterProps {
  personalInfo: PersonalInfo;
}

export default function Footer({ personalInfo }: FooterProps) {
  return (
    <footer className="py-12 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="flex justify-center space-x-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <a 
            href={personalInfo.instagramUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-pink-400 transition-colors duration-300 hover:scale-110 transform"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a 
            href={personalInfo.facebookUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a 
            href={personalInfo.whatsappUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-green-400 transition-colors duration-300 hover:scale-110 transform"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a 
            href={personalInfo.linkedinUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-purple-400 transition-colors duration-300 hover:scale-110 transform"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </motion.div>
        <motion.p 
          className="text-white/60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          © 2024 {personalInfo.name} Portfolio. Made with ❤️ and creativity.
        </motion.p>
      </div>
    </footer>
  );
}
