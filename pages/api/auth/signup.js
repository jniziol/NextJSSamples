import { userSignupForm } from "@/validators/user";
import { ValidationError } from "yup";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  const errorMessages = []; // this will hold our error messages, if we have any

  try {
    // validate the incoming inputs by running it through the validator
    // if there is an validation problem, the validator will throw an
    // ValidationError. abortEarly is required so that all the fields
    // get validated instead of only the first.
    const userObj = await userSignupForm.validate(req.body, { abortEarly: false });

    // Check if a user with that email already exists.
    // By this point all the rest of the validations have been executed.
    const user = await prisma.user.findUnique({
      where: {
        email: userObj.email,
      },
    });

    if (user) {
      // if there is a user with this email address, append this error to our errors array
      errorMessages.push({ name: "email", message: "That email address is already taken." });
    } else {
      // otherwise add the user to the database
      userObj.password = await hash(userObj.password, 12);

      await prisma.user.create({
        data: { name: userObj.name, email: userObj.email, password: userObj.password },
      });
    }
  } catch (e) {
    // This will catch any Validation Errors thrown by the validator, but first
    // we should check if it's the appropriate error, since this catch will catch ANY errors
    // that occur in the above TRY block.
    if (e instanceof ValidationError) {
      //loop throw all the errors and add them to the errors array
      for (const error of e.inner) {
        errorMessages.push({ name: error.path, message: error.errors[0] });
      }
    } else {
      // Logs all the other errors to the console
      console.error(e);
    }
  }
  // If we have errors, return a 400 status with the error messages
  if (errorMessages.length > 0) {
    return res.status(400).json({ errorMessages });
  } else {
    // Otherwise everything went well!
    return res.status(201).send();
  }
}
