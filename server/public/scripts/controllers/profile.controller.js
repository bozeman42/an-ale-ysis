myApp.controller('ProfileController', function ($location, UserService, BeerService) {
  console.log('ProfileController created');
  var vm = this;
  let bs = BeerService;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.data = BeerService.data;


  console.log('chart defaults!', Chart.defaults.global);

  // Configuration for style rating chart

  vm.goToSearch = () => {
    $location.path('/select');
  }



  Chart.defaults.global.colors = [
    'rgba(255,0,0,0.5)',
    'rgba(0,255,0,.5)',
    'rgba(0,0,255,.5)',
    'rgba(128,128,0,.5)',
    'rgba(128,0,128,.5)',
    'rgba(255,0,0,.5)',
    'rgba(255,0,0,.5)'
  ];

  Chart.defaults.global.elements.arc.borderColor = 'rgba(255,255,255,0.5)';

  vm.radarDataOptions = {
    // backgroundColor: 'rgba(255,0,0,.2)',
    // fillColor: 'rgba(255,0,0,.2)',
    // strokeColor: "rgba(220,220,220,.2)",
    // pointColor: "rgba(220,220,220,.2)",
    // lineTension: 0,
  };

  vm.radarOptions = {
    scale: {
      ticks: {
        // beginAtZero: true,
        min: -1,
        max: 5,
        stepSize: 1
      }
    },
  };

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
  console.log('Should already be resolved!');
  bs.getCategories()
    .then(bs.getCategoryRatings)
    .then(() => {
      let radar_ctx = document.getElementById('radar').getContext('2d');
      console.log('radar_ctx', radar_ctx);

      // produces a color depending on the average rating per category
      let ratingColors = vm.data.crData.map((rating) => {
        return ratingColor(parseFloat(rating));
      });

      console.log(ratingColors);
      console.log('crData', vm.data.crData);

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
              }
            }],
            xAxes: [{
              ticks: {
                autoSkip: false,
                maxRotation: 90
              }
            }]
          }
        }
      });
    });

  bs.getIbuRatings()
    .then(() => {

      let scatterChartCanvas = document.getElementById("myChart");
      let scatterCtx = scatterChartCanvas.getContext('2d');
      vm.myChart = new Chart(scatterCtx, {
        type: 'scatter',
        data: {
          labels: ["IBU", "Rating"],
          datasets: [{
            label: 'Rating by IBU',
            data: vm.data.ibuRatings,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(0,0,0,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 1
              },
              scaleLabel: {
                display: true,
                labelString: 'Rating'
              }
            }],
            xAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 10
              },
              scaleLabel: {
                display: true,
                labelString: 'IBU',
              }
            }]
          }
        }
      });


      console.log('chart data', vm.myChart);
      console.log('ibu ratings', vm.data.ibuRatings)
      vm.myChart.update();
      console.log('ibu ratings', vm.data.ibuRatings)
    });
});
