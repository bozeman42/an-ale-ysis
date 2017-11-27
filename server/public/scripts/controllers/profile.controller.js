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

  let radar_ctx = document.getElementById('radar').getContext('2d');
  console.log('radar_ctx', radar_ctx);
  let beerGradient = radar_ctx.createRadialGradient(radar_ctx.canvas.width / 2, radar_ctx.canvas.height / 2, 0, radar_ctx.canvas.width / 2, radar_ctx.canvas.height / 2, radar_ctx.canvas.height / 2);
  beerGradient.addColorStop(0, 'rgba(0,0,0,.5');
  beerGradient.addColorStop(0.2, 'red');
  beerGradient.addColorStop(0.4, 'orange');
  beerGradient.addColorStop(0.6, 'yellow');
  beerGradient.addColorStop(0.8, 'green');
  beerGradient.addColorStop(1, 'blue');

  console.log('center point', radar_ctx.canvas.width / 2, radar_ctx.canvas.height / 2)

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
    legend: {
      display: true
    },
    scale: {
      ticks: {
        beginAtZero: true,
        min: -1,
        max: 5,
        stepSize: 1
      }
    },
  };

  bs.getCategoryRatings()
    .then(() => {

    });

  bs.getIbuRatings()
    .then(() => {

      let canvas = document.getElementById("myChart");
      let ctx = canvas.getContext('2d');
      vm.myChart = new Chart(ctx, {
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
