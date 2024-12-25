import { InferSelectModel } from "drizzle-orm";

import { matches } from "./schema/matches";
import { tournaments } from "./schema/tournaments";
import { users } from "./schema/users";

export type Tournament = InferSelectModel<typeof tournaments>;

export type User = InferSelectModel<typeof users>;

export type Match = InferSelectModel<typeof matches>;
