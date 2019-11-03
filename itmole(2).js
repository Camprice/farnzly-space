var hitcount = 0;
var timer = 1500
var holes = ["hole1", "hole2", "hole3", "hole4", "hole5", "hole6", "hole7", "hole8", "hole9", "hole10", "hole11", "hole12" ];
// document.getElementById("score").innerHTML = "Your score is: "  + hitcount;
//pushes the program into moveMole after 1.5 seconds.
//timer1 = setTimeout("moveMole()", 1500);

// document.getElementById("itmole").onclick = Whack();
// $("#itmole").click(function(){Whack();});
function startGame() {
	timer1 = setTimeout("moveMole()",timer);
	$("#score").text(hitcount);

};

function moveMole() {
	//runs moveMole every 1.5 seconds
	timer1 = setTimeout("moveMole()",timer);

	//randomly chooses a new hole from array holes
	var rand = Math.floor(Math.random()*12)
	var h = holes[rand];

	//selects our mole and moves it to the randomly chosen hole
	document.getElementById(h).appendChild(itmole);


};


function Whack(){
	$("#itmole").off("click");
	hitcount++;
	$("#score").text(hitcount);
	//flips the image of the mole to the surprised mole
	var cm = $("#clickmole");
	cm.attr({"src" : "./images/surprisedmole.png"});
	// cm.animate({left: "25px"}, "linear");
	// cm.animate({right: "25px"}, "linear");
	//makes the mole stop moving. Then runs reDo to start the mole moving again.
	clearTimeout(timer1);
	timer = timer-50;
	timer2 = setTimeout("reDo()",3000);
	console.log("Program got to Whack");

};

function reDo(){
	//flips the image back to the original mole.
	$("#clickmole").attr({"src":"./images/madmole.png"}).removeAttr("style");
	console.log("Program got to reDo");
	if(timer==0){
		reset();
	}else{
		$("#itmole").on("click",Whack);
		moveMole();
	}
};

function reset(){
	document.getElementById("hole1").appendChild(itmole);
	$("#itmole").off("click");
	$("#reset").hide();
	$("#start").show();
	var finalHitcount = hitcount;
	hitcount = 0;
	clearTimeout(timer1)
	timer = 1500;
	alert("Congradulations, max score "+finalHitcount+" reached!");
};

$(function(){
	$("#start").click(function(){
		startGame();
		$("#start").hide();
		$("#reset").show();
		$("#itmole").on("click",Whack);
	});
	$("#reset").click(function(){
		document.getElementById("hole1").appendChild(itmole);
		$("#itmole").off("click");
		$("#reset").hide();
		$("#start").show();
		var finalHitcount = hitcount;
		hitcount = 0;
		clearTimeout(timer1)
		timer = 1500;
		alert("Congratulations, your score is "+finalHitcount+"!");
	});
	$("#score").text(hitcount);
});

