var makeItRain = function() {
    //clear out everything
    $('.rain').empty();

    var increment = 0;
    var drops = "";
    var backDrops = "";

    while (increment < 100) {
      //couple random numbers to use for various randomizations
      //random number between 98 and 1
      var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
      //random number between 5 and 2
      var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
      //increment
      increment += randoFiver;
      //add in a new raindrop with various randomizations to certain CSS properties
      drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
      backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }

    $('.rain.front-row').append(drops);
    $('.rain.back-row').append(backDrops);
  }
  
  var arr = new Array();
  arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  var arr2 = new Array();
  var arr3 = new Array();
  arr2 = ["기쁨", "행복", "설렘", "즐거움", "평온", "슬픔", "아픔", "우울함", "절망", "외로움", "분노", "짜증", "혼란", "불안", "후회", "지루함", "부끄러움", "죄책감", "두려움", "놀람"];
  arr3 = ["JOY", "HAPPINESS", "EXCITEMENT", "PLEASURE", "CALM", "SADNESS", "PAIN", "DEPRESSION", "DESPAIR", "LONELINESS", "ANGER", "ANNOYANCE", "CONFUSION", "ANXIETY", "REGRET", "BOREDOM", "SHAME", "GUILT", "FEAR", "SURPRISE"];

// arr2 내용 html 화면에 출력
var emotionDiv = document.createElement("div");
  emotionDiv.id = "emotionDiv";
  emotionDiv.className = "emotion";
  for (var i = 0; i < arr2.length; i++) 
  {
      var span = document.createElement("span");
      span.id = "emotion" + i;
      if(i == 2)
      {
        span.className = "particletext hearts";
      }
      if(i == 10)
      {
        span.className = "particletext fire";
      }
      span.innerHTML = arr2[i] + "&nbsp;" + arr3[i] + "&nbsp; ";
      emotionDiv.appendChild(span);
  }
  document.body.appendChild(emotionDiv);

  function changeSize() 
  {
    for (var i = 0; i < arr2.length; i++) {
        var size = 3 * arr[i] + 100;
        document.getElementById("emotion" + i).style.fontSize = size + "px";
    }
  }

  changeSize();

  function hearts() {
    $.each($(".particletext.hearts"), function(){
       var heartcount = ($(this).width()/400)*5;
       for(var i = 0; i <= heartcount; i++) {
          var size = ($.rnd(130,120)/10);
          $(this).append('<span class="particle" style="top:' + $.rnd(20,80) + '%; left:' + $.rnd(0,95) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + ($.rnd(0,30)/10) + 's;"></span>');
       }
    });
 }
 
 function fire() {
    $.each($(".particletext.fire"), function(){
       var firecount = ($(this).width()/1000)*10;
       for(var i = 0; i <= firecount; i++) {
          var size = $.rnd(60,12);
          $(this).append('<span class="particle" style="top:' + $.rnd(40,70) + '%; left:' + $.rnd(-10,100) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + ($.rnd(0,20)/10) + 's;"></span>');
       }
    });
 }
 
 jQuery.rnd = function(m,n) {
       m = parseInt(m);
       n = parseInt(n);
       return Math.floor( Math.random() * (n - m + 1) ) + m;
 }
 var timeoutId;
 var timeoutId2;
 var timeoutId3;
  const targetText = document.getElementById("emotion5");
  const body = document.body;
  

  targetText.addEventListener('mouseover', () => {
    body.style.background = '#1984D5';
    document.querySelector(".emotion").style.color = "#1677BF";
    document.querySelector(".emotion").style.textShadow = "0 0 0px black";
    targetText2.style.transition = "color 0.0s ease"
    targetText2.style.color = "#1677BF";
    targetText2.style.textShadow = "0 0 0px black";
    timeoutId = setTimeout(makeItRain, 1000);
  });

  targetText.addEventListener('mouseout', () => {
    body.style.background = 'linear-gradient(to bottom, #ece4d9 0%, #e9dfd1 100%)';
    document.querySelector(".emotion").style.color = "#f1ebe5";
    document.querySelector(".emotion").style.textShadow = "0 8px 9px #c4b59d, 0px -2px 1px #fff";
    targetText2.style.color = "#f1ebe5";
    targetText2.style.textShadow = "0 8px 9px #c4b59d, 0px -2px 1px #fff";
    clearTimeout(timeoutId);
  });

  const targetText2 = document.getElementById("emotion10");
  

  targetText2.addEventListener('mouseover', () => {
    body.style.background = '#CC2A5D';
    targetText2.style.color = "black";
    targetText2.style.transition = "color 6.0s ease";
    targetText2.style.textShadow = "0 0 0px black"
    document.querySelector(".emotion").style.color = "#9B2248";
    document.querySelector(".emotion").style.textShadow = "0 0 0px black";
    timeoutId3 = setTimeout(fire, 1000)
  });

  targetText2.addEventListener('mouseout', () => {
    body.style.background = 'linear-gradient(to bottom, #ece4d9 0%, #e9dfd1 100%)';
    document.querySelector(".emotion").style.color = "#f1ebe5";
    targetText2.style.color = "#f1ebe5";
    targetText2.style.textShadow = "0 8px 9px #c4b59d, 0px -2px 1px #fff";
    document.querySelector(".emotion").style.textShadow = "0 8px 9px #c4b59d, 0px -2px 1px #fff";
  });

  $("#emotion2").hover(function() {
    timeoutId2 = setTimeout(hearts, 1000)
 }, function() {
    clearTimeout(timeoutId2);
 });

 
