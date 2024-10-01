import { getAuthenticatedAppForUser } from "@/lib/firebase/server";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = await getAuthenticatedAppForUser();
  if (currentUser) {
    redirect("/");
  }

  return children;
};

export default AuthLayout;
