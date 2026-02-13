import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/use-cart";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, total, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-border flex justify-between items-center bg-primary text-white">
              <h2 className="text-2xl font-accent tracking-wide flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" /> Your Order
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-sm">Start adding some delicious items!</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 items-center bg-secondary/5 p-4 rounded-xl border border-secondary/20"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold truncate">{item.name}</h4>
                      <p className="text-primary font-semibold">${(item.price * item.quantity / 100).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white rounded-lg p-1 shadow-sm border border-border">
                      <button 
                        onClick={() => item.quantity > 1 ? updateQuantity(item.id, -1) : removeFromCart(item.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-primary transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-border space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${(total / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (8%)</span>
                    <span>${(total * 0.08 / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-foreground pt-2 border-t border-dashed border-gray-300">
                    <span>Total</span>
                    <span>${(total * 1.08 / 100).toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => { alert('Proceeding to checkout!'); clearCart(); setIsOpen(false); }}
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
                >
                  Checkout Now <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
