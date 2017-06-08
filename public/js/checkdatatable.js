//Data table
function loadDataTable() {
    $('#table_id').DataTable({
	    "ajax": {
	        "url": '/order/list',
	        "dataSrc": "", 
	    	},

	    order: [0,'des'],	
	    "columns": [
	    	{ data: 'check_id',
	    	  // render: function(data, type, row, meta) {
	    	  // 	if(type == "display") {
	    	  // 		return '<a href="">' + data + "</a>"
	    	  // 	}
	    	  // 	return data;
	    	  // }	
		    },
	    	{ data: 'id'},
	    	{ data: 'product_name'},
	    	{ data: 'product_price'},
	    	{ data: 'quantity'},
	    ],
	    rowGroup: {
	    	dataSrc: 'check_id',
	    	startRender: function ( rows, group ) {
	    				for(var key in checkList) {
	    					if(group == checkList[key].id){
	    						return group + ' ' + checkList[key].name + ' ('+rows.count()+' orders)';
	    					};
	    				};
	    	        },
	    },
	    "columnDefs": [
	                {
	                    "targets": [ 0 ],
	                    "visible": false,
	                    "searchable": false
	                },
	    ]
	});
};


$(document).ready(function(){
	loadDataTable();
});