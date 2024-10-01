# Next.js - Firebase(v10) Auth Starter

## What's inside?

This Starter includes [Firebase](https://firebase.google.com/) and [Next.js](https://nextjs.org). Firebase is a powerful development software built by Google. It includes Authentication, Database, Analytics, etc.

To learn more about Firebase and Next.js, take a look at the following resources:

- [Firebase](https://firebase.google.com/community/learn) - different learning pathways to integrate Firebase to your applications.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Getting Started

1. Run the following command to create a new project with this Starter:

```sh
yarn create next-app [project-name] -e https://github.com/carledwardfp/nextjs-firebase-starter
# or
npx create-next-app [project-name] -e https://github.com/carledwardfp/nextjs-firebase-starter
```

2. Install dependencies

```sh
yarn
# or
npm install
```

3. Make sure that you have created a firebase application. Go to your [console](https://console.firebase.google.com/u/0/) and create a project.

4. Change `.env.example` to `.env.local` and add your firebase config. Zod is used to make sure that you have these environment variables in your env file. Otherwise, the app will throw an error.

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

5. Try the starter!

```sh
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and see how the starter works!

## Features

This Starter uses the latest version of Firebase (v10 modular SDK)

```js
// lib/firebase/client.ts

const app = initializeApp(firebaseConfig); // initializes app
const auth = getAuth(app); // get auth instance from initialized app
```

A hook can be imported where you can access the user and the firebase functions defined in `auth.js`.

Example:

```js
// app/(auth)/login/page.tsx

const { signIn } = useAuth();

const handleSignIn = (email, password) => {
  signIn(email, password).then(() => {
    // do something
  });
};
```

## Notes

Feel free to add ISSUES if you find any. Thank you!
