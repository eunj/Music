$(document).ready(function(){
	console.log("ready");	
	
	$('#im').click(function(){

	$("#ssound")[0].load();
	$("#ssound")[0].play();
		
	});//시작하기 전에 악기 그림 클릭, 사운드 동기화
	
	var temp_x = 0;//좌표값 비교 임시변수
	var count = 0;//좌표값 저장 카운터

	var gradient = function(number2){
		$('#im').css({"-webkit-transform": "rotate("+Number(number2)*10+"deg)"});
	}
	 
	
	var check = function (number1){
		
		if(count === 0){// 카운터가 0일때 받은 좌표값을 임시 변수에 저장 후 카운터 1 증가
			temp_x = Math.abs(Number(number1));
			count++;		
			
		}else if(count === 1){//카운터가 1일 때 임시변수 좌표와 다르면 악기 소리남
			
			if( temp_x != Math.abs(Number(number1)) ){
				//document.getElementById("ssound").play();
				count++;//카운터 2일 때 check 함수 작동이 중지(악기 소리가 중복으로 나는 것 피함 악기소리가 나면 카운터 0으로 시작)
				setTimeout(function(){count = 0;$("#ssound")[0].load();$("#ssound")[0].play();},1100);
			}
			
		}

	}

	function handleMotionEvent(event) {

	    var x = event.accelerationIncludingGravity.x;
	    var y = event.accelerationIncludingGravity.y;
	    var z = event.accelerationIncludingGravity.z;
		
		$("#xVal").html(Math.round(x));
		gradient(Math.round(x));
		$("#yVal").html(y);
		$("#zVal").html(z);		
		
		var maxX = window.innerWidth - $("#ball").width();
		var maxY = window.innerHeight - $("#ball").height();

		var factor = 3;

		x = Math.round(x * factor);

		var orgX = $("#ball").css("left");
		orgX = parseFloat(orgX);

		var newX = orgX + x;
		newX = Math.max(0, newX);
		newX = Math.min(maxX, newX);
		//$("#tVal").html(Math.abs(Number(newX)));
		check(Number(newX));//check 함수로 이동
		

		$("#ball").css("left", Math.round(newX));

		y = Math.round(y * factor);

		var orgY = $("#ball").css("top");
		orgY = parseFloat(orgY);

		var newY = orgY - y;
		newY = Math.max(0, newY);
		newY = Math.min(maxY, newY);

		$("#ball").css("top", Math.round(newY));


	}

	window.addEventListener("devicemotion", handleMotionEvent, true);

	//$("#ball").css("left", 30);
	//$("#ball").css("top", 30);
	

	//document.getElementById("ssound").play();
	

});
