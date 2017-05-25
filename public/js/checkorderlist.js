loadOrdersData(deleteOrder);
loadOrdersData(listOrders);

function listOrders(orderList){
	console.log(orderList);
	for (i in orderList){
		$('#dynamic_field').append(`			
			<tr id="row` + i + `">
				<td>` + orderList[i].product_name + ` &nbsp &nbsp   ` + orderList[i].product_price + ` &nbsp &nbsp   ` + orderList[i].quantity + `</td>
				<td><button name="delete" id="` + i + `" class="btn btn-danger btn_remove confirm">X</button></td>
			</tr>
		`);
	};

};


function deleteOrder(orderList){
	$(document).on('click','.confirm', function(){
		var focusedOrder = $(this).attr('id');
		console.log('eee');
		        		
		$.confirm({
		    title: 'Delete Order',
		    content: 'Are you sure to delete this order?',
		    buttons: {
		        confirm: {
		        	btnClass: 'btn-success',
		        	action: function () {

		        		var checkTotal = $('#total').val();

		        		//Set total value
		        		checkTotal = parseFloat(checkTotal) - parseFloat(orderList[focusedOrder].quantity)*parseFloat(orderList[focusedOrder].product_price);
		        		$('#total').attr('value', checkTotal);
		        		callUpdateTotal(checkTotal);

		        		var checkId = $('#check-id').val();

		        		window.location.href = "../order/"+orderList[focusedOrder].id + "/delete/" + checkId ; 

		        		// var self = this;
		        		// // window.location.href = "../order/"+orderList[focusedOrder].id+ "/delete"; 

		        		// $.ajax({
		        		// 	url:"../order/"+ orderList[focusedOrder].id + "/delete",
		        		//  	type:'POST',
		        		// 	success: function(data) {
				        		// $.alert('Order deleted!');

				        		// //Update Order Table
				        		// $('#dynamic_field').empty();
				        		// loadOrdersData(listOrders);

				        		//Set total value
				        		// self.close();
		        			// }
		        		// });

		        		// return false;
		        	},		        
		        },

		        cancel: {
		        	btnClass: 'btn-danger',
		        	action: function () {
		            	$.alert('Canceled!');
		      		},
		        }
		    }
		});
	});
};

