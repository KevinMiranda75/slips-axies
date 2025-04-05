import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Moon, Sun } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Success!",
          description: "Welcome back!",
        });
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please fill in all fields",
        });
      }
      setLoading(false);
    }, 1000);
  };

  const handleSignIn = () => {

      navigate('/dashboard');
 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background transition-colors duration-300">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Please sign in to your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="dark:bg-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="dark:bg-gray-700"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-light dark:bg-primary-dark dark:hover:bg-primary"
            disabled={loading}
            onClick={handleSignIn}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;