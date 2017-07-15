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
	var innerElements = productList.map((product)=> {
		return ' <option data-value="'+product.id+'"value="'+product.name+'">'+product.price+'</option>';
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
		  			width: '200px',

		  			}, 

		  			{complete: function(){
				  		$('.form-group.col-md-2').fadeIn(200);
		  			}}
		  		);
			};
		});

		productList.forEach(function(currentValue){
	  		if(currentValue.name === userText){
	  			$("#pp").val(currentValue.price);
	  		};
		});
	  	
		$('.form-group.col-md-2').animate({
			opacity: '0.5',
		});

		$('#button-container').animate({
			opacity: '1',
		}, 400, function(){
			$('#button-container').animate({
				left:'20px'
			})
		});

		
	});
};

//Action after + button is clicked.
function addNamePrice (selectedProductId){
	$('#addNamePrice').one('click', '#add-order', function(e){  //Since I add the button dynamically I had to use delegated event handler
		var check_id = $('#check-id').val(); 
		var selectedOption = $("[name='products']").val();
		var selectedId = $('#products [value="' + selectedOption + '"]').data('value')
		var name = selectedOption;
		var price = $('#pp').val();
		var quantity = $('#quantity').val(); 
		var check_name = $('#check-name').val(); 

		price = parseFloat(price);
		quantity = parseFloat(quantity);

		$.ajax({
			url:'/check/addorder',
		 	type:'POST',
		 	data: {
		 		'check_id' : check_id ,
		 		'check_name' : check_name ,
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
				calculateTotals();
				var checkId = $('#check-id').val();
				window.location.href = "../check/"+ checkId; 
			}

		});

	});

};

function showTotals(){
	if (orderList.length!==0){
		$("#total-input-fields").fadeIn(500);
	}
};


// Send Check Name after focus out
function sendCheckName(){
	// Fade in select product after focus on check name input field
	if ($('#check-name').val()){
			$('.panel-body').fadeIn(700);
	}else{	

		$('#check-name').keydown(function(){
			$('.panel-body').fadeIn(700);
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


