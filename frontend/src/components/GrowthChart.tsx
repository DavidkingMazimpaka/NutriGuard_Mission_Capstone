
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MeasurementData {
  date: string;
  age: number;
  weight: number;
  height: number;
  muac?: number;
  weightForAge: number;
  heightForAge: number;
  weightForHeight: number;
}

interface GrowthChartProps {
  data: MeasurementData[];
  name: string;
}

const GrowthChart = ({ data, name }: GrowthChartProps) => {
  const [metric, setMetric] = useState<"weightForAge" | "heightForAge" | "weightForHeight">("weightForAge");
  
  const metricLabels = {
    weightForAge: "Weight-for-Age",
    heightForAge: "Height-for-Age",
    weightForHeight: "Weight-for-Height"
  };

  const getZScoreColor = (value: number) => {
    if (value >= -1 && value <= 1) return "bg-secondary/20 border-secondary text-secondary-foreground";
    if ((value >= -2 && value < -1) || (value > 1 && value <= 2)) return "bg-warning/20 border-warning text-warning-foreground";
    return "bg-destructive/20 border-destructive text-destructive-foreground";
  };

  const getZScoreText = (value: number) => {
    if (value >= -1 && value <= 1) return "Normal";
    if ((value >= -2 && value < -1) || (value > 1 && value <= 2)) return "Moderate Risk";
    if (value < -2) return "Undernutrition";
    return "Overweight";
  };

  const latestZScore = data.length > 0 ? data[data.length - 1][metric] : 0;

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">{name}'s Growth Chart</CardTitle>
        <div className="flex items-center gap-2">
          <Button 
            variant={metric === "weightForAge" ? "default" : "outline"} 
            size="sm"
            onClick={() => setMetric("weightForAge")}
            className="text-xs px-2 py-1 h-auto"
          >
            Weight/Age
          </Button>
          <Button 
            variant={metric === "heightForAge" ? "default" : "outline"} 
            size="sm"
            onClick={() => setMetric("heightForAge")}
            className="text-xs px-2 py-1 h-auto"
          >
            Height/Age
          </Button>
          <Button 
            variant={metric === "weightForHeight" ? "default" : "outline"} 
            size="sm"
            onClick={() => setMetric("weightForHeight")}
            className="text-xs px-2 py-1 h-auto"
          >
            Weight/Height
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {metricLabels[metric]} Z-Score
            </h4>
            <p className="text-2xl font-bold">{latestZScore.toFixed(2)}</p>
          </div>
          <Badge className={getZScoreColor(latestZScore)}>
            {getZScoreText(latestZScore)}
          </Badge>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="age" 
                label={{ value: 'Age (months)', position: 'insideBottom', offset: -5 }} 
              />
              <YAxis 
                label={{ value: 'Z-Score', angle: -90, position: 'insideLeft' }} 
                domain={[-3, 3]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }} 
                formatter={(value: number) => [value.toFixed(2), 'Z-Score']}
                labelFormatter={(value) => `Age: ${value} months`}
              />
              <ReferenceLine y={2} stroke="rgba(234, 179, 8, 0.5)" strokeDasharray="3 3" />
              <ReferenceLine y={-2} stroke="rgba(234, 179, 8, 0.5)" strokeDasharray="3 3" />
              <ReferenceLine y={0} stroke="rgba(34, 197, 94, 0.5)" />
              <Line
                type="monotone"
                dataKey={metric}
                stroke="hsl(var(--primary))"
                activeDot={{ r: 8, strokeWidth: 0 }}
                dot={{ r: 4, strokeWidth: 0 }}
                strokeWidth={2}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-md border border-destructive/30 bg-destructive/10 p-2">
            &lt; -2: Undernutrition
          </div>
          <div className="rounded-md border border-secondary/30 bg-secondary/10 p-2">
            -2 to +2: Normal Range
          </div>
          <div className="rounded-md border border-destructive/30 bg-destructive/10 p-2">
            &gt; +2: Overweight
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthChart;
