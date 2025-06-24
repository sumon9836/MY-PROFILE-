import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VideoUploadProps {
  onVideoSelect: (videoUrl: string) => void;
  currentVideo: string | null;
}

export default function VideoUpload({ onVideoSelect, currentVideo }: VideoUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid File",
        description: "Please select a video file (MP4, WebM, MOV)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      toast({
        title: "File Too Large",
        description: "Please select a video file smaller than 50MB",
        variant: "destructive",
      });
      return;
    }

    const videoUrl = URL.createObjectURL(file);
    onVideoSelect(videoUrl);
    
    toast({
      title: "Video Uploaded!",
      description: "Your custom background video has been set.",
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeVideo = () => {
    onVideoSelect('');
    if (currentVideo) {
      URL.revokeObjectURL(currentVideo);
    }
    toast({
      title: "Video Removed",
      description: "Background video has been removed.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="glass-effect rounded-2xl p-4 max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Video size={18} />
            Background Video
          </h3>
          {currentVideo && (
            <button
              onClick={removeVideo}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {!currentVideo ? (
          <div
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${
              isDragOver 
                ? 'border-purple-400 bg-purple-400/10' 
                : 'border-white/30 hover:border-purple-400 hover:bg-white/5'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto mb-2 text-white/60" size={24} />
            <p className="text-sm text-white/80 mb-1">
              Drop video here or click to upload
            </p>
            <p className="text-xs text-white/60">
              MP4, WebM, MOV (max 50MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        ) : (
          <div className="text-center">
            <div className="w-full h-20 bg-black/30 rounded-lg mb-2 overflow-hidden">
              <video
                src={currentVideo}
                className="w-full h-full object-cover opacity-80"
                muted
              />
            </div>
            <p className="text-xs text-green-400">Custom video active</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}