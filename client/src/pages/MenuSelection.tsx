import { motion } from "framer-motion";
import { Link } from "wouter";
import { Leaf, Flame } from "lucide-react";

export default function MenuSelection() {
  return (
    <div className="min-h-screen bg-background p-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
      <div className="absolute top-8 left-0 right-0 text-center">
        <h2 className="text-3xl md:text-4xl font-accent text-primary">Choose Your Preference</h2>
        <p className="text-muted-foreground mt-2">Tap a card to explore our menu</p>
      </div>

      {/* Veg Option */}
      <Link href="/menu?filter=veg">
        <motion.div
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative w-full md:w-80 h-[400px] bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-green-500 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80" 
            alt="Vegetarian" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-accent mb-2">Vegetarian</h3>
            <p className="text-green-100 text-sm">Fresh, organic, and delicious plant-based recipes.</p>
          </div>
        </motion.div>
      </Link>

      {/* Divider */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-border md:hidden" />
        <span className="font-accent text-2xl text-muted-foreground">OR</span>
        <div className="w-px h-12 bg-border md:hidden" />
      </div>

      {/* Non-Veg Option */}
      <Link href="/menu?filter=non-veg">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative w-full md:w-80 h-[400px] bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-red-500 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80" 
            alt="Non-Vegetarian" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
            <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <Flame className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-accent mb-2">Non-Veg</h3>
            <p className="text-red-100 text-sm">Sizzling steaks, grilled chicken, and savory delights.</p>
          </div>
        </motion.div>
      </Link>
      
      {/* View All option */}
      <div className="absolute bottom-24 md:bottom-12">
        <Link href="/menu" className="text-muted-foreground hover:text-primary font-semibold border-b-2 border-transparent hover:border-primary transition-colors pb-1">
          View Full Menu
        </Link>
      </div>
    </div>
  );
}
