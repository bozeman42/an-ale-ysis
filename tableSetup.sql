CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
  	"username" VARCHAR(80) not null UNIQUE,
  	"password" VARCHAR(240) not null
);

CREATE TABLE "beers" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100) NOT NULL,
	"brewery" VARCHAR(100),
	"ibu" INTEGER,
	"abv" FLOAT,
	"style" SERIAL REFERENCES "styles",
	"category" SERIAL REFERENCES "categories",
	"description" VARCHAR(1000),
	"imgurl" VARCHAR(200),
	"api_id" VARCHAR(10)
);

CREATE TABLE "reviews" (
	"id" SERIAL PRIMARY KEY,
	"user_id" SERIAL NOT NULL REFERENCES "users",
	"beer_id" SERIAL NOT NULL REFERENCES "beers",
	"rating" INTEGER NOT NULL,
	"comment" VARCHAR(1500)
);

CREATE TABLE "categories" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100)
);

CREATE TABLE "styles" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100) NOT NULL,
	"description" VARCHAR(1000),
	"category_id" SERIAL REFERENCES "categories",
	"ibumin" INTEGER,
	"ibumax" INTEGER
);