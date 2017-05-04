function loadData (cb) {
	$.ajax({
		url:'/product/list',
	 	type:'GET',
		success: function(data) {
			var productList = JSON.parse(data);
			cb(productList);	
		}
	});
}
