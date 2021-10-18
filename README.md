# Next.js - Firebase(v9) Auth Starter

## What's inside?

This Starter includes [Firebase](https://firebase.google.com/) and [Next.js](https://nextjs.org). Firebase is a powerful development software built by Google. It includes Authentication, Database, Analytics, etc.

To learn more about Firebase and Next.js, take a look at the following resources:

- [Firebase](https://firebase.google.com/community/learn) - different learning pathways to integrate Firebase to your applications.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Getting Started

1. Run the following command to create a new project with this Starter:

```sh
yarn create next-app [project-name] -e https://github.com/official-carledwardfp/nextjs-firebase-auth-starter
# or
npx create-next-app [project-name] -e https://github.com/official-carledwardfp/nextjs-firebase-auth-starter
```

2. Install dependencies

```sh
yarn
# or
npm install
```

3. Make sure that you have created a firebase application. Go to your [console](https://console.firebase.google.com/u/0/) and create a project.

4. Change `.env.local.example` to `.env.local` and add your firebase config. You can remove keys that you do not need.

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
```

5. Try the starter!

```sh
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and see how the starter works!

## Features

This Starter uses the latest version of Firebase (v9 modular SDK)

```js
// components/Auth/auth.js

const firebaseApp = initializeApp(config); // initializes app
const auth = getAuth(firebaseApp); // get auth instance from initialized app
```

A hook can be imported where you can access the user and the firebase functions defined in `auth.js`.

Example:

```js
// pages/login.js

const auth = useAuth();

const signIn = (email, password) => {
  auth.signIn(email, password).then(() => {
    // do something
  });
};
```

## Notes

Feel free to add Issues if you find any. Thank you!
