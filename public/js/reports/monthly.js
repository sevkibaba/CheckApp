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
    
//     drawDailyChart(dailyLabel, dailyData);
};

monthsChecksAjax(loadMonthsChecks);


// function randomNumber(){
//     var numbers = Math.round(Math.random() * 200) + Math.round(Math.random() * 150);
//     return numbers;
// };

// var bgColors = [];
// var bdrColors = [];
// function createColors(){

//     dailyData.forEach(function(){
//         var rgbaVersion = "rgba(" + randomNumber() + "," + randomNumber(50) + "," + randomNumber(10) + ", 0.2)";
//         bgColors.push(rgbaVersion); 
//         bdrColors.push(rgbaVersion); 
//     });
//     console.log(bgColors +  " " + bdrColors); 
// };

// function drawDailyChart(dailyLabel, dailyData){

//     createColors();
//     //write random color function. assign bg and border colors at the same time
//     var ctx = document.getElementById("daily").getContext('2d');
//     var myChart = new Chart(ctx, {
//         type: 'doughnut',
//         height: '200px',
//         data: {
//             labels: dailyLabel,
//             datasets: [{
//                 label: '# of Votes',
//                 data: dailyData,
//                 backgroundColor: bgColors,
//                 borderColor: bdrColors,
//                 borderWidth: 1
//             }]
//         },
        
//     });
    
// };


