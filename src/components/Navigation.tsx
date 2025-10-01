import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  PieChart, 
  Calculator, 
  Info,
  BookOpen,
  User,
  LogOut
} from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { AuthModal } from "./AuthModal";

export const Navigation = () => {
  const location = useLocation();
  const { user, logout } = useUser();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/spending-tracker", label: "Spending Tracker", icon: PieChart },
    { path: "/loan-calculator", label: "Loan Calculator", icon: Calculator },
    { path: "/about", label: "About", icon: Info },
    { path: "/guide", label: "User Guide", icon: BookOpen },
  ];

  return (
    <>
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">FF</span>
              </div>
              <span className="font-bold text-xl text-foreground">FinanciallyFit</span>
            </Link>
            
            <div className="flex gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? "default" : "ghost"}
                    asChild
                    className="gap-2"
                  >
                    <Link to={item.path}>
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  </Button>
                );
              })}
              
              <div className="ml-4">
                {user ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Welcome, {user.username}</span>
                    <Button
                      onClick={logout}
                      variant="outline"
                      size="sm"
                      className="gap-1"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="hidden sm:inline">Logout</span>
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    variant="outline"
                    size="sm"
                    className="gap-1"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};
