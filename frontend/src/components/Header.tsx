
import { Bell, Menu, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthDialog from "./AuthDialog";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="text-xl font-bold text-[#7fcf5f] flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-[#7fcf5f] flex items-center justify-center text-white">
              <Leaf className="h-4 w-4" />
            </div>
            <span className="hidden sm:inline">NutriGuard</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="text-foreground/90 hover:text-[#7fcf5f] transition-colors"
          >
            Dashboard
          </Link>
          <Link 
            to="/add-measurement" 
            className="text-foreground/90 hover:text-[#7fcf5f] transition-colors"
          >
            Add Measurement
          </Link>
          <Link 
            to="/resources" 
            className="text-foreground/90 hover:text-[#7fcf5f] transition-colors"
          >
            Resources
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <AuthDialog />
        </div>
      </div>
    </header>
  );
};

export default Header;
