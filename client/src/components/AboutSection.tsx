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

interface AboutSectionProps {
  personalInfo: PersonalInfo;
}

export default function AboutSection({ personalInfo }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="glass-effect rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient text-center">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img 
                src={personalInfo.aboutImage} 
                alt="Creative workspace lifestyle" 
                className="rounded-2xl shadow-xl w-full h-auto hover:scale-105 transition-transform duration-500" 
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-lg leading-relaxed mb-6 text-white/90">
                I'm a passionate creative professional who loves bringing ideas to life through design and storytelling. With a keen eye for aesthetics and a heart for meaningful connections, I strive to create content that inspires and engages.
              </p>
              
              <p className="text-lg leading-relaxed mb-8 text-white/90">
                When I'm not designing, you'll find me exploring new places, trying different cuisines, or diving into the latest design trends. I believe in the power of visual storytelling to bring people together and create lasting memories.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {personalInfo.skills.map((skill, index) => (
                  <motion.span 
                    key={skill}
                    className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium text-white"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
