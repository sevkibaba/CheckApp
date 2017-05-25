function loadProductsData (cb) {
	$.ajax({
		url:'/product/list',
	 	type:'GET',
		success: function(data) {
			var productList = JSON.parse(data);
			cb(productList);
		}
	});
};

function loadChecksData (cb) {
	$.ajax({
		url:'/check/list',
	 	type:'GET',
		success: function(data) {
			var checkList = JSON.parse(data);
			cb(checkList);
		}
	});
};

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

function callUpdateTotal (total){
	// Update total value in the check table
	$.ajax({
		url : '/check/' + $('#check-id').val() + '/updateTotal',
		type: 'POST',
		data : {
			'total' : total,
		},
		success:function (data){
			// console.log(data);
		}
	});

}