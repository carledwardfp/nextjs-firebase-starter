import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";
import { useAuth } from "../components/Auth/auth";
import { setErrorMessage } from "../components/Auth/setErrorMessage";

const Login = () => {
  const router = useRouter();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (event, email, password) => {
    event.preventDefault();

    auth
      .signUp(email, password)
      .then(() => {
        // do something after signing in. For example, router.push("/");
        router.push("/");
      })
      .catch((error) => {
        let { title, description } = setErrorMessage(error);
        // do something with error title and description here
        alert(title + ": " + description);
      });
  };

  // loading state
  if (auth.loading) {
    return <p>Loading...</p>;
  }

  // if a user is logged in, redirect to a page of your liking
  if (auth.user) {
    router.push("/");
    return null;
  }

  // if there is no signed in user
  if (!auth.user) {
    return (
      <div className={styles.container}>
        <Head>
          <title>NextJS Firebase Auth Starter Kit</title>
          <meta
            name="description"
            content="A starter kit created by @official-carledwardfp"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Signup</h1>
          <br />
          <form onSubmit={(event) => signUp(event, email, password)}>
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

export default Login;
