import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, AlertTriangle, MapPin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

interface RecommendedActionsProps {
  classification: "low" | "moderate" | "high" | "critical";
}

export const RecommendedActions = ({ classification }: RecommendedActionsProps) => {
  const getRecommendations = () => {
    switch (classification) {
      case "low":
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
      case "moderate":
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
      case "high":
        return {
          title: "Urgent Intervention Needed",
          description: "Immediate nutritional intervention and medical assessment required.",
          actions: [
            "Immediate referral to nutritionist",
            "Begin supplementary feeding program",
            "Weekly weight monitoring",
            "Medical examination for underlying conditions",
            "Develop intensive feeding plan"
          ],
          nutritionalAdvice: [
            "Start therapeutic feeding as prescribed",
            "Implement catch-up growth diet plan",
            "Use fortified food supplements",
            "Monitor food intake daily"
          ]
        };
      case "critical":
        return {
          title: "Emergency Medical Care",
          description: "Immediate hospitalization may be required for intensive care.",
          actions: [
            "Immediate medical evaluation",
            "Possible hospitalization",
            "Start therapeutic feeding",
            "Daily monitoring of vital signs",
            "Treatment of complications"
          ],
          nutritionalAdvice: [
            "Follow therapeutic feeding protocol",
            "Careful refeeding to prevent complications",
            "Specialized medical nutrition therapy",
            "Monitoring for refeeding syndrome"
          ]
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
          <Alert variant={classification === "critical" ? "destructive" : "default"}>
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

          {classification === "critical" && (
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
