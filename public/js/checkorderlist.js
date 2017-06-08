loadOrdersData(deleteOrder);
loadOrdersData(listOrders);

function listOrders(orderList){
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
		        		
		$.confirm({
		    title: 'Delete Order',
		    content: 'Are you sure to delete this order?',
		    buttons: {
		        confirm: {
		        	btnClass: 'btn-success',
		        	action: function () {

		        		var checkTotal = $('#total').val().replace(',','');
		        		checkTotal = parseFloat(checkTotal);
		        		console.log(checkTotal + "setting variable" + parseFloat(checkTotal) + " " + typeof(checkTotal));
		        		//Set total value
		        		checkTotal = checkTotal - parseFloat(orderList[focusedOrder].quantity)*parseFloat(orderList[focusedOrder].product_price);

		        		console.log(checkTotal + "calculated variable" + parseFloat(checkTotal) + " " + typeof(checkTotal));
		        		console.log(orderList[focusedOrder].quantity + "  quantity: " + parseFloat(orderList[focusedOrder].quantity) + " " + typeof(orderList[focusedOrder].quantity));

		        		console.log(parseFloat(orderList[focusedOrder].product_price) + "  price: " + parseFloat(orderList[focusedOrder].product_price) + " " + typeof(parseFloat(orderList[focusedOrder].product_price)));

		        		$('#total').attr('value', checkTotal);
		        		callUpdateTotal(checkTotal);

		        		var checkId = $('#check-id').val();

		        		window.location.href = "../order/"+orderList[focusedOrder].id + "/delete/" + checkId ; 

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

