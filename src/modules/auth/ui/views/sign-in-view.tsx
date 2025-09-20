"use client";

import { Poppins } from "next/font/google";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginSchema } from "../../schemas";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const SignInView = () => {
  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient()
  
  const login = useMutation(
    trpc.auth.login.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async() => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
        router.push("/");
      },
    })
  );

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    login.mutate(values);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-gradient-to-br from-background to-muted/50 h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 p-6 lg:p-12 max-w-md mx-auto lg:max-w-none"
          >
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="group">
                <span
                  className={cn("text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform", poppins.className)}
                >
                  funroad
                </span>
              </Link>
              <Button
                asChild
                variant="ghost"
                className="font-semibold"
              >
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-bold">Welcome back</h1>
              <p className="text-xl text-muted-foreground">Sign in to your account</p>
            </div>

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-12 text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" className="h-12 text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={login.isPending}
              type="submit"
              size="lg"
              variant="gradient"
              className="h-12 text-base font-semibold"
            >
              {login.isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>
      </div>

      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};
