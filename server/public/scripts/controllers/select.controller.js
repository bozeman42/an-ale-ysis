myApp.controller('SelectController', function(BeerService){
  console.log('SelectController created');
  let vm = this;
  let bs = BeerService;
  vm.data = bs.data;

  vm.searchBeer = (keyword) => {
    bs.searchBeer(keyword);
  };

  vm.selectBeer = (beer) => {
    beer.styleGroup = bs.categorizeStyle(beer);
    beer.api_id = beer.id;
    beer.brewery = beer.breweries[0].name;
    console.log(beer);
    
    bs.selectBeer(beer);
  };

  vm.goToManualEntry = () => {
    bs.goToManualEntry();
  };
  
});