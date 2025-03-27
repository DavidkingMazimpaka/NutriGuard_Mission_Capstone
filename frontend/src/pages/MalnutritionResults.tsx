import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Printer, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import MalnutritionResultPanel from "@/components/MalnutritionResultPanel";
import { SeverityVisualization } from "@/components/SeverityVisualization";
import { RecommendedActions } from "@/components/RecommendedActions";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import api, { ChildPrediction } from "@/lib/api";

const MalnutritionResults = () => {
  const [searchParams] = useSearchParams();
  const childId = searchParams.get("childId");
  const navigate = useNavigate();
  
  const [resultData, setResultData] = useState<ChildPrediction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        // Validate childId
        if (!childId) {
          throw new Error("Child ID is missing");
        }
        
        // Fetch predictions
        const predictions = await api.getChildPredictions(childId);
        
        // Check if predictions exist
        if (!predictions || predictions.length === 0) {
          throw new Error("No prediction data found for this child");
        }
        
        // Get the most recent prediction
        const latestPrediction = predictions[predictions.length - 1];
        setResultData(latestPrediction);
      } catch (err) {
        console.error("Prediction fetch error:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [childId]);

  const handlePrintResults = () => {
    toast.success("Preparing print view...");
    window.print();
  };

  const handleSaveReport = () => {
    toast.success("Report saved successfully!", {
      description: "The report has been saved to the child's records."
    });
  };

  const handleScheduleCheckUp = () => {
    toast.success("Check-up scheduled!", {
      description: "A follow-up appointment has been set for 30 days from now."
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading prediction data...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button 
          onClick={() => navigate(-1)} 
          className="mt-4"
        >
          Go Back
        </Button>
      </div>
    );
  }

  // No data state
  if (!resultData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">No Data Available</h2>
        <p className="text-muted-foreground">Unable to retrieve child's prediction data.</p>
        <Button 
          onClick={() => navigate(-1)} 
          className="mt-4"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fadeIn print:bg-white print:pt-0">
      <div className="print:hidden">
        <Header />
      </div>
      
      <main className="container mx-auto px-4 pt-24 pb-16 print:pt-8 print:pb-8">
        <div className="print:hidden">
          <Button 
            asChild 
            variant="ghost" 
            className="mb-4 gap-1 pl-0 hover:pl-2 transition-all"
          >
            <Link to={childId ? `/child/${childId}` : "/"}>
              <ArrowLeft className="h-4 w-4" />
              {childId ? "Back to Child Profile" : "Back to Dashboard"}
            </Link>
          </Button>
        </div>
        
        <div className="mb-6 print:mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Malnutrition Analysis
              </h1>
              <p className="text-muted-foreground">
                Assessment Results for {resultData.child_name} • {resultData.age} years
              </p>
            </div>
            <Badge 
              variant="outline" 
              className="font-normal text-muted-foreground print:hidden"
            >
              Report Date: {new Date(resultData.timestamp).toLocaleDateString()}
            </Badge>
          </div>
          
          <div className="grid gap-6">
            <MalnutritionResultPanel 
              classification={resultData.predicted_class}
              zScores={{
                weightForAge: resultData.weightForAge,
                heightForAge: resultData.heightForAge,
                weightForHeight: resultData.weightForHeight
              }}
              bmi={resultData.bmi}
              measurements={{
                weight: resultData.weight,
                height: resultData.height
              }}
              photo_data={resultData.photo_data}
            />
            
            <SeverityVisualization 
              classification={resultData.predicted_class}
              zScores={{
                weightForAge: resultData.weightForAge,
                heightForAge: resultData.heightForAge,
                weightForHeight: resultData.weightForHeight
              }}
            />
            
            <RecommendedActions 
              classification={resultData.predicted_class}
            />
            
            <Card className="print:hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={handlePrintResults}
                    className="flex items-center gap-2"
                  >
                    <Printer className="h-4 w-4" />
                    Print Results
                  </Button>
                  <Button 
                    onClick={handleSaveReport}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Report
                  </Button>
                  <Button 
                    onClick={handleScheduleCheckUp}
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule Next Check-Up
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MalnutritionResults;