import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/components//lib/utils";
// import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/NavigationMenu";
import Auth from "@/utils/auth";

const components = [
  {
    title: "Update Inventory",
    href: "/Update",
    description:
      "Add, edit, or delete cars in inventory.",
  },
  {
    title: "Create new Admin user",
    href: "/signup",
    description:
      "Allow access to these tools for a new user.",
  },
  {
    title: "Logout",
    description:"Logout of admin tools.",
    onClick: Auth.logout,
  },
  {
    title: "See All Clients",
    href: "/clients",
    description:"See a list of all clients.",
  },
];

function AdminMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Admin Tools</NavigationMenuTrigger>
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
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export { AdminMenu, ListItem };