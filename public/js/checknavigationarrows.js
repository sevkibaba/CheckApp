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