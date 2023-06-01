//title[0], date[1], content[2], tag[3], emotion[4]
document.addEventListener('DOMContentLoaded', () => {
    
    let diaryList = []  //일기 리스트

    //html 출력 연습 부분
    const contents = "오늘의 일기/영어 공부를 했다. 많이 틀렸다. 슬프다.";
    localStorage.setItem("key", contents);
    const savedDiary = localStorage.getItem("key");
    const diaryContainer = document.getElementById("diary-container");   //div diary-container 영역에 표시
    diaryContainer.textContent = savedDiary;        //html div 영역에 출력할때 쓰는 법
    //html 출력 연습 부분 끝

    //2차원 배열로 저장
    function saveDiary(title, date, content, tag, emotion){    //내용 저장
        const diary = [title, date, content, tag, emotion]
        diaryList.push(diary);
    }
    //일기 출력 함수
    function displayDiary(){
        for(let i=0;i<diaryList.length;i++){
            console.log(diaryList[i]);
        }
    }
    //일기 삭제 함수
    function deleteDiary(index){
        if (index >= 0 && index < diaryList.length) {
            diaryList.splice(index, 1);
        }
    }

    // 일기 날짜 수정 함수
    function updateDiaryDate(index, newDate) {
        if (index >= 0 && index < diaryList.length) {
            diaryList[index][1] = newDate; // 일기의 날짜 수정
        }
    }
    // 일기 내용 수정 함수
    function updateDiaryContent(index, newContent) {
        if (index >= 0 && index < diaryList.length) {
            diaryList[index][2] = newContent; // 일기의 내용 수정
        }
    }
    // 일기 태그 수정 함수
    function updateDiaryDate(index, newTag) {
        if (index >= 0 && index < diaryList.length) {
            diaryList[index][3] = newTag; // 일기의 태그 수정
        }
    }
    // 일기 감정 수정 함수
    function updateDiaryDate(index, newEmotion) {
        if (index >= 0 && index < diaryList.length) {
            diaryList[index][4] = newEmotion; // 일기의 감정 수정
        }
    }
    saveDiary("일기 1", "오늘의 일기 1", "2023-05-30", "", "");
    saveDiary("일기 2", "오늘의 일기 2", "2023-05-31", "", "");
    saveDiary("일기 3", "오늘의 일기 3", "2023-06-01", "", "");
    displayDiary();

    deleteDiary(0);
    displayDiary();

    updateDiary(1, "일기 수정");
    displayDiary();
})