var BoxOpened = "";
var ImgOpened = "";
var Counter = 32;
var ImgFound = 0;

var Source = "#boxcard";

var ImgSource = [
  "http://3.bp.blogspot.com/-hk97hHfOqNM/TZmhfyTUL1I/AAAAAAAAACk/B3Al1oD9Dl0/s1600/pique5.jpg",
  "http://topnews.in/sports/files/Lionel-Messi_34.jpg",
  "https://wallpapercave.com/wp/QN0KOWj.jpg",
  "http://1.bp.blogspot.com/-_PX2hZXaCag/VFS_XQDYTpI/AAAAAAAAe8o/nPwcm2Hkb0I/s1600/a-Pepe.jpg",
  "http://1.bp.blogspot.com/-6Ceq8BX0mTM/U97_xhghpQI/AAAAAAAAJhE/cq6scGNxzNM/s1600/James-Rodriguez-Real-Madrid-2014-Free-HD-Wallpaper.jpg",
  "http://www.excesssport.com/wp-content/uploads/2016/11/1-227.jpg",
  "https://cdn1.lockerdome.com/uploads/9b020a02b6a14ec9942013cca71d743fb74ca136f8a4f4cebd040d939d40b5c1_large",
  "http://static.sportskeeda.com/wp-content/uploads/2013/01/Ronaldinho-in-action-1169846.jpg",
  "http://cdn.caughtoffside.com/wp-content/uploads/2016/06/Gareth-Bale-Real-Madrid.jpg",

];

var audioGo = new Audio("./music/gameO.wav");
var crazy = new Audio("./music/cool.mp3");

function RandomFunction(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}

function ShuffleImages() {
	var ImgAll = $(Source).children();
	var ImgThis = $(Source + " div:first-child");
	var ImgArr = new Array([]);

	for (var i = 0; i < ImgAll.length; i++) {
		ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
		ImgThis = ImgThis.next();
	}

		ImgThis = $(Source + " div:first-child");

	for (var z = 0; z < ImgAll.length; z++) {
	var RandomNumber = RandomFunction(0, ImgArr.length - 1);

		$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
		ImgArr.splice(RandomNumber, 1);
		ImgThis = ImgThis.next();
	}
}

function ResetGame() {
	ShuffleImages();
	$(Source + " div img").hide();
	$(Source + " div").css("visibility", "visible");
	Counter = 32;
	$("#success").remove();
	$("#counter").html("" + Counter);
	BoxOpened = "";
	ImgOpened = "";
	ImgFound = 0;
  return false;
}

function OpenCard() {
	var id = $(this).attr("id");

	if ($("#" + id + " img").is(":hidden")) {
		$(Source + " div").unbind("click", OpenCard);

		$("#" + id + " img").slideDown('fast');

		if (ImgOpened == "") {
			BoxOpened = id;
			ImgOpened = $("#" + id + " img").attr("src");
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard);
			}, 300);
		} else {
			CurrentOpened = $("#" + id + " img").attr("src");
			if (ImgOpened != CurrentOpened) {
				setTimeout(function() {
					$("#" + id + " img").slideUp('fast');
					$("#" + BoxOpened + " img").slideUp('fast');
					BoxOpened = "";
					ImgOpened = "";
				}, 400);
			} else {
				$("#" + id + " img").parent().css("visibility", "hidden");
				$("#" + BoxOpened + " img").parent().css("visibility", "hidden");
				ImgFound++;
				BoxOpened = "";
				ImgOpened = "";
			}
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard);
			}, 400);
		}
		Counter--;
		$("#counter").html("" + Counter);

        if (Counter === 1){
        $(".gameover").addClass("showing");

        audioGo.play();
      }
    }

		if (ImgFound === ImgSource.length) {
			$(".winner").addClass("showing");

      crazy.play();
		}

}

//  var win;
//  var lose;
//
//     function gameover(){                                    Prove failed
//       $(".gameover").addClass("showing");
//     if (win === ImgFound) {
//
//       return true;
//     } else {
//       return gameover;
//     }
// }

$(function() {
for (var y = 1; y < 3 ; y++) {
	$.each(ImgSource, function(i, val) {
		$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
	});
}
	$(Source + " div").click(OpenCard);
	ShuffleImages();
});

$(document).ready(function(){
  $(".button2").click(function(){
    $(".gameover").removeClass("showing");
  });
});

$(document).ready(function(){
  $(".button2").click(function(){
    $(".winner").removeClass("showing");

     crazy.stop();
  });
});



// var time = 31;
// var timeCounter;
//
// timeCounter = setInterval(function(){
//   time -= 1;
//   console.log(time);
//   $(".time").html("Game Time: " + time);
//
//   if(time <= 0){
//     clearInterval(timeCounter);
//     return;
//   }
//
// },1000);
