import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return children;
}
