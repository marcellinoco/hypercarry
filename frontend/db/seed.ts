import { seed } from "drizzle-seed";
import { v4 as uuid } from "uuid";

import { faker } from "@faker-js/faker";
import { db } from ".";
import { tournaments } from "./schema/tournaments";
import { users } from "./schema/users";

async function main() {
  const usersData: (typeof users.$inferInsert)[] = [];
  const tournamentsData: (typeof tournaments.$inferInsert)[] = [];

  for (let i = 0; i < 20; i++) {
    usersData.push({
      id: uuid(),
      walletAddress: "temp",
      name: faker.internet.username(),
      playerName: faker.internet.username(),
      imageId: uuid(),
    });

    tournamentsData.push({
      id: uuid(),
      maxParticipants: 100,
      registrationFee: 2,
      organizerFee: 3,
      prizePoolPercentages: 22,
      startTimeUnix: 0,
      endTimeUnix: 0,
    });
  }
  console.log("Seed start");
  await db.delete(users);
  await db.delete(tournaments);

  await db.insert(users).values(usersData);
  await db.insert(tournaments).values(tournamentsData);

  //my address
  await db.insert(users).values({
    id: uuid(),
    name: "Valencius Apriady Primayudha",
    playerName: "Kalo",
    walletAddress: process.env.MY_ADDRESS!,
  });
  console.log("Seed Done");
  return;
}

main();
