$(document).ready(function(){
	addNavButtons();
	activateNavButtons();
});

function addNavButtons(){
	$('#container').before(`
		<div class="page-columns" style="display:none;"><a id="a-back" href=""><span class="glyphicon glyphicon-arrow-left" id="back-arrow" aria-hidden="true"></span></a></div>
	`);
	$('#container').after(`
		<div class="page-columns" style="display:none;" ><a id="a-forward" href=""><span class="glyphicon glyphicon-arrow-right" id="forward-arrow" aria-hidden="true"></span></a></div>
	`);
};

function activateNavButtons(){
	$('.page-columns').fadeIn(2900);
};

function navigationArrows(checkList) {

	var checkCount = Object.keys(checkList).length;
	var biggest = checkList[checkCount-1].id;
	var smallest = checkList[0].id; 
	var checkId = parseInt($('#check-id').val());
	var backId;
	var forwardId;

	if (checkId==biggest){
		$('#a-forward').attr('onclick', "return false"); //This is not necessary if we use detach(), but let's leave it here			
		$('#a-back').attr('href', checkId-1);
		$('#a-forward').detach();
	} else if(checkId==smallest){
		$('#a-forward').attr('href', checkId+1); 
		$('#a-back').attr('onclick', "return false"); //This is not necessary if we use detach(), but let's leave it here			
		$('#a-back').detach();

	} else{

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