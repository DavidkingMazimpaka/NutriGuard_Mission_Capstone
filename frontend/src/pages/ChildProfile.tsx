import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Edit, Ruler, Weight, AlertTriangle, CheckCircle } from "lucide-react";
import GrowthChart from "@/components/GrowthChart";
import AlertBanner from "@/components/AlertBanner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NutritionGuidance from "@/components/NutritionGuidance";
import ChildReport from "@/components/ChildReport";
import api, { ChildPrediction, MalnutritionClassification } from "@/lib/api";

// Transform backend data to GrowthChart format
const transformToGrowthChartData = (data: ChildPrediction[]) => {
  return data.map(measurement => ({
    date: measurement.date,
    age: measurement.age,
    weight: measurement.weight,
    height: measurement.height,
    weightForAge: measurement.weightForAge,
    heightForAge: measurement.heightForAge,
    weightForHeight: measurement.weightForHeight
  }));
};

// Utility function to map prediction class to status
const mapPredictedClassToStatus = (predictedClass: MalnutritionClassification): "normal" | "warning" | "danger" => {
  switch (predictedClass) {
    case MalnutritionClassification.Low:
      return "normal";
    case MalnutritionClassification.Moderate:
      return "warning";
    case MalnutritionClassification.High:
    case MalnutritionClassification.Critical:
      return "danger";
    default:
      return "normal";
  }
};

// Utility function to format date
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ChildProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [child, setChild] = useState<ChildPrediction[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        if (!id) {
          throw new Error("Child ID is missing");
        }
        
        const response = await api.getChildPredictions(id);
        setChild(response);
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'An unknown error occurred while fetching child data';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchChildData();
  }, [id]);

  // Early return states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!child || child.length === 0) return <div>No data available</div>;

  // Safely get the latest measurement
  const latestMeasurement = child[0];

  // Derive status and guidance information
  const predictedClass = latestMeasurement.predicted_class;
  const status = mapPredictedClassToStatus(predictedClass);

  // Status information generator
  const getStatusInfo = () => {
    switch(predictedClass) {
      case MalnutritionClassification.Low:
        return {
          title: "Low Risk",
          description: "The child's growth indicators are within normal ranges.",
          icon: <CheckCircle className="h-6 w-6 text-green-600" />,
          color: "text-green-600",
          bgColor: "bg-green-50"
        };
      case MalnutritionClassification.Moderate:
        return {
          title: "Moderate Risk",
          description: "This child shows moderate signs of malnutrition and needs monitoring.",
          icon: <AlertTriangle className="h-6 w-6 text-yellow-600" />,
          color: "text-yellow-600"
        };
      case MalnutritionClassification.High:
        return {
          title: "High Risk",
          description: "This child shows significant signs of malnutrition requiring attention.",
          icon: <AlertTriangle className="h-6 w-6 text-orange-600" />,
          color: "text-orange-600"
        };
      case MalnutritionClassification.Critical:
        return {
          title: "Urgent Action Needed",
          description: "This child shows significant signs of malnutrition requiring immediate intervention.",
          icon: <AlertTriangle className="h-6 w-6 text-red-600" />,
          color: "text-red-600"
        };
      default:
        return {
          title: "Low Risk",
          description: "The child's growth indicators are within normal ranges.",
          icon: <CheckCircle className="h-6 w-6 text-green-600" />,
          color: "text-green-600",
          bgColor: "bg-green-50"
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-background animate-fadeIn">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4 gap-1 pl-0 hover:pl-2 transition-all">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-primary">
                <AvatarImage 
                  src={latestMeasurement.photo_data || "/placeholder.svg"} 
                  alt={latestMeasurement.child_name} 
                />
                <AvatarFallback className="text-2xl">
                  {latestMeasurement.child_name?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {latestMeasurement.child_name}
                </h1>
                <p className="text-muted-foreground">
                  {latestMeasurement.age} years old • {latestMeasurement.sex}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button asChild variant="outline" className="gap-1">
                <Link to={`/add-measurement?childId=${id}`}>
                  <Edit className="h-4 w-4" />
                  Add Measurement
                </Link>
              </Button>
              <ChildReport 
                childId={id} 
                childName={latestMeasurement.child_name} 
                measurements={child} 
                status={status}
              />
            </div>
          </div>
          
          <AlertBanner
            status={status}
            title={statusInfo.title}
            description={statusInfo.description}
            className={`mb-6 ${statusInfo.color}`}
            icon={statusInfo.icon}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Weight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-bold">
                    {latestMeasurement.weight} kg
                  </div>
                  <div className={`text-sm ${
                    latestMeasurement.weightForAge < -2 ? "text-destructive" : 
                    latestMeasurement.weightForAge < -1 ? "text-warning" : 
                    "text-secondary"
                  }`}>
                    z-score: {latestMeasurement.weightForAge.toFixed(1)}
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <Weight className="h-4 w-4 mr-1" />
                  Last measured on {formatDate(latestMeasurement.date)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Height
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-bold">
                    {latestMeasurement.height} cm
                  </div>
                  <div className={`text-sm ${
                    latestMeasurement.heightForAge < -2 ? "text-destructive" : 
                    latestMeasurement.heightForAge < -1 ? "text-warning" : 
                    "text-secondary"
                  }`}>
                    z-score: {latestMeasurement.heightForAge.toFixed(1)}
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <Ruler className="h-4 w-4 mr-1" />
                  Last measured on {formatDate(latestMeasurement.date)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Birth Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatDate(latestMeasurement.date)}
                </div>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {latestMeasurement.age} years old
                </div>
              </CardContent>
            </Card>
          </div>
          
          <GrowthChart 
            data={transformToGrowthChartData(child)} 
            name={latestMeasurement.child_name} 
          />
          
          <NutritionGuidance 
            status={status}
            weightForAge={latestMeasurement.weightForAge}
            heightForAge={latestMeasurement.heightForAge}
            weightForHeight={latestMeasurement.weightForHeight}
          />
        </div>
      </main>
    </div>
  );
};

export default ChildProfile;