import { Bell, Menu, Leaf, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthDialog from "./AuthDialog";
import LogoutDialog from "./LogoutDialog";

const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

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

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/welcome", { replace: true });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white/80 backdrop-blur-sm"
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <Link 
                to="/welcome" 
                className="text-xl font-bold text-[#7fcf5f] flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <div className="w-10 h-10 rounded-full bg-[#7fcf5f] flex items-center justify-center text-white shadow-sm">
                  <Leaf className="h-5 w-5" />
                </div>
                <span className="hidden sm:inline text-gray-800">NutriGuard</span>
              </Link>
            </div>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-[#7fcf5f] transition-colors font-medium"
              >
                Dashboard
              </Link>
              <Link 
                to="/add-measurement" 
                className="text-gray-600 hover:text-[#7fcf5f] transition-colors font-medium"
              >
                Add Measurement
              </Link>
              <Link 
                to="/resources" 
                className="text-gray-600 hover:text-[#7fcf5f] transition-colors font-medium"
              >
                Resources
              </Link>
            </nav>
            
            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" size="icon" className="relative hover:bg-[#7fcf5f]/10">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[#7fcf5f]/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-[#7fcf5f]" />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowLogoutDialog(true)}
                      className="text-gray-600 hover:text-[#7fcf5f] hover:bg-[#7fcf5f]/10 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="hidden sm:inline">Logout</span>
                    </Button>
                  </div>
                </>
              ) : (
                <AuthDialog setIsAuthenticated={setIsAuthenticated} />
              )}
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-[#7fcf5f]/10">
                <Menu className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <LogoutDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Header;