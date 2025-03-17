
import Header from "@/components/Header";
import MeasurementForm from "@/components/MeasurementForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { MeasurementData } from "@/lib/api";

const AddMeasurement = () => {
  const [searchParams] = useSearchParams();
  const childId = searchParams.get("childId");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (data: MeasurementData) => {
    console.log("Measurement submitted:", data);
    
    // Navigate based on the context
    if (childId) {
      toast({
        title: "Measurement added",
        description: "The measurement has been successfully added to the child's profile.",
      });
      navigate(`/child/${childId}`);
    } else {
      // For new child, navigate to malnutrition results
      navigate("/malnutrition-results", { 
        state: { measurementData: data }
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-background animate-fadeIn">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <Button asChild variant="ghost" className="mb-4 gap-1 pl-0 hover:pl-2 transition-all">
          <Link to={childId ? `/child/${childId}` : "/"}>
            <ArrowLeft className="h-4 w-4" />
            {childId ? "Back to Child Profile" : "Back to Dashboard"}
          </Link>
        </Button>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            {childId ? "Add New Measurement" : "Register New Child for Prediction"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {childId 
              ? "Record new growth metrics for an existing child" 
              : "Register a new child and their initial measurements for analysis"}
          </p>
        </div>
        
        <MeasurementForm onSubmit={handleSubmit} childId={childId ?? undefined} />
      </main>
    </div>
  );
};

export default AddMeasurement;
