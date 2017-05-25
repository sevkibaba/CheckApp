$('#new-check').on('click', function(){
	$.ajax({
		url:'/check/createnewcheck',
		type: 'GET',
		success: function(data){
			window.location.href = "../check";
		},

	});
});

//Order details
loadProductsData(dataList);
loadProductsData(addNP);

function dataList(productList){

	var innerElements = productList.map((product)=> {
		return ' <option value="'+product.id+'">'+product.name+' </option>';
	});
	$('#products').html(innerElements.join(''))  ;

};

//Action after selection on Datalist HTML element
function addNP(productList){ 
	$("[name='products']").on('input', function(){
		var userText = $(this).val();

		$("#products").find("option").each(function() {
		  if ($(this).val() == userText) {

		  		document.getElementById('selected-product-id').disabled = true;

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
			  			<input type="number" class="form-control" id="quantity" name="quantity" min="1" value="1" required>			  		
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

		if (!quantity||quantity==0){ //Error handling when the quantity is zero or a negative value
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
			complete: function(data) {
				
				//Set total value
				var checkTotal = $('#total').val();
				checkTotal = +checkTotal + (+quantity*+price);
				console.log(checkTotal + typeof(checkTotal));
				$('#total').attr('value', checkTotal);
				callUpdateTotal(checkTotal);

				var checkId = $('#check-id').val();
				window.location.href = "../check/"+ checkId; 
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


