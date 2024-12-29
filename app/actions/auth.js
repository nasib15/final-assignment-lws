"use server";

import { signIn } from "@/auth";

export async function login({ email, password }) {
  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      return response.error;
    }

    return null;
  } catch (error) {
    return error.message;
  }
}
