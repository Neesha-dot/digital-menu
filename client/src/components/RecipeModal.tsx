import { ItemResponse } from "@shared/routes";
import { X, Flame, Leaf, Wheat, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";

interface RecipeModalProps {
  item: ItemResponse | null;
  onClose: () => void;
}

export default function RecipeModal({ item, onClose }: RecipeModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'nutrition'>('details');
  const { addToCart } = useCart();

  if (!item) return null;

  // Safe type casting for JSON fields
  const nutrition = item.nutritionalInfo as { calories: number; protein: number; carbs: number; fat: number } | undefined;
  const allergens = item.allergens as string[] | undefined;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-6"
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-background w-full max-w-2xl max-h-[90vh] md:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header Image */}
          <div className="relative h-64 md:h-72 shrink-0">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                {item.isVeg ? (
                  <span className="bg-green-500 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                    <Leaf className="w-3 h-3" /> VEG
                  </span>
                ) : (
                  <span className="bg-red-500 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                    <Flame className="w-3 h-3" /> NON-VEG
                  </span>
                )}
                {item.spiceLevel && item.spiceLevel > 0 && (
                  <div className="flex">
                    {Array.from({ length: item.spiceLevel }).map((_, i) => (
                      <Flame key={i} className="w-4 h-4 text-orange-400 fill-orange-400" />
                    ))}
                  </div>
                )}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-accent tracking-wide">{item.name}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="flex items-center gap-6 border-b border-border pb-4 mb-6">
              <button 
                onClick={() => setActiveTab('details')}
                className={`text-lg font-bold pb-1 relative ${activeTab === 'details' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Recipe Details
                {activeTab === 'details' && <motion.div layoutId="modal-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
              </button>
              <button 
                onClick={() => setActiveTab('nutrition')}
                className={`text-lg font-bold pb-1 relative ${activeTab === 'nutrition' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Nutrition
                {activeTab === 'nutrition' && <motion.div layoutId="modal-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
              </button>
            </div>

            <div className="space-y-6">
              {activeTab === 'details' ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-lg leading-relaxed text-foreground/80">{item.description}</p>
                  
                  {item.preparation && (
                    <div className="bg-secondary/10 p-5 rounded-2xl border border-secondary/20">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <Flame className="w-5 h-5 text-orange-500" /> Preparation Style
                      </h3>
                      <p className="text-sm md:text-base">{item.preparation}</p>
                    </div>
                  )}

                  {allergens && allergens.length > 0 && (
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                        <Wheat className="w-4 h-4" /> Allergens
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {allergens.map((allergen, i) => (
                          <span key={i} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                            {allergen}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {nutrition ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-2xl border border-border shadow-sm text-center">
                        <span className="block text-2xl font-bold text-primary">{nutrition.calories}</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Calories</span>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-border shadow-sm text-center">
                        <span className="block text-2xl font-bold text-blue-500">{nutrition.protein}g</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Protein</span>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-border shadow-sm text-center">
                        <span className="block text-2xl font-bold text-yellow-500">{nutrition.carbs}g</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Carbs</span>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-border shadow-sm text-center">
                        <span className="block text-2xl font-bold text-red-400">{nutrition.fat}g</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Fat</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      <Activity className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>Nutritional information not available for this item.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-6 border-t border-border bg-white flex justify-between items-center gap-4">
            <div className="text-2xl font-bold text-primary">
              ${(item.price / 100).toFixed(2)}
            </div>
            <button 
              onClick={() => { addToCart(item); onClose(); }}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 active:scale-95 transition-all"
            >
              Add to Order
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
