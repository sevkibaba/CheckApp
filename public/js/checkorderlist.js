function loadOrdersData (cb) {
	var checkId = $('#check-id').val();
	$.ajax({
		url:'/order/list/'+ checkId,
	 	type:'GET',
		success: function(data) {
			var orderList = JSON.parse(data);
			cb(orderList);
		}
	});
};

function listOrders(orderList){

for (i in orderList){
	$('#dynamic_field').append(`
		
		<tr id="row` + i + `">
			<td>` + orderList[i].product_name + ` &nbsp &nbsp   ` + orderList[i].product_price + ` &nbsp &nbsp   ` + orderList[i].quantity + `</td>
			<td><button name="delete" id="` + i + `" class="btn btn-danger btn_remove confirm">X</button></td>
		</tr>

		`);
}

};

loadOrdersData(listOrders);
