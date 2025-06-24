import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Upload, Video, Palette } from "lucide-react";

interface VideoOption {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  description: string;
}

const presetVideos: VideoOption[] = [
  {
    id: 'custom-animation',
    name: 'Custom Animation',
    url: 'https://files.catbox.moe/v3dqyc.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=400&h=300',
    description: 'Your personal custom animation video'
  },
  {
    id: 'abstract-waves',
    name: 'Abstract Waves',
    url: 'https://cdn.pixabay.com/video/2021/08/04/84737-588785835_large.mp4',
    thumbnail: 'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_960_720.jpg',
    description: 'Flowing abstract waves with purple and blue gradients'
  },
  {
    id: 'cosmic-particles',
    name: 'Cosmic Particles',
    url: 'https://cdn.pixabay.com/video/2022/10/28/137019-767055818_large.mp4',
    thumbnail: 'https://cdn.pixabay.com/photo/2022/10/28/02/05/space-7553186_960_720.jpg',
    description: 'Floating particles in deep space with stars'
  },
  {
    id: 'geometric-shapes',
    name: 'Geometric Motion',
    url: 'https://cdn.pixabay.com/video/2022/03/29/113252-691831010_large.mp4',
    thumbnail: 'https://cdn.pixabay.com/photo/2022/03/29/07/14/geometric-7098023_960_720.jpg',
    description: 'Dynamic geometric shapes and patterns'
  }
];

interface VideoSelectorProps {
  onVideoSelect: (videoUrl: string) => void;
  currentVideo: string;
}

export default function VideoSelector({ onVideoSelect, currentVideo }: VideoSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadMode, setUploadMode] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      const videoUrl = URL.createObjectURL(file);
      onVideoSelect(videoUrl);
      setIsOpen(false);
    }
  };

  const selectPresetVideo = (video: VideoOption) => {
    onVideoSelect(video.url);
    setIsOpen(false);
  };

  const useGradientBackground = () => {
    onVideoSelect('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Settings Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 glass-effect rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings size={20} />
      </motion.button>

      {/* Background Selector Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-effect rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Video size={24} />
                  Background Settings
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Toggle between presets and upload */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setUploadMode(false)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    !uploadMode 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Preset Videos
                </button>
                <button
                  onClick={() => setUploadMode(true)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    uploadMode 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Upload Custom
                </button>
              </div>

              {!uploadMode ? (
                <div className="space-y-4">
                  {/* Gradient Background Option */}
                  <motion.div
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      !currentVideo
                        ? 'border-purple-400 bg-purple-400/20'
                        : 'border-white/20 bg-white/5 hover:border-purple-400/50'
                    }`}
                    onClick={useGradientBackground}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg animated-bg animate-gradient"></div>
                      <div>
                        <h3 className="font-semibold text-white flex items-center gap-2">
                          <Palette size={16} />
                          Animated Gradient
                        </h3>
                        <p className="text-sm text-white/70">Beautiful animated gradient background</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Preset Videos */}
                  {presetVideos.map((video) => (
                    <motion.div
                      key={video.id}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        currentVideo === video.url
                          ? 'border-purple-400 bg-purple-400/20'
                          : 'border-white/20 bg-white/5 hover:border-purple-400/50'
                      }`}
                      onClick={() => selectPresetVideo(video)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={video.thumbnail}
                          alt={video.name}
                          className="w-16 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-white">{video.name}</h3>
                          <p className="text-sm text-white/70">{video.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <div className="border-2 border-dashed border-white/30 rounded-2xl p-8 hover:border-purple-400 transition-all duration-300">
                    <Upload className="mx-auto mb-4 text-white/60" size={48} />
                    <h3 className="text-lg font-semibold text-white mb-2">Upload Your Video</h3>
                    <p className="text-white/70 mb-4">Choose a video file from your device</p>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-3 rounded-xl font-semibold text-white cursor-pointer hover:from-purple-600 hover:to-pink-700 transition-all duration-300"
                    >
                      Choose File
                    </label>
                    <p className="text-xs text-white/50 mt-2">Supports MP4, WebM, MOV (max 50MB)</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}