CREATE TABLE "matches" (
	"id" varchar(63) PRIMARY KEY NOT NULL,
	"tournament_id" varchar(63),
	"start_time_unix" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tournaments" (
	"id" varchar(63) PRIMARY KEY NOT NULL,
	"author_id" varchar(63),
	"title" varchar(255),
	"game" varchar(255),
	"tournament_image_id" varchar(255),
	"format" varchar(255),
	"region" varchar(255),
	"prize_pool" bigint,
	"registered_players" json DEFAULT '[]'::json,
	"max_participants" integer NOT NULL,
	"registration_fee" double precision NOT NULL,
	"organizer_fee" integer NOT NULL,
	"prize_pool_percentages" double precision NOT NULL,
	"start_time_unix" integer NOT NULL,
	"end_time_unix" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(63) PRIMARY KEY NOT NULL,
	"wallet_address" varchar(63) NOT NULL,
	"name" varchar(255) NOT NULL,
	"player_name" varchar(255) NOT NULL,
	"image_id" varchar(63),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_name_unique" UNIQUE("name"),
	CONSTRAINT "users_player_name_unique" UNIQUE("player_name")
);
--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_tournament_id_tournaments_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;