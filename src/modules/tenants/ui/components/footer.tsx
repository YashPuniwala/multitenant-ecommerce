import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const Footer = () => {
  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 py-8 lg:px-12">
        <p className="text-muted-foreground font-medium">Powered by</p>
        <Link href="/" className="group">
          <span className={cn("text-2xl font-semibold", poppins.className)}>
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform inline-block">
              funroad
            </span>
          </span>
        </Link>
      </div>
    </footer>
  );
};
