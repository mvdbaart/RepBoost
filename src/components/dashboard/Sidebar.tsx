import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMockAuth } from "@/components/auth/MockAuthProvider";
import {
  BarChart3,
  MessageSquare,
  PieChart,
  Settings,
  Star,
  Palette,
  LayoutDashboard,
  LogOut,
  HelpCircle,
  User,
  Users,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  className?: string;
  onNavigate?: (path: string) => void;
  activePath?: string;
}

interface NavItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  description: string;
  adminOnly?: boolean;
}

const Sidebar = ({
  className,
  onNavigate = () => {},
  activePath = "/dashboard",
}: SidebarProps) => {
  const { user } = useMockAuth();
  const isAdmin = user?.app_metadata?.is_admin === true;
  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/dashboard",
      description: "Overview of your review performance",
    },
    {
      title: "Reviews",
      icon: <Star className="h-5 w-5" />,
      path: "/reviews",
      description: "Manage all your platform reviews",
    },
    {
      title: "Campaigns",
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/campaigns",
      description: "Create and manage review campaigns",
    },
    {
      title: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      path: "/analytics",
      description: "Review performance metrics and insights",
    },
    {
      title: "Marketing",
      icon: <PieChart className="h-5 w-5" />,
      path: "/marketing",
      description: "Leverage reviews for marketing",
    },
    {
      title: "Customization",
      icon: <Palette className="h-5 w-5" />,
      path: "/customization",
      description: "Customize your review collection",
    },
    {
      title: "Profile",
      icon: <User className="h-5 w-5" />,
      path: "/settings?tab=profile",
      description: "Manage your profile information",
    },
    {
      title: "Account Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings?tab=security",
      description: "Manage your security settings",
    },
    {
      title: "User Management",
      icon: <User className="h-5 w-5" />,
      path: "/admin/users",
      description: "Manage users and permissions",
      adminOnly: true,
    },
  ];

  return (
    <div
      className={cn(
        "flex h-full w-[280px] flex-col bg-white border-r border-gray-200",
        className,
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <Star className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-xl">RepBooster</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-6 px-4">
        <nav className="flex flex-col gap-2">
          {navItems
            .filter((item) => !item.adminOnly || isAdmin)
            .map((item) => (
              <TooltipProvider key={item.path}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activePath === item.path ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 px-3 py-2 h-auto",
                        activePath === item.path
                          ? "bg-secondary font-medium"
                          : "font-normal",
                      )}
                      onClick={() => {
                        if (item.path.includes("?")) {
                          // Handle paths with query parameters
                          window.location.href = item.path;
                        } else if (
                          item.path === "/reviews" ||
                          item.path === "/admin/users"
                        ) {
                          // Direct navigation for reviews page and admin pages
                          window.location.href = item.path;
                        } else {
                          onNavigate(item.path);
                        }
                      }}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-3 py-2 h-auto"
            onClick={() => {}}
          >
            <HelpCircle className="h-5 w-5" />
            <span>Help & Support</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-3 py-2 h-auto text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => {
              localStorage.removeItem("mockUser");
              window.location.href = "/";
            }}
          >
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
