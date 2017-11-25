myApp.controller('ProfileController', function (UserService, BeerService) {
  console.log('ProfileController created');
  var vm = this;
  let bs = BeerService;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.data = BeerService.data;

  vm.radarOptions = {
    // color: (context) => {
    //   let index = context.dataIndex;
    //   let rating = context.dataset.data[index];
    //   let color = 'black';
    //   if (rating > 4) {
    //     color = 'red';
    //   } else if (rating > 3) {
    //     color = 'orange';
    //   } else if (rating > 2) {
    //     color = 'blue';
    //   }
    //   return color;
    // },
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 5,
        stepSize: 0.5
      }
    }
  };

  bs.getCategoryRatings();

  bs.getIbuRatings()
    .then(() => {
      let ctx = document.getElementById("myChart");
      let myChart = new Chart(ctx, {
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
                beginAtZero: true
              }
            }]
          }
        }
      });
      console.log(vm.data.ibuRatings)
      myChart.update();
    });


});
