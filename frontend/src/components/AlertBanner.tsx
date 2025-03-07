
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "transition-all",
  {
    variants: {
      status: {
        normal: "border-secondary bg-secondary/10 text-secondary-foreground",
        warning: "border-warning bg-warning/10 text-warning-foreground",
        danger: "border-destructive bg-destructive/10 text-destructive-foreground",
      },
    },
    defaultVariants: {
      status: "normal",
    },
  }
);

interface AlertBannerProps {
  status: "normal" | "warning" | "danger";
  title: string;
  description: string;
  className?: string;
}

const AlertBanner = ({
  status,
  title,
  description,
  className,
}: AlertBannerProps) => {
  const Icon = status === "normal" 
    ? CheckCircle 
    : status === "warning" 
      ? AlertTriangle 
      : XCircle;

  return (
    <Alert className={cn(alertVariants({ status }), className)}>
      <Icon className="h-5 w-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  );
};

export default AlertBanner;
