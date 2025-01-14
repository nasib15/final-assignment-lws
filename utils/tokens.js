import { userModel } from "@/models/users";
import jwt from "jsonwebtoken";
import { replaceMongoIdInObject } from "./data-utils";

export function generateAccessToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15s" },
  );
}

export function generateRefreshToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1m",
  });
}

export async function refreshAccessTokenCredentials(refreshToken) {
  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    console.log(decoded, "decoded");

    // Get user from database
    const user = await userModel.findById(decoded.userId);

    const replacedIdUser = replaceMongoIdInObject(user);

    // Generate new tokens
    const newAccessToken = generateAccessToken(replacedIdUser);
    const newRefreshToken = generateRefreshToken(replacedIdUser);

    console.log(newAccessToken, "new access token");
    console.log(newRefreshToken, "new refresh token");

    // // Update refresh token in database
    // await userModel.findByIdAndUpdate(user._id, {
    //   accessToken: newAccessToken,
    //   refreshToken: newRefreshToken,
    // });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    throw new Error("Failed to refresh access token");
  }
}
