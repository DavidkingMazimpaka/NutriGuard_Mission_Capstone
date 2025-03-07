
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  iconSrc: string;
  link: string;
  offline?: boolean;
}

const ResourceCard = ({
  title,
  description,
  category,
  iconSrc,
  link,
  offline
}: ResourceCardProps) => {
  return (
    <Card className="overflow-hidden card-hover h-full flex flex-col animate-fadeIn">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded bg-accent flex items-center justify-center mb-2">
            <img src={iconSrc} alt={category} className="w-6 h-6" />
          </div>
          <Badge variant="outline">{category}</Badge>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">
          Learn about effective nutrition strategies and early intervention techniques to support healthy child development.
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Button asChild className="w-full sm:w-auto gap-1 flex-1">
            <a href={link} target="_blank" rel="noopener noreferrer">
              View Resource <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          {offline && (
            <Button variant="outline" className="w-full sm:w-auto gap-1 flex-1">
              Save Offline <Download className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
