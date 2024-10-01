"use client";

import { useAuth } from "@/lib/firebase/auth";
import { setErrorMessage } from "@/lib/utils/set-error-message";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupPage = () => {
  const router = useRouter();
  const { signUp, loading, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signUp(email, password)
      .then(() => {
        // do something after signing in. For example, router.push("/");
        router.push("/");
      })
      .catch((error) => {
        const { title, description } = setErrorMessage(error);
        // do something with error title and description here
        alert(title + ": " + description);
      });
  };

  // loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // if a user is logged in, redirect to a page of your liking
  if (user) {
    router.push("/");
    return null;
  }

  // if there is no signed in user
  if (!user) {
    return (
      <div className="container">
        <main className="main">
          <h1 className="title">Login</h1>
          <br />
          <form onSubmit={handleSignUp}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <Link href="/">&larr; Go back</Link>
        </main>
      </div>
    );
  }
};

export default SignupPage;
