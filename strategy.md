## 📸 사진 전시대 웹앱 개발 전략 (V1: 개인 로컬 저장소)

---

### 1. 목표 및 범위 (V1 Core)

* **핵심 목표**: '라인(주제)'에 사진을 핀으로 고정하고, 사진의 앞/뒷면을 전환하여 메모 및 감정 기록이 가능한 반응형 사용자 인터페이스(UI) 구현
* **데이터 저장**: 브라우저의 `localStorage`를 사용하여 개인화된 데이터 저장 및 불러오기 기능 구현
* **UI 콘셉트**: 줄(Line)과 집게(Pin) 형식을 시각적으로 구현하여 아날로그적인 감성 부여

---

### 2. 기술 스택 제안

| 분류 | 기술 | 추천 이유 |
| :--- | :--- | :--- |
| **프론트엔드** | **React (or Angular)** | 컴포넌트 기반으로 복잡한 UI(Line, PhotoCard, Front/Back) 및 상태 관리(감정값, 메모 내용)에 용이함 |
| **스타일링** | **Tailwind CSS** | 빠르고 반응형 UI를 쉽게 구현하며, 특히 사진 집게, 줄 등 디테일한 스타일링에 효과적 |
| **데이터 관리** | **Local Storage (V1)** | 초기 개인화된 저장소 요구사항 충족 (V2에서 Firestore로 전환 용이) |
| **사진 처리** | **JavaScript FileReader API** | 사용자가 업로드한 이미지를 Base64 문자열로 변환하여 Local Storage에 저장 |

---

### 3. 핵심 기능 구현 방안

#### 3.1 데이터 구조 정의 (JSON Schema)

```json
// localStorage key: 'photoExhibitionData'
{
  "lines": [
    {
      "lineId": "uuid-1234",
      "title": "2024년 여름 휴가", // 라인의 주제 (날짜, 컨셉 등)
      "photos": [
        {
          "photoId": "photo-a1b2",
          "imageUrl": "data:image/jpeg;base64,...", // Base64 인코딩된 이미지 데이터
          "frontTitle": "해변의 노을", // 사진 앞장의 제목
          "backContent": {
            "memo": "이날 파도가 정말 좋았다.", // 자유 형식의 메모/일기
            "date": "2024-07-15", // 날짜 선택기능 (YYYY-MM-DD)
            "weather": "맑음", // 날씨 기입 기능
            "emotions": ["행복", "설렘"], // 감정은 1개 이상 필수
            "totalEmotionValue": 5 // 감정값 누적 (추후 메인 타이포그래피 크기에 활용)
          }
        },
        {
          "photoId": "photo-c3d4",
          "imageUrl": "data:image/jpeg;base64,...",
          "frontTitle": "모래성 만들기",
          "backContent": { /* ... */ }
        }
      ]
    }
  ],
  "globalEmotionTotal": 120 // 전체 감정 누적값 (메인 화면 타이포그래피에 사용)
}
```

### 3.2 UI/UX 및 상호작용

* **'라인' 구현**
    * 시각화: 수평으로 길게 뻗은 선(Flexbox 또는 Grid)을 구현하고, CSS로 그림자 및 3D 효과를 주어 밧줄 또는 와이어처럼 보이게 함
    * 반응성: 가로 스크롤(Horizontal Scroll) 가능하도록 설계하여 많은 사진을 효율적으로 볼 수 있게 함
* **'집게(핀)' 구현**
    * 사진 컴포넌트 상단에 작은 SVG 또는 이미지(Emoji)로 집게 모양을 배치하여 고정된 느낌 제공
* **사진 앞/뒷면 전환 (Flip Card)**
    * CSS 3D Transform을 사용한 'Flip Card' 형태 구현 
    * 사진 클릭 또는 아이콘 클릭 시 `rotateY(180deg)`로 부드럽게 뒷면(메모/일기) 전환
* **감정 타이포그래피**
    * 메인 화면에 `globalEmotionTotal` 값에 비례하여 크기가 커지는 태그 배치
    * 예: `font-size: ${total}px;` 또는 `scale(${total})` 활용

---

### 3.3 사진 업로드 처리

1.  사용자가 `input type="file"`을 통해 이미지 파일 선택
2.  JavaScript `FileReader`를 사용하여 파일 내용을 Base64 문자열로 변환
3.  변환된 문자열을 `imageUrl` 필드에 저장 후 전체 데이터 구조를 `localStorage`에 업데이트

---

### 4. V2 (멀티/공유) 고려 사항

* **저장소**: Google Cloud Firestore (혹은 다른 NoSQL DB)
* **변경점**:
    * `localStorage.setItem()` → `firestore.setDoc()` 또는 `addDoc()`
    * 데이터 경로: `artifacts/{appId}/public/data/photo_lines`
    * 여러 사용자가 접근 가능하도록 설정
* **인증**:
    * `__initial_auth_token`을 활용하여 사용자 인증 및 접근 권한 관리