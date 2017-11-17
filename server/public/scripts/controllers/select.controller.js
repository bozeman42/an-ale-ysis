myApp.controller('SelectController', function(BeerService){
  console.log('SelectController created');
  let vm = this;
  let bs = BeerService;
  vm.data = bs.data;

  vm.searchBeer = (keyword) => {
    bs.searchBeer(keyword);
  };


});