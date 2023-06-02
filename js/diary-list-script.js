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
  for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== "EmotionCount") {
          const diaryData = JSON.parse(localStorage.getItem(key));
          const listItem = createDiaryListItem(diaryData);
          diaryListElement.appendChild(listItem);
      }
  }
}

/*
* 일기 목록 아이템 생성
*/
function createDiaryListItem(diaryData) {
  const listItem = document.createElement("li");
  listItem.className = "diaryListItem";

  // 일기 정보 표시
  const dateElement = document.createElement("span");
  dateElement.className = "date";
  dateElement.innerText = diaryData.Date;

  const titleElement = document.createElement("h2");
  titleElement.innerText = diaryData.Title;
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
