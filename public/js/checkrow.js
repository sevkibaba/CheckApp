var productRowId = 0;

$.ajax({
	 url:'/product/list',
 	type:'GET',
	success: function(data) {
		var productList = JSON.parse(data);
		window.productList = productList;
		dataList(productList);
		addNP(productList);
	}
});

function dataList(productList){
	var innerElements = productList.map((product)=> {
		return ' <option value="'+product.product_id+'">'+product.name+' </option>';
	});
	$('#products')[productRowId].innerHTML = innerElements.join('');
	productRowId++;
	// console.log('abi birdayim ', innerElements);
};

//succesin icinden functionalari cagirarak sonrasinda variableri halledeceksin, istedigin degerleri atabilirsin,

$("#add").click(function(){
	
	var innerElements = productList.map((product)=> {
		return ' <option value="'+product.product_id+'">'+product.name+' </option>';
	});

	var innerElementsJoined =  innerElements.join('');
	console.log(innerElementsJoined);

	$(".row-appender").append(`
		<div class='row' id="addNamePrice">

			<div class ="form-group col-md-4" >

				<label for = "products">Product ID</label>
				<input list="products" class="form-control" id="select_product" name="products" size=50>
				<datalist id="products" >
					${innerElementsJoined}
				</datalist>
			
			</div>

		</div>
	`);

});

function addNP(productList){ 
	$("[name='products']").on('input', function(){
		var userText = $(this).val();

		$("#products").find("option").each(function() {
		  if ($(this).val() == userText) {

			  	console.log('Selected and inserted');

			  	$("#addNamePrice").append(`

			  		<div class ="form-group col-md-4" >

			  			<label for = "pn">Product Name</label>
			  			<input type="text" class="form-control" id="pn" name="pn">
			  		
			  		</div>

			  		<div class ="form-group col-md-4" >

			  			<label for = "pp">Product Price</label>
			  			<input type="number" class="form-control" id="pp" name="pp">
			  		
			  		</div>

				`);

			}
		});

		productList.forEach(function(currentValue){
	  		if(currentValue.product_id === parseInt(userText)){
	  			$("#pn").val(currentValue.name);
	  			$("#pp").val(currentValue.price);
	  		};
		});

	});

};

