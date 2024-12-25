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
  const walletAddress = formData.get("walletAddress") as string;
  const name = formData.get("name") as string;
  const playerName = formData.get("playerName") as string;
  const profilePicture = formData.get("profilePicture") as File;
  console.log(profilePicture);

  const imageId = uuid();

  try {
    const userExists = await db.query.users.findFirst({
      where: eq(users.walletAddress, walletAddress),
    });

    console.log("dah ada bang", userExists);
    if (userExists) {
      return {
        code: oppCode.ALREADY_REGISTERED,
        message: "Wallet has been registered",
      };
    }

    await db.insert(users).values({
      id: uuid(),
      name: name,
      playerName: playerName,
      walletAddress: walletAddress,
      imageId: profilePicture ? imageId : null,
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
}

export async function updateUser(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const playerName = formData.get("playerName") as string;
  const profilePictureId = formData.get("profilePictureId") as string;
  const profilePicture = formData.get("profilePicture") as File;

  console.log("kok ini undefined", profilePicture);

  try {
    await db
      .update(users)
      .set({
        name: name,
        playerName: playerName,
      })
      .where(eq(users.id, id));

    if (profilePicture) {
      try {
        await uploadFileProfile(profilePictureId, profilePicture);
      } catch {
        return {
          code: oppCode.UNKNOWN,
          message: "Upload file Error",
        };
      }
    }

    return {
      code: oppCode.SUCCESS,
      message: "User has successfully updated",
    };
  } catch {
    return {
      code: oppCode.UNKNOWN,
      message: "Internal server Error",
    };
  }
}
