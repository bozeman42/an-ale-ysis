myApp.controller('RatingController',function(BeerService){
  console.log('RatingController created');
  let vm = this;
  let bs = BeerService;

  vm.data = bs.data;
  vm.beer = bs.data.beerToRate;

  vm.rateBeer = (beer) => {
    bs.rateBeer(beer);
  };

  console.log('Beer to rate:',vm.beer);
});