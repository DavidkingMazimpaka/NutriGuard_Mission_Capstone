import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, AlertTriangle, MapPin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { MalnutritionClassification } from "@/lib/api";

interface RecommendedActionsProps {
  classification: MalnutritionClassification;
}

export const RecommendedActions = ({ classification }: RecommendedActionsProps) => {
  const getRecommendations = () => {
    switch (classification) {
      case MalnutritionClassification.Normal:
        return {
          title: "Continue Healthy Growth",
          description: "Maintain current nutritional practices with regular monitoring.",
          actions: [
            "Continue balanced diet with age-appropriate portions",
            "Regular physical activity and play",
            "Maintain good hygiene practices",
            "Schedule routine check-ups every 6 months",
            "Monitor growth using growth charts"
          ],
          nutritionalAdvice: [
            "Ensure diverse food groups in daily meals",
            "Include fruits and vegetables daily",
            "Provide adequate protein sources",
            "Continue age-appropriate feeding practices"
          ]
        };
      case MalnutritionClassification.Moderate:
        return {
          title: "Increased Monitoring Required",
          description: "Additional nutritional support and closer monitoring needed.",
          actions: [
            "Increase feeding frequency",
            "Add nutrient-dense foods to diet",
            "Monitor weight weekly",
            "Schedule follow-up in 1 month",
            "Consider micronutrient supplementation"
          ],
          nutritionalAdvice: [
            "Add additional protein-rich foods",
            "Include energy-dense foods in meals",
            "Ensure regular meal times",
            "Add healthy snacks between meals"
          ]
        };
      case MalnutritionClassification.High:
        return {
          title: "Immediate Action Required",
          description: "Significant nutritional intervention needed with close monitoring.",
          actions: [
            "Seek immediate medical evaluation",
            "Start therapeutic feeding program",
            "Monitor weight daily",
            "Schedule weekly follow-ups",
            "Begin micronutrient supplementation"
          ],
          nutritionalAdvice: [
            "High-protein, high-calorie diet",
            "Frequent small meals",
            "Fortified foods and supplements",
            "Regular medical check-ups"
          ]
        };
      case MalnutritionClassification.Critical:
        return {
          title: "Emergency Intervention Required",
          description: "Immediate medical attention and intensive nutritional support needed.",
          actions: [
            "Seek emergency medical care",
            "Begin therapeutic feeding immediately",
            "Monitor vital signs continuously",
            "Daily medical evaluation",
            "Intensive nutritional support"
          ],
          nutritionalAdvice: [
            "Therapeutic feeding formula",
            "Intensive medical monitoring",
            "Emergency nutritional intervention",
            "Immediate treatment of underlying conditions"
          ]
        };
      default:
        return {
          title: "Assessment Required",
          description: "Please complete a full assessment to receive recommendations.",
          actions: [],
          nutritionalAdvice: []
        };
    }
  };

  const recommendations = getRecommendations();

  if (!recommendations) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Recommended Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert variant={classification === MalnutritionClassification.Critical ? "destructive" : "default"}>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{recommendations.title}</AlertTitle>
            <AlertDescription>
              {recommendations.description}
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Required Actions</h3>
                <ul className="space-y-2">
                  {recommendations.actions.map((action, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Nutritional Guidance</h3>
                <ul className="space-y-2">
                  {recommendations.nutritionalAdvice.map((advice, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                      <span className="text-sm">{advice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {classification === MalnutritionClassification.Critical && (
            <>
              <Separator className="my-4" />
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Nearby Medical Facilities
                </h3>
                <div className="grid gap-2">
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">Regional Children's Hospital</div>
                    <div className="text-sm text-muted-foreground">2.4 km away • Emergency Care Available</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">Community Health Center</div>
                    <div className="text-sm text-muted-foreground">1.1 km away • Nutrition Specialist Available</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
