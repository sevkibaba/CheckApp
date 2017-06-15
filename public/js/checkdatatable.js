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
	        					}

	        				}; 
	        				// json.pop();
	        				return json;
	        			}, 
	    	},
    	"displayLength": 10,
	    "order": [0,'des'],	
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
	    // "rowGroup": {
	    	// dataSrc: 'check_id',
	    	// startRender: function ( rows, group ) {
	    	// 			for(var key in checkList) {
	    	// 				if(group == checkList[key].id){
	    	// 					return checkList[key].name + ' ('+rows.count()+' order(s))';
	    	// 				};
	    	// 			};
	    	//         },
	    // },
	    "columnDefs": [
	                {
	                    "targets": [ 0 ],
	                    "visible": false,
	                    "searchable": false
	                },
	    ],
	    "drawCallback": function ( settings ) {
	                var api = this.api();
	                var rows = api.rows( {page:'current'} ).nodes();
	                var last=null;
	     
	                api.column(0, {page:'current'} ).data().each( function ( group, i ) {
	                    if ( last !== group ) {
	                        $(rows).eq( i ).before(
	                        	//insert the link here
	                        	//
	                            '<tr class="group"><td colspan="5"><a href="'+group+'">'+group+'</a></td></tr>'
	                        );
	     
	                        last = group;
	                    }
	                } );
	            }
	});
};


$(document).ready(function(){
	loadDataTable();
});