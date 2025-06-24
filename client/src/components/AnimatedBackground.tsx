import { motion } from "framer-motion";

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

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 animated-bg animate-gradient"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="absolute inset-0">
        <FloatingShape size={80} top="20%" left="10%" delay={0} />
        <FloatingShape size={120} top="60%" left="80%" delay={2} />
        <FloatingShape size={60} top="80%" left="20%" delay={4} />
        <FloatingShape size={100} top="30%" left="70%" delay={1} />
        <FloatingShape size={70} top="70%" left="60%" delay={3} />
      </div>
    </div>
  );
}
