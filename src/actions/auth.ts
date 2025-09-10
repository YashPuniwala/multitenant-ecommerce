"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { AUTH_COOKIE } from "@/modules/auth/constants";
import { generateAuthCookie } from "@/modules/auth/utils";
import { registerSchema, loginSchema } from "@/modules/auth/schemas";
import { redirect } from "next/navigation";

export const getSession = async () => {
  const payload = await getPayload({ config });
  const headers = await getHeaders();
  const session = await payload.auth({ headers });
  return session;
};

export const logout = async () => {
  const cookies = await getCookies();
  cookies.delete(AUTH_COOKIE);
  redirect("/sign-in");
};

export const register = async (formData: FormData) => {
  const payload = await getPayload({ config });
  
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    username: formData.get("username") as string,
  };

  const validatedData = registerSchema.parse(rawData);

  const existingData = await payload.find({
    collection: "users",
    limit: 1,
    where: {
      username: {
        equals: validatedData.username
      }
    }
  });

  const existingUser = existingData.docs[0];

  if (existingUser) {
    throw new Error("Username already taken");
  }

  await payload.create({
    collection: "users",
    data: {
      email: validatedData.email,
      username: validatedData.username,
      password: validatedData.password,
    },
  });

  const data = await payload.login({
    collection: "users",
    data: {
      email: validatedData.email,
      password: validatedData.password,
    },
  });

  if (!data.token) {
    throw new Error("Failed to register");
  }

  await generateAuthCookie({
    prefix: payload.config.cookiePrefix,
    value: data.token
  });

  redirect("/");
};

export const login = async (formData: FormData) => {
  const payload = await getPayload({ config });
  
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedData = loginSchema.parse(rawData);

  const data = await payload.login({
    collection: "users",
    data: {
      email: validatedData.email,
      password: validatedData.password,
    },
  });

  if (!data.token) {
    throw new Error("Failed to login");
  }

  await generateAuthCookie({
    prefix: payload.config.cookiePrefix,
    value: data.token
  });

  redirect("/");
};