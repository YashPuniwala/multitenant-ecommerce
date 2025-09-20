"use client";

import { Poppins } from "next/font/google";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas";
import {
  Form,
  FormControl,
  FormDescription,
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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const SignUpView = () => {
  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient()

  const register = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async() => {
                await queryClient.invalidateQueries(trpc.auth.session.queryFilter())

        router.push("/");
      },
    })
  );

  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    register.mutate(values);
  };

  const username = form.watch("username");
  const usernameErrors = form.formState.errors.username;

  const showPreview = username && !usernameErrors;

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
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-bold">Join funroad</h1>
              <p className="text-xl text-muted-foreground">Start selling your products today</p>
            </div>
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="h-12 text-base" />
                  </FormControl>
                  <FormDescription
                    className={cn("hidden text-sm text-muted-foreground", showPreview && "block mt-2")}
                  >
                    Your store will be available at&nbsp;
                    <strong className="text-primary">{username}</strong>.funroad.com
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              disabled={register.isPending}
              type="submit"
              size="lg"
              variant="gradient"
              className="h-12 text-base font-semibold"
            >
              {register.isPending ? "Creating account..." : "Create account"}
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
