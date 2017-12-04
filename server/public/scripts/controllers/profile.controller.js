myApp.controller('ProfileController', function ($location, UserService, BeerService) {
  var vm = this;
  let bs = BeerService;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.data = BeerService.data;

  vm.goToSearch = () => {
    $location.path('/select');
  }

  let ratingColor = (rating) => {
    let color = '';
    if (rating >= 1 && rating < 2) {
      color = '#D8D8C0';
    } else if (rating >= 2 && rating < 3) {
      color = '#A86048';
    } else if (rating >= 3 && rating < 4) {
      color = '#904830';
    } else if (rating >= 4) {
      color = '#783030';
    }
    return color;
  };

  vm.displayCategoryRatingGraph = () => {
    let radar_ctx = document.getElementById('radar').getContext('2d');

    // produces a color depending on the average rating per category
    let ratingColors = vm.data.crData.map((rating) => {
      return ratingColor(parseFloat(rating));
    });

    vm.radarChart = new Chart(radar_ctx, {
      type: 'bar',
      data: {
        labels: vm.data.crLabels,
        datasets: [
          {
            backgroundColor: ratingColors,
            data: vm.data.crData
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 5,
              stepSize: 1,
              beginAtZero: true
            },
            scaleLabel: {
              labelString: 'Rating',
              display: true
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: false,
            }
          }]
        },
        legend: {
          display: false
        }
      }
    });
  };


  // display graph after prerequisite data is present.
  bs.getCategories()
    .then(bs.getCategoryRatings)
    .then(vm.displayCategoryRatingGraph);


  bs.getIbuRatings()
    .then(() => {
      let ratingColors = vm.data.ibuRangeRatings.map((rating)=>{
        return ratingColor(rating);
      });
      let scatterChartCanvas = document.getElementById("myChart");
      let scatterCtx = scatterChartCanvas.getContext('2d');
      vm.myChart = new Chart(scatterCtx, {
        type: 'bar',
        labels: ['IBU','Rating'],
        data: {
          labels: vm.data.ibuRangeRatingsLabels,
          datasets: [{
            data: vm.data.ibuRangeRatings,
            backgroundColor: ratingColors
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                stepSize: 1,
                min: 0,
                max: 5
              },
              scaleLabel: {
                labelString: 'Rating',
                display: true
              }
            }],
            xAxes: [{
              scaleLabel: {
                labelString: 'IBU',
                display: true
              }
            }],
          },
          legend: {
            display: false
          }
        }
      })

      vm.myChart.update();
    });
});
