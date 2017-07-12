// send browser date to server
var today = new Date();

var dayOfToday = today.getDate();
var monthOfToday = today.getMonth() + 1;
var yearOfToday = today.getFullYear();

// Get todays check data
function todaysChecksAjax(cb){
  $.ajax({
        url:'/reports/daily/' + yearOfToday + "-" + monthOfToday + "-" + dayOfToday,
        type:'GET',
        
        success: function(data) {
          todaysChecks = JSON.parse(data);
          cb(todaysChecks);
        },
  });
};


var groupedOrders = {};
var dailyLabel = [];
var dailyData = [];

function loadTodaysChecks(checkObject) {

  myIndex = 0;
  checkObject.forEach(function(currValue, index, object){

    if(groupedOrders[currValue.product_name] === undefined){
      groupedOrders[currValue.product_name] = [currValue.product_price*currValue.quantity];
    }else{
      groupedOrders[currValue.product_name].push(currValue.product_price*currValue.quantity);
    }
      
  });
  

  for (var name in groupedOrders){
    dailyLabel.push(name) ;
  };

  for (var label in groupedOrders){
    var myTotal = 0;

    for(var i = 0; i < groupedOrders[label].length; i ++){
      myTotal = myTotal + groupedOrders[label][i];
        };
    dailyData.push(myTotal);

  };
  drawDailyChart(dailyLabel, dailyData);
  //send total to span-header
  var dailyTotal = 0;
  dailyData.forEach(function(item, index){
    dailyTotal += item;
  }); 
  document.getElementById('daily-header').innerHTML = "Daily Total: " + dailyTotal;
};

todaysChecksAjax(loadTodaysChecks);


function randomNumber(){
    var numbers = Math.round(Math.random() * 200) + Math.round(Math.random() * 150);
    return numbers;
};


var bgColors = [];
var bdrColors = [];
function createColors(){

    dailyData.forEach(function(){
        var rgbaVersion = "rgba(" + randomNumber() + "," + randomNumber(50) + "," + randomNumber(10) + ", 0.2)";
        bgColors.push(rgbaVersion); 
        bdrColors.push(rgbaVersion); 
    });
};


function drawDailyChart(dailyLabel, dailyData){

    createColors();
    //write random color function. assign bg and border colors at the same time
    var ctx = document.getElementById("daily").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        height: '200px',
        data: {
            labels: dailyLabel,
            datasets: [{
                label: '# of Votes',
                data: dailyData,
                backgroundColor: bgColors,
                borderColor: bdrColors,
                borderWidth: 1
            }]
        },
        
    });
    
};


