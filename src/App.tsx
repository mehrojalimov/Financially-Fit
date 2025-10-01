import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider, useUser } from "./contexts/UserContext";
import { Navigation } from "./components/Navigation";
import Home from "./pages/Home";
import SpendingTracker from "./pages/SpendingTracker";
import LoanCalculator from "./pages/LoanCalculator";
import About from "./pages/About";
import UserGuide from "./pages/UserGuide";
import NotFound from "./pages/NotFound";
import { AuthModal } from "./components/AuthModal";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user } = useUser();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Show auth modal if user is not logged in
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowAuthModal(false);
    }
  }, [user]);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spending-tracker" element={<SpendingTracker />} />
        <Route path="/loan-calculator" element={<LoanCalculator />} />
        <Route path="/about" element={<About />} />
        <Route path="/guide" element={<UserGuide />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
