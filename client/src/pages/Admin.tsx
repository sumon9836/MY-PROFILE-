import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Eye, Settings, User, Image, Link, FileText, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VideoSelector from "@/components/VideoSelector";

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

export default function Admin() {
  const [customVideoUrl, setCustomVideoUrl] = useState<string>('https://files.catbox.moe/v3dqyc.mp4');
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "Alex",
    title: "Creative Designer & Digital Storyteller",
    description: "Passionate about creating beautiful digital experiences and connecting with amazing people around the world. Let's build something extraordinary together!",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
    aboutImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    instagramUrl: "https://instagram.com",
    facebookUrl: "https://facebook.com",
    whatsappUrl: "https://wa.me/",
    linkedinUrl: "https://linkedin.com",
    skills: ["Design", "Photography", "Storytelling", "Social Media", "Content Creation"]
  });
  const [skillInput, setSkillInput] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    // In a real application, this would save to a database
    localStorage.setItem('portfolioData', JSON.stringify({
      personalInfo,
      customVideoUrl
    }));
    
    toast({
      title: "Changes Saved!",
      description: "Your portfolio has been updated successfully.",
    });
  };

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !personalInfo.skills.includes(skillInput.trim())) {
      setPersonalInfo(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const viewPublicSite = () => {
    window.open('/', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-gray-300 mt-2">Manage your portfolio website content</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={viewPublicSite}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2"
            >
              <Eye size={16} />
              View Public Site
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Video Background Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Video size={24} />
              Background Video
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Current Video URL</label>
                <input
                  type="url"
                  value={customVideoUrl}
                  onChange={(e) => setCustomVideoUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/video.mp4"
                />
              </div>
              
              <div className="relative">
                <VideoSelector 
                  onVideoSelect={setCustomVideoUrl} 
                  currentVideo={customVideoUrl} 
                />
              </div>
            </div>
          </motion.div>

          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <User size={24} />
              Personal Info
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Title</label>
                <input
                  type="text"
                  value={personalInfo.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Description</label>
                <textarea
                  value={personalInfo.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Image size={24} />
              Images
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Profile Image URL</label>
                <input
                  type="url"
                  value={personalInfo.profileImage}
                  onChange={(e) => handleInputChange('profileImage', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {personalInfo.profileImage && (
                  <img src={personalInfo.profileImage} alt="Profile preview" className="w-20 h-20 rounded-full object-cover mt-2" />
                )}
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">About Section Image URL</label>
                <input
                  type="url"
                  value={personalInfo.aboutImage}
                  onChange={(e) => handleInputChange('aboutImage', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {personalInfo.aboutImage && (
                  <img src={personalInfo.aboutImage} alt="About preview" className="w-20 h-12 rounded object-cover mt-2" />
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Settings size={24} />
              Contact Info
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Location</label>
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Social Media URLs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Link size={24} />
              Social Media
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Instagram URL</label>
                <input
                  type="url"
                  value={personalInfo.instagramUrl}
                  onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Facebook URL</label>
                <input
                  type="url"
                  value={personalInfo.facebookUrl}
                  onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">WhatsApp URL</label>
                <input
                  type="url"
                  value={personalInfo.whatsappUrl}
                  onChange={(e) => handleInputChange('whatsappUrl', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={personalInfo.linkedinUrl}
                  onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileText size={24} />
              Skills
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a skill"
                />
                <button
                  onClick={addSkill}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-xl text-white transition-colors"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white/20 px-3 py-1 rounded-full text-sm text-white flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-white/60 hover:text-white text-xs"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}