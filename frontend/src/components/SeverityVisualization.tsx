
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { CheckCircle, AlertCircle, AlertTriangle, XCircle } from "lucide-react";

interface SeverityVisualizationProps {
  classification: "low" | "moderate" | "high" | "critical";
  zScores: {
    weightForAge: number;
    heightForAge: number;
    weightForHeight: number;
  };
}

export const SeverityVisualization = ({
  classification,
  zScores,
}: SeverityVisualizationProps) => {
  // Determine severity percentage based on classification
  const getSeverityPercentage = () => {
    switch (classification) {
      case "low":
        return 25;
      case "moderate":
        return 50;
      case "high":
        return 75;
      case "critical":
        return 95;
      default:
        return 0;
    }
  };

  // Get color based on classification
  const getProgressColor = () => {
    switch (classification) {
      case "low":
        return "bg-green-500";
      case "moderate":
        return "bg-yellow-500";
      case "high":
        return "bg-orange-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-primary";
    }
  };

  // Get average z-score for overall assessment calculation
  const getAverageZScore = () => {
    const scores = [zScores.weightForAge, zScores.heightForAge, zScores.weightForHeight];
    const sum = scores.reduce((a, b) => a + b, 0);
    return sum / scores.length;
  };

  const severityPercentage = getSeverityPercentage();
  const progressColor = getProgressColor();
  const averageZScore = getAverageZScore();

  // Configuration for the chart
  const chartConfig = {
    low: { 
      label: "Low Risk", 
      color: "#10B981" // green-500
    },
    moderate: { 
      label: "Moderate Risk", 
      color: "#FBBF24" // yellow-500
    },
    high: { 
      label: "High Risk", 
      color: "#F97316" // orange-500
    },
    critical: { 
      label: "Critical Risk", 
      color: "#EF4444" // red-500
    }
  };

  // Dummy payload for legend
  const chartLegendPayload = [
    { value: "low", color: "#10B981" },
    { value: "moderate", color: "#FBBF24" },
    { value: "high", color: "#F97316" },
    { value: "critical", color: "#EF4444" }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Severity Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Overall Severity</span>
              <span className="text-sm font-medium">{severityPercentage}%</span>
            </div>
            <div className="relative h-8">
              <div className="absolute inset-0 flex">
                <div className="w-1/4 bg-green-100 rounded-l-full"></div>
                <div className="w-1/4 bg-yellow-100"></div>
                <div className="w-1/4 bg-orange-100"></div>
                <div className="w-1/4 bg-red-100 rounded-r-full"></div>
              </div>
              <Progress 
                value={severityPercentage} 
                className={`h-8 ${progressColor}`}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Low</span>
              <span>Moderate</span>
              <span>High</span>
              <span>Critical</span>
            </div>
          </div>

          <div className="pt-4">
            <ChartContainer config={chartConfig} className="h-8">
              <ChartLegend 
                payload={chartLegendPayload}
                verticalAlign="bottom"
              >
                <ChartLegendContent className="flex justify-between p-0 pt-4" />
              </ChartLegend>
            </ChartContainer>
            
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-md border p-3">
                <div>
                  {classification === "low" && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {classification === "moderate" && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                  {classification === "high" && <AlertTriangle className="h-5 w-5 text-orange-500" />}
                  {classification === "critical" && <XCircle className="h-5 w-5 text-red-500" />}
                </div>
                <div>
                  <div className="text-sm font-medium">Current Classification</div>
                  <div className="text-xs text-muted-foreground">
                    Average Z-Score: {averageZScore.toFixed(2)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 rounded-md border p-3">
                <div className="text-xs">
                  <p><span className="font-medium">Z-score interpretation:</span></p>
                  <p>Above -1: Normal growth</p>
                  <p>-1 to -2: Mild malnutrition</p>
                  <p>-2 to -3: Moderate malnutrition</p>
                  <p>Below -3: Severe malnutrition</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
