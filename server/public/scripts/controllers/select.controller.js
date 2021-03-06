myApp.controller('SelectController', function(BeerService){
  let vm = this;
  let bs = BeerService;
  vm.data = bs.data;

  vm.searchBeer = (keyword,searchType) => {
    bs.searchBeer(keyword,searchType);
  };

  vm.selectBeer = (beer) => {
    beer.api_id = beer.id;
    beer.brewery = beer.breweries[0].name;
    bs.selectBeer(beer);
  };

  vm.goToManualEntry = () => {
    bs.goToManualEntry();
  };
  
  vm.selectBrewery = (brewery) => {
    bs.getBreweryBeers(brewery);
  };

  vm.bothPresent = () => {
    return (/*vm.data.breweries[0].name*/true  && vm.data.beers[0].name);
  };

});