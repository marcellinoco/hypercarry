import { seed } from "drizzle-seed";

import { db } from ".";
import { Matches } from "./schema/matches";
import { Tournaments } from "./schema/tournaments";
import { Users } from "./schema/users";

async function main() {
  await seed(db, { Users }, { seed: 20 });
}

main();
