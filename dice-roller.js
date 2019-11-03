$(function(){
	$("#rollDice").click(function(){
		var a = $("#numbs").val();
		var b = $("#sides").val();
		var dice=0
		var rolls = "";
		for (var i=0; i<a; i++){
			var res = Math.floor(Math.random()*b)+1;
			var end = "";
			if(i != a-1){
				end = " , ";
			}else{
				end = " = ";
			}
			rolls += res + end;
			dice += res;
		}

		rolls += dice;
		if (b==20){
			if (dice==20){
				alert("Critical Hit!!!");
			}
			if (dice==1){
				alert("Critical Failure!!!")
			}	
		}	
		$("#roll").text(rolls);
	});
});