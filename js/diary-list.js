let storedData_date = JSON.parse(localStorage.getItem(date));
let ageValue = storedData.Emotion[0];

function createDiaryList() {
    const diaryListElement = document.getElementById('diary-list');
    diaryListElement.innerHTML = ''; // 기존 목록 초기화
  
    // 일기 목록을 순회하며 HTML 요소 생성
    diaryList.forEach(function(diary) {
      const listItem = document.createElement('li');
      const title = document.createElement('h3');
      const date = document.createElement('p');
  
      title.textContent = diary[0]; // 일기 제목 설정
      date.textContent = diary[2];  // 일기 날짜 설정
  
      listItem.appendChild(title);
      listItem.appendChild(date);
  
      diaryListElement.appendChild(listItem);
    });
  }
//페이지 로드시 일기 목록 생성
document.addEventListener('DOMContentLoaded', createDiaryList);
