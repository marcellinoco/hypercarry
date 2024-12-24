import { InferSelectModel } from "drizzle-orm";

import { matches } from "./schema/matches";
import { tournaments } from "./schema/tournaments";

export type Tournament = InferSelectModel<typeof tournaments>;

export type Match = InferSelectModel<typeof matches>;
