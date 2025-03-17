
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
import LoginForm, { LoginFormValues } from "./LoginForm";
import SignupForm, { SignupFormValues } from "./SignupForm";

interface AuthDialogProps {
  initialOpen?: boolean;
  setIsAuthenticated?: (value: boolean) => void;
}

const AuthDialog = ({ initialOpen = false, setIsAuthenticated }: AuthDialogProps) => {
  const [open, setOpen] = useState(initialOpen);
  
  const handleLoginSuccess = (values: LoginFormValues) => {
    setOpen(false);
    if (setIsAuthenticated) {
      setIsAuthenticated(true);
    }
  };

  const handleSignupSuccess = (values: SignupFormValues) => {
    setOpen(false);
    if (setIsAuthenticated) {
      setIsAuthenticated(true);
    }
  };

  return (
    <>
      {!initialOpen && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <LogIn className="h-5 w-5" />
            </Button>
          </DialogTrigger>
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
                <LoginForm onSuccess={handleLoginSuccess} />
              </TabsContent>
              
              <TabsContent value="signup">
                <SignupForm onSuccess={handleSignupSuccess} />
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="text-xs text-center text-muted-foreground">
              By continuing, you agree to NutriGuard's Terms of Service and Privacy Policy.
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {initialOpen && (
        <div className="space-y-4">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm onSuccess={handleLoginSuccess} />
            </TabsContent>
            
            <TabsContent value="signup">
              <SignupForm onSuccess={handleSignupSuccess} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default AuthDialog;
