import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ChildCard from "@/components/ChildCard";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import AlertBanner from "@/components/AlertBanner";
import { Link } from "react-router-dom";
import api, { ChildHealthRecord, ChildPrediction, MalnutritionClassification } from "@/lib/api";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [children, setChildren] = useState<ChildPrediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChildrenData = async () => {
      try {
        const response = await api.getAllChildren();
        console.log("Raw API response:", response);
        // Transform ChildHealthRecord[] to ChildPrediction[]
        const transformedChildren = response.map(api.transformChildData);
        console.log("Transformed children:", transformedChildren);
        setChildren(transformedChildren);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchChildrenData();
  }, []);

  const filteredChildren = children.filter(child => 
    child.child_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const urgentCases = children.filter(child => 
    child.predicted_class === MalnutritionClassification.Critical || 
    child.predicted_class === MalnutritionClassification.High
  ).length;
  
  const warningCases = children.filter(child => 
    child.predicted_class === MalnutritionClassification.Moderate
  ).length;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-background animate-fadeIn">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Child Growth Dashboard</h1>
            <p className="text-muted-foreground mt-1">Predict , Monitor and track children's growth metrics</p>
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {filteredChildren.length > 0 ? (
            filteredChildren.map((child) => (
              <ChildCard 
                key={child.id} 
                id={child.id.toString()}
                child_name={child.child_name}
                age={child.age}
                sex={child.sex}
                weight={child.weight}
                height={child.height}
                date={child.date}
                predicted_class={child.predicted_class}
                photo_data={child.photo_data}
              />
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
                  : "Start by adding a child for Prediction and monitor their growth"}
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