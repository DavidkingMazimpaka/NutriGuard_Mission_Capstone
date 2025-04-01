import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Leaf, User, Lock, AlertCircle, Users, ClipboardList, FileText, Settings, LogOut, ArrowLeft } from "lucide-react";
import LogoutDialog from "@/components/LogoutDialog";

const HealthcarePortal = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    setIsAuthenticated(true);
    navigate("/");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/welcome", { replace: true });
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link to="/welcome" className="text-xl font-bold text-[#7fcf5f] flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-[#7fcf5f] flex items-center justify-center text-white shadow-sm">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <span className="hidden sm:inline text-gray-800">NutriGuard</span>
                </Link>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#F2FCE2] rounded-full">
                  <div className="h-8 w-8 rounded-full bg-[#7fcf5f]/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-[#7fcf5f]" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Healthcare Worker Portal</span>
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
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1">
              <nav className="bg-white rounded-lg shadow-sm p-4 space-y-2">
                <Link to="/" className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-[#7fcf5f]/10 hover:text-[#7fcf5f]">
                  <Users className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/add-measurement" className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-[#7fcf5f]/10 hover:text-[#7fcf5f]">
                  <ClipboardList className="h-5 w-5" />
                  <span>Add Measurement</span>
                </Link>
                <Link to="/reports" className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-[#7fcf5f]/10 hover:text-[#7fcf5f]">
                  <FileText className="h-5 w-5" />
                  <span>Reports</span>
                </Link>
                <Link to="/settings" className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-[#7fcf5f]/10 hover:text-[#7fcf5f]">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </nav>
            </div>

            {/* Main Dashboard Area */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Healthcare Worker Dashboard</h1>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-[#F2FCE2] rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-[#7fcf5f]/20 flex items-center justify-center">
                        <Users className="h-6 w-6 text-[#7fcf5f]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Patients</p>
                        <h3 className="text-2xl font-bold text-gray-800">1,234</h3>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#FEF7CD] rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-[#f4b740]/20 flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-[#f4b740]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Urgent Cases</p>
                        <h3 className="text-2xl font-bold text-gray-800">23</h3>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#E5DEFF] rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center">
                        <ClipboardList className="h-6 w-6 text-[#8b5cf6]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Today's Assessments</p>
                        <h3 className="text-2xl font-bold text-gray-800">45</h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="h-10 w-10 rounded-full bg-[#7fcf5f]/20 flex items-center justify-center">
                          <User className="h-5 w-5 text-[#7fcf5f]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">New patient assessment completed</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-[#7fcf5f] hover:text-[#7fcf5f]">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <LogoutDialog
          isOpen={showLogoutDialog}
          onClose={() => setShowLogoutDialog(false)}
          onConfirm={handleLogout}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-[#7fcf5f] flex items-center justify-center shadow-lg">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Healthcare Portal</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the healthcare worker dashboard
          </p>
        </div>

        {/* Prevention Message */}
        <div className="bg-[#F2FCE2] rounded-lg p-4 text-center">
          <p className="text-[#7fcf5f] italic font-medium">
            "Prevention is better than cure"
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Empowering healthcare workers to make a difference
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-sm" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#7fcf5f] focus:border-[#7fcf5f] sm:text-sm"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                Organization
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="organization"
                  name="organization"
                  type="text"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#7fcf5f] focus:border-[#7fcf5f] sm:text-sm"
                  placeholder="Enter your organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#7fcf5f] focus:border-[#7fcf5f] sm:text-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#7fcf5f] focus:border-[#7fcf5f] sm:text-sm"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7fcf5f] hover:bg-[#6AA951FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7fcf5f] transition-colors duration-200"
            >
              Sign in
            </Button>
          </div>
        </form>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/welcome"
            className="text-sm text-gray-600 hover:text-[#7fcf5f] transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HealthcarePortal; 