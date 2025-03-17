import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Edit, Ruler, Weight } from "lucide-react";
import { Link } from "react-router-dom";
import GrowthChart from "@/components/GrowthChart";
import AlertBanner from "@/components/AlertBanner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NutritionGuidance from "@/components/NutritionGuidance";
import ChildReport from "@/components/ChildReport";

const mockChildData = {
  id: "3",
  name: "Maria Garcia",
  birthDate: "2020-07-15",
  age: "3 years 5 months",
  gender: "female",
  status: "danger",
  measurements: [
    {
      date: "2023-10-15",
      age: 38,
      weight: 13.2,
      height: 95.6,
      muac: 13.1,
      weightForAge: -2.3,
      heightForAge: -1.8,
      weightForHeight: -2.1,
    },
    {
      date: "2023-08-15",
      age: 36,
      weight: 13.0,
      height: 94.8,
      muac: 13.0,
      weightForAge: -2.1,
      heightForAge: -1.7,
      weightForHeight: -1.9,
    },
    {
      date: "2023-06-15",
      age: 34,
      weight: 12.8,
      height: 94.0,
      muac: 12.9,
      weightForAge: -1.9,
      heightForAge: -1.6,
      weightForHeight: -1.8,
    },
    {
      date: "2023-04-15",
      age: 32,
      weight: 12.5,
      height: 93.1,
      muac: 12.8,
      weightForAge: -1.8,
      heightForAge: -1.5,
      weightForHeight: -1.7,
    },
    {
      date: "2023-02-15",
      age: 30,
      weight: 12.2,
      height: 92.2,
      muac: 12.7,
      weightForAge: -1.7,
      heightForAge: -1.4,
      weightForHeight: -1.6,
    },
    {
      date: "2022-12-15",
      age: 28,
      weight: 11.9,
      height: 91.3,
      muac: 12.6,
      weightForAge: -1.5,
      heightForAge: -1.3,
      weightForHeight: -1.4,
    },
  ],
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ChildProfile = () => {
  const { id } = useParams<{ id: string }>();
  const child = mockChildData; // In a real app, we would fetch the child by ID
  
  const latestMeasurement = child.measurements[0];
  
  const getStatusInfo = () => {
    switch(child.status) {
      case "danger":
        return {
          title: "Urgent Action Needed",
          description: "This child shows significant signs of malnutrition requiring immediate intervention.",
        };
      case "warning":
        return {
          title: "Needs Attention",
          description: "This child shows some concerning growth patterns and needs closer monitoring.",
        };
      default:
        return {
          title: "Normal Growth",
          description: "This child is growing within the expected range for their age and gender.",
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
                <AvatarImage src="/placeholder.svg" alt={child.name} />
                <AvatarFallback className="text-2xl">{child.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{child.name}</h1>
                <p className="text-muted-foreground">{child.age} • {child.gender}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button asChild variant="outline" className="gap-1">
                <Link to={`/add-measurement?childId=${child.id}`}>
                  <Edit className="h-4 w-4" />
                  Add Measurement
                </Link>
              </Button>
              <ChildReport 
                childId={child.id} 
                childName={child.name} 
                measurements={child.measurements} 
                status={child.status as "normal" | "warning" | "danger"} 
              />
            </div>
          </div>
          
          <AlertBanner
            status={child.status as "normal" | "warning" | "danger"}
            title={statusInfo.title}
            description={statusInfo.description}
            className="mb-6"
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
                  <div className="text-2xl font-bold">{latestMeasurement.weight} kg</div>
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
                  <div className="text-2xl font-bold">{latestMeasurement.height} cm</div>
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
                <div className="text-2xl font-bold">{formatDate(child.birthDate)}</div>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {child.age} old
                </div>
              </CardContent>
            </Card>
          </div>
          
          <GrowthChart data={child.measurements} name={child.name} />
          
          <NutritionGuidance 
            status={child.status as "normal" | "warning" | "danger"}
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
