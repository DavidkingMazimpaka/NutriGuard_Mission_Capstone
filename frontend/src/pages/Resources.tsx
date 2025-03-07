
import Header from "@/components/Header";
import ResourceCard from "@/components/ResourceCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Leaf, Wifi, WifiOff } from "lucide-react";

// Mock resource data
const resources = [
  {
    id: "1",
    title: "WHO Growth Standards Explained",
    description: "A comprehensive guide to understanding the WHO growth standards and how to interpret z-scores.",
    category: "Knowledge",
    iconSrc: "/placeholder.svg",
    link: "https://www.who.int/tools/child-growth-standards",
    offline: true,
  },
  {
    id: "2",
    title: "Nutrition for the First 1000 Days",
    description: "Critical information about nutrition during pregnancy and the first two years of life.",
    category: "Nutrition",
    iconSrc: "/placeholder.svg",
    link: "#",
    offline: true,
  },
  {
    id: "3",
    title: "Emergency Malnutrition Response",
    description: "Guidelines for assessing and treating severe acute malnutrition in emergency settings.",
    category: "Emergency",
    iconSrc: "/placeholder.svg",
    link: "#",
    offline: true,
  },
  {
    id: "4",
    title: "Community Feeding Programs",
    description: "How to set up and run effective community-based feeding and nutrition monitoring programs.",
    category: "Programs",
    iconSrc: "/placeholder.svg",
    link: "#",
    offline: false,
  },
  {
    id: "5",
    title: "MUAC Measurement Tutorial",
    description: "Step-by-step guide to accurately measure Mid-Upper Arm Circumference.",
    category: "Tutorial",
    iconSrc: "/placeholder.svg",
    link: "#",
    offline: true,
  },
  {
    id: "6",
    title: "Common Childhood Illnesses and Nutrition",
    description: "The relationship between nutrition status and common childhood illnesses.",
    category: "Health",
    iconSrc: "/placeholder.svg",
    link: "#",
    offline: false,
  },
  {
    id: "7",
    title: "NOBOFA Nutrition Care Platform",
    description: "Provider of nutrition products and awareness including young look hair & body cream, skin powder, NutriPorridge, UBUZIMA and NONOKA Tea.",
    category: "Nutrition",
    iconSrc: "/placeholder.svg",
    link: "#",
    offline: false,
  },
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-background animate-fadeIn">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Educational Resources</h1>
            <p className="text-muted-foreground mt-1">Access guides, tutorials, and materials about child nutrition</p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Save All Offline
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="measurement">Measurement</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="offline" className="gap-2">
              <WifiOff className="h-4 w-4" />
              Offline Available
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} {...resource} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources
                .filter(r => r.category === "Nutrition")
                .map((resource) => (
                  <ResourceCard key={resource.id} {...resource} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="measurement" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources
                .filter(r => r.category === "Tutorial")
                .map((resource) => (
                  <ResourceCard key={resource.id} {...resource} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="emergency" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources
                .filter(r => r.category === "Emergency")
                .map((resource) => (
                  <ResourceCard key={resource.id} {...resource} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="offline" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources
                .filter(r => r.offline)
                .map((resource) => (
                  <ResourceCard key={resource.id} {...resource} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-accent/50 rounded-lg p-6 mt-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-3 bg-background rounded-full">
              <Wifi className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-lg font-medium mb-1">Offline Mode Available</h3>
              <p className="text-muted-foreground">
                Download resources and continue using the app without an internet connection. Ideal for field work in remote areas.
              </p>
            </div>
            <Button className="whitespace-nowrap">Enable Offline Mode</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resources;
