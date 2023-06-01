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
            Tag : tag,
            Emotion : EmotionList
        };
        
        localStorage.setItem(date, JSON.stringify(DiaryData));
        
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
function select(){
    let storedData = JSON.parse(localStorage.getItem(date));
    let ageValue = storedData.Emotion[0];

    console.log(ageValue);
    console.log(EmotionCntList);
}