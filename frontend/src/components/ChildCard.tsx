import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, AlertTriangle, CheckCircle, Weight, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ChildCardProps {
  id: string;
  name: string;
  age: string;
  gender: "male" | "female";
  weight: number;
  height: number;
  lastMeasurement: string;
  status: "normal" | "warning" | "danger";
  image?: string;
}

const ChildCard = ({ 
  id, 
  name, 
  age, 
  gender, 
  weight, 
  height, 
  lastMeasurement, 
  status, 
  image 
}: ChildCardProps) => {
  const getStatusInfo = () => {
    switch(status) {
      case "danger":
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          label: "Urgent Attention",
          className: "bg-destructive/10 text-destructive border-destructive"
        };
      case "warning":
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          label: "Needs Monitoring",
          className: "bg-warning/10 text-warning border-warning"
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
            status === "danger" ? "bg-destructive" :
            status === "warning" ? "bg-warning" :
            "bg-secondary"
          }`} />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src={image || "/placeholder.svg"} alt={name} />
              <AvatarFallback className="bg-primary/5">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
              <p className="text-sm text-muted-foreground">{age} • {gender}</p>
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
              Last measured: {lastMeasurement}
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