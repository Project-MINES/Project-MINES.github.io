// 버튼 클릭 이벤트 처리
document.getElementById("all").addEventListener("click", function () {
  changeEmotion(this);
  showAllDiaries();
});
document.getElementById("joy").addEventListener("click", function () {
  changeEmotion(this);
  filterDiaryByEmotion(["행복", "기쁨", "설렘", "즐거움", "평온"]);
});
document.getElementById("sad").addEventListener("click", function () {
  changeEmotion(this);
  filterDiaryByEmotion(["슬픔", "아픔", "우울함", "절망", "외로움"]);
});
document.getElementById("timid").addEventListener("click", function () {
  changeEmotion(this);
  filterDiaryByEmotion(["지루함", "부끄러움", "죄책감", "두려움", "놀람"]);
});
document.getElementById("angry").addEventListener("click", function () {
  changeEmotion(this);
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
let emotionsend = new URLSearchParams(window.location.search).get("param1");
if (emotionsend == "기쁨이") 
{
  filterDiaryByEmotion(["행복", "기쁨", "설렘", "즐거움", "평온"]);
}
 else if (emotionsend == "슬픔이") {
  filterDiaryByEmotion(["슬픔", "우울", "후회", "실망", "외로움"]);
}
else if (emotionsend == "버럭이") {
  filterDiaryByEmotion(["분노", "짜증", "혼란", "후회", "불안"]);
  }
else if (emotionsend == "소심이") {
  filterDiaryByEmotion(["지루함", "부끄러움", "죄책감", "두려움", "놀람"]);
  }
else
{
  showAllDiaries();
}


// 폴라로이드 확대 보기 이벤트 처리
function showDiaryDetail(diaryData) {
  // 기존 폴라로이드 숨기기
  document.getElementById("polaroidContainer").style.display = "none";

  // 확대 보기 컨테이너 생성
  const detailContainer = document.createElement("div");
  detailContainer.id = "diaryDetail";

  // 확대 보기 컨테이너에 fade-in 클래스 추가
  detailContainer.classList.add("fade-in");

  // 확대 보기 내용 생성
  const content = document.createElement("div");
  content.className = "content";
  content.innerHTML = diaryData.Content.replace(/\n/g, "<br>"); // 줄바꿈을 <br> 태그로 대체
  detailContainer.appendChild(content);

  // 일기 제목 생성
  const title = document.createElement("h2");
  title.textContent = diaryData.Title;
  detailContainer.appendChild(title);

  // 일기 날짜 생성
  const date = document.createElement("p");
  date.textContent = diaryData.Date;
  detailContainer.appendChild(date);

  // 삭제 버튼 생성
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "삭제";
  deleteButton.classList.add("delete"); // "delete" 클래스 추가
  deleteButton.addEventListener("click", function () {
    deleteDiary(diaryData); // 로컬 스토리지에서 일기 제거
    document.getElementById("diaryDetail").remove();  // 확대 보기 컨테이너 닫기
    document.getElementById("polaroidContainer").style.display = "flex"; // 폴라로이드 목록 다시 표시
    location.reload();
  });
  detailContainer.appendChild(deleteButton);

  // 닫기 버튼 생성
  const closeButton = document.createElement("button");
  closeButton.textContent = "닫기";
  closeButton.addEventListener("click", function () {
    document.getElementById("diaryDetail").remove();  // 확대 보기 컨테이너 닫기
    document.getElementById("polaroidContainer").style.display = "flex"; // 폴라로이드 목록 다시 표시
  });
  detailContainer.appendChild(closeButton);
  // 확대 보기 컨테이너를 body에 추가
  document.body.appendChild(detailContainer);
}

// 로컬 스토리지에서 일기 제거 함수
function deleteDiary(diaryData) {
  localStorage.removeItem(diaryData.Date);
}


// 폴라로이드제목 클릭 이벤트에 확대 보기 기능 연결
const titleElements = document.querySelectorAll("#polaroidContainer .polaroid h5");
titleElements.forEach((titleElement) => {
  titleElement.addEventListener("click", () => {
    const diaryData = getDiaryDataFromTitle(titleElement.textContent);
    showDiaryDetail(diaryData);
  });
});

// 제목으로부터 일기 데이터 가져오기
function getDiaryDataFromTitle(title) {
  return currentDiaryList.find((diaryData) => diaryData.Title === title);
}

function changeEmotion(emotionId) {
  let currentColor = emotionId.style.backgroundColor;

  if (emotionId.id === "joy") {
    if (currentColor === "rgb(255, 242, 120)") {
      emotionId.style.backgroundColor = "#fffadb";
    } else {
      emotionId.style.backgroundColor = "rgb(255, 242, 120)";
    }
  } else if (emotionId.id === "sad") {
    if (currentColor === "rgb(157, 180, 255)") {
      emotionId.style.backgroundColor = "#e4eaff";
    } else {
      emotionId.style.backgroundColor = "rgb(157, 180, 255)";
    }
  } else if (emotionId.id === "timid") {
    if (currentColor === "rgb(208, 137, 239)") {
      emotionId.style.backgroundColor = "#f6e9ff";
    } else {
      emotionId.style.backgroundColor = "rgb(208, 137, 239)";
    }
  } else if (emotionId.id === "angry") {
    if (currentColor === "rgb(255, 128, 109)") {
      emotionId.style.backgroundColor = "#ffe4e4";
    } else {
      emotionId.style.backgroundColor = "rgb(255, 128, 109)";
    }
  }
}
