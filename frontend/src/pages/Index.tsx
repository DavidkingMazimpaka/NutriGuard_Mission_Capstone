
import { useState } from "react";
import Header from "@/components/Header";
import ChildCard from "@/components/ChildCard";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import AlertBanner from "@/components/AlertBanner";
import { Link } from "react-router-dom";

// Mock children data
const mockChildren = [
  {
    id: "1",
    name: "Sarah Johnson",
    age: "2 years 3 months",
    gender: "female" as const,
    weight: 12.5,
    height: 86.4,
    lastMeasurement: "3 days ago",
    status: "normal" as const,
  },
  {
    id: "2",
    name: "David Lee",
    age: "1 year 7 months",
    gender: "male" as const,
    weight: 9.8,
    height: 78.2,
    lastMeasurement: "2 weeks ago",
    status: "warning" as const,
  },
  {
    id: "3",
    name: "Maria Garcia",
    age: "3 years 5 months",
    gender: "female" as const,
    weight: 13.2,
    height: 95.6,
    lastMeasurement: "1 month ago",
    status: "danger" as const,
  },
  {
    id: "4",
    name: "Aiden Smith",
    age: "8 months",
    gender: "male" as const,
    weight: 8.1,
    height: 68.5,
    lastMeasurement: "5 days ago",
    status: "normal" as const,
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredChildren = mockChildren.filter(child => 
    child.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const urgentCases = mockChildren.filter(child => child.status === "danger").length;
  const warningCases = mockChildren.filter(child => child.status === "warning").length;
  
  return (
    <div className="min-h-screen bg-background animate-fadeIn">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Child Growth Dashboard</h1>
            <p className="text-muted-foreground mt-1">Monitor and track children's growth metrics</p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search children..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button asChild>
              <Link to="/add-measurement">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Child
              </Link>
            </Button>
          </div>
        </div>
        
        {(urgentCases > 0 || warningCases > 0) && (
          <div className="mb-6 space-y-3">
            {urgentCases > 0 && (
              <AlertBanner
                status="danger"
                title={`${urgentCases} ${urgentCases === 1 ? "child requires" : "children require"} urgent attention`}
                description="These children have critical growth metrics and need immediate intervention."
              />
            )}
            {warningCases > 0 && (
              <AlertBanner
                status="warning"
                title={`${warningCases} ${warningCases === 1 ? "child needs" : "children need"} monitoring`}
                description="These children have concerning growth patterns and should be closely monitored."
              />
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {filteredChildren.length > 0 ? (
            filteredChildren.map((child) => (
              <ChildCard key={child.id} {...child} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted/30 p-4 rounded-full mb-4">
                <Info className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No children found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? `No results matching "${searchTerm}"`
                  : "Start by adding a child to monitor their growth"}
              </p>
              <Button asChild>
                <Link to="/add-measurement">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add First Child
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
