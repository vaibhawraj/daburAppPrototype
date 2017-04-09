"use strict";
define(['chartjs'],function(){
	var dashboardController = function($scope){
		
		$scope.init = function(){
			$scope.createSalesChart();
			$scope.createProductChart();
			$scope.createOrderChart();

		};
		$scope.createSalesChart = function(){
			var ctx = $("#salesChart");
			var data = {
			    labels: ["January", "February", "March", "April", "May", "June", "July","August","September","November"],
			    datasets: [
			        {
			            label: "My First dataset",
			            backgroundColor: 'white',
			            borderWidth: 0,
			            data: [35, 55, 62, 45, 33, 21, 49, 63, 67,84],
			        }
			    ]
			};
			var options = {
				maintainAspectRatio:false,
				responsive:false,
				legend: {
					display:false
				},
				tooltips: {
					enabled:false
				},
				scales: {
		            xAxes: [{
		                display: false,
		                barThickness:15
		            }],
		            yAxes: [{
		                display: false,
		                barThickness:50,
		                stacked:true
		            }]
		        }
			};
			$scope.salesChart = new Chart(ctx , {
				type:'bar',
				data:data,
				options:options
			});
		};
		$scope.createOrderChart = function(){
			var ctx = $("#orderChart");
			var data = {
			    labels: ["January", "February", "March", "April", "May", "June", "July","August","September","November"],
			    datasets: [
			        {
			            label: "My First dataset",
			            backgroundColor: 'white',
			            borderWidth: 0,
			            data: [35, 55, 62, 45, 33, 21, 49, 63, 67,84],
			        }
			    ]
			};
			var options = {
				maintainAspectRatio:false,
				responsive:false,
				legend: {
					display:false
				},
				tooltips: {
					enabled:false
				},
				scales: {
		            xAxes: [{
		                display: false,
		                barThickness:15
		            }],
		            yAxes: [{
		                display: false,
		                barThickness:50,
		                stacked:true
		            }]
		        }
			};
			$scope.salesChart = new Chart(ctx , {
				type:'line',
				data:data,
				options:options
			});
		};
		$scope.createProductChart = function(){
			var data = {
			    labels: [
			        "Dabur Beauty Product",
			        "Dabur Hair Care Product",
			        "Dabur Soft Drinks"
			    ],
			    datasets: [
			        {
			            data: [300, 50, 100],
			            backgroundColor: [
			                "#FF6384",
			                "#36A2EB",
			                "#FFCE56"
			            ],
			            hoverBackgroundColor: [
			                "#FF6384",
			                "#36A2EB",
			                "#FFCE56"
			            ]
			        }]
			};
			var options= {
				responsive:false,
		        animation:{
		            animateScale:true
		        }
		    };
			var ctx = $("#productChart");
			$scope.productChart = new Chart(ctx , {
				type:'doughnut',
				data:data,
				options:options
			});
		}
		$scope.init();
	};
	return dashboardController;
});
