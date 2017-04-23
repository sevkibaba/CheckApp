$.ajax({
	url:'/product/list',
 	type:'GET',
	success: function(data) {
		var productList = JSON.parse(data);
		window.productList = productList;
		dataList(productList);
		postOrder(); //this one is not necessary
	}
});

function dataList(productList){
	console.log('2enter func');
	var innerElements = productList.map((product)=> {
		return ' <option value="'+product.product_id+'">'+product.name+' </option>';
	});
	$('#productslist')[0].innerHTML = innerElements.join('');
	console.log('3inner tamam');

};

var i=1;

function postOrder(){ 
	$("[name='product']").on('input', function(){
		var userText = $(this).val();
		console.log($('#select_product').val());

		$("#productslist").find("option").each(function() {
		  if ($(this).val() == userText) {

		  	$.ajax({
		  		url:'/order/post',
		  	 	method:'POST',
		  	 	data: $('#select_product').val(),
		  	 	dataType: 'json',
		  		success: function(response, textStatus, jqXHR) {
		  			
		  			alert('yo!');

		  			}
		  		});
			}
		});

	});

};

function addRowTable(){

	$('#first-row').append(`

		<tr>
			<td></td>
			<td><button type="button" ></button></td>
		</tr>

	`);

};