import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, CheckCircle2, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  childName: z.string().min(1, { message: "Child name is required" }),
  gender: z.enum(["male", "female"]),
  birthDate: z.string().min(1, { message: "Birth date is required" }),
  weight: z.string().min(1, { message: "Weight is required" })
    .refine((val) => !isNaN(parseFloat(val)), { message: "Weight must be a number" })
    .refine((val) => parseFloat(val) > 0, { message: "Weight must be greater than 0" }),
  height: z.string().min(1, { message: "Height is required" })
    .refine((val) => !isNaN(parseFloat(val)), { message: "Height must be a number" })
    .refine((val) => parseFloat(val) > 0, { message: "Height must be greater than 0" }),
  muac: z.string().optional()
    .refine((val) => !val || !isNaN(parseFloat(val)), { message: "MUAC must be a number" })
    .refine((val) => !val || parseFloat(val) > 0, { message: "MUAC must be greater than 0" }),
});

interface MeasurementFormProps {
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
  childId?: string;
}

const MeasurementForm = ({ onSubmit, childId }: MeasurementFormProps) => {
  const [photoUploaded, setPhotoUploaded] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      childName: "",
      gender: "male",
      birthDate: "",
      weight: "",
      height: "",
      muac: "",
    },
  });

  const handleSubmit = useCallback((data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
    
    // Calculate WHO z-scores would happen here in a real app
    // This would involve comparing the child's metrics to WHO standard values
    
    toast.success("Measurement saved successfully!", {
      description: "The child's growth metrics have been recorded.",
      icon: <CheckCircle2 className="h-4 w-4" />,
    });
    
    if (onSubmit) {
      onSubmit(data);
    }
    
    if (!childId) {
      // Reset form if this is a new child
      form.reset();
      setPhotoUploaded(false);
    }
  }, [onSubmit, childId, form]);

  const handlePhotoUpload = () => {
    // In a real app, this would handle actual file upload
    setPhotoUploaded(true);
    toast.success("Photo uploaded successfully!");
  };

  return (
    <Card className="animate-fadeIn w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{childId ? "Update Measurement" : "Register New Child for Prediction"}</CardTitle>
        <CardDescription>
          Record a child's growth measurements to track their nutritional status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="childName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Child's Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter child's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-6"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="male" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Male
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="female" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Female
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birth Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        Used to calculate age-appropriate growth metrics.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="e.g., 12.5"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height/Length (cm)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="e.g., 90.5"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="muac"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MUAC (cm) - Optional</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="e.g., 15.2"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Mid-Upper Arm Circumference - helpful for assessing acute malnutrition.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Photo (Optional)</h3>
              <div className="flex items-center gap-4">
                <div 
                  className={`w-24 h-24 rounded-lg flex items-center justify-center border-2 border-dashed ${
                    photoUploaded ? "border-primary bg-primary/10" : "border-muted-foreground/30"
                  }`}
                >
                  {photoUploaded ? (
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  ) : (
                    <Camera className="h-8 w-8 text-muted-foreground/50" />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Button 
                    type="button" 
                    onClick={handlePhotoUpload}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    {photoUploaded ? "Change Photo" : "Upload Photo"}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Photos help track visual changes over time.
                  </p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              {childId ? "Save Measurement" : "Analyze Data"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MeasurementForm;
