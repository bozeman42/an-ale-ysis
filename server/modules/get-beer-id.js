// Inserts a beer into the database and returns the id.
// If the beer already exists, it finds the ID of the beer and returns it.
// if the query fails, return false
let pool = require('../modules/pool');

let getBeerId = (api_id) => {
  let beerId = new Promise((resolve, reject) => {
    pool.connect((connectError, db, done) => {
      if (connectError) {
        console.log('Error connecting', connectError);
        reject('Connect error getting ID');
      } else {
        var queryText = 'SELECT ("id") FROM "beers" WHERE "api_id" = $1';
        db.query(queryText, [api_id], (queryError, result) => {
          let id = 0;
          done();
          if (queryError) {
            console.log('Error making query', queryError);
            reject('Query error getting ID');
          } else {
            // got beer ID
            id = result.rows[0].id;
            resolve(id);
          }
        });
      }
    });
  });
  return beerId;
};

module.exports = getBeerId;