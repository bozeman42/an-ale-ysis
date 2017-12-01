# Name of Project

One Paragraph of project description goes here. Link to the live version of the app if it's hosted on Heroku.

## Built With

List technologies and frameworks here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- [postgreSQL](https://www.postgresql.org/)
- An API key from www.brewerydb.com is needed for search functionality


### Installing

Steps to get the development environment running.
1. run `npm install`
2. copy the .env.example file and rename to '.env'
3. add your API key to the .env file.
4. Create the SQL tables in your database
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

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] Feature a
- [x] Feature b

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Name of author(s)


## Acknowledgments

* Hat tip to anyone who's code was used
