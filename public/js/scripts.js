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

