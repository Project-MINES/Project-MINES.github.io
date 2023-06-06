/*
* 일기가 없을 때 → EmotionCntList 초기
* 일기가 있을 때 → 기존에 존재하는 EmotionCntList를 수정하기
*/
let Emotion = ['기쁨', '행복', '설렘', '즐거움', '평온', '슬픔', '아픔', '우울함', '절망', '외로움', '분노', '짜증', '혼란', '불안', '후회', '지루함', '소극적', '죄책감', '두려움', '무기력'];
let EmotionCntList = [];
if(localStorage.length==0){
    EmotionCntList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //전체 일기의 감정 별 개수 list
    EmotionCount = {
        Cnt : EmotionCntList
    };
    localStorage.setItem('EmotionCount', JSON.stringify(EmotionCount));
}

/*
* 선택된 감정 버튼 저장
*/
let BtnString="";
let EmotionList=[];
function BtnSelect(BtnString){

    changeColor(BtnString);

    let idx = EmotionList.indexOf(BtnString);

    if(idx==-1){
        EmotionList.push(BtnString);
    } else{
        EmotionList.splice(idx, 1); //idx부터 1개의 값 삭제
    }
    
    //console.log(EmotionList);
}

/*
* 일기 작성 form 수행 시
*/
function DiaryWrite(event){

    // 폼 제출 동작 막기
    event.preventDefault();

    // 입력값 가져오기
    let date = document.querySelector('#date').value;
    let title = document.querySelector('#Title_div input').value;
    let content = document.querySelector('#Content_div textarea').value;
    let tag = document.querySelector('#Tag_div input').value;

    //태그 내용 #으로 분리 (공백 처리 O)
    let tagArr = tag.split("#").map(function(item) {
        return item.trim();
    }).filter(function(item) {
        return item !== "";
    });

    let idx = -1;

    //감정을 선택하지 않았다면 일기 저장 X && 같은 날짜 중복 일기 작성 X
    if(EmotionList.length!=0 && localStorage.getItem(date)==null){

        /*
        * 전체 감정 개수 리스트에 개수 추가
        */
        EmotionList.forEach(emotionCtn);
        function emotionCtn(BtnString){
            idx = Emotion.indexOf(BtnString);
            EmotionCntList[idx]++;

            EmotionCount = {
                Cnt : EmotionCntList
            };
            localStorage.setItem('EmotionCount', JSON.stringify(EmotionCount));
        }

        /*
        *  <<localStorage>>
        *  Key: date(일기 작성 날짜)
        *  Value: date, title, content, tag
        */
        DiaryData = {
            Date: date,
            Title: title,
            Content: content,
            Tag : tagArr,
            Emotion : EmotionList
        };
        
        localStorage.setItem(date, JSON.stringify(DiaryData));
        alert("일기가 저장되었습니다.");
        window.location.href = "DiaryList.html";
        
    } else{
        if(EmotionList.length==0)
            alert("감정을 하나 이상 선택해주세요");
        else if(localStorage.getItem(date)!=null)
            alert("해당 날짜에 작성된 일기가 존재합니다");
    }

    EmotionList.splice(0);
}

/*
* 테스트용 함수
*/
function test(){
}

/*
* 감정 버튼 클릭 시 배경 변경
*/
function changeColor(BtnString){
    if(BtnString=="기쁨"){
        changeJoy(joy1);
    } else if(BtnString=="행복"){
        changeJoy(joy2);
    } else if(BtnString=="설렘"){
        changeJoy(joy3);
    } else if(BtnString=="즐거움"){
        changeJoy(joy4);
    } else if(BtnString=="평온"){
        changeJoy(joy5);
    } else if(BtnString=="슬픔"){
        changeSadness(sadness1);
    } else if(BtnString=="아픔"){
        changeSadness(sadness2);
    } else if(BtnString=="우울함"){
        changeSadness(sadness3);
    } else if(BtnString=="절망"){
        changeSadness(sadness4);
    } else if(BtnString=="외로움"){
        changeSadness(sadness5);
    } else if(BtnString=="지루함"){
        changeTimid(timid1);
    } else if(BtnString=="부끄러움"){
        changeTimid(timid2);
    } else if(BtnString=="죄책감"){
        changeTimid(timid3);
    } else if(BtnString=="두려움"){
        changeTimid(timid4);
    } else if(BtnString=="놀람"){
        changeTimid(timid5);
    } else if(BtnString=="분노"){
        changeAnger(anger1);
    } else if(BtnString=="짜증"){
        changeAnger(anger2);
    } else if(BtnString=="혼란"){
        changeAnger(anger3);
    } else if(BtnString=="후회"){
        changeAnger(anger4);
    } else if(BtnString=="불안"){
        changeAnger(anger5);
    }
}

function changeJoy(joyId){
    let currentColor = joyId.style.backgroundColor;

    if (currentColor === "rgb(255, 242, 120)") {
        joyId.style.backgroundColor = "#fffadb";
    } else {
        joyId.style.backgroundColor = "rgb(255, 242, 120)";
    }
}

function changeSadness(sadnessId){
    let currentColor = sadnessId.style.backgroundColor;

    if (currentColor === "rgb(157, 180, 255)") {
        sadnessId.style.backgroundColor = "#e4eaff";
    } else {
        sadnessId.style.backgroundColor = "rgb(157, 180, 255)";
    }
}

function changeTimid(timidId){
    let currentColor = timidId.style.backgroundColor;

    if (currentColor === "rgb(208, 137, 239)") {
        timidId.style.backgroundColor = "#f6e9ff";
    } else {
        timidId.style.backgroundColor = "rgb(208, 137, 239)";
    }
}

function changeAnger(angerId){
    let currentColor = angerId.style.backgroundColor;

    if (currentColor === "rgb(255, 128, 109)") {
        angerId.style.backgroundColor = "#ffe4e4";
    } else {
        angerId.style.backgroundColor = "rgb(255, 128, 109)";
    }
}

function resetColor(){
    joy1.style.backgroundColor = "#fffadb";
    joy2.style.backgroundColor = "#fffadb";
    joy3.style.backgroundColor = "#fffadb";
    joy4.style.backgroundColor = "#fffadb";
    joy5.style.backgroundColor = "#fffadb";
    
    sadness1.style.backgroundColor = "#e4eaff";
    sadness2.style.backgroundColor = "#e4eaff";
    sadness3.style.backgroundColor = "#e4eaff";
    sadness4.style.backgroundColor = "#e4eaff";
    sadness5.style.backgroundColor = "#e4eaff";
    
    timid1.style.backgroundColor = "#f6e9ff";
    timid2.style.backgroundColor = "#f6e9ff";
    timid3.style.backgroundColor = "#f6e9ff";
    timid4.style.backgroundColor = "#f6e9ff";
    timid5.style.backgroundColor = "#f6e9ff";
    
    anger1.style.backgroundColor = "#ffe4e4";
    anger2.style.backgroundColor = "#ffe4e4";
    anger3.style.backgroundColor = "#ffe4e4";
    anger4.style.backgroundColor = "#ffe4e4";
    anger5.style.backgroundColor = "#ffe4e4";
}