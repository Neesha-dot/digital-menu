import { useItems } from "@/hooks/use-menu";
import { useFavorites } from "@/hooks/use-favorites";
import { Link } from "wouter";
import { ArrowLeft, Heart } from "lucide-react";
import MenuCard from "@/components/MenuCard";
import RecipeModal from "@/components/RecipeModal";
import { useState } from "react";
import { ItemResponse } from "@shared/routes";

export default function Favorites() {
  const { favorites } = useFavorites();
  const { data: allItems, isLoading } = useItems();
  const [selectedItem, setSelectedItem] = useState<ItemResponse | null>(null);

  const favoriteItems = allItems?.filter(item => favorites.includes(item.id)) || [];

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/menu" className="p-2 rounded-full bg-white hover:bg-gray-100 border border-border transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-accent text-primary flex items-center gap-2">
            <Heart className="fill-current w-6 h-6" /> Your Favorites
          </h1>
        </div>

        {isLoading ? (
          <div className="text-center py-20">Loading your favorites...</div>
        ) : favoriteItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-border shadow-sm">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-200" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">Heart items from the menu to save them here!</p>
            <Link href="/menu" className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteItems.map((item) => (
              <MenuCard 
                key={item.id} 
                item={item} 
                onOpenDetails={() => setSelectedItem(item)}
              />
            ))}
          </div>
        )}
      </div>

      <RecipeModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
}
