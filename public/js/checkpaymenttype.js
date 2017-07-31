
function handlePaymentType(orderList){

	//set dropdown values
	for(i=0;i<orderList.length;i++){
		var item = document.getElementById(i+'pt');
		item.value = orderList[i].payment_type;
	};

	//Send payment type after selection on drop-down
	$(document).on('change','.payment-type',function(){
		var selectedPtId = $(this).attr('id').replace('pt','');
		var previousPt = orderList[selectedPtId].payment_type;
		var selectedPt = $(this).val();
		console.log("previousPt: " + previousPt);
		console.log("selectedPt: " + selectedPt);

		$.ajax({
			url:'/order/paymenttype/' + orderList[selectedPtId].id,
			type: 'POST',
			data:{
				'payment_type': $(this).val(),
			},
			success: function(data){

				var paidTotal;

				function getPaid(){
					// // Calculate total here
					paidTotal = $('#total-paid').val().replace(',','.');
					paidTotal = parseFloat(paidTotal);
				}
				
				getPaid();

				var quantity = orderList[selectedPtId].quantity;
				var price = orderList[selectedPtId].product_price;


				//First Selection
				if(selectedPt == previousPt){ 


				}else if(previousPt == "Payment Type"){
				
					if(selectedPt == "Discount"){

						orderList[selectedPtId].payment_type = selectedPt;
					
					}else{

						orderList[selectedPtId].payment_type = selectedPt;
						getPaid();	
						paidTotal = parseFloat(paidTotal+(quantity*price));
						document.getElementById('total-paid').value = paidTotal;
						calculateTotals();

					}	

				}else if(previousPt == "Credit Card"){

					if(selectedPt == "Cash"){

						orderList[selectedPtId].payment_type = selectedPt;

					}else{

						orderList[selectedPtId].payment_type = selectedPt;
						getPaid();
						paidTotal = parseFloat(paidTotal-(quantity*price));
						document.getElementById('total-paid').value = paidTotal;
						calculateTotals();
					}					

				}else if(previousPt == "Cash"){

					if(selectedPt == "Credit Card"){

						orderList[selectedPtId].payment_type = selectedPt;

					}else{

						orderList[selectedPtId].payment_type = selectedPt;
						getPaid();
						paidTotal = parseFloat(paidTotal-(quantity*price));
						document.getElementById('total-paid').value = paidTotal;
						calculateTotals();

					}

				}else{
					if(selectedPt == "Payment Type"){

						orderList[selectedPtId].payment_type = selectedPt;

					}else{

						orderList[selectedPtId].payment_type = selectedPt;
						getPaid();
						paidTotal = parseFloat(paidTotal+(quantity*price));
						document.getElementById('total-paid').value = paidTotal;
						calculateTotals();

					}
				}

			},

		});
	});


	
};
