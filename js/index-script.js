 // 1차원 배열 생성
 var arr = new Array();
 arr = [10, 7, 5, 3, 5, 34, 2, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
 
 var arr2 = new Array();
 var arr3 = new Array();
 arr2 = ["기쁨", "행복", "설렘", "즐거움", "평온", "슬픔", "아픔", "우울함", "절망", "외로움", "분노", "짜증", "혼란", "불안", "후회", "지루함", "부끄러움", "죄책감", "두려움", "놀람"];
 arr3 = ["JOY", "HAPPINESS", "EXCITEMENT", "PLEASURE", "CALM", "SADNESS", "PAIN", "DEPRESSION", "DESPAIR", "LONELINESS", "ANGER", "ANNOYANCE", "CONFUSION", "ANXIETY", "REGRET", "BOREDOM", "SHAME", "GUILT", "FEAR", "SURPRISE"];
 
 // arr2 내용 html 화면에 출력
 var emotionDiv = document.createElement("div");
 emotionDiv.className = "emotion";
 for (var i = 0; i < arr2.length; i++) {
     var span = document.createElement("span");
     span.id = "emotion" + i;
     span.innerHTML = arr2[i] + "&nbsp; " + arr3[i] + "&nbsp; ";
     emotionDiv.appendChild(span);
 }
 document.body.appendChild(emotionDiv);
 
 // 크기 조절
 function changeSize() {
     for (var i = 0; i < arr2.length; i++) {
         var size = 5 * arr[i] + 130;
         document.getElementById("emotion" + i).style.fontSize = size + "px";
     }
 }
 

 changeSize();