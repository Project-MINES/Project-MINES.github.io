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
  arr = [1, 1, 1, 1, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  var arr2 = new Array();
  var arr3 = new Array();
  arr2 = ["기쁨", "행복", "설렘", "즐거움", "평온", "슬픔", "아픔", "우울함", "절망", "외로움", "분노", "짜증", "혼란", "후회", "지루함", "부끄러움", "죄책감", "두려움", "놀람", "불안"];
  arr3 = ["JOY", "HAPPINESS", "EXCITEMENT", "PLEASURE", "CALM", "SADNESS", "PAIN", "DEPRESSION", "DESPAIR", "LONELINESS", "ANGER", "ANNOYANCE", "CONFUSION",  "REGRET", "BOREDOM", "SHAME", "GUILT", "FEAR", "SURPRISE","ANXIETY"];

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
      if(i == 12)
        {
            span.dataset.content = "혼란 CONFUSION";
            
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
  const body = document.body;

  //기쁨 JOY

  const targetText = new Array();
  for(var i = 0; i < 20; i++)
  {
    targetText[i] = document.getElementById("emotion" + i);
  }

  targetText[0].addEventListener('mouseover', () => {
    body.style.background = '#fbceb1';
    targetText[0].style.color = "white";
    targetText[0].style.textShadow = "0 1px 10px black";


    for(var i = 0; i < 20; i++)
    {
        if(i != 0)
        {
            targetText[i].style.color = '#fbcfb1dd';
            targetText[i].style.textShadow = "0 0 0px black";
            targetText[i].style.transition = "color 0.0s ease";
        }
    }
  });

  targetText[0].addEventListener('mouseout', () => {
    body.style.background = 'linear-gradient(to bottom, #ece4d9 0%, #e9dfd1 100%)';
    for(var i = 0; i < 20; i++)
    {
  
        targetText[i].style.color = "#f1ebe5";
        targetText[i].style.textShadow = "0 8px 9px #c4b59d, 0px -2px 1px #fff";
        targetText[i].style.transition = "color 0.0s ease";

    }
  });
// 행복 HAPPINESS
  targetText[1].addEventListener('mouseover', () => {
    body.style.background = '#fbceb1';
    targetText[1].style.color = '#f6aca2';

    for(var i = 0; i < 20; i++)
    {
        if(i != 1)
        {
            targetText[i].style.color = '#fbcfb1dd';
            targetText[i].style.textShadow = "0 0 0px black";
            targetText[i].style.transition = "color 0.0s ease";
        }
    }
  });

  targetText[1].addEventListener('mouseout', () => {
    body.style.background = 'linear-gradient(to bottom, #ece4d9 0%, #e9dfd1 100%)';
    document.querySelector(".emotion").style.color = "#f1ebe5";

    for(var i = 0; i < 20; i++)
    {
        targetText[i].style.color = "#f1ebe5";
        targetText[i].style.textShadow = "0 8px 9px #c4b59d, 0px -2px 1px #fff";
        targetText[i].style.transition = "color 0.0s ease";
    }
  });
// 설렘 EXCITEMENT
  targetText[2].addEventListener('mouseover', () => {
    body.style.background = '#fbceb1';
    targetText[2].style.color = 'white';
    targetText[2].style.textShadow = "0 0 1px black";
    targetText[2].style.transition = "color 0.5s ease";

    for(var i = 0; i < 20; i++)
    {
        if(i != 2)
        {
            targetText[i].style.color = '#fbcfb1dd';
            targetText[i].style.textShadow = "0 0 0px black";
            targetText[i].style.transition = "color 0.0s ease";
        }
    }
  });

  targetText[2].addEventListener('mouseout', () => {
    body.style.background = 'linear-gradient(to bottom, #ece4d9 0%, #e9dfd1 100%)';
    document.querySelector(".emotion").style.color = "#f1ebe5";

    for(var i = 0; i < 20; i++)
    {
        targetText[i].style.color = "#f1ebe5";
        targetText[i].style.textShadow = "0 8px 9px #c4b59d, 0px -2px 1px #fff";
        targetText[i].style.transition = "color 0.0s ease";
    }
  });
  
  $("#emotion2").hover(function() {
    timeoutId2 = setTimeout(hearts, 1000)
 }, function() {
    clearTimeout(timeoutId2);
 });
//즐거움 PLEASURE
 targetText[3].addEventListener('mouseover', () => {
    body.style.background = '#fbceb1';
    targetText[3].style.color = 'white';
    targetText[3].style.textShadow = "0 0 1px black";
    targetText[3].style.transition = "color 0.5s ease";

    for(var i = 0; i < 20; i++)
    {
        if(i != 3)
        {
            targetText[i].style.color = '#fbcfb1dd';
            targetText[i].style.textShadow = "0 0 0px black";
            targetText[i].style.transition = "color 0.0s ease";
        }
    }
  });

  targetText[3].addEventListener('mouseout', () => {
    body.style.background = 'linear-gradient(to bottom, #ece4d9 0%, #e9dfd1 100%)';
    document.querySelector(".emotion").style.color = "#f1ebe5";

    for(var i = 0; i < 20; i++)
    {
        targetText[i].style.color = "#f1ebe5";
        targetText[i].style.textShadow = "0 8px 9px #c4b59d, 0px -2px 1px #fff";
        targetText[i].style.transition = "color 0.0s ease";
    }
  });

  //평온 CALM

  targetText[4].addEventListener('mouseover', () => {
    body.style.background = '#fbceb1';
    targetText[4].style.color = "white";
    targetText[4].style.textShadow = "0 1px 10px black";
    targetText[4].style.transition = "all 1.0s ease";

    for(var i = 0; i < 20; i++)
    {
        if(i != 4)
        {
            targetText[i].style.color = '#fbcfb1dd';
            targetText[i].style.textShadow = "0 0 0px black";
            targetText[i].style.transition = "color 0.0s ease";
        }
    }
  });

  targetText[4].addEventListener('mouseout', () => {
    body.style.background = 'linear-gradient(to bottom, #ece4d9 0%, #e9dfd1 100%)';
    document.querySelector(".emotion").style.color = "#f1ebe5"; 
    for(var i = 0; i < 20; i++)
    {
            targetText[i].style.color = "#f1ebe5";
            targetText[i].style.textShadow = "0 8px 9px #c4b59d, 0px -2px 1px #fff";
            targetText[i].style.transition = "color 0.0s ease";
    }
    targetText[4].style.transition = "all 1.0s ease";
  });
  
//슬픔 SADNESS
targetText[5].addEventListener('mouseover', () => {
    body.style.background = '#1984D5';
    targetText[5].style.color = "white";
    targetText[5].style.textShadow = "0 0 1px black";
    targetText[5].style.transition = "color 0.5s ease";
    for(var i = 0; i < 20; i++)
    {
        if(i != 5)
        {
            targetText[i].style.color = "#1677BF";
            targetText[i].style.textShadow = "0 0 0px black";
            targetText[i].style.transition = "color 0.0s ease";
        }
    }   
    timeoutId = setTimeout(makeItRain, 1000);
  });

  targetText[5].addEventListener('mouseout', () => {
    body.style.background = 'linear-gradient(to bottom, #ece4d9 0%, #e9dfd1 100%)';
    for(var i = 0; i < 20; i++)
    {
        
        targetText[i].style.color = "#f1ebe5";
        targetText[i].style.textShadow = "0 8px 9px #c4b59d, 0px -2px 1px #fff";
        targetText[i].style.transition = "color 0.0s ease";

    }
    targetText[5].style.transition = "color 0.5s ease";
    clearTimeout(timeoutId);
  });

  
  //분노 ANGER
  targetText[10].addEventListener('mouseover', () => {
    body.style.background = '#CC2A5D';

    targetText[10].style.color = "black";
    targetText[10].style.transition = "color 6.0s ease";
    targetText[10].style.textShadow = "0 0 0px black"

    for(var i = 0; i < 20; i++)
    {
        if(i != 10)
        {
            targetText[i].style.color = "#9B2248";
            targetText[i].style.textShadow = "0 0 0px black";
            targetText[i].style.transition = "color 0.0s ease";
        }
    }
    timeoutId3 = setTimeout(fire, 1000);
  });
//분노 ANGER
targetText[10].addEventListener('mouseout', () => {
    body.style.background = 'linear-gradient(to bottom, #ece4d9 0%, #e9dfd1 100%)';
    for(var i = 0; i < 20; i++)
    {
            targetText[i].style.color = "#f1ebe5";
            targetText[i].style.textShadow = "0 8px 9px #c4b59d, 0px -2px 1px #fff";
            targetText[i].style.transition = "color 0.0s ease";
    }
    targetText[10].style.transition = "color 4.0s ease";
    clearTimeout(timeoutId3);
  });


  
//혼란 CONFUSION
targetText[12].addEventListener('mouseover', () => {
    body.style.background = '#CC2A5D';

    targetText[12].style.color = "white";
    targetText[12].style.textShadow = "0 1px 10px black";

    for(var i = 0; i < 20; i++)
    {
        if(i != 12)
        {
            targetText[i].style.color = "#9B2248";
            targetText[i].style.textShadow = "0 0 0px black";
            targetText[i].style.transition = "color 0.0s ease";
        }
    }
  });
//혼란 CONFUSION
targetText[12].addEventListener('mouseout', () => {
    body.style.background = 'linear-gradient(to bottom, #ece4d9 0%, #e9dfd1 100%)';
    for(var i = 0; i < 20; i++)
    {
            targetText[i].style.color = "#f1ebe5";
            targetText[i].style.textShadow = "0 8px 9px #c4b59d, 0px -2px 1px #fff";
            targetText[i].style.transition = "color 0.0s ease";
    }
  });

  // 텍스트 암호화
 function WordShuffler(holder,opt){
    var that = this;
    var time = 0;
    this.now;
    this.then = Date.now();
    
    this.delta;
    this.currentTimeOffset = 0;
    
    this.word = null;
    this.currentWord = null;
    this.currentCharacter = 0;
    this.currentWordLength = 0;
  
  
    var options = {
      fps : 20,
      timeOffset : 1,
      textColor : '#000',
      fontSize : "50px",
      useCanvas : false,
      mixCapital : false,
      mixSpecialCharacters : false,
      needUpdate : true,
      colors : [
        '#f44336','#e91e63','#9c27b0',
        '#673ab7','#3f51b5','#2196f3',
        '#03a9f4','#00bcd4','#009688',
        '#4caf50','#8bc34a','#cddc39',
        '#ffeb3b','#ffc107','#ff9800',
        '#ff5722','#795548','#9e9e9e',
        '#607d8b'
      ]
    }
  
    if(typeof opt != "undefined"){
      for(key in opt){
        options[key] = opt[key];
      }
    }
  
  
    
    this.needUpdate = true;
    this.fps = options.fps;
    this.interval = 1000/this.fps;
    this.timeOffset = options.timeOffset;
    this.textColor = options.textColor;
    this.fontSize = options.fontSize;
    this.mixCapital = options.mixCapital;
    this.mixSpecialCharacters = options.mixSpecialCharacters;
    this.colors = options.colors;
  
     this.useCanvas = options.useCanvas;
    
    this.chars = [
      'A','B','C','D',
      'E','F','G','H',
      'I','J','K','L',
      'M','N','O','P',
      'Q','R','S','T',
      'U','V','W','X',
      'Y','Z'
    ];
    this.specialCharacters = [
      '!','§','$','%',
      '&','/','(',')',
      '=','?','_','<',
      '>','^','°','*',
      '#','-',':',';','~'
    ]
  
    if(this.mixSpecialCharacters){
      this.chars = this.chars.concat(this.specialCharacters);
    }
  
    this.getRandomColor = function () {
      var randNum = Math.floor( Math.random() * this.colors.length );
      return this.colors[randNum];
    }
  
    //if Canvas
   
    this.position = {
      x : 0,
      y : 50
    }
  
    //if DOM
    if(typeof holder != "undefined"){
      this.holder = holder;
    }
  
    if(!this.useCanvas && typeof this.holder == "undefined"){
      console.warn('Holder must be defined in DOM Mode. Use Canvas or define Holder');
    }
  
  
    this.getRandCharacter = function(characterToReplace){    
      if(characterToReplace == " "){
        return ' ';
      }
      var randNum = Math.floor(Math.random() * this.chars.length);
      var lowChoice =  -.5 + Math.random();
      var picketCharacter = this.chars[randNum];
      var choosen = picketCharacter.toLowerCase();
      if(this.mixCapital){
        choosen = lowChoice < 0 ? picketCharacter.toLowerCase() : picketCharacter;
      }
      return choosen;
      
    }
  
    this.writeWord = function(word){
      this.word = word;
      this.currentWord = word.split('');
      this.currentWordLength = this.currentWord.length;
  
    }
  
    this.generateSingleCharacter = function (color, character) {
        var span = document.createElement('span');
        span.style.color = color;
        
        // Check if character is &nbsp; and replace it with a regular space
        if (character === '&') {
          span.innerHTML = ' ';
        } 
        else if (character === 'n') {
            span.innerHTML = ' ';
        } 
        else if (character === 'b') {
            span.innerHTML = ' ';
        } 
        else if (character === 's') {
            span.innerHTML = ' ';
        } 
        else if (character === 'p') {
            span.innerHTML = ' ';
        } 
        else if (character === ';') {
            span.innerHTML = ' ';
        } 
        else {
          span.innerHTML = character;
        }
        
        return span;
      }
      
  
    this.updateCharacter = function (time) {
      
        this.now = Date.now();
        this.delta = this.now - this.then;
  
         
  
        if (this.delta > this.interval) {
          this.currentTimeOffset++;
        
          var word = [];
  
          if(this.currentTimeOffset === this.timeOffset && this.currentCharacter !== this.currentWordLength){
            this.currentCharacter++;
            this.currentTimeOffset = 0;
          }
          for(var k=0;k<this.currentCharacter;k++){
            word.push(this.currentWord[k]);
          }
  
          for(var i=0;i<this.currentWordLength - this.currentCharacter;i++){
            word.push(this.getRandCharacter(this.currentWord[this.currentCharacter+i]));
          }
  
  
          if(that.useCanvas){
            c.clearRect(0,0,stage.x * stage.dpr , stage.y * stage.dpr);
            c.font = that.fontSize + " sans-serif";
            var spacing = 0;
            word.forEach(function (w,index) {
              if(index > that.currentCharacter){
                c.fillStyle = that.getRandomColor();
              }else{
                c.fillStyle = that.textColor;
              }
              c.fillText(w, that.position.x + spacing, that.position.y);
              spacing += c.measureText(w).width;
            });
          }else{
  
            if(that.currentCharacter === that.currentWordLength){
              that.needUpdate = false;
            }
            this.holder.innerHTML = '';
            word.forEach(function (w,index) {
              var color = null
              if(index > that.currentCharacter){
                color = that.getRandomColor();
              }else{
                color = that.textColor;
              }
              that.holder.appendChild(that.generateSingleCharacter(color, w));
            }); 
          }
          this.then = this.now - (this.delta % this.interval);
        }
    }
  
    this.restart = function () {
      this.currentCharacter = 0;
      this.needUpdate = true;
    }
  
    function update(time) {
      time++;
      if(that.needUpdate){
        that.updateCharacter(time);
      }
      requestAnimationFrame(update);
    }
  
    this.writeWord(this.holder.innerHTML);
  
  
    console.log(this.currentWord);
    update(time);
  }