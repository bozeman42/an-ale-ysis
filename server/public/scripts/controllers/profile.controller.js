myApp.controller('ProfileController', function (UserService, BeerService) {
  console.log('ProfileController created');
  var vm = this;
  let bs = BeerService;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.data = BeerService.data;

  vm.radarOptions = {
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 5,
        stepSize: 1
      }
    },
  };

  console.log('chart defaults!', Chart.defaults.global);

  Chart.defaults.global.legend;

  vm.radarDataOptions = {
    fillColor: "rgba(220,220,220,0.2)",
    strokeColor: "rgba(220,220,220,1)",
    pointColor: "rgba(220,220,220,1)",
  };

  bs.getCategoryRatings()
  .then(() => {
    
  });


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
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }]
      }
    }
  });

  bs.getIbuRatings()
    .then(() => {
      console.log('chart data',vm.myChart);
      console.log('ibu ratings',vm.data.ibuRatings)
      vm.myChart.update();
      console.log('ibu ratings',vm.data.ibuRatings)
    });
});
