// Function ajax click event
function clickSponsorSearch (idsearch, idsponsor) {
	if((idsearch != undefined && idsearch != '' ) && (idsponsor != undefined && idsponsor != '')){
		$.ajax({
			data:  "idsearch="+idsearch+"&idsponsor="+idsponsor,
			url:   'ajax/setCounter.php',
			type:  'post',
			success:  function (response) {
				// success action
			}
		});
	}else{
		return false;
	}
}