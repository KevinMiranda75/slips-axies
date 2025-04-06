import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiwerRequest }   from './shared/SiwerRequest';
import { Home, User, Settings, Menu, Moon, Sun } from "lucide-react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const location = useLocation();

  useEffect(() => {
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

  const navigation = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "New", href: "/dashboard/new", icon: Settings },

  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out dark:bg-gray-800",
          {
            "-translate-x-full": !isSidebarOpen,
            "translate-x-0": isSidebarOpen,
          }
        )}
      >
        <div className="h-16 flex items-center justify-center border-b border-border">
          <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
        </div>
        <nav className="mt-6 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  {
                    "bg-primary text-primary-foreground": isActive,
                    "text-muted-foreground hover:bg-accent hover:text-accent-foreground": !isActive,
                  }
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div
        className={cn("transition-margin duration-200 ease-in-out", {
          "ml-64": isSidebarOpen,
          "ml-0": !isSidebarOpen,
        })}
      >
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 dark:bg-gray-800">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <span className="text-sm text-muted-foreground">Kevin Miranda</span>
            <SiwerRequest />
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              KM
            </div>
          </div>
        </header>
        <main className="p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;