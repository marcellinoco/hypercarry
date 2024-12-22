// app/actions/user.ts
"use server";

import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const playerName = formData.get("playerName") as string;
    const walletAddress = formData.get("walletAddress") as string;
    const profilePicture = formData.get("profilePicture") as File;

    // Validate the data
    if (!name || !playerName || !walletAddress) {
      return {
        error: "Missing required fields",
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

    // Revalidate the users page
    revalidatePath("/users");

    return { success: true };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      error: "Failed to create user",
    };
  }
}
