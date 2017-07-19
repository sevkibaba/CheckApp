$(document).ready(function(){
});

function addNavButtons(){
	$('#container').before(`
		<div class="page-columns" style="opacity:0.1;"><a id="a-back" href=""><span class="glyphicon glyphicon-arrow-left" id="back-arrow" aria-hidden="true"></span></a></div>
	`);
	$('#container').after(`
		<div class="page-columns" style="opacity:0.1;" ><a id="a-forward" href=""><span class="glyphicon glyphicon-arrow-right" id="forward-arrow" aria-hidden="true"></span></a></div>
	`);
};

function activateNavButtons(){
	$('.page-columns').animate({
		opacity:'1',
	});
};

function navigationArrows(checkList) {

	var checkCount = Object.keys(checkList).length;
	var biggest = checkList[checkCount-1].id;
	var smallest = checkList[0].id; 
	var checkId = parseInt($('#check-id').val());
	var backId;
	var forwardId;
//Prepare the page from left to right and check the number of checks.
	if(checkCount == 1){
		$('#document-container, .nav-tabs').fadeIn(300);		
	} else if (checkId==biggest){
		addNavButtons();
		$('#document-container, .nav-tabs').fadeIn(300);		
		activateNavButtons();

		$('#a-back').attr('href', checkId-1);
		$('#a-forward').detach();
	} else if(checkId==smallest){
		addNavButtons();
		$('#document-container, .nav-tabs').fadeIn(300);
		activateNavButtons();
		
		$('#a-forward').attr('href', checkId+1); 
		$('#a-back').detach();
	} else{
		addNavButtons();
		$('#document-container, .nav-tabs').fadeIn(300);
		activateNavButtons();
		

		for(var i=0; i<checkCount; i++){

			if(checkId == checkList[i].id){
				forwardId = checkList[i+1].id;
				backId = checkList[i-1].id;
			};
			
			$('#a-forward').attr('href', forwardId);			
			$('#a-back').attr('href', backId);			

		};

	};
};

loadChecksData(navigationArrows);