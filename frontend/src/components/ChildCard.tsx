import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, AlertTriangle, CheckCircle, Weight, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ChildPrediction, MalnutritionClassification } from "@/lib/api";

interface ChildCardProps {
  id: string;
  child_name: string;
  age: number;
  sex: "male" | "female";
  weight: number;
  height: number;
  date: string;
  predicted_class: MalnutritionClassification;
  photo_data?: string;
}

const ChildCard = ({ 
  id, 
  child_name, 
  age, 
  sex, 
  weight, 
  height, 
  date, 
  predicted_class,
  photo_data 
}: ChildCardProps) => {
  console.log("ChildCard received predicted_class:", predicted_class);

  const getStatusInfo = () => {
    switch(predicted_class) {
      case MalnutritionClassification.Critical:
      case MalnutritionClassification.High:
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          label: "Urgent Attention",
          className: "bg-destructive/10 text-destructive border-destructive"
        };
      case MalnutritionClassification.Moderate:
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          label: "Needs Monitoring",
          className: "bg-warning/10 text-warning border-warning"
        };
      case MalnutritionClassification.Low:
        return {
          color: "text-green-500",
          bgColor: "bg-green-50",
          label: "Low Risk",
        };
      default:
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          label: "Normal Growth",
          className: "bg-secondary/10 text-secondary border-secondary"
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="p-0">
          <div className={`h-1.5 w-full ${
            predicted_class === MalnutritionClassification.Critical || predicted_class === MalnutritionClassification.High ? "bg-destructive" :
            predicted_class === MalnutritionClassification.Moderate ? "bg-warning" :
            "bg-secondary"
          }`} />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage 
                src={photo_data ? `data:image/jpeg;base64,${photo_data}` : "/placeholder.svg"} 
                alt={child_name} 
              />
              <AvatarFallback className="bg-primary/5">
                {child_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold tracking-tight">{child_name}</h3>
              <p className="text-sm text-muted-foreground">{age} years old • {sex}</p>
              <Badge 
                variant="outline" 
                className={`mt-2 ${statusInfo.className}`}
              >
                {statusInfo.icon}
                <span className="ml-1">{statusInfo.label}</span>
              </Badge>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <Weight className="h-4 w-4 mr-2" />
                <span className="text-sm">Weight</span>
              </div>
              <p className="text-lg font-medium">{weight} kg</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <Ruler className="h-4 w-4 mr-2" />
                <span className="text-sm">Height</span>
              </div>
              <p className="text-lg font-medium">{height} cm</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Last measured: {new Date(date).toLocaleDateString()}
            </p>
          </div>
          
          <Button 
            asChild 
            className="w-full mt-4 transition-all hover:scale-105" 
            variant="default"
          >
            <Link to={`/child/${id}`} className="flex items-center justify-center">
              <Eye className="mr-2 h-4 w-4" />
              View Profile
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ChildCard;