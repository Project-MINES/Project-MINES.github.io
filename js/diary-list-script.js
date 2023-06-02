// LocalStorage에서 일기 데이터 가져오기
const diaryList = [];
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key !== "EmotionCount") {
    const diaryData = JSON.parse(localStorage.getItem(key));
    diaryList.push(diaryData);
  }
}

// 날짜를 기준으로 일기 목록 정렬
diaryList.sort((a, b) => {
  const dateA = new Date(a.Date);
  const dateB = new Date(b.Date);
  return dateB - dateA;
});

// polaroidContainer 요소 참조
const polaroidContainer = document.getElementById("polaroidContainer");

/*
 * Polaroid 요소 생성
 */
function createPolaroid(diaryData) {
  const polaroid = document.createElement("div");
  polaroid.className = "polaroid";

  const image = document.createElement("img");
  image.src = diaryData.imageURL;
  polaroid.appendChild(image);

  const title = document.createElement("h5");
  title.textContent = diaryData.Title;
  polaroid.appendChild(title);

  const date = document.createElement("p");
  date.textContent = diaryData.Date;
  polaroid.appendChild(date);

  return polaroid;
}

// 한 줄에 표시할 일기 개수
const itemsPerRow = 3;

// 열(column) 요소를 그룹화하여 열 생성
const columns = [];
for (let i = 0; i < itemsPerRow; i++) {
  const column = document.createElement("div");
  column.className = "column";
  columns.push(column);
}

// 일기 데이터를 기반으로 polaroid 요소 동적 생성 및 배치
diaryList.forEach((diaryData, index) => {
  const polaroid = createPolaroid(diaryData);
  const targetColumn = columns[index % itemsPerRow];
  targetColumn.appendChild(polaroid);
});

// 생성된 열을 polaroidContainer에 추가
columns.forEach((column) => {
  polaroidContainer.appendChild(column);
});
