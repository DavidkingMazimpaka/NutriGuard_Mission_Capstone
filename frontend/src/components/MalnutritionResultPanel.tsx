import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, AlertTriangle, XCircle } from "lucide-react";
import { MalnutritionClassification } from "@/lib/api";

interface MalnutritionResultPanelProps {
  classification: MalnutritionClassification;
  zScores: {
    weightForAge?: number;
    heightForAge?: number;
    weightForHeight?: number;
  };
  bmi: number;
  measurements: {
    weight: number;
    height: number;
  };
  photo_data?: string;
}

const MalnutritionResultPanel: React.FC<MalnutritionResultPanelProps> = ({
  classification,
  zScores = {},
  bmi,
  measurements,
  photo_data
}) => {
  const getClassificationDetails = () => {
    switch (classification) {
      case MalnutritionClassification.Normal:
        return {
          title: "Normal Growth",
          description: "Child is growing within the expected range for their age and gender.",
          color: "bg-green-100 border-green-200",
          textColor: "text-green-700",
          icon: <CheckCircle className="h-12 w-12 text-green-500" />
        };
      case MalnutritionClassification.Moderate:
        return {
          title: "Moderate Risk",
          description: "Signs of mild to moderate malnutrition present.",
          color: "bg-yellow-100 border-yellow-200",
          textColor: "text-yellow-700",
          icon: <AlertCircle className="h-12 w-12 text-yellow-500" />
        };
      case MalnutritionClassification.High:
        return {
          title: "High Risk",
          description: "Significant signs of malnutrition requiring intervention.",
          color: "bg-orange-100 border-orange-200",
          textColor: "text-orange-700",
          icon: <AlertTriangle className="h-12 w-12 text-orange-500" />
        };
      case MalnutritionClassification.Critical:
        return {
          title: "Critical Risk",
          description: "Severe malnutrition requiring immediate medical attention.",
          color: "bg-red-100 border-red-200",
          textColor: "text-red-700",
          icon: <XCircle className="h-12 w-12 text-red-500" />
        };
      default:
        return {
          title: "Unknown",
          description: "Classification data unavailable.",
          color: "bg-gray-100 border-gray-200",
          textColor: "text-gray-700",
          icon: null
        };
    }
  };

  const details = getClassificationDetails();

  return (
    <Card className={`border-2 ${details.color}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Prediction Result</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="md:w-1/3 flex flex-col items-center text-center p-4 rounded-lg bg-background/50">
            {details.icon}
            <h2 className={`text-2xl font-bold mt-2 ${details.textColor}`}>
              {details.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {details.description}
            </p>
            {photo_data && (
              <img src={photo_data} alt="Child" className="w-full h-40 object-cover mt-4 rounded-md" />
            )}
          </div>

          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-lg mb-2">Z-Scores</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Weight-for-Age</span>
                    <span className={`text-sm font-medium ${
                      zScores.weightForAge < -2 ? "text-red-500" : 
                      zScores.weightForAge < -1 ? "text-yellow-500" : 
                      "text-green-500"
                    }`}>
                      {zScores.weightForAge?.toFixed(1) ?? "N/A"}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Height-for-Age</span>
                    <span className={`text-sm font-medium ${
                      zScores.heightForAge < -2 ? "text-red-500" : 
                      zScores.heightForAge < -1 ? "text-yellow-500" : 
                      "text-green-500"
                    }`}>
                      {zScores.heightForAge?.toFixed(1) ?? "N/A"}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Weight-for-Height</span>
                    <span className={`text-sm font-medium ${
                      zScores.weightForHeight < -2 ? "text-red-500" : 
                      zScores.weightForHeight < -1 ? "text-yellow-500" : 
                      "text-green-500"
                    }`}>
                      {zScores.weightForHeight?.toFixed(1) ?? "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Measurements</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">BMI</span>
                  <span className="text-sm font-medium">
                    {bmi.toFixed(1)} kg/m²
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Weight</span>
                  <span className="text-sm font-medium">
                    {measurements.weight.toFixed(1)} kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Height</span>
                  <span className="text-sm font-medium">
                    {measurements.height.toFixed(1)} cm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MalnutritionResultPanel;