loadOrdersData(deleteOrder);
loadOrdersData(listOrders);

function listOrders(orderList){
	//Add order table headers if the list is not empty, and add with fade in all order header-orders
	if(orderList.length!=0){
		$("#dynamic_field_header").append(`
			<tr id = "order-table-header" style="display:none;">
				<th>Order</th>
				<th>Price</th>
				<th>Quantity</th>
				<th>Delete</th>
			</tr>
		`);


		$("#order-table-header").fadeIn(300);
		$('#new-check-button-container').fadeIn(1400)
		$('#check-name-container').removeClass('col-md-12').addClass('col-md-8');
		$('#closed-button-container').fadeIn(3000);
	}
	for (i in orderList){
		var respective = 400 + i * 100;

		$('#dynamic_field').append(`			
			<tr id="row` + i + `" style="display:none;">
				<td>` + orderList[i].product_name + 
				`<td>` + orderList[i].product_price + `</td>
				 <td>`+ orderList[i].quantity + `</td>
				 <td>
				 	<select class="form-control payment-type" id="` + i + `pt">
				 		<option>Payment Type</option>
				 		<option>Credit Card</option>
				 		<option>Cash</option>
				 		<option>Discount</option>
				 	</select>
				 </td>
				<td><button name="delete" id="` + i + `" class="btn btn-danger btn_remove confirm">X</button></td>
			</tr>
		`);

		$('#row'+i).fadeIn(respective);

	};

	loadOrdersData(handlePaymentType);

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

		        		//Set total value
		        		checkTotal = checkTotal - parseFloat(orderList[focusedOrder].quantity)*parseFloat(orderList[focusedOrder].product_price);

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

