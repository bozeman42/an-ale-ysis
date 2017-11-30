let express = require('express');
let router = express.Router();
let request = require('request');
const API_KEY = process.env.API_KEY;
let pool = require('../modules/pool');

// insertBeerAndGetId is a promise that returns the beer ID from the database
// and inserts the beer into the database if it was not already there.
let insertBeerAndGetId = require('../modules/insert.beer');

router.get('/search', function (req, res) {
  console.log('search', req.query);
  req.query.key = API_KEY;
  request({ method: 'GET', uri: 'https://api.brewerydb.com/v2/search', qs: req.query }, function (error, response, body) {
    if (error) {
      console.log('Error searching!', error);
      res.sendStatus(500);
    } else {
      let results = {
        searchType: req.query.type,
        body: JSON.parse(body)
      };
      res.send(results);
    }
  });
});

router.get('/bybrewery', function (req, res) {
  console.log('Get bybrewery', req.query);
  config = {
    key: API_KEY,
    withBreweries: 'Y'
  };
  request({ method: 'GET', uri: 'https://api.brewerydb.com/v2/brewery/' + req.query.breweryId + '/beers', qs: config }, function (error, response, body) {
    if (error) {
      console.log('Error searching!', error);
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  });
});

router.get('/styles', (req, res) => {
  request({ method: 'GET', uri: 'https://api.brewerydb.com/v2/menu/styles', qs: { key: process.env.API_KEY } }, function (error, response, body) {
    if (error) {
      console.log('Error searching!', error);
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  });
});

router.get('/categories', (req, res) => {
  request({ method: 'GET', uri: 'https://api.brewerydb.com/v2/menu/categories', qs: { key: process.env.API_KEY } }, function (error, response, body) {
    if (error) {
      console.log('Error searching!', error);
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  });
});

// POST rate the beer
router.post('/rate', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('This review:', req.body);
    console.log('This user', req.user);
    let review = req.body;
    let beer = req.body.beer;
    insertBeerAndGetId(beer)
      .then((reviewBeerId) => {
        review.beer_id = reviewBeerId;
        console.log('Review has beer_id of', review.beer_id);
        let user_id = req.user.id;
        let beer_id = review.beer_id;
        let rating = review.rating;
        let comment = review.comment;
        pool.connect((connectError, db, done) => {
          if (connectError) {
            console.log('Error connecting', connectError);
            res.sendStatus(500);
          } else {
            var queryFields = '("user_id","beer_id","rating","comment")';
            var queryText = 'INSERT INTO "reviews" ' + queryFields + 'VALUES ($1,$2,$3,$4);';
            db.query(queryText, [
              user_id,    // $1
              beer_id,    // $2
              rating,     // $3
              comment     // $4
            ], (queryError, result) => {
              done();
              if (queryError) {
                console.log('Error making query', queryError);
                res.sendStatus(500);
              } else {
                res.sendStatus(201);
              }
            });
          }
        });
      })
      .catch((error) => {
        // failed to get beer ID
        res.sendStatus(500);
      });
  } else {
    console.log('Unauthorized');
    res.sendStatus(401);
  }
});

// Gets all reviews entered by the logged in user
router.get('/reviews', (req, res) => {
  if (req.isAuthenticated()) {
    let userId = req.user.id;
    console.log('REVIEWS FOR USER', userId);
    pool.connect((connectError, db, done) => {
      if (connectError) {
        console.log('Error connecting', connectError);
        res.sendStatus(500);
      } else {
        var queryText = 'SELECT "reviews"."id", "beers"."name", "beers"."brewery",';
        queryText += ' "beers"."ibu","beers"."abv", "beers"."category", "beers"."style",';
        queryText += ' "beers"."imgurl", "reviews"."rating", "reviews"."comment",';
        queryText += ' "beers"."description" FROM "reviews"';
        queryText += ' JOIN "beers" ON "reviews"."beer_id" = "beers"."id"';
        queryText += ' WHERE "reviews"."user_id" = $1 ORDER BY "reviews"."id";';
        db.query(queryText, [userId], (queryError, result) => {
          done();
          if (queryError) {
            console.log('Error making query', queryError);
            res.sendStatus(500);
          } else {
            res.send(result.rows);
          }
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// Edit an existing review
// req.body = {
//  id: reviewId,
//  rating: editedRating,
//  comment: editedComment
// }
router.put('/reviews/edit', (req, res) => {
  if (req.isAuthenticated()) {
    let reviewId = req.body.id;
    let comment = req.body.comment;
    let rating = req.body.rating;
    let userId = req.user.id;
    pool.connect((connectError, db, done) => {
      if (connectError) {
        console.log('Error connecting', connectError);
        res.sendStatus(500);
      } else {
        var queryText = 'UPDATE "reviews"';
        queryText += ' SET "rating" = $1, "comment" = $2';
        queryText += ' WHERE "id" = $3 AND "user_id" = $4;';
        db.query(queryText, [rating, comment, reviewId, userId], (queryError, result) => {
          done();
          if (queryError) {
            console.log('Error making query', queryError);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

router.delete('/reviews/', (req, res) => {
  if (req.isAuthenticated()) {
    let reviewId = req.query.id;
    let userId = req.user.id;
    console.log("review to delete", reviewId);
    pool.connect((connectError, db, done) => {
      if (connectError) {
        console.log('Error connecting', connectError);
        res.sendStatus(500);
      } else {
        var queryText = 'DELETE FROM "reviews"';
        queryText += ' WHERE "id" = $1 AND "user_id" = $2;';
        db.query(queryText, [reviewId, userId], (queryError, result) => {
          done();
          if (queryError) {
            console.log('Error making query', queryError);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// Gets aggregated style ratings for the logged in user
router.get('/category-ratings', (req, res) => {
  if (!req.isAuthenticated()) {
    console.log('Not authenticated');
    res.sendStatus(401);
  } else {
    let userId = req.user.id;
    pool.connect((connectError, db, done) => {
      if (connectError) {
        console.log('Error connecting', connectError);
        res.sendStatus(500);
      } else {
        var queryText = 'SELECT "beers"."category", ROUND(AVG("reviews"."rating"),1) AS "categoryRating" FROM "reviews"';
        queryText += ' JOIN "beers" ON "reviews"."beer_id" = "beers"."id"';
        queryText += ' WHERE "reviews"."user_id" = $1';
        queryText += ' GROUP BY "beers"."category" ORDER BY "beers"."category";';
        db.query(queryText, [userId], (queryError, result) => {
          done();
          if (queryError) {
            console.log('Error making query', queryError);
            res.sendStatus(500);
          } else {
            console.log()
            res.send(result.rows);
          }
        });
      }
    });
  }
});

// Returns ratings paired with IBU values.
// for charting purposes should be in the format:
// result = {
// label: beerName,
// data: [{
//   x: ibu,
//   y: rating
// }
router.get('/ibu-ratings', (req, res) => {
  if (!req.isAuthenticated) {
    console.log('Not authenticated');
    res.sendStatus(401);
  } else {
    let userId = req.user.id;
    pool.connect((connectError, db, done) => {
      if (connectError) {
        console.log('Error connecting', connectError);
        res.sendStatus(500);
      } else {
        var queryText = 'SELECT "beers"."ibu" AS "x", "reviews"."rating" AS "y" FROM "reviews"';
        queryText += ' JOIN "beers" ON "reviews"."beer_id" = "beers"."id"';
        queryText += ' WHERE "reviews"."user_id" = $1  AND ("beers"."ibu" IS NOT NULL)';
        db.query(queryText, [userId], (queryError, result) => {
          done();
          if (queryError) {
            console.log('Error making query', queryError);
            res.sendStatus(500);
          } else {
            res.send(result.rows);
          }
        });
      }
    });
  }
});



module.exports = router;