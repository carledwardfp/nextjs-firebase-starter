import { AuthProvider } from "@/lib/firebase/auth";
import { getAuthenticatedAppForUser } from "@/lib/firebase/server";
import type { User } from "firebase/auth";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "NextJS Firebase Starter (App Router)",
  description: "A starter kit created by @carledwardfp",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { currentUser } = await getAuthenticatedAppForUser();

  return (
    <html lang="en">
      <body>
        <AuthProvider serverUser={currentUser?.toJSON() as User | null}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
