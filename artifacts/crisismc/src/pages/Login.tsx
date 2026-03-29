import { useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login, register } = useAuth();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      await login(
        formData.get("username") as string,
        formData.get("password") as string
      );
      toast({ title: "Logged in successfully" });
      setLocation("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      await register(
        formData.get("username") as string,
        formData.get("email") as string,
        formData.get("password") as string
      );
      toast({ title: "Registered successfully" });
      setLocation("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 pt-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
        </div>

        <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl relative z-10 box-glow">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black font-display tracking-tight text-foreground">
              ACCOUNT <span className="text-primary">ACCESS</span>
            </h1>
            <p className="text-muted-foreground mt-2">Join the CrisisMC community</p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive text-destructive text-sm text-center">
              {error}
            </div>
          )}

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={onLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username">Username</Label>
                  <Input 
                    id="login-username" 
                    name="username" 
                    required 
                    className="bg-background/50 border-input" 
                    placeholder="Enter your username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input 
                    id="login-password" 
                    name="password" 
                    type="password" 
                    required 
                    className="bg-background/50 border-input" 
                    placeholder="Enter your password"
                  />
                </div>
                <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={onRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-username">Username</Label>
                  <Input 
                    id="reg-username" 
                    name="username" 
                    required 
                    className="bg-background/50 border-input" 
                    placeholder="Choose a username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input 
                    id="reg-email" 
                    name="email" 
                    type="email" 
                    required 
                    className="bg-background/50 border-input" 
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input 
                    id="reg-password" 
                    name="password" 
                    type="password" 
                    required 
                    className="bg-background/50 border-input" 
                    placeholder="Choose a password"
                  />
                </div>
                <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Register"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
