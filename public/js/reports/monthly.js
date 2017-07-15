// send browser date to server
var today = new Date();

var monthOfToday = today.getMonth() + 1;
var yearOfToday = today.getFullYear();


// Get this month's check data
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

//variables to calculate monthly graph data
var dailyTotal = [];
var dailyPaid = [];
var labels = [];
var groupedTotal = {};
var groupedPaid = {};
var calMonthTotal;
var paidMonthTotal;

// Callback function to get the check values of the month, object is the all checks of the month
function loadMonthsChecks(checkObject) {

  //prepare the the totals of the days
  checkObject.forEach(function(currValue, index, object){
    var thisDate = new Date(currValue.created_at).getDate();
    thisDateString = thisDate.toString();

    if(groupedTotal[thisDateString] == undefined){

      groupedTotal[thisDateString] = currValue.total;
      groupedPaid[thisDateString] = currValue.total_paid;
    }else{
      groupedTotal[thisDateString] = parseFloat(groupedTotal[thisDateString]) + parseFloat(currValue.total);
      groupedPaid[thisDateString] = parseFloat(groupedPaid[thisDateString]) + parseFloat(currValue.total_paid);
    };
 
  });

  //prepare the arrays to be used in monthly chart
  for (var name in groupedTotal){ labels.push(name);};
  for (var label in groupedTotal){ dailyTotal.push(groupedTotal[label]); };
  calMonthTotal = dailyTotal.reduce(function(acc, val){ return acc+val });
  for (var label in groupedPaid){ dailyPaid.push(groupedPaid[label]); };
  paidMonthTotal = dailyPaid.reduce(function(acc, val){ return acc+val });  
  drawMonthlyChart(labels, dailyTotal, dailyPaid);
};

monthsChecksAjax(loadMonthsChecks);

var paidLineColor = "rgba(46,242,157, 0.3)" ;

function drawMonthlyChart(labels, dailyTotal, dailyPaid){

    var ctx = document.getElementById("monthly").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        height: '200px',
        data: {
            labels: labels,
            datasets: [{
                label: 'Calculated Totals (' + calMonthTotal + ')',
                fill: false,
                data: dailyTotal,
                backgroundColor: 'black',
                borderColor: 'black',
            },
            {
                label: 'Paid Totals(' + paidMonthTotal + ')',
                fill: false,
                data: dailyPaid,
                backgroundColor: paidLineColor,
                borderColor: paidLineColor
            }
            ]
        },
        
    });
    
};


