import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";
import { useAuth } from "../components/Auth/auth";

export default function Home() {
  const { user, loading, signOut } = useAuth();

  // loading state
  if (loading) {
    return <p>Loading...</p>;
  }

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
        <h1 className={styles.title}>NextJS Firebase Auth Starter Kit</h1>
        {user ? (
          <>
            <p>Email: {user.email}</p>
            <p>UID: {user.uid}</p>
            <button onClick={signOut}>Log Out</button>
          </>
        ) : (
          <>
            <h2>Log in or Sign up to see data</h2>
            <div className={styles.grid}>
              <Link href="/login">
                <div className={styles.card}>
                  <h2>Login &rarr;</h2>
                </div>
              </Link>
              <Link href="/signup">
                <div className={styles.card}>
                  <h2>Signup &rarr;</h2>
                </div>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
