import { Link, useLocation } from "wouter";
import { Home, Menu, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [location] = useLocation();
  const { count, setIsOpen } = useCart();

  // Don't show nav on splash screen
  if (location === "/") return null;

  const links = [
    { href: "/menu-selection", icon: Home, label: "Start" },
    { href: "/menu", icon: Menu, label: "Menu" },
    { href: "/favorites", icon: Heart, label: "Favorites" },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md rounded-full shadow-2xl border border-white/20 px-6 py-3 flex items-center gap-6 md:gap-8 max-w-[90vw]">
      {links.map((link) => {
        const isActive = location === link.href;
        return (
          <Link key={link.href} href={link.href} className={`relative p-2 rounded-full transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            <link.icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        );
      })}

      <div className="w-px h-6 bg-border mx-1" />

      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-foreground hover:text-primary transition-colors"
      >
        <ShoppingBag className="w-6 h-6" />
        <AnimatePresence>
          {count > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white"
            >
              {count}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </nav>
  );
}
