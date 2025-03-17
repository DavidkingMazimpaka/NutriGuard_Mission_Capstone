import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ChildProfile from "./pages/ChildProfile";
import AddMeasurement from "./pages/AddMeasurement";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import WelcomePage from "./pages/WelcomePage";
import MalnutritionResults from "./pages/MalnutritionResults";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/" element={<Index />} />
          <Route path="/child/:id" element={<ChildProfile />} />
          <Route path="/add-measurement" element={<AddMeasurement />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/malnutrition-results" element={<MalnutritionResults />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
