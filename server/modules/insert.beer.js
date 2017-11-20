// Inserts a beer into the database and returns the id.
// If the beer already exists, it finds the ID of the beer and returns it.
// if query fails, returns false.

let pool = require('../modules/pool');
let getBeerId = require('../modules/get-beer-id');

let insertBeer = (beer) => {
  console.log('inserting beer');
  let beerId = new Promise((resolve, reject) => {
    pool.connect((connectError, db, done) => {
      if (connectError) {
        console.log('Error connecting', connectError);
        reject("Error connecting");
      } else {
        var queryFields = '("name","brewery","ibu","abv","style","description","imgurl","api_id")'
        var queryText = 'INSERT INTO "beers" ' + queryFields + 'VALUES ($1,$2,$3,$4,$5,$6,$7,$8)'
          + 'ON CONFLICT ("api_id") DO NOTHING RETURNING "id";';
        db.query(queryText, [
          beer.name,    // $1
          beer.brewery, // $2
          beer.ibu,     // $3
          beer.abv,     // $4
          beer.styleGroup.id, // $5
          beer.description, // $6
          beer.imgurl, // $7
          beer.api_id // $8
        ], (queryError, result) => {
          let reviewedBeerId = 0;
          done();
          if (queryError) {
            console.log('Error making query', queryError);
            reject("Query Error");
          } else {
            // Beer has been added OR already existed.
            if (result.rows[0]) {
              // row was added. Return the ID of the new row to add to the review
              reviewedBeerId = result.rows[0].id;
              console.log('Beer was added. ID:', reviewedBeerId);
            } else {
              // row already existed. Need to get ID of existing row. Find by api_id.
              resolve(getBeerId(beer.api_id));
              console.log('Beer already existed. ID:', reviewedBeerId);
            }
          }
          console.log('reviewedBeerId', reviewedBeerId);
          resolve(reviewedBeerId);
        });
      }
    });
  });
  return beerId;
};

module.exports = insertBeer;