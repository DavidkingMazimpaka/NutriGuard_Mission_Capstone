import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, LogIn } from "lucide-react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthDialog = ({ 
  initialOpen = false, 
  setIsAuthenticated,
  trigger = null
}) => {
  const [open, setOpen] = useState(initialOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuthSuccess = (values) => {
    setIsLoading(false);
    setError("");
    setOpen(false);
    if (setIsAuthenticated) {
      setIsAuthenticated(true);
    }
  };

  const handleAuthFailure = (errorMsg) => {
    setIsLoading(false);
    setError(errorMsg);
  };

  const handleSubmit = async (authFunction) => {
    setIsLoading(true);
    setError("");
    try {
      await authFunction();
      handleAuthSuccess({});
    } catch (err) {
      handleAuthFailure(err.message || "Something went wrong. Please try again.");
    }
  };

  const dialogContent = (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#7fcf5f] flex items-center justify-center text-white">
            <Leaf className="h-4 w-4" />
          </div>
          <DialogTitle className="text-xl">NutriGuard</DialogTitle>
        </div>
        <DialogDescription>
          Join our platform to track and monitor child nutrition and growth.
        </DialogDescription>
      </DialogHeader>
      
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginForm onSuccess={() => handleSubmit(() => Promise.resolve())} />
        </TabsContent>

        <TabsContent value="signup">
          <SignupForm onSuccess={() => handleSubmit(() => Promise.resolve())} />
        </TabsContent>
      </Tabs>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <DialogFooter className="text-xs text-center text-muted-foreground">
        By continuing, you agree to NutriGuard's Terms of Service and Privacy Policy.
      </DialogFooter>
    </DialogContent>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <LogIn className="h-5 w-5" />
          </Button>
        </DialogTrigger>
      )}
      {dialogContent}
    </Dialog>
  );
};

export default AuthDialog;
