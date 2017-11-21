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
    vm.data.currentBeer = beer;
    console.log(vm.data.currentBeer);
    
    bs.selectBeer(vm.data.currentBeer);
  };

  vm.goToManualEntry = () => {
    bs.goToManualEntry();
  };
  
});