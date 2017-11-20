myApp.controller('EntryController',function(BeerService){
  console.log('EntryController created');
  let vm = this;
  let bs = BeerService;
  
  vm.cb = bs.data.enteredBeer;

  vm.submitBeer = (beer) => {
    console.log(beer);
    bs.rateBeer(beer);
  };

});