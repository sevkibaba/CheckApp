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
	}
	for (i in orderList){
		var respective = 400 + i * 100;

		$('#dynamic_field').append(`			
			<tr id="row` + i + `" style="display:none;">
				<td>` + orderList[i].product_name + 
				`<td>` + orderList[i].product_price + `</td>
				 <td>`+ orderList[i].quantity + `</td>
				<td><button name="delete" id="` + i + `" class="btn btn-danger btn_remove confirm">X</button></td>
			</tr>
		`);

		$('#row'+i).fadeIn(respective);
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

