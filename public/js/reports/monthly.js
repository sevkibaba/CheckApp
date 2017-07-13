// send browser date to server
var today = new Date();

var dayOfToday = today.getDate();
var monthOfToday = today.getMonth() + 1;
var yearOfToday = today.getFullYear();


function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
};

var days = daysInMonth(monthOfToday, yearOfToday);

// Get this months check data
function monthsChecksAjax(cb){
  $.ajax({
        url:'/reports/monthly/' + yearOfToday + "-" + monthOfToday,
        type:'GET',
        
        success: function(data) {
          monthsChecks = JSON.parse(data);
          cb(monthsChecks);
        },
  });
};

var dailyTotal = [];
var dailyPaid = [];
var labels = [];
var groupedTotal = {};
var groupedPaid = {};
var MyIndex = 0;

function loadMonthsChecks(checkObject) {

  checkObject.forEach(function(currValue, index, object){
    var thisDate = new Date(currValue.created_at).getDate();
    thisDateString = thisDate.toString();

      console.log(thisDate +'   '+currValue.total_paid);  

    if(groupedTotal[thisDateString] == undefined){

      groupedTotal[thisDateString] = currValue.total;
      groupedPaid[thisDateString] = currValue.total_paid;
    }else{
      groupedTotal[thisDateString] = parseFloat(groupedTotal[thisDateString]) + parseFloat(currValue.total);
      groupedPaid[thisDateString] = parseFloat(groupedPaid[thisDateString]) + parseFloat(currValue.total_paid);
    };
 
  });

  for (var name in groupedTotal){
    labels.push(name) ;
  };

  for (var label in groupedTotal){
    dailyTotal.push(groupedTotal[label]);
  };
  
  for (var label in groupedPaid){
    dailyPaid.push(groupedPaid[label]);
  };
    
  drawMonthlyChart(labels, dailyTotal, dailyPaid);
};

monthsChecksAjax(loadMonthsChecks);


function drawMonthlyChart(labels, dailyTotal, dailyPaid){

    var ctx = document.getElementById("monthly").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        height: '200px',
        data: {
            labels: labels,
            datasets: [{
                label: 'Calculated Totals',
                fill: false,
                data: dailyTotal,
                backgroundColor: 'blue',
                borderColor: 'blue',
            },
            {
                label: 'Paid Totals',
                fill: false,
                data: dailyPaid,
                backgroundColor: 'red',
                borderColor: 'red',
            }
            ]
        },
        
    });
    
};


