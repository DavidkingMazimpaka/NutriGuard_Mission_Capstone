
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, ChevronRight, Ruler, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

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
  return (
    <Card className="overflow-hidden animate-fadeIn card-hover">
      <CardHeader className="p-0">
        <div className="relative h-36 bg-gradient-to-r from-accent to-primary/20">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-background flex items-center justify-center text-2xl font-bold">
              {name.charAt(0)}
            </div>
          )}
          <Badge 
            className={`absolute top-4 right-4 ${
              status === "normal" ? "bg-secondary text-secondary-foreground" : 
              status === "warning" ? "bg-warning text-warning-foreground" : 
              "bg-destructive text-destructive-foreground"
            }`}
          >
            {status === "normal" ? "Normal Growth" : 
             status === "warning" ? "Needs Attention" : 
             "Urgent Action Needed"}
          </Badge>
          {!image && (
            <div className="absolute bottom-4 right-4">
              <div className={`w-3 h-3 rounded-full ${
                gender === "male" ? "bg-blue-500" : "bg-pink-500"
              }`}></div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{age}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{lastMeasurement}</span>
          </div>
          <div className="flex items-center gap-2">
            <Weight className="h-4 w-4 text-muted-foreground" />
            <span>{weight} kg</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-muted-foreground" />
            <span>{height} cm</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button asChild variant="ghost" className="gap-1">
          <Link to={`/child/${id}`}>
            View Profile
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChildCard;
