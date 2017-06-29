//Data table
function loadDataTable() {
    $('#table_id').DataTable({
	    "ajax": {
	        "url": '/order/list',
	        "dataSrc": function(json){
	        				var cekId = $('#check-id').val();

	        				for(var i=0;i<json.length;i++){
	        					if(json[i].check_id==cekId){
	        						json.splice(i,1);
	        						i = i-1;
	        					}

	        				}; 

	        				return json;
	        			}, 
	    	},
    	"displayLength": 10,
	    "order": [0,'des'],	
	    "columns": [
	    	{ data: 'check_id'},
	    	{ data: 'check_name'},
	    	{ data: 'product_name'},
	    	{ data: 'product_price'},
	    	{ data: 'quantity'},
	    ],
	    "columnDefs": [
	                {
	                    "targets": [ 0 ],
	                    "visible": false,
	                    "searchable": false
	                },
	                {
	                    "targets": [ 1 ],
	                    // "visible": false,
	                }
	    ],
	    "drawCallback": function ( settings ) {
	                var api = this.api();
	                var rows = api.rows( {page:'current'} ).nodes();
	                var last=null;
	     
	                api.column(0, {page:'current'} ).data().each( function ( group, i ) {
	                	for(var key in checkList) {
		                    if ( last !== group && group == checkList[key].id) {
		                        $(rows).eq( i ).before(
		                            '<tr class="group clickable-row" data-href="'+group+'"><td colspan="5"><a href="'+group+'">'+checkList[key].name+ " (Total:"+checkList[key].total+')</a></td></tr>'
		                        );
		     
		                        last = group;
		                    }	                		    	 				
	               		};
	                		    	

	                } );
	            }
	});
};


$(document).ready(function(){
	loadDataTable();
	$(".clickable-row").click(function() {
	        window.location = $(this).data("href");
	    });
});