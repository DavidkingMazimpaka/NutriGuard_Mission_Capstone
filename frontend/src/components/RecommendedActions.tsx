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
      case MalnutritionClassification.Low:
        return {
          title: "Maintain Healthy Growth",
          description: "Continue with regular check-ups and maintain a balanced diet.",
          actions: [
            "Schedule regular follow-up visits",
            "Maintain a balanced diet",
            "Monitor growth patterns",
            "Keep immunization records up to date"
          ],
          nutritionalAdvice: [
            "Continue balanced diet with age-appropriate portions",
            "Regular physical activity and play",
            "Maintain good hygiene practices",
            "Schedule routine check-ups every 6 months",
            "Monitor growth using growth charts"
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

              <div className="mt-6">
                <h3 className="font-medium mb-2">Personalized Nutrition Plan</h3>
                <div className="rounded-lg border p-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Daily Meal Schedule</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                        <span>Breakfast (7:00 AM): Fortified porridge with milk, banana, and groundnuts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                        <span>Mid-morning (10:00 AM): Fresh fruit and yogurt</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                        <span>Lunch (1:00 PM): Rice/maize with beans, vegetables, and oil</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                        <span>Afternoon (4:00 PM): Energy-dense snack (groundnut paste with bread)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                        <span>Dinner (7:00 PM): Sweet potato, fish/meat, and vegetables</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Food Groups to Include Daily</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                        <span>Protein-rich foods: Eggs, fish, meat, beans, groundnuts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                        <span>Energy-dense foods: Oil, butter, avocado, groundnuts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                        <span>Vitamin-rich foods: Orange-fleshed sweet potato, carrots, dark green vegetables</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                        <span>Iron-rich foods: Red meat, liver, dark green vegetables</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Preparation Guidelines</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                        <span>Add 1-2 tablespoons of oil to each meal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                        <span>Include protein in every meal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                        <span>Serve small portions frequently (5-6 times daily)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                        <span>Ensure food is well-cooked and easily digestible</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Additional Recommendations</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                        <span>Provide clean water between meals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                        <span>Encourage eating in a calm, supportive environment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                        <span>Monitor appetite and adjust portions accordingly</span>
                      </li>
                    </ul>
                  </div>
                </div>
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
                    <div className="font-medium">Centre Hospitalier Universitaire de Kigali (CHUK)</div>
                    <div className="text-sm text-muted-foreground">Main Referral Hospital • Specialized Pediatric Care • 24/7 Emergency Services</div>
                    <div className="text-sm text-muted-foreground mt-1">Contact: +250 788 304 005</div>
                    <a 
                      href="https://chuk.rw/clinical-services-specialties/pediatrics" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-1 inline-block"
                    >
                      View Services →
                    </a>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">Mibili Health Center</div>
                    <div className="text-sm text-muted-foreground">Emergency Care Available</div>
                    <a 
                      href="https://mibilizihospital.prod.risa.rw/1/doctors" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-1 inline-block"
                    >
                      View Location →
                    </a>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">Muhororo District Hospital</div>
                    <div className="text-sm text-muted-foreground">Emergency Care & Nutrition Services Available</div>
                    <a 
                      href="https://www.google.com/maps/dir//3J8G%2B345/@-1.9348572,29.5841666,13z/data=!4m9!4m8!1m0!1m5!1m1!1s0x19dcc4a037d0ab41:0x5d9bf1511ab8dcbe!2m2!1d29.6253665!2d-1.9348577!3e0?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoASAFQAw%3D%3D" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-1 inline-block"
                    >
                      Get Directions →
                    </a>
                  </div>
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
