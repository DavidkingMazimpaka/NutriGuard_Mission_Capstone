import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ChildProfile from "./pages/ChildProfile";
import AddMeasurement from "./pages/AddMeasurement";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import WelcomePage from "./pages/WelcomePage";
import MalnutritionResults from "./pages/MalnutritionResults";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  const hasVisited = localStorage.getItem('hasVisited');

  // If the user has not visited, set the flag
  if (!hasVisited) {
    localStorage.setItem('hasVisited', 'true');
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Notification components */}
        <Toaster />
        <Sonner />

        {/* Routes */}
        <Routes>
          {/* Public route */}
          <Route path="/welcome" element={<WelcomePage />} />
          
          {/* Protected routes */}
          {hasVisited ? (
            <>
              <Route path="/" element={<Index />} />
              <Route path="/child/:id" element={<ChildProfile />} />
              <Route path="/add-measurement" element={<AddMeasurement />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/malnutrition-results" element={<MalnutritionResults />} />
              
              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/welcome" replace />} />
          )}
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;