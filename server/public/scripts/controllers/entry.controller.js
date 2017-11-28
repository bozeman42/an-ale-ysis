myApp.controller('EntryController',function($scope, BeerService, FilestackService){
  console.log('EntryController created');
  let vm = this;
  let bs = BeerService;
  let fs = FilestackService;
  
  vm.data = bs.data;

  vm.submitBeer = (beer) => {
    console.log(beer);
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
      console.log('the thing in ng-src',vm.data.enteredBeer.imgurl);
    });
  };

  vm.filterByCategory = (categoryId) => {
    return bs.filterByCategory(categoryId);
  };
});