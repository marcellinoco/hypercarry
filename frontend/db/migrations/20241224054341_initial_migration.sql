CREATE TABLE IF NOT EXISTS "matches" (
	"id" varchar(63) PRIMARY KEY NOT NULL,
	"tournament_id" varchar(63),
	"players" json DEFAULT '[]'::json,
	"start_time_unix" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tournaments" (
	"id" varchar(63) PRIMARY KEY NOT NULL,
	"authorId" varchar(63),
	"registered_players" json DEFAULT '[]'::json,
	"start_time_unix" integer,
	"end_time_unix" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(63) PRIMARY KEY NOT NULL,
	"wallet_address" varchar(63),
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"imageId" varchar(63),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
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
