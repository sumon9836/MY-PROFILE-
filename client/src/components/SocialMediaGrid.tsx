import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

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

const SocialCard = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  gradientFrom, 
  gradientTo, 
  link,
  delay 
}: {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  gradientFrom: string;
  gradientTo: string;
  link: string;
  delay: number;
}) => (
  <motion.div 
    className="glass-effect rounded-3xl p-8 text-center group hover:transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 hover:shadow-2xl"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
  >
    <div className="mb-6">
      <i className={`${icon} text-6xl group-hover:scale-110 transition-transform duration-300`} />
    </div>
    <h3 className="text-2xl font-semibold mb-4 text-white">{title}</h3>
    <p className="text-white/70 mb-6">
      {description}
    </p>
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center bg-gradient-to-r ${gradientFrom} ${gradientTo} px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 text-white gap-2`}
    >
      {buttonText}
      <ExternalLink size={16} />
    </a>
  </motion.div>
);

interface SocialMediaGridProps {
  personalInfo: PersonalInfo;
}

export default function SocialMediaGrid({ personalInfo }: SocialMediaGridProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gradient">
            Connect With Me
          </h2>
          <p className="text-center text-white/80 text-lg">
            Follow my journey and let's stay connected across all platforms
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <SocialCard
            icon="fab fa-instagram text-pink-400 group-hover:text-pink-300"
            title="Instagram"
            description="Daily inspiration and behind-the-scenes moments"
            buttonText="Follow Me"
            gradientFrom="from-pink-500"
            gradientTo="to-purple-600"
            link={personalInfo.instagramUrl}
            delay={0}
          />
          
          <SocialCard
            icon="fab fa-facebook text-blue-400 group-hover:text-blue-300"
            title="Facebook"
            description="Updates, events, and community discussions"
            buttonText="Connect"
            gradientFrom="from-blue-500"
            gradientTo="to-indigo-600"
            link={personalInfo.facebookUrl}
            delay={0.2}
          />
          
          <SocialCard
            icon="fab fa-whatsapp text-green-400 group-hover:text-green-300"
            title="WhatsApp"
            description="Direct messaging for collaborations and chats"
            buttonText="Message"
            gradientFrom="from-green-500"
            gradientTo="to-emerald-600"
            link={personalInfo.whatsappUrl}
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}
