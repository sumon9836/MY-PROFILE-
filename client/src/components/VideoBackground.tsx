import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface VideoBackgroundProps {
  customVideoUrl?: string;
}

const FloatingShape = ({ size, top, left, delay }: { size: number; top: string; left: string; delay: number }) => (
  <motion.div
    className="absolute rounded-full bg-white/10"
    style={{
      width: size,
      height: size,
      top,
      left,
    }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export default function VideoBackground({ customVideoUrl }: VideoBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (customVideoUrl && videoRef.current) {
      setVideoLoaded(false);
      setVideoError(false);
      videoRef.current.load();
    }
  }, [customVideoUrl]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Custom or Default Video Background */}
      {(customVideoUrl || !videoError) && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ filter: 'brightness(0.4) contrast(1.1)' }}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        >
          {customVideoUrl ? (
            <source src={customVideoUrl} type="video/mp4" />
          ) : (
            <>
              <source src="https://files.catbox.moe/v3dqyc.mp4" type="video/mp4" />
              <source src="https://cdn.pixabay.com/video/2022/10/28/137019-767055818_large.mp4" type="video/mp4" />
            </>
          )}
        </video>
      )}
      
      {/* Animated gradient background (fallback or while video loads) */}
      <motion.div
        className={`absolute inset-0 animated-bg animate-gradient transition-opacity duration-1000 ${
          videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
        }`}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      
      {/* Floating shapes overlay */}
      <div className="absolute inset-0 opacity-60">
        <FloatingShape size={80} top="20%" left="10%" delay={0} />
        <FloatingShape size={120} top="60%" left="80%" delay={2} />
        <FloatingShape size={60} top="80%" left="20%" delay={4} />
        <FloatingShape size={100} top="30%" left="70%" delay={1} />
        <FloatingShape size={70} top="70%" left="60%" delay={3} />
      </div>
    </div>
  );
}