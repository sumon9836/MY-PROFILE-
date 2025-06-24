import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Save, X, User, Link, FileText, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface AdminPanelProps {
  personalInfo: PersonalInfo;
  onUpdate: (info: PersonalInfo) => void;
}

export default function AdminPanel({ personalInfo, onUpdate }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<PersonalInfo>(personalInfo);
  const [skillInput, setSkillInput] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    onUpdate(editData);
    setIsOpen(false);
    toast({
      title: "Profile Updated!",
      description: "Your personal information has been saved.",
    });
  };

  const addSkill = () => {
    if (skillInput.trim() && !editData.skills.includes(skillInput.trim())) {
      setEditData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      {/* Edit Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 glass-effect rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Edit size={20} />
      </motion.button>

      {/* Admin Panel Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-effect rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <User size={24} />
                  Edit Profile
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl text-white font-semibold transition-colors flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <User size={20} />
                    Personal Info
                  </h3>
                  
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Name</label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Title</label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Creative Designer & Digital Storyteller"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Description</label>
                    <textarea
                      value={editData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      placeholder="Passionate about creating beautiful digital experiences..."
                    />
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Image size={20} />
                    Images
                  </h3>
                  
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Profile Image URL</label>
                    <input
                      type="url"
                      value={editData.profileImage}
                      onChange={(e) => handleInputChange('profileImage', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="https://example.com/profile.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">About Section Image URL</label>
                    <input
                      type="url"
                      value={editData.aboutImage}
                      onChange={(e) => handleInputChange('aboutImage', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="https://example.com/about.jpg"
                    />
                  </div>

                  {/* Contact Info */}
                  <h3 className="text-xl font-semibold text-white mt-6">Contact</h3>
                  
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Location</label>
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Social Media URLs */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Link size={20} />
                    Social Media
                  </h3>
                  
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Instagram URL</label>
                    <input
                      type="url"
                      value={editData.instagramUrl}
                      onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="https://instagram.com/username"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Facebook URL</label>
                    <input
                      type="url"
                      value={editData.facebookUrl}
                      onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="https://facebook.com/username"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">WhatsApp URL</label>
                    <input
                      type="url"
                      value={editData.whatsappUrl}
                      onChange={(e) => handleInputChange('whatsappUrl', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="https://wa.me/1234567890"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">LinkedIn URL</label>
                    <input
                      type="url"
                      value={editData.linkedinUrl}
                      onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <FileText size={20} />
                    Skills
                  </h3>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Add a skill"
                    />
                    <button
                      onClick={addSkill}
                      className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-xl text-white transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {editData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-white/20 px-3 py-1 rounded-full text-sm text-white flex items-center gap-2"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="text-white/60 hover:text-white"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}