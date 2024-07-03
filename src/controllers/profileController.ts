import User from "../models/userModel";
import { sendResponse } from "../utils/responseGenerator";
import verifyToken from "../utils/verifyToken";

export const updateProfile = async (headers: any, body: any) => {
  const { success, message, payload } = await verifyToken(headers);

  if (success) {
    try {
      //  update profile logic
      const updatedUser = await User.findOneAndUpdate(
        { email: payload?.email },
        body,
        {
          new: true,
        }
      );
      return sendResponse(true, "User updated successfull!", updatedUser);
    } catch (error) {
      console.log(error);
    }
  }
  return message;
};
export const changePassword = async (headers: any, body: any) => {
  const { success, message, payload } = await verifyToken(headers);
  const { currentPassword, newPassword } = body;
  if (!currentPassword || !newPassword) {
    return sendResponse(
      true,
      "Looks like current password or new password is missing!"
    );
  }
  if (success) {
    const user = await User.findOne({ email: payload?.email });
    try {
      if (!user) {
        return sendResponse(true, "No user found!");
      }

      const isMatch = await Bun.password.verify(currentPassword, user.password);
      if (!isMatch) {
        return sendResponse(true, "Looks like your current password is wrong!");
      }
      user.password = await Bun.password.hash(newPassword);
      await user.save();
      return sendResponse(true, "Password changed successfully!");
    } catch (error) {
      console.log(error);
    }
  }
  return message;
};
