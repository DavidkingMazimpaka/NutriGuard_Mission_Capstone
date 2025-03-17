
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NutritionGuidanceProps {
  status: "normal" | "warning" | "danger";
  weightForAge: number;
  heightForAge: number;
  weightForHeight: number;
}

const NutritionGuidance = ({
  status,
  weightForAge,
  heightForAge,
  weightForHeight,
}: NutritionGuidanceProps) => {
  const getNutritionCategory = () => {
    if (status === "danger") {
      return "Severe Malnutrition";
    } else if (status === "warning") {
      return "Moderate Malnutrition Risk";
    } else {
      return "Normal Growth";
    }
  };

  const getExplanation = () => {
    if (status === "danger") {
      return "The child shows significant signs of malnutrition that require immediate attention. Z-scores below -3 indicate severe acute malnutrition, which can lead to long-term health issues if not addressed quickly.";
    } else if (status === "warning") {
      return "The child shows signs of moderate malnutrition risk. Z-scores between -2 and -3 indicate moderate acute malnutrition, which requires intervention to prevent progression to severe malnutrition.";
    } else {
      return "The child is growing at a healthy rate within the expected range for their age and gender. Z-scores between -2 and +2 are considered within the normal range according to WHO standards.";
    }
  };

  const getCauses = () => {
    if (status === "danger") {
      return [
        "Severe lack of adequate food intake over time",
        "Chronic illness affecting nutrient absorption",
        "Severe intestinal parasites or infections",
        "Inadequate feeding practices",
        "Food insecurity in household",
        "Underlying medical conditions"
      ];
    } else if (status === "warning") {
      return [
        "Insufficient dietary diversity",
        "Recent illness affecting appetite",
        "Periodic food shortages",
        "Suboptimal breastfeeding or weaning practices",
        "Lack of access to nutritious foods",
        "Infectious diseases"
      ];
    } else {
      return [
        "Adequate dietary intake",
        "Appropriate feeding practices",
        "Access to diverse nutritious foods",
        "Good health status with minimal infections",
        "Proper hygiene and sanitation",
        "Regular health monitoring"
      ];
    }
  };

  const getRecommendations = () => {
    if (status === "danger") {
      return [
        "Seek immediate medical attention at a healthcare facility",
        "Therapeutic feeding programs (F-75, F-100, or RUTF as prescribed)",
        "Treatment of underlying infections and conditions",
        "Close monitoring by healthcare professionals",
        "Supplementation with essential micronutrients",
        "Gradual introduction of balanced family foods after stabilization"
      ];
    } else if (status === "warning") {
      return [
        "Supplementary feeding programs with fortified foods",
        "Increased meal frequency and diversity",
        "Regular growth monitoring every 2-4 weeks",
        "Vitamin A, zinc, and iron supplementation as needed",
        "Deworming treatment if recommended",
        "Nutrition education for caregivers"
      ];
    } else {
      return [
        "Continue with age-appropriate balanced diet",
        "Regular growth monitoring every 3-6 months",
        "Maintain breastfeeding (if age-appropriate) alongside diverse foods",
        "Ensure adequate protein, fruits, vegetables, and whole grains",
        "Continue routine health check-ups and immunizations",
        "Maintain good hygiene practices"
      ];
    }
  };

  return (
    <Card className="w-full mt-6 animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-xl">Nutrition Assessment & Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="causes">Causes & Risk Factors</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Current Status: {getNutritionCategory()}</h3>
              <Alert>
                <AlertTitle>What This Means</AlertTitle>
                <AlertDescription>
                  {getExplanation()}
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className={`p-3 rounded-md ${
                  weightForAge < -2 ? "bg-destructive/20" : 
                  weightForAge < -1 ? "bg-warning/20" : 
                  "bg-secondary/20"
                }`}>
                  <p className="font-medium">Weight-for-Age</p>
                  <p className="text-lg font-bold">{weightForAge.toFixed(1)}</p>
                  <p className="text-sm">
                    {weightForAge < -2 ? "Underweight" : 
                     weightForAge > 2 ? "Overweight" : 
                     "Normal weight for age"}
                  </p>
                </div>
                <div className={`p-3 rounded-md ${
                  heightForAge < -2 ? "bg-destructive/20" : 
                  heightForAge < -1 ? "bg-warning/20" : 
                  "bg-secondary/20"
                }`}>
                  <p className="font-medium">Height-for-Age</p>
                  <p className="text-lg font-bold">{heightForAge.toFixed(1)}</p>
                  <p className="text-sm">
                    {heightForAge < -2 ? "Stunted growth" : 
                     heightForAge > 2 ? "Above average height" : 
                     "Normal height for age"}
                  </p>
                </div>
                <div className={`p-3 rounded-md ${
                  weightForHeight < -2 ? "bg-destructive/20" : 
                  weightForHeight < -1 ? "bg-warning/20" : 
                  "bg-secondary/20"
                }`}>
                  <p className="font-medium">Weight-for-Height</p>
                  <p className="text-lg font-bold">{weightForHeight.toFixed(1)}</p>
                  <p className="text-sm">
                    {weightForHeight < -2 ? "Wasted/Thin" : 
                     weightForHeight > 2 ? "Possible obesity risk" : 
                     "Proportionate weight for height"}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="causes" className="space-y-4">
            <h3 className="text-lg font-semibold">Potential Causes & Risk Factors</h3>
            <ul className="list-disc pl-5 space-y-2">
              {getCauses().map((cause, index) => (
                <li key={index}>{cause}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="recommendations" className="space-y-4">
            <h3 className="text-lg font-semibold">Recommended Interventions</h3>
            <ul className="list-disc pl-5 space-y-2">
              {getRecommendations().map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
            
            {status === "danger" && (
              <div className="mt-6">
                <Alert variant="destructive">
                  <AlertTitle className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Nearby Healthcare Facilities
                  </AlertTitle>
                  <AlertDescription>
                    <p className="mb-2">This case requires immediate medical attention. Here are nearby facilities:</p>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex justify-between items-center p-2 border rounded-md hover:bg-muted/50 cursor-pointer">
                              <div>
                                <p className="font-medium">Regional Children's Hospital</p>
                                <p className="text-sm text-muted-foreground">2.4 km away</p>
                              </div>
                              <MapPin className="h-4 w-4 text-destructive" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to view directions</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex justify-between items-center p-2 border rounded-md hover:bg-muted/50 cursor-pointer">
                              <div>
                                <p className="font-medium">Community Health Center</p>
                                <p className="text-sm text-muted-foreground">1.1 km away</p>
                              </div>
                              <MapPin className="h-4 w-4 text-destructive" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to view directions</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex justify-between items-center p-2 border rounded-md hover:bg-muted/50 cursor-pointer">
                              <div>
                                <p className="font-medium">Mobile Health Worker (John Doe)</p>
                                <p className="text-sm text-muted-foreground">Available for home visit</p>
                              </div>
                              <MapPin className="h-4 w-4 text-destructive" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to contact health worker</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="mt-3 text-sm">Note: In emergency situations, please call the national health helpline at 999.</p>
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NutritionGuidance;
