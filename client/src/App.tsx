import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/hooks/use-cart";
import { FavoritesProvider } from "@/hooks/use-favorites";

import Navigation from "@/components/Navigation";
import CartDrawer from "@/components/CartDrawer";

// Pages
import Home from "@/pages/Home";
import MenuSelection from "@/pages/MenuSelection";
import MenuPage from "@/pages/MenuPage";
import Favorites from "@/pages/Favorites";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/menu-selection" component={MenuSelection} />
      <Route path="/menu" component={MenuPage} />
      <Route path="/favorites" component={Favorites} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <FavoritesProvider>
            <Router />
            <Navigation />
            <CartDrawer />
            <Toaster />
          </FavoritesProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
