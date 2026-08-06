CREATE TABLE `chatMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`storeId` int,
	`productId` int,
	`message` text NOT NULL,
	`sender` enum('user','bot') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chatMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`productId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `likes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`storeId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `likes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`storeId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`price` int NOT NULL,
	`promotionalPrice` int,
	`images` text,
	`category` varchar(100) NOT NULL,
	`condition` enum('new','used') NOT NULL DEFAULT 'new',
	`specs` text,
	`rating` int NOT NULL DEFAULT 0,
	`reviewCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `promotions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`storeId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`discountPercent` int,
	`productIds` text,
	`startDate` timestamp NOT NULL,
	`endDate` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `promotions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`storeId` int,
	`productId` int,
	`userId` int NOT NULL,
	`rating` int NOT NULL,
	`comment` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stores` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`logo` text,
	`whatsapp` varchar(20),
	`location` varchar(255),
	`rating` int NOT NULL DEFAULT 0,
	`reviewCount` int NOT NULL DEFAULT 0,
	`likeCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stores_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userRoles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`userType` enum('buyer','seller','both') NOT NULL DEFAULT 'buyer',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userRoles_id` PRIMARY KEY(`id`),
	CONSTRAINT `userRoles_userId_unique` UNIQUE(`userId`)
);
