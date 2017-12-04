myApp.controller('EntryController',function($scope, BeerService, FilestackService){
  let vm = this;
  let bs = BeerService;
  let fs = FilestackService;
  
  vm.data = bs.data;

  vm.submitBeer = (beer) => {
    bs.selectBeer(beer);
  };

  vm.getStyles = () => {
    bs.getStyles();
  };
  vm.getStyles();

  vm.openPicker = () => {
    fs.openPicker()
    .then((imgurl) => {
      $scope.$apply(() => {
        vm.data.enteredBeer.imgurl = imgurl;
      });
    });
  };

  vm.filterByCategory = (categoryId) => {
    return bs.filterByCategory(categoryId);
  };
});