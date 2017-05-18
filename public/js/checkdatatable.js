//Data table
$(document).ready( function () {
    $('#table_id').DataTable();
} );

$('#new-check').on('click', function(){
	$.ajax({
		url:'/check/createnewcheck',
		type: 'GET',
		success: function(data){
			window.location.href = "../check";
		},

	});
})