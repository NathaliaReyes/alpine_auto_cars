import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/components//lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/NavigationMenu";
import AdminSignup from "@/screens/AdminSignup";
import Auth from "@/utils/auth";


function AdminMenu() {

  const components = [
    {
      title: "Update Inventory",
      href: "/Update",
      description: "Add, edit, or delete cars in inventory.",
    },
    {
      title: "Create new Admin user",
      description: "Add a new administrator to this page.",
      onClick: () => setDialogOpen(true), // Update this part
    },
    {
      title: "Logout",
      description: "Logout of admin tools.",
      onClick: Auth.logout,
    },
    {
      title: "See All Clients",
      href: "/clients",
      description: "See a list of all clients.",
    },
  ];

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-bold text-sm md:text-base text-blue-600">Admin Tools</NavigationMenuTrigger>
            <NavigationMenuContent style={{ backgroundColor: 'white', zIndex: 100 }}>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem 
                    key={component.title} 
                    title={component.title} 
                    href={component.href}
                    onClick={component.onClick}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <AdminSignup dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </>
  );
}

const ListItem = React.forwardRef(({ className, title, children, onClick, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          onClick={onClick}
          {...props}
        >
          <div className="text-xs md:text-sm font-semibold leading-none ">{title}</div>
          <p className="line-clamp-2 text-xs md:text-sm leading-snug text-gray-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export { AdminMenu, ListItem };