let express = require('express');
let router = express.Router();
let request = require('request');
let API_KEY = process.env.API_KEY;
let pool = require('../modules/pool');
let insertBeer = require('../modules/insert.beer');

router.get('/search', function (req, res) {
  req.query.key = API_KEY;
  request('https://api.brewerydb.com/v2/search', { qs: req.query }, function (error, response, body) {
    res.send(body);
  });
});

router.get('/styles', (req, res) => {
  pool.connect((connectError, db, done) => {
    if (connectError) {
      console.log('Error connecting', connectError);
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM "styles";';
      db.query(queryText, (queryError, result) => {
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
});




// POST rate the beer
router.post('/rate', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('This review:', req.body);
    console.log('This user',req.user);
    let review = req.body;
    let beer = req.body.beer;
    insertBeer(beer)
    .then((reviewBeerId)=>{
        review.beer_id = reviewBeerId;
        console.log('Review has beer_id of',review.beer_id);
    })
    .catch((error)=>{
      // failed to get beer ID
      res.sendStatus(500);
    });
  } else {
    console.log( 'Unauthorized' );
    res.sendStatus(401);
  }
});

module.exports = router;