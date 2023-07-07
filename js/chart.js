const ip = 'localhost';
var normalProductTurnover;
var NFTProductTurnover;
var company = [];
var totalTurnover = [];
var backgroundColor1 = [];
var borderColor1 = [];
var backgroundColor2 = [];
var borderColor2 = [];

document.addEventListener("DOMContentLoaded",()=>{
  getNormalProductTurnover()
  getNFTProductTurnover()
  getCompany()
  //location.reload()
})

function getRandomColor1(){
    var red = Math.floor(Math.random()*256)
    var green = Math.floor(Math.random()*256)
    var blue = Math.floor(Math.random()*256)
    backgroundColor1.push('rgba('+red+','+green+','+blue+', 0.2'+')')
    borderColor1.push('rgba('+red+','+green+','+blue+', 1'+')')
}
function getRandomColor2(){
  var red = Math.floor(Math.random()*256)
  var green = Math.floor(Math.random()*256)
  var blue = Math.floor(Math.random()*256)
  backgroundColor2.push('rgba('+red+','+green+','+blue+', 0.5'+')')
  borderColor2.push('rgba('+red+','+green+','+blue+', 1'+')')
}
function echarts() {
  /* ChartJS
   * -------
   * Data and config for chartjs
   */
  'use strict';
  console.log("echarts success")
  var data = {
    labels: company,
    datasets: [{
      label: '# of Votes',
      data: totalTurnover,
      backgroundColor: backgroundColor1,
      borderColor: borderColor1,
      borderWidth: 1,
      fill: false
    }]
  };

  var options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }

  };
  console.log("normalProductTurnover:"+normalProductTurnover)
  console.log("NFTProductTurnover:"+NFTProductTurnover)
  var doughnutPieData = {
    datasets: [{
      data: [normalProductTurnover,NFTProductTurnover],
      backgroundColor: backgroundColor2,
      borderColor: borderColor2,
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'normal',
      'NFT',
    ]
  };
  var doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };





  // Get context with jQuery - using jQuery's .get() method.
  if ($("#barChart").length) {
    var barChartCanvas = $("#barChart").get(0).getContext("2d");
    // This will get the first returned node in the jQuery collection.
    var barChart = new Chart(barChartCanvas, {
      type: 'bar',
      data: data,
      options: options
    });
  }

  if ($("#pieChart").length) {
    var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
    var pieChart = new Chart(pieChartCanvas, {
      type: 'pie',
      data: doughnutPieData,
      options: doughnutPieOptions
    });
  }
};

function getNormalProductTurnover(){
    $.ajax({
      "url": 'http://'+ ip +':8080/manager/echarts/normal',
      "method": "GET",
      "data": {
  
      },
    })
    .done(function(response){
      console.log("success normal")
      normalProductTurnover = response.data;
    })
    .fail(function(error){
      console.log("normal error:"+error)
    })
  }
  
function getNFTProductTurnover(){
    $.ajax({
      "url": 'http://'+ ip +':8080/manager/echarts/nft',
      "method": "GET",
      "data": {
  
      },
    })
    .done(function(response){
      console.log("success NFT")
      console.log(response)
      NFTProductTurnover = response.data;
      console.log(NFTProductTurnover)
    })
    .fail(function(error){
      console.log("NFT error:"+error)
    })
  }

function getCompany(){
  $.ajax({
    "url": 'http://'+ ip +':8080/manager/echarts/company',
    "method": "GET",
    "data": {

    },
  })
  .done(function(response){
    console.log("success company")
    for(var i=0;i<response.data.length;i++){
      company.push(response.data[i].company)
      totalTurnover.push(response.data[i].totalTurnover)
      getRandomColor1()
      getRandomColor2()
      console.log(company[i])
      console.log(totalTurnover[i])
    }
    console.log(response)
  })
  .fail(function(error){
    console.log("NFT error:"+error)
  })
}