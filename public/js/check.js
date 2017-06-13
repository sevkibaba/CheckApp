$(document).ready(function(){
	addNavButtons();
});

function addNavButtons(){
	$('#container').prepend(`
		<a id="a-back" href=""><span class="glyphicon glyphicon-arrow-left" id="back-arrow" aria-hidden="true"></span></a>
	`);
	$('body').append(`
		<div>
			<a id="a-forward" href=""><span class="glyphicon glyphicon-arrow-right" id="forward-arrow" aria-hidden="true"></span></a>
		</div>
	`);
};

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

//Add the products into the datalist options
function dataList(productList){
	//send the product id to a hidden element for the add order button, ajax call XXXX

	var innerElements = productList.map((product)=> {
		return ' <option data-value="'+product.id+'"value="'+product.name+'"></option>';
	});

	$('#products').html(innerElements.join(''))  ;
};

//Action after selection on Datalist HTML element(Product Select)
function addNP(productList){ 
	$("[name='products']").on('input', function(){
		var userText = $(this).val();

		$("#products").find("option").each(function() {
		  if ($(this).val() == userText) {
		  		document.getElementById('selected-product-id').disabled = true;

		  		$('#order-container').animate({
		  			width: '180px',
		  			fontSize: '13',
		  			complete: function(){
		  			}
		  		});

			  	$("#addNamePrice").append(`
			  		
			  		<div class ="form-group col-md-2" >
			  			<label for = "pp">Price</label>
			  			<input type="number" class="form-control" id="pp" name="pp" readonly>
			  		</div>

			  		<div class ="form-group col-md-2" >
			  			<label for = "quantity">Quantity</label>
			  			<input type="number" class="form-control" id="quantity" name="quantity" min="1" value="1" required>			  		
			  		</div>

			  		<div class ="form-group col-md-2" id="button-container">
			  			<div><label for="add-order">&nbsp &nbsp &nbsp;</label></div>
			  			<button class="btn btn-success" id="add-order" >+</button>			  		

			  		</div>	
				`);
			};
		});

		productList.forEach(function(currentValue){
	  		if(currentValue.name === userText){
	  			$("#pp").val(currentValue.price);
	  		};
		});

		//Animate the selected product details
		$('#order-container').animate({
			marginBottom: '0px'
		});

		$('.panel-body').animate({
			paddingTop: '2px'
		});

	  	
		$('.form-group.col-md-2').animate({
			opacity: '0.5',
		});

		$('#button-container').animate({
			opacity: '1',
			left: '10px'
		});

		
	});
};

//Action after + button is clicked.
function addNamePrice (selectedProductId){
	$('#addNamePrice').on('click', '#add-order', function(e){  //Since I add the button dynamically I had to use delegated event handler
		var check_id = $('#check-id').val(); 
		console.log(check_id);
		var selectedOption = $("[name='products']").val();
		var selectedId = $('#products [value="' + selectedOption + '"]').data('value')




		// var selectedId = ;
		console.log(selectedId); 
		var name = selectedOption;
		console.log(name); 
		var price = $('#pp').val();
		console.log(price); 
		var quantity = $('#quantity').val(); 
		console.log(quantity);

		price = parseFloat(price);
		quantity = parseFloat(quantity);

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
				var checkTotal = $('#total').val().replace(',','');
				checkTotal = parseFloat(checkTotal);
				checkTotal = checkTotal + (quantity*price);
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
	// Fade in select product after focus on check name input field
	if ($('#check-name').val()){
			$('.panel-body').fadeIn(900);		
	}else{	

		$('#check-name').keydown(function(){
			$('.panel-body').fadeIn(900);
		});
	};	
	//Post check name after focus out
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


