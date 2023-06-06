// 버튼 클릭 이벤트 처리
document.getElementById("all").addEventListener("click", function() {
  showAllDiaries();
});
document.getElementById("joy").addEventListener("click", function() {
  filterDiaryByEmotion(["행복", "기쁨", "설렘", "즐거움", "평온"]);
});
document.getElementById("sad").addEventListener("click", function() {
  filterDiaryByEmotion(["슬픔", "아픔", "우울함", "절망", "외로움"]);
});
document.getElementById("timid").addEventListener("click", function() {
  filterDiaryByEmotion(["지루함", "부끄러움", "죄책감", "두려움", "놀람"]);
});
document.getElementById("angry").addEventListener("click", function() {
  filterDiaryByEmotion(["분노", "짜증", "혼란", "후회", "불안"]);
});

let currentDiaryList = []; // 현재 표시된 일기 목록을 저장하는 변수
// 일기 목록 초기화 및 로딩 함수
function loadDiaryList() {
const diaryList = getDiaryListFromLocalStorage();
renderDiaryList(diaryList);
}

// LocalStorage에서 일기 데이터 가져오기
function getDiaryListFromLocalStorage() {
  const diaryList = [];
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key !== "EmotionCount") {
    const diaryData = JSON.parse(localStorage.getItem(key));
    diaryList.push(diaryData);
  }
}
diaryList.sort((a, b) => {
  const dateA = new Date(a.Date);
  const dateB = new Date(b.Date);
  return dateB - dateA;
});
return diaryList;
}

// Polaroid 요소 생성
function createPolaroid(diaryData) {
const polaroid = document.createElement("div");
polaroid.className = "polaroid";

const content = document.createElement("div");
content.className = "content";
content.textContent = diaryData.Content;
polaroid.appendChild(content);

// 일기 내용 초기 상태 설정
content.classList.add("hide-content");

const title = document.createElement("h5");
title.textContent = diaryData.Title;
polaroid.appendChild(title);

const date = document.createElement("p");
date.textContent = diaryData.Date;
polaroid.appendChild(date);

// 일기 내용 보이기/감추기 이벤트 처리
polaroid.addEventListener("click", () => {
  content.classList.toggle("hide-content");
});

return polaroid;
}

// 감정에 따라 일기 필터링 및 처리
function filterDiaryByEmotion(emotions) {
const diaryList = getDiaryListFromLocalStorage();
const filteredDiaryList = diaryList.filter((diaryData) => {
  return emotions.some((emotion) => diaryData.Emotion.includes(emotion));
});
renderDiaryList(filteredDiaryList);
}


const itemsPerRow = 3;  // 한 줄에 표시할 일기 개수
const columns = []; // 열(column) 요소를 그룹화하여 열 생성
for (let i = 0; i < itemsPerRow; i++) {
const column = document.createElement("div");
column.className = "column";
columns.push(column);
}

// 일기 목록을 표시하는 함수
function renderDiaryList(diaryList) {
clearDiaryList(); // 이전의 일기 목록 제거
// 열 요소를 그룹화하여 열에 일기 배치
let columnIndex = 0;
diaryList.forEach((diaryData, index) => {
  const polaroid = createPolaroid(diaryData);
  columns[columnIndex].appendChild(polaroid);
  columnIndex = (columnIndex + 1) % itemsPerRow;
  // 마지막 일기인 경우 현재 열에 모든 일기가 배치되지 않은 경우 다음 열로 이동
  if (index === diaryList.length - 1 && columnIndex !== 0) {
    columnIndex = 0;
  }
});
// 열 요소를 polaroidContainer에 추가
columns.forEach((column) => {
  polaroidContainer.appendChild(column);
});

currentDiaryList = diaryList; // 현재 표시된 일기 목록 업데이트
}

// 기존의 일기 목록 제거하는 함수
function clearDiaryList() {
columns.forEach((column) => {
  while (column.firstChild) {
    column.firstChild.remove();
  }
});
}

// 모든 일기를 보여주는 함수
function showAllDiaries() {
const diaryList = getDiaryListFromLocalStorage();
renderDiaryList(diaryList);
}

// 페이지 로딩 시 일기 목록 초기화 및 로딩
loadDiaryList();
