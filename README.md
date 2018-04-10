# An-Ale-lysis

This application allows you search for and review beers you have tried and builds a taste profile to show you an overview of beers you enjoy based upon beer style or by IBU.

## Built With

- AngularJS
- AngularJS Material
- Node.js
- Express
- PostgreSQL
- BreweryDB's REST API
- Filestack for image upload
- Chart.js
- Font Awesome for the beer mugs in the rating system
- Passport local authentication

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- [postgreSQL](https://www.postgresql.org/)
- An API key from www.brewerydb.com is needed for search functionality


### Installing

Steps to get the development environment running.
1. Download this repository
2. run `npm install` in the repository directory
3. copy the .env.example file and rename to '.env'
4. add your breweryDB API key to the .env file.
5. Create the SQL tables in your database
6. run `npm start` to start the web server
7. in your browser (chrome suggested) navigate to localhost:5000

```sql
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
	"style" INTEGER,
	"category" INTEGER,
	"description" VARCHAR(1000),
	"imgurl" VARCHAR(200),
	"api_id" VARCHAR(10) UNIQUE
);

CREATE TABLE "reviews" (
	"id" SERIAL PRIMARY KEY,
	"user_id" SERIAL NOT NULL REFERENCES "users",
	"beer_id" SERIAL NOT NULL REFERENCES "beers",
	"rating" INTEGER NOT NULL,
	"comment" VARCHAR(1500)
);

```

### Completed Features

High level list of items completed.

- [x] Search for beers and breweries using BreweryDB's REST API
- [x] Review Beers
- [x] Aggregate data and create charts displaying average ratings based upon beer style and IBU

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Give feedback to the user when no beers are found in a search
- [ ] Suggest beers you may enjoy or beers in styles you haven't reviewed

## Authors

* Aaron Kvarnlov-Leverty
