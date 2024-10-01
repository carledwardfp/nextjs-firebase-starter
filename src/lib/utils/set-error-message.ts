import { FirebaseError } from "firebase/app";

// TODO: Check if firebase exposes these codes
enum ErrorCode {
  UsernameUsed = "auth/username-exists",
  EmailUsed = "auth/email-already-in-use",
  TooManyRequests = "auth/too-many-requests",
  UserNotFound = "auth/user-not-found",
  WrongPassword = "auth/wrong-password",
}

// Update the messages according to your preference
export const setErrorMessage = (error: FirebaseError) => {
  let title, description;

  switch (error.code) {
    // add your custom error message here
    // change any of the existing messages here to whatever you like

    case ErrorCode.UsernameUsed:
      title = "Username already in use";
      description = "Please enter another username";
      break;

    case ErrorCode.EmailUsed:
      title = "Email already in use";
      description = "The email you entered already exists.";
      break;

    case ErrorCode.TooManyRequests:
      title = "Too many attempts";
      description =
        "You have too many requests at the moment. Please try again later.";
      break;

    case ErrorCode.UserNotFound:
      title = "User not found";
      description =
        "The email you have entered is not yet registered. Please check your details and try again.";
      break;

    case ErrorCode.WrongPassword:
      title = "Incorrect password";
      description = "You have entered a wrong password. Please try again.";
      break;

    default:
      title = "An error occurred.";
      description = error.message;
  }

  return { title, description };
};
