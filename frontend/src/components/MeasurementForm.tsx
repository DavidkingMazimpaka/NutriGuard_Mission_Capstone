import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload } from "lucide-react";
import { toast as reactToast } from "react-toastify";
import { toast as sonnerToast } from 'sonner';
import { api, MeasurementData } from "@/lib/api";

interface MeasurementInput {
  id?: number;
  name: string;
  sex: string;
  age: number;
  height: number;
  weight: number;
  height_for_age_z: number;
  weight_for_height_z: number;
  weight_for_age_z: number;
  whr: number;
  photo_data: File;
}

interface MeasurementFormProps {
  onSubmit?: (data: MeasurementData) => void;
  childId?: string;
}

const MeasurementForm: React.FC<MeasurementFormProps> = ({ onSubmit, childId }) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sex, setSex] = useState<string>("");
  const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const validateForm = (form: HTMLFormElement): boolean => {
    const requiredFields = [
      'name', 'sex', 'age', 'height', 'weight',
      'height_for_age_z', 'weight_for_height_z',
      'weight_for_age_z', 'whr'
    ];
    for (const field of requiredFields) {
      const el = form.elements.namedItem(field) as HTMLInputElement | HTMLSelectElement;
      if (!el?.value) return false;
    }
    const photo = (form.elements.namedItem('photo_data') as HTMLInputElement)?.files?.[0];
    return !!photo;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;

    if (!validateForm(form)) {
      reactToast.error("Please fill in all required fields and upload a photo.");
      setIsLoading(false);
      return;
    }

    const photoFile = (form.elements.namedItem('photo_data') as HTMLInputElement).files?.[0];
    if (!photoFile) {
      reactToast.error("Photo is required.");
      setIsLoading(false);
      return;
    }

    const measurementData: MeasurementInput = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      sex: (form.elements.namedItem('sex') as HTMLInputElement).value,
      age: Number((form.elements.namedItem('age') as HTMLInputElement).value),
      height: Number((form.elements.namedItem('height') as HTMLInputElement).value),
      weight: Number((form.elements.namedItem('weight') as HTMLInputElement).value),
      height_for_age_z: Number((form.elements.namedItem('height_for_age_z') as HTMLInputElement).value),
      weight_for_height_z: Number((form.elements.namedItem('weight_for_height_z') as HTMLInputElement).value),
      weight_for_age_z: Number((form.elements.namedItem('weight_for_age_z') as HTMLInputElement).value),
      whr: Number((form.elements.namedItem('whr') as HTMLInputElement).value),
      photo_data: photoFile
    };

    try {
      const response = childId
        ? await api.addMeasurementForChild(childId, { ...measurementData, id: measurementData.id ?? 0 })
        : await api.submitMeasurement({ ...measurementData, id: measurementData.id ?? 0 });

      const newChildId = response.id;
      sonnerToast.success("Success!", { description: "Measurement has been recorded." });
      onSubmit?.(response);
      form.reset();
      setPhotoPreview(null);
      setSex('');

      // Start analyzing data
      setIsAnalyzing(true);
      setIsLoading(false);

      // Countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(countdownInterval);
            navigate(`/malnutrition-results?childId=${newChildId}`);
          }
          return prevCountdown - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Submission error:", error);
      sonnerToast.error("Submission failed", {
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
      setIsLoading(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <h1 className="text-3xl font-bold mb-4">Analyzing Data</h1>
        <p className="text-xl">Please wait...</p>
        <div className="text-6xl font-bold mt-4">{countdown}</div>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{childId ? "Add New Measurement" : "Register New Child for Prediction"}</CardTitle>
        <CardDescription>Enter child's details to track nutrition status</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Text Inputs */}
          {[
            { label: "Child's Name", name: "name", type: "text", placeholder: "Full name" },
            { label: "Age (years)", name: "age", type: "number", placeholder: "Enter age" },
            { label: "Height (cm)", name: "height", type: "number", placeholder: "Enter height", step: "0.1" },
            { label: "Weight (kg)", name: "weight", type: "number", placeholder: "Enter weight", step: "0.1" },
            { label: "Height-for-age Z-score", name: "height_for_age_z", type: "number", placeholder: "Enter Z-score", step: "0.01" },
            { label: "Weight-for-height Z-score", name: "weight_for_height_z", type: "number", placeholder: "Enter Z-score", step: "0.01" },
            { label: "Weight-for-age Z-score", name: "weight_for_age_z", type: "number", placeholder: "Enter Z-score", step: "0.01" },
            { label: "Waist-to-Hip Ratio", name: "whr", type: "number", placeholder: "Enter Ratio", step: "0.01" }
          ].map(({ label, name, type, placeholder, step }) => (
            <div className="space-y-2" key={name}>
              <Label htmlFor={name}>{label}</Label>
              <Input id={name} name={name} type={type} step={step} placeholder={placeholder} required />
            </div>
          ))}

          {/* Sex Selection */}
          <div className="space-y-2">
            <Label htmlFor="sex">Sex</Label>
            <Select name="sex" value={sex} onValueChange={setSex} required>
              <SelectTrigger>
                <SelectValue placeholder="Select sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Female (0)</SelectItem>
                <SelectItem value="1">Male (1)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Child's Photo</Label>
            <div className="flex flex-col items-center gap-4">
              <input
                type="file"
                name="photo_data"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                required
              />
              {photoPreview ? (
                <div className="relative w-full h-40 bg-muted rounded-md overflow-hidden">
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  <Button variant="secondary" size="sm" className="absolute bottom-2 right-2" onClick={handleUploadClick} type="button">
                    <Camera className="h-4 w-4 mr-1" /> Change
                  </Button>
                </div>
              ) : (
                <Button variant="outline" className="w-full h-40 flex flex-col items-center justify-center gap-2" onClick={handleUploadClick} type="button">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span>Upload Photo (Required)</span>
                </Button>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#7fcf5f] hover:bg-[#6cbf4f]" disabled={isLoading}>
            {isLoading ? "Processing..." : childId ? "Save Measurement" : "Analyze Data"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MeasurementForm;