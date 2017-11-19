let express = require('express');
let router = express.Router();
let request = require('request');
let API_KEY = process.env.API_KEY;

router.get('/search',function(req,res){
  req.query.key = API_KEY;
  request('https://api.brewerydb.com/v2/search',{qs: req.query},function(error,response,body){
    res.send(body);
  });
});

module.exports = router;