import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Baby, Apple, Carrot, BookOpen, Users } from "lucide-react";
import AuthDialog from "@/components/AuthDialog";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <section className="bg-gradient-to-b from-[#fde1d3] to-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>

        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="max-w-xl animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-[#7fcf5f] flex items-center justify-center text-white">
                <Leaf className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800">NutriGuard</h1>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Empowering Healthy Futures for Every Child in Rwanda.
            </h2>

            <p className="text-xl text-gray-700 mb-8">
              Welcome to NutriGuard! Our mission is to help parents and caregivers detect early
              signs of malnutrition in children under five. We provide tools and resources to
              ensure every child has a healthy start in life.
            </p>
          </div>

          {/* Right Illustration */}
          <div className="w-full max-w-md animate-float">
            <div className="relative">
              <div className="absolute -top-20 -left-10 h-24 w-24 rounded-full bg-[#FEF7CD] animate-float" style={{ animationDelay: "0.5s" }}></div>
              <div className="absolute -bottom-10 -right-5 h-20 w-20 rounded-full bg-[#E5DEFF] animate-float" style={{ animationDelay: "1s" }}></div>
              <div className="h-72 w-72 mx-auto bg-[#FFDEE2] rounded-full flex items-center justify-center">
                <div className="h-56 w-56 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
                  <Baby className="h-32 w-32 text-[#7fcf5f]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Worker Portal Section */}
      <div className="container mx-auto px-4 mt-8 text-center">
        <AuthDialog
          initialOpen={false}
          setIsAuthenticated={setIsAuthenticated}
          trigger={
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-[#39791FFF] text-[#7fcf5f] hover:bg-[#6AA951FF]/10"
            >
              Healthcare Worker Portal
            </Button>
          }
        />
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How NutriGuard Helps</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#F2FCE2] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow animate-slideIn" style={{ animationDelay: "0.1s" }}>
              <div className="h-14 w-14 rounded-full bg-[#7fcf5f]/20 flex items-center justify-center mb-4">
                <Carrot className="h-7 w-7 text-[#7fcf5f]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy-to-use Tools</h3>
              <p className="text-gray-700">
                Simple tracking tools help you monitor your child's growth, nutrition status, and get personalized recommendations with just a few clicks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#FEF7CD] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow animate-slideIn" style={{ animationDelay: "0.2s" }}>
              <div className="h-14 w-14 rounded-full bg-[#f4b740]/20 flex items-center justify-center mb-4">
                <BookOpen className="h-7 w-7 text-[#f4b740]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Advice</h3>
              <p className="text-gray-700">
                Access evidence-based resources and personalized recommendations from nutrition experts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#E5DEFF] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow animate-slideIn" style={{ animationDelay: "0.3s" }}>
              <div className="h-14 w-14 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-[#8b5cf6]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Support</h3>
              <p className="text-gray-700">
                Connect with healthcare providers and other parents to share experiences and get support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#F1F0FB]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Ensure Your Child's Healthy Future?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of parents who are taking proactive steps to monitor and improve their children's nutrition.
          </p>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-[#7fcf5f] text-[#7fcf5f] hover:bg-[#7fcf5f]/10"
            onClick={() => navigate("/resources")}
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-[#7fcf5f] flex items-center justify-center text-white">
                <Leaf className="h-4 w-4" />
              </div>
              <span className="font-bold text-gray-800">NutriGuard</span>
            </div>

            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} NutriGuard. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
