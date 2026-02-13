import { useState } from "react";
import { motion } from "framer-motion";
import { ItemResponse } from "@shared/routes";
import { Heart, Plus, Info, Flame, Leaf } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useFavorites } from "@/hooks/use-favorites";

interface MenuCardProps {
  item: ItemResponse;
  onOpenDetails: () => void;
}

export default function MenuCard({ item, onOpenDetails }: MenuCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(item.id);

  // Helper to get image URL (placeholder fallback)
  const imageUrl = item.image || `https://source.unsplash.com/400x300/?food,${item.name.replace(/ /g, ',')}`;

  return (
    <div className="relative group w-full h-[420px] perspective-1000">
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-500 ease-in-out"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-lg border border-border overflow-hidden flex flex-col">
          <div className="relative h-[55%] overflow-hidden">
            <img 
              src={imageUrl} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                className={`p-2 rounded-full backdrop-blur-md transition-colors ${isFav ? 'bg-red-50 text-red-500' : 'bg-black/20 text-white hover:bg-black/30'}`}
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>
            {item.isVeg && (
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <Leaf className="w-3 h-3" /> VEG
              </div>
            )}
          </div>
          
          <div className="p-5 flex flex-col flex-1 justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl leading-tight text-foreground line-clamp-2">{item.name}</h3>
                <span className="font-bold text-lg text-primary whitespace-nowrap">
                  ${(item.price / 100).toFixed(2)}
                </span>
              </div>
              <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-1">
                {Array.from({ length: item.spiceLevel || 0 }).map((_, i) => (
                  <Flame key={i} className="w-4 h-4 text-orange-500 fill-orange-500" />
                ))}
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
                  className="p-3 rounded-xl bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 transition-colors"
                  aria-label="View Info"
                >
                  <Info className="w-5 h-5" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-3xl shadow-lg border border-border p-6 flex flex-col justify-between bg-[url('/pattern-bg.png')] bg-opacity-5">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-accent text-2xl text-primary">Chef's Secret</h3>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Back to photo
              </button>
            </div>
            
            <div className="space-y-4">
              {item.ingredients && (
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Key Ingredients</h4>
                  <div className="flex flex-wrap gap-2">
                    {(item.ingredients as string[]).map((ing, i) => (
                      <span key={i} className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded-md border border-secondary/30">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {item.foundation && (
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-1">Base</h4>
                  <p className="text-sm font-medium">{item.foundation}</p>
                </div>
              )}

              {item.chefSecret && (
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <p className="text-sm italic text-yellow-800">"{item.chefSecret}"</p>
                </div>
              )}
            </div>
          </div>
          
          <button 
            onClick={onOpenDetails}
            className="w-full py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
          >
            View Full Recipe
          </button>
        </div>
      </motion.div>
    </div>
  );
}
