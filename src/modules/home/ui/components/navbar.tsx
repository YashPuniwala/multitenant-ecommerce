"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemsProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemsProps) => {
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
        isActive && "bg-primary text-primary-foreground shadow-lg"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const trpc = useTRPC()
  const session = useQuery(trpc.auth.session.queryOptions())
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav className="h-16 flex items-center justify-between border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <Link href="/" className="pl-6 flex items-center group">
        <span className={cn("text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform", poppins.className)}>
          funroad
        </span>
      </Link>
      <NavbarSidebar
        open={isSidebarOpen}
        items={navbarItems}
        onOpenChange={setIsSidebarOpen}
      />

      <div className=" items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      {session.data?.user ? (
        <div className="hidden lg:flex items-center pr-6">
        <Button
          asChild
          variant="gradient"
          className="px-6"
        >
          <Link prefetch href="/admin">
          Dashboard
          </Link>
        </Button>
        </div>
      ) : (
      <div className="hidden lg:flex items-center gap-3 pr-6">
        <Button
          asChild
          variant="ghost"
        >
          <Link prefetch href="/sign-in">
            Login
          </Link>
        </Button>
        <Button
          asChild
          variant="gradient"
        >
          <Link prefetch href="/sign-up">
            Start selling
          </Link>
        </Button>
      </div>

      )}


      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
