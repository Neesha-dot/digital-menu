import { motion } from "framer-motion";
import { Link } from "wouter";
import { ListChecks, Flame, AlertCircle } from "lucide-react";
import logoImg from "@assets/image_1771094822038.png";

export default function Splash() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-900 flex flex-col items-center justify-center p-6 text-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/food-pattern.svg')] bg-repeat" />
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center space-y-8 max-w-md w-full"
      >
        {/* Logo Section */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto w-40 h-40 relative flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-red-600 rounded-full shadow-2xl" />
          <img 
            src={logoImg} 
            alt="Bomb Rolls & Bowls Logo" 
            className="w-full h-full object-contain relative z-10 p-2"
          />
        </motion.div>

        {/* Branding */}
        <div className="space-y-2">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-accent tracking-tighter text-white drop-shadow-lg uppercase leading-tight"
          >
            BOMB ROLLS & BOWLS
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl font-medium text-yellow-400"
          >
            Explosive Flavors Await
          </motion.p>
        </div>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          className="pt-4"
        >
          <Link href="/menu-selection" className="group relative inline-flex items-center justify-center px-10 py-5 bg-white text-red-600 font-extrabold text-xl rounded-full shadow-2xl hover:shadow-white/20 hover:scale-105 active:scale-95 transition-all duration-300 w-full animate-pulse-subtle">
            EXPLORE OUR MENU 🍜
          </Link>
          <p className="mt-6 text-base font-medium text-white/90">
            Browse dishes • Read descriptions • Order when ready
          </p>
          <p className="mt-1 text-sm text-white/60 italic">
            Take your time exploring while you wait
          </p>
        </motion.div>

        {/* Feature Badges */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center items-center gap-6 pt-6"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-white/10 rounded-lg">
              <ListChecks className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold">Details</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-white/10 rounded-lg">
              <Flame className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold">Spice</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-white/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold">Allergen</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative floating elements */}
      <motion.div 
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 text-6xl opacity-10 pointer-events-none"
      >
        🍜
      </motion.div>
      <motion.div 
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-10 text-6xl opacity-10 pointer-events-none"
      >
        🍱
      </motion.div>
    </div>
  );
}
