myApp.controller('RatingController',function(BeerService){
  console.log('RatingController created');
  let vm = this;
  let bs = BeerService;

  vm.data = bs.data;
  vm.beer = bs.data.beerToRate;

  
});