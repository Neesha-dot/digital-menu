import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ChefHat } from "lucide-react";

export default function Splash() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary via-red-600 to-rose-900 flex flex-col items-center justify-center p-6 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]" />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center space-y-6 max-w-md w-full"
      >
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-black/20"
        >
          <ChefHat className="w-12 h-12 text-primary" />
        </motion.div>

        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-accent tracking-wider text-secondary drop-shadow-md"
          >
            Sizzle & Spice
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl font-light text-white/90"
          >
            Premium Fusion Cuisine
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          className="pt-12"
        >
          <Link href="/menu-selection" className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 w-full">
            Start Ordering
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-4 text-sm text-white/60">Tap to experience culinary magic</p>
        </motion.div>
      </motion.div>

      {/* Decorative floating elements */}
      <motion.div 
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 text-6xl opacity-20"
      >
        🌶️
      </motion.div>
      <motion.div 
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-10 text-6xl opacity-20"
      >
        🥘
      </motion.div>
    </div>
  );
}
