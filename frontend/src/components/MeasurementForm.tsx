
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload } from "lucide-react";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { api, MeasurementData } from "@/lib/api";

interface MeasurementFormProps {
  onSubmit?: (data: any) => void;
  childId?: string;
}

const MeasurementForm = ({ onSubmit, childId }: MeasurementFormProps) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [sex, setSex] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setPhotoPreview(imageUrl);
    }
  };
  
  const handleUploadClick = () => {
    // Trigger click on the hidden file input
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Collect form data
      const formData = new FormData(e.target as HTMLFormElement);
      const formValues = Object.fromEntries(formData.entries());
      
      // Parse numeric values
      const height = parseFloat(formValues.height as string) || 0;
      const weight = parseFloat(formValues.weight as string) || 0;
      const heightInMeters = height / 100;
      
      // Process measurement data
      const measurementData: MeasurementData = {
        childName: formValues.childName as string,
        sex: formValues.sex as string,
        age: parseFloat(formValues.age as string) || 0,
        height,
        weight,
        height_for_age_z: parseFloat(formValues.height_for_age_z as string) || 0,
        weight_for_height_z: parseFloat(formValues.weight_for_height_z as string) || 0,
        weight_for_age_z: parseFloat(formValues.weight_for_age_z as string) || 0,
        Height_m: heightInMeters,
        BMI: weight / (heightInMeters * heightInMeters),
        WHR: weight / height,
        photoUrl: photoPreview || undefined
      };
      
      let response;
      
      // Submit data to API
      if (childId) {
        // Add measurement for existing child
        response = await api.addMeasurementForChild(childId, measurementData);
        toast.success("Measurement added successfully!", {
          description: "New child measurement has been recorded."
        });
      } else {
        // Submit data for new child
        response = await api.submitMeasurement(measurementData);
        
        // Analyze the data
        const analysis = await api.analyzeMeasurements(measurementData);
        
        toast.success("Data analyzed successfully!", {
          description: "Child measurement has been recorded and analyzed."
        });
      }
      
      if (onSubmit) {
        onSubmit(measurementData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to process measurement data", {
        description: error instanceof Error ? error.message : "An unexpected error occurred"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{childId ? "Add New Measurement" : "Register New Child for Prediction"}</CardTitle>
        <CardDescription>
          Enter child's details to track nutrition status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="childName">Child's Name</Label>
            <Input id="childName" name="childName" placeholder="Full name" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sex">Sex</Label>
            <Select name="sex" value={sex} onValueChange={setSex}>
              <SelectTrigger>
                <SelectValue placeholder="Select sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Female (0)</SelectItem>
                <SelectItem value="1">Male (1)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">Age (months)</Label>
            <Input id="age" name="age" type="number" step="0.1" placeholder="Enter age in months" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input id="height" name="height" type="number" step="0.1" placeholder="Enter height" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" name="weight" type="number" step="0.1" placeholder="Enter weight" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height_for_age_z">Height-for-age Z-score</Label>
            <Input id="height_for_age_z" name="height_for_age_z" type="number" step="0.01" placeholder="Enter Z-score or leave for calculation" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight_for_height_z">Weight-for-height Z-score</Label>
            <Input id="weight_for_height_z" name="weight_for_height_z" type="number" step="0.01" placeholder="Enter Z-score or leave for calculation" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight_for_age_z">Weight-for-age Z-score</Label>
            <Input id="weight_for_age_z" name="weight_for_age_z" type="number" step="0.01" placeholder="Enter Z-score or leave for calculation" />
          </div>
          
          <div className="space-y-2">
            <Label>Child's Photo</Label>
            <div className="flex flex-col items-center gap-4">
              <input 
                type="file" 
                name="photo"
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
              
              {photoPreview ? (
                <div className="relative w-full h-40 bg-muted rounded-md overflow-hidden">
                  <img 
                    src={photoPreview} 
                    alt="Child's photo preview" 
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="absolute bottom-2 right-2"
                    onClick={handleUploadClick}
                    type="button"
                  >
                    <Camera className="h-4 w-4 mr-1" /> Change
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full h-40 flex flex-col items-center justify-center gap-2"
                  onClick={handleUploadClick}
                  type="button"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span>Upload Photo</span>
                </Button>
              )}
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#7fcf5f] hover:bg-[#6cbf4f]"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : childId ? "Save Measurement" : "Analyze Data"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MeasurementForm;
