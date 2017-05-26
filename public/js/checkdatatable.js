//Data table
function loadDataTable() {
	var dummyData = [
				
					['3', '4', 'name', '6', '2']

				];	

    $('#table_id').DataTable({

	    "ajax": {
	        "url": '/order/list',
	        "dataSrc": "", 
	    	},

	    "columns": [
	    	{ data: 'check_id'},
	    	{ data: 'id'},
	    	{ data: 'product_name'},
	    	{ data: 'product_price'},
	    	{ data: 'quantity'},
	    ]
		
	});
};


$(document).ready(function(){
	loadDataTable();
	console.log("datatable ready");
});