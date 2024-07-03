import User from "../models/userModel";
import * as jose from "jose";
import { sendResponse } from "../utils/responseGenerator";
import verifyToken from "../utils/verifyToken";
const secret = Bun.env.JWT_SECRET || "my_secret";

export const signUp = async ({ body }: any) => {
  try {
    const user = await User.findOne({ email: body?.email });
    if (user) {
      return sendResponse(false, "User already exist! Please Login.");
    }

    const hash = await Bun.password.hash(body?.password, {
      algorithm: "argon2id", // "argon2id" | "argon2i" | "argon2d"
      memoryCost: 4, // memory usage in kibibytes
      timeCost: 3, // the number of iterations
    });
    const hashedUser = { ...body, password: hash };
    const newUser = new User(hashedUser);
    await newUser.save();
    return sendResponse(true, "User Registration Successfull!");
  } catch (error) {
    console.error("Error creating User:", error);
    throw error;
  }
};

export const signIn = async ({ body }: any) => {
  if (!body?.email || !body?.password) {
    return sendResponse(false, "Email or password is missing!");
  }

  try {
    const user = await User.findOne({ email: body?.email }).select("+password");
    if (!user) {
      return sendResponse(false, "No user found!");
    }

    const isMatch = await Bun.password.verify(body?.password, user?.password);
    if (!isMatch) {
      return sendResponse(false, "Wrong Password!!");
    }

    //  generate token
    const token = await new jose.SignJWT({
      email: user?.email,
      id: user?._id,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(new TextEncoder().encode(secret));

    // Save token in user document
    user.token = token;
    await user.save();
    const userData = await User.findOne({ email: body?.email });
    return sendResponse(true, "Logged In Successfully!", userData);
  } catch (error) {
    console.error("Something went wrong!!", error);
    throw error;
  }
};
export const refetchMe = async ({ headers }: any) => {
  console.log(headers);
  const { success, message, payload } = await verifyToken(headers);
  if (success) {
    const user = await User.findOne({ email: payload?.email });
    return sendResponse(success, message, user);
  }
  return message;
};
