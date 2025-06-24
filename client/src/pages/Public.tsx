import { useState, useEffect } from "react";
import VideoBackground from "@/components/VideoBackground";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SocialMediaGrid from "@/components/SocialMediaGrid";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

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

const defaultPersonalInfo: PersonalInfo = {
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
};

export default function Public() {
  const [customVideoUrl, setCustomVideoUrl] = useState<string>('https://files.catbox.moe/v3dqyc.mp4');
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(defaultPersonalInfo);

  useEffect(() => {
    // Load data from localStorage (set by admin panel)
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.personalInfo) {
          setPersonalInfo(parsed.personalInfo);
        }
        if (parsed.customVideoUrl) {
          setCustomVideoUrl(parsed.customVideoUrl);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <VideoBackground customVideoUrl={customVideoUrl} />
      <Navigation />
      <HeroSection personalInfo={personalInfo} />
      <SocialMediaGrid personalInfo={personalInfo} />
      <AboutSection personalInfo={personalInfo} />
      <ContactSection personalInfo={personalInfo} />
      <Footer personalInfo={personalInfo} />
    </div>
  );
}