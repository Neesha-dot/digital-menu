import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useCategories, useItems } from "@/hooks/use-menu";
import { motion, useScroll, useTransform } from "framer-motion";
import MenuCard from "@/components/MenuCard";
import RecipeModal from "@/components/RecipeModal";
import { ItemResponse } from "@shared/routes";
import { Search, SlidersHorizontal, Leaf, Flame } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce"; // We'll create this simple hook inside the component for simplicity if needed, or better, just inline the logic.

// Debounce helper
function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function MenuPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const filterParam = searchParams.get('filter'); // 'veg' or 'non-veg'

  const [activeCategory, setActiveCategory] = useState<number | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<ItemResponse | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounceValue(searchTerm, 300);
  
  // Convert URL param to boolean filter
  const [isVegFilter, setIsVegFilter] = useState<boolean | undefined>(
    filterParam === 'veg' ? true : filterParam === 'non-veg' ? false : undefined
  );

  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { data: items, isLoading: loadingItems } = useItems({
    categoryId: activeCategory,
    isVeg: isVegFilter,
    search: debouncedSearch
  });

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);

  // Handle category selection
  const handleCategoryClick = (id: number | undefined) => {
    setActiveCategory(id === activeCategory ? undefined : id);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Hero Section */}
      <div className="relative h-[35vh] md:h-[40vh] overflow-hidden bg-primary/5">
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10"
        >
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-widest uppercase text-sm mb-2"
          >
            Taste the Magic
          </motion.span>
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-7xl font-accent text-foreground mb-4"
          >
            Our Menu
          </motion.h1>
          <div className="w-24 h-1 bg-secondary rounded-full" />
        </motion.div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          
          {/* Search & Toggles */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="text"
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-border">
              <button 
                onClick={() => setIsVegFilter(undefined)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isVegFilter === undefined ? 'bg-gray-800 text-white shadow-md' : 'text-muted-foreground hover:bg-gray-50'}`}
              >
                All
              </button>
              <button 
                onClick={() => setIsVegFilter(true)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1 ${isVegFilter === true ? 'bg-green-500 text-white shadow-md' : 'text-muted-foreground hover:bg-green-50'}`}
              >
                <Leaf className="w-3 h-3" /> Veg
              </button>
              <button 
                onClick={() => setIsVegFilter(false)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1 ${isVegFilter === false ? 'bg-red-500 text-white shadow-md' : 'text-muted-foreground hover:bg-red-50'}`}
              >
                <Flame className="w-3 h-3" /> Non-Veg
              </button>
            </div>
          </div>

          {/* Horizontal Categories */}
          <div className="overflow-x-auto no-scrollbar pb-2">
            <div className="flex gap-3 min-w-max">
              <button
                onClick={() => handleCategoryClick(undefined)}
                className={`px-6 py-2 rounded-full border transition-all whitespace-nowrap ${
                  activeCategory === undefined 
                    ? 'bg-secondary text-secondary-foreground border-secondary font-bold shadow-md' 
                    : 'bg-white border-border text-muted-foreground hover:border-secondary hover:text-secondary-foreground'
                }`}
              >
                All Items
              </button>
              {categories?.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-6 py-2 rounded-full border transition-all whitespace-nowrap ${
                    activeCategory === cat.id 
                      ? 'bg-secondary text-secondary-foreground border-secondary font-bold shadow-md' 
                      : 'bg-white border-border text-muted-foreground hover:border-secondary hover:text-secondary-foreground'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loadingItems ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-[420px] bg-white rounded-3xl animate-pulse bg-gray-200" />
            ))}
          </div>
        ) : items?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-accent text-muted-foreground mb-2">No items found 😔</p>
            <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
            <button 
              onClick={() => { setSearchTerm(""); setIsVegFilter(undefined); setActiveCategory(undefined); }}
              className="mt-6 px-6 py-2 bg-primary text-white rounded-full font-bold hover:opacity-90"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            {items?.map((item) => (
              <MenuCard 
                key={item.id} 
                item={item} 
                onOpenDetails={() => setSelectedItem(item)}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Recipe Details Modal */}
      <RecipeModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
}
