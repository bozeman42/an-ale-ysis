myApp.controller('SelectController', function(BeerService){
  console.log('SelectController created');
  let vm = this;
  let bs = BeerService;
  vm.data = bs.data;

  vm.searchBeer = (keyword,searchType) => {
    bs.searchBeer(keyword,searchType);
  };

  vm.selectBeer = (beer) => {
    beer.api_id = beer.id;
    beer.brewery = beer.breweries[0].name;
    console.log(beer);
    bs.selectBeer(beer);
  };

  vm.goToManualEntry = () => {
    bs.goToManualEntry();
  };
  
  vm.selectBrewery = (brewery) => {
    bs.getBreweryBeers(brewery);
  };

});