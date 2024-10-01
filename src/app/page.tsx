"use client";

import { useAuth } from "@/lib/firebase/auth";
import Link from "next/link";

const HomePage = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">NextJS Firebase Auth Starter Kit</h1>
        {user ? (
          <>
            <p>Email: {user.email}</p>
            <p>UID: {user.uid}</p>
            <h2>
              Refresh the page. You will notice that the user value is
              persisted.
            </h2>
            <div className="grid">
              <div className="card" onClick={signOut}>
                <h2>Logout &rarr;</h2>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2>Log in or Sign up to see data</h2>
            <div className="grid">
              <Link href="/login">
                <div className="card">
                  <h2>Login &rarr;</h2>
                </div>
              </Link>
              <Link href="/signup">
                <div className="card">
                  <h2>Signup &rarr;</h2>
                </div>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
