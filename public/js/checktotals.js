document.getElementById('total-paid').addEventListener("keyup", calculateTotals);


function calculateTotals (){

	var totalValue = parseFloat(document.getElementById('total').value); 
	var paidValue = parseFloat(document.getElementById('total-paid').value.replace(',', '.'));
	var remainingValue = parseFloat(document.getElementById('total-remaining').value);

	var calculatedRemaining = totalValue - paidValue;

	$.ajax({
			url:'/check/'+ $('#check-id').val() +'/calculateTotals',
			type: 'POST',
			data:{
				'total_paid' : paidValue,
				'total_remaining' : calculatedRemaining,
			},
			success: function(data){
				document.getElementById('total-remaining').value = calculatedRemaining;
			},

		});	
};