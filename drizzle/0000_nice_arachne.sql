CREATE TABLE `doses` (
	`id` text PRIMARY KEY NOT NULL,
	`pet_id` text NOT NULL,
	`name` text NOT NULL,
	`type` text DEFAULT 'vacina' NOT NULL,
	`date_applied` text NOT NULL,
	`next_due_date` text,
	`vet` text,
	`notes` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`pet_id`) REFERENCES `pets`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `pets` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`species` text NOT NULL,
	`breed` text,
	`birth_date` text,
	`weight_kg` real,
	`photo_url` text,
	`notes` text,
	`created_at` integer NOT NULL
);
