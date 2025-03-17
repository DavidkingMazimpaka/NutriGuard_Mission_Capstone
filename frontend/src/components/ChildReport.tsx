
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { FileText, Printer, Download, Share2 } from "lucide-react";
import { useState } from "react";

interface ChildReportProps {
  childId: string;
  childName: string;
  measurements: {
    date: string;
    age: number;
    weight: number;
    height: number;
    muac: number;
    weightForAge: number;
    heightForAge: number;
    weightForHeight: number;
  }[];
  status: "normal" | "warning" | "danger";
}

const ChildReport = ({ childId, childName, measurements, status }: ChildReportProps) => {
  const [open, setOpen] = useState(false);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusText = () => {
    switch(status) {
      case "danger":
        return "Critical Concern - Urgent Intervention Required";
      case "warning":
        return "Moderate Concern - Close Monitoring Required";
      default:
        return "Normal Growth - Continue Regular Monitoring";
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("In a real application, this would download a PDF report");
  };

  const handleShare = () => {
    // In a real app, this would open sharing options
    alert("In a real application, this would open sharing options");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nutritional Assessment Report</DialogTitle>
          <DialogDescription>
            Comprehensive growth and nutritional status report for {childName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="print:block" id="printable-report">
          <div className="flex justify-between items-center mb-6 print:mb-8">
            <div>
              <h2 className="text-2xl font-bold print:text-3xl">{childName}</h2>
              <p className="text-muted-foreground">ID: {childId}</p>
              <p className="text-muted-foreground">Report generated on {new Date().toLocaleDateString()}</p>
            </div>
            <div className="bg-[#7fcf5f] text-white px-4 py-2 rounded-md print:bg-gray-200 print:text-black">
              <p className="font-medium">{getStatusText()}</p>
            </div>
          </div>
          
          <div className="mb-6 print:mb-8">
            <h3 className="text-lg font-medium mb-3 print:text-xl">Growth Measurements History</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Age (months)</th>
                    <th className="px-4 py-2 text-left">Weight (kg)</th>
                    <th className="px-4 py-2 text-left">Height (cm)</th>
                    <th className="px-4 py-2 text-left">MUAC (cm)</th>
                    <th className="px-4 py-2 text-left">Weight-for-Age</th>
                    <th className="px-4 py-2 text-left">Height-for-Age</th>
                    <th className="px-4 py-2 text-left">Weight-for-Height</th>
                  </tr>
                </thead>
                <tbody>
                  {measurements.map((measurement, index) => (
                    <tr key={index} className="border-b border-border">
                      <td className="px-4 py-2">{formatDate(measurement.date)}</td>
                      <td className="px-4 py-2">{measurement.age}</td>
                      <td className="px-4 py-2">{measurement.weight}</td>
                      <td className="px-4 py-2">{measurement.height}</td>
                      <td className="px-4 py-2">{measurement.muac}</td>
                      <td className={`px-4 py-2 ${
                        measurement.weightForAge < -2 ? "text-destructive" : 
                        measurement.weightForAge < -1 ? "text-amber-500" : 
                        "text-green-600"
                      }`}>
                        {measurement.weightForAge.toFixed(1)}
                      </td>
                      <td className={`px-4 py-2 ${
                        measurement.heightForAge < -2 ? "text-destructive" : 
                        measurement.heightForAge < -1 ? "text-amber-500" : 
                        "text-green-600"
                      }`}>
                        {measurement.heightForAge.toFixed(1)}
                      </td>
                      <td className={`px-4 py-2 ${
                        measurement.weightForHeight < -2 ? "text-destructive" : 
                        measurement.weightForHeight < -1 ? "text-amber-500" : 
                        "text-green-600"
                      }`}>
                        {measurement.weightForHeight.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mb-6 print:mb-8">
            <h3 className="text-lg font-medium mb-3 print:text-xl">Assessment Summary</h3>
            <Card className="p-4">
              <p className="mb-2">
                <strong>Current Status:</strong> {getStatusText()}
              </p>
              <p className="mb-2">
                <strong>Latest Measurements:</strong> Weight: {measurements[0].weight}kg, 
                Height: {measurements[0].height}cm, MUAC: {measurements[0].muac}cm
              </p>
              <p className="mb-2">
                <strong>Z-Scores:</strong> Weight-for-Age: {measurements[0].weightForAge.toFixed(1)}, 
                Height-for-Age: {measurements[0].heightForAge.toFixed(1)}, 
                Weight-for-Height: {measurements[0].weightForHeight.toFixed(1)}
              </p>
              <p>
                <strong>Growth Trend:</strong> {
                  measurements.length > 1 
                    ? measurements[0].weightForAge > measurements[1].weightForAge 
                      ? "Improving" 
                      : "Declining"
                    : "Insufficient data for trend analysis"
                }
              </p>
            </Card>
          </div>
          
          <div className="mb-6 print:mb-8">
            <h3 className="text-lg font-medium mb-3 print:text-xl">Recommendations</h3>
            <Card className="p-4">
              {status === "danger" && (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Immediate medical evaluation recommended</li>
                  <li>Therapeutic feeding program enrollment</li>
                  <li>Weekly follow-up appointments</li>
                  <li>Nutritional supplementation</li>
                  <li>Caregiver education on feeding practices</li>
                </ul>
              )}
              {status === "warning" && (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Medical evaluation within 2 weeks</li>
                  <li>Supplementary feeding program consideration</li>
                  <li>Bi-weekly monitoring</li>
                  <li>Dietary diversification guidance</li>
                  <li>Caregiver education on feeding practices</li>
                </ul>
              )}
              {status === "normal" && (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Continue regular growth monitoring</li>
                  <li>Maintain current feeding practices</li>
                  <li>Ensure adequate dietary diversity</li>
                  <li>Next check-up in 3 months</li>
                </ul>
              )}
            </Card>
          </div>
          
          <div className="print:mb-8">
            <h3 className="text-lg font-medium mb-3 print:text-xl">Healthcare Provider Notes</h3>
            <div className="border border-border rounded-md p-4 min-h-[100px] print:min-h-[200px]">
              <p className="text-muted-foreground italic">This section is for healthcare provider notes.</p>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground print:visible">
            <p>Generated by NutriGuard - Child Nutrition Monitoring System</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 mt-4 print:hidden">
          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button onClick={handleDownload} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button onClick={handleShare} variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChildReport;
