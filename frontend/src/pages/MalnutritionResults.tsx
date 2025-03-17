
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Printer, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MalnutritionResultPanel } from "@/components/MalnutritionResultPanel";
import { SeverityVisualization } from "@/components/SeverityVisualization";
import { RecommendedActions } from "@/components/RecommendedActions";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const MalnutritionResults = () => {
  const [searchParams] = useSearchParams();
  const childId = searchParams.get("childId");
  const navigate = useNavigate();
  
  // In a real app, these would come from API/backend
  // Mock data for demonstration
  const [resultData] = useState({
    childName: "Maria Garcia",
    age: "3 years 5 months",
    gender: "female",
    classification: "moderate", // low, moderate, high, critical
    zScores: {
      weightForAge: -1.8,
      heightForAge: -1.5,
      weightForHeight: -1.9
    },
    bmi: 15.2,
    measurements: {
      weight: 13.2,
      height: 95.6,
      muac: 13.1,
    },
    assessmentDate: new Date().toISOString(),
  });

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
                Assessment Results for {resultData.childName} • {resultData.age}
              </p>
            </div>
            <Badge 
              variant="outline" 
              className="font-normal text-muted-foreground print:hidden"
            >
              Report Date: {new Date(resultData.assessmentDate).toLocaleDateString()}
            </Badge>
          </div>
          
          <div className="grid gap-6">
            <MalnutritionResultPanel 
              classification={resultData.classification as "low" | "moderate" | "high" | "critical"}
              zScores={resultData.zScores}
              bmi={resultData.bmi}
              measurements={resultData.measurements}
            />
            
            <SeverityVisualization 
              classification={resultData.classification as "low" | "moderate" | "high" | "critical"}
              zScores={resultData.zScores}
            />
            
            <RecommendedActions 
              classification={resultData.classification as "low" | "moderate" | "high" | "critical"}
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
