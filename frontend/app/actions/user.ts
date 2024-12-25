"use server";

import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

import { db } from "@/db";
import { users } from "@/db/schema/users";
import { oppCode } from "@/libs/constant";
import { uploadFileProfile } from "./file";

export async function getUser(address: string) {
  try {
    const response = await db.query.users.findFirst({
      where: eq(users.walletAddress, address),
    });

    if (!response) {
      return {
        code: oppCode.NOT_FOUND,
        message: "User not found",
      };
    }

    return {
      code: oppCode.SUCCESS,
      user: response,
      message: "User successfully retrieved",
    };
  } catch {
    return {
      code: oppCode.UNKNOWN,
      message: "Internal Server Error",
    };
  }
}

export async function createUser(formData: FormData) {
  try {
    const walletAddress = formData.get("walletAddress") as string;
    const name = formData.get("name") as string;
    const playerName = formData.get("playerName") as string;
    const profilePicture = formData.get("profilePicture") as File;

    const imageId = uuid();
    // create user on db
    try {
      await db.insert(users).values({
        id: uuid(),
        name: name,
        playerName: playerName,
        walletAddress: walletAddress,
        imageId: imageId,
      });

      await uploadFileProfile(imageId, profilePicture);

      return {
        code: oppCode.SUCCESS,
        message: "User has successfully created",
      };
    } catch {
      return {
        code: oppCode.UNKNOWN,
        message: "Internal server Error",
      };
    }

    // Here you would typically:
    // 1. Upload the profile picture to your storage service
    // 2. Create the user in your database
    // 3. Handle any other necessary operations

    // Example pseudocode:
    // const imageUrl = await uploadToStorage(profilePicture);
    // const user = await db.users.create({
    //   data: {
    //     name,
    //     playerName,
    //     walletAddress,
    //     profilePictureUrl: imageUrl,
    //   },
    // });
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      error: "Failed to create user",
    };
  }
}
