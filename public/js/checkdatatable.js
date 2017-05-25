// //Data table
// function loadDataTable() {
//     $('#table_id').DataTable({
//     	"pagingType": "full_numbers",
//     	// "processing": "true",
// 	    "paging": "true",
// 	    "serverSide": "true",
// 	    "ajax": {
// 	        "url": '/order/list',
			// "type": "json",
// 	        "dataSrc": "", 
// 	        // function(json){

// 	        // 	console.log(json.data);
// 	        // 	// console.log(json[0].recordsTotal);
// 	        // 	// console.log(json[0].recordFiltered);
// 	        // 	// console.log(json[0].draw);
// 	        // 	return json.data;
// 	        // },
// 	    	},
// 	    "columns": [
// 	    	{ "data": 'check_id'},
// 	    	{ "data": 'id'},
// 	    	{ "data": 'product_name'},
// 	    	{ "data": 'product_price'},
// 	    	{ "data": 'quantity'},
// 	    ],
		
// 	});
// };

// $(document).ready(function(){
// 	loadDataTable();
// 	console.log("datatable ready");
// });