
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import AuthDialog from "@/components/AuthDialog";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const WelcomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // This is just for demo purposes
  // In a real app, this would be handled by an auth provider
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto text-center space-y-6">
        <div className="flex items-center justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-[#7fcf5f] flex items-center justify-center text-white mb-4">
            <Leaf className="h-8 w-8" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">NutriGuard</h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Empowering communities with child nutrition monitoring and early intervention
        </p>
        
        <div className="bg-white rounded-xl shadow-xl p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Get Started</h2>
            <p className="text-gray-500">
              Join our platform to track and monitor child nutrition and growth
            </p>
          </div>
          
          <div className="space-y-4">
            <AuthDialog initialOpen={true} setIsAuthenticated={setIsAuthenticated} />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">or continue with demo</span>
              </div>
            </div>
            
            <Button 
              className="w-full bg-[#7fcf5f] hover:bg-[#6cbf4f]"
              onClick={() => setIsAuthenticated(true)}
            >
              Try Demo Access
            </Button>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm">
          By continuing, you agree to NutriGuard's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
