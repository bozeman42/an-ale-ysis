let express = require('express');
let router = express.Router();
let request = require('request');
let API_KEY = process.env.API_KEY;
let pool = require('../modules/pool');

router.get('/search',function(req,res){
  req.query.key = API_KEY;
  request('https://api.brewerydb.com/v2/search',{qs: req.query},function(error,response,body){
    res.send(body);
  });
});

router.get('/styles',(req,res)=>{
  pool.connect(function(connectError, db, done) {
    if(connectError) {
      console.log('Error connecting', connectError);
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM "styles";';
      db.query(queryText, function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query', queryError);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});
module.exports = router;