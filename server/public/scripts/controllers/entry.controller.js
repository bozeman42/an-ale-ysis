myApp.controller('EntryController',function(BeerService){
  console.log('EntryController created');
  let vm = this;
  let bs = BeerService;
  
  vm.cb = bs.data.enteredBeer;
  vm.data = bs.data;

  vm.submitBeer = (beer) => {
    console.log(beer);
    bs.selectBeer(beer);
  };

  vm.getStyles = () => {
    bs.getStyles();
  };
  vm.getStyles();
});