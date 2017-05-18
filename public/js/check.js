//Order details
loadProductsData(dataList);
loadProductsData(addNP);

function dataList(productList){

	var innerElements = productList.map((product)=> {
		return ' <option value="'+product.id+'">'+product.name+' </option>';
	});
	$('#products').html(innerElements.join(''))  ;

};

//disable datalist after selection
document.getElementById('selected-product-id').addEventListener('input', function () {
	$(this).attr('readonly', true);   
});

//Action after selection on Datalist HTML element
function addNP(productList){ 
	$("[name='products']").on('input', function(){
		var userText = $(this).val();

		$("#products").find("option").each(function() {
		  if ($(this).val() == userText) {


			  	$("#addNamePrice").append(`

			  		<div class ="form-group col-md-2" >

			  			<label for = "pn">Name</label>
			  			<input type="text" class="form-control" id="pn" name="pn" readonly>
			  		
			  		</div>

			  		<div class ="form-group col-md-2" >

			  			<label for = "pp">Price</label>
			  			<input type="number" class="form-control" id="pp" name="pp" readonly>
			  		
			  		</div>

			  		<div class ="form-group col-md-2" >

			  			<label for = "quantity">Quantity</label>
			  			<input type="number" class="form-control" id="quantity" name="quantity" required>
			  		
			  		</div>

			  		<div class ="form-group col-md-2" >
			  			<div><label for="add-order">&nbsp &nbsp &nbsp;</label></div>
			  			<button class="btn btn-success" id="add-order" >+</button>			  		

			  		</div>
			  		
				`);

			};
		});

		productList.forEach(function(currentValue){
	  		if(currentValue.id === parseInt(userText)){
	  			$("#pn").val(currentValue.name);
	  			$("#pp").val(currentValue.price);
	  		};
		});


	});

};

//Action after + button is clicked.
function addNamePrice (){

$('#addNamePrice').on('click', '#add-order', function(e){  //Since I add the button dynamically I had to use delegated event handler

	var check_id = $('#check-id').val(); 
	var selectedId = $('#selected-product-id').val(); 
	var name = $('#pn').val(); 
	var price = $('#pp').val(); 
	var quantity = $('#quantity').val(); 

	if (!quantity||quantity==0){
		console.log('entred if');
		$('#container').prepend(`<div class="alert alert-danger">

		Please select quantity!

		</div>`);
		return;
	}

	$.ajax({
		url:'/check/addorder',
	 	type:'POST',
	 	data: {
	 		'check_id' : check_id ,
	 		'product_id' : selectedId,
	 		'product_name' : name ,
	 		'product_price' : price,
	 		'quantity' : quantity,
	 	},
		success: function(data) {
			
			//Set total value
			var checkTotal = $('#total').val();
			checkTotal = parseFloat(checkTotal) + parseFloat(quantity)*parseFloat(price);
			$('#total').attr('value', checkTotal);

			//Clear product selection
			$('#addNamePrice').empty();
			$('#addNamePrice').append(`
					<div class ="form-group col-md-2" id="order-container">

						<label for = "products">Product</label>
						<input list="products" class="form-control" name="products" id="selected-product-id">
						<datalist id="products" >
							
						</datalist>
					
					</div>
				`);

			console.log(checkTotal + 'iki');

			loadProductsData(dataList);
			loadProductsData(addNP);
			loadOrdersData(listOrders);
			

			// Update total value in the check table
			$.ajax({
				url : '/check/' + $('#check-id').val() + '/updateTotal',
				type: 'POST',
				data : {
					'total' : checkTotal,
				},
				success:function (data){

				}
			});

		}
	});

});

};

// Send Check Name after focus out
function sendCheckName(){

$('#check-name').focusout(function(){

	$.ajax({
		url:'/check/'+ $('#check-id').val() +'/updateName',
		type: 'POST',
		data:{
			'check_name' : $('#check-name').val(),
		},
		success: function(data){

		},

	});
});

};

// Send closed parameter after click
function sendClosedParameter(){

$('#closed').on('click', function(){
	var val = $('#closed').val();

	if (val == 0){

		$('#closed').val('1');
		$('#closed').prop('checked', true);		
	}else{
		$('#closed').val('0');		
	}

	$.ajax({
		url:'/check/'+ $('#check-id').val() +'/updateClosed',
		type: 'POST',
		data:{
			'closed' : $('#closed').val(),
		},
		success: function(data){

		},

	});
});

};


