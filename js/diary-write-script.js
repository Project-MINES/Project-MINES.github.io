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

    /*
    *  <<localStorage>>
    *  Key: date(일기 작성 날짜)
    *  Value: date, title, content, tag
    */
    DiaryData = {
        Date: date,
        Title: title,
        Content: content,
        Tag : tag
    };
    
    localStorage.setItem(date, JSON.stringify(DiaryData));
    
    let storedData = JSON.parse(localStorage.getItem(date));
    let ageValue = storedData.name;

}