/*
* 일기 목록 페이지 로딩 시 실행되는 함수
*/
window.onload = function () {
  loadDiaryList();
};

/*
* 일기 목록 불러오기
*/
function loadDiaryList() {
  const diaryListElement = document.getElementById("diaryList");
  diaryListElement.innerHTML = "";

  // LocalStorage에서 일기 데이터 가져오기
  const diaryList = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key !== "EmotionCount") {
      const diaryData = JSON.parse(localStorage.getItem(key));
      diaryList.push(diaryData);
    }
  }

  // 날짜순으로 일기 정렬
  const sortedDiaryList = diaryList.sort(function (a, b) {
    const dateA = new Date(a.Date);
    const dateB = new Date(b.Date);
    return dateB - dateA;
  });

  // 정렬된 일기 목록을 화면에 표시
  for (let i = 0; i < sortedDiaryList.length; i++) {
    const diaryData = sortedDiaryList[i];
    const listItem = createDiaryListItem(diaryData);
    diaryListElement.appendChild(listItem);
  }
}

/*
* 일기 목록 아이템 생성
*/
function createDiaryListItem(diaryData) {
  const listItem = document.createElement("li");
  listItem.className = "diaryListItem";

  // 일기 정보 표시
  // 날짜 표시
  const dateElement = document.createElement("span");
  dateElement.className = "date";
  dateElement.innerText = diaryData.Date;
  // 제목 표시
  const titleElement = document.createElement("h2");
  titleElement.innerText = diaryData.Title;
  
  // 제목 클릭 시 이벤트 처리
  titleElement.addEventListener("click", function () {
    showDiaryContent(diaryData);
  });
  
  /*  내용과 태그 출력
  const contentElement = document.createElement("p");
  contentElement.innerText = diaryData.Content;

  const tagElement = document.createElement("span");
  tagElement.className = "tag";
  tagElement.innerText = diaryData.Tag;
  */
  listItem.appendChild(dateElement);
  listItem.appendChild(titleElement);
  // listItem.appendChild(contentElement);
  // listItem.appendChild(tagElement);

  return listItem;
}

/*
* 일기 제목 클릭 시 내용 띄우기
*/
function showDiaryContent(diaryData) {
  // 팝업 또는 화면 요소 생성 및 스타일링
  // 예시: 팝업을 이용한 방법
  const popup = document.createElement("div");
  popup.className = "diaryPopup";

  const contentElement = document.createElement("p");
  contentElement.innerText = diaryData.Content;

  const closeButton = document.createElement("button");
  closeButton.innerText = "닫기";

  // 팝업에 내용 및 닫기 버튼 추가
  popup.appendChild(contentElement);
  popup.appendChild(closeButton);

  // 팝업을 body에 추가하여 표시
  document.body.appendChild(popup);

  // 닫기 버튼 클릭 시 팝업 제거
  closeButton.addEventListener("click", function () {
    document.body.removeChild(popup);
  });
}
