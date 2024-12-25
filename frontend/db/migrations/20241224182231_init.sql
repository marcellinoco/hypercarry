CREATE TABLE IF NOT EXISTS "matches" (
	"id" varchar(63) PRIMARY KEY NOT NULL,
	"tournament_id" varchar(63),
	"start_time_unix" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tournaments" (
	"id" varchar(63) PRIMARY KEY NOT NULL,
	"authorId" varchar(63),
	"registered_players" json DEFAULT '[]'::json,
	"max_participants" integer,
	"registration_fee" integer,
	"organizer_fee" integer,
	"prize_pool_percentages" double precision,
	"start_time_unix" integer,
	"end_time_unix" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(63) PRIMARY KEY NOT NULL,
	"wallet_address" varchar(63) NOT NULL,
	"name" varchar(255) NOT NULL,
	"playerName" varchar(255) NOT NULL,
	"imageId" varchar(63),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_name_unique" UNIQUE("name"),
	CONSTRAINT "users_playerName_unique" UNIQUE("playerName")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "matches_tournament_id_tournaments_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
