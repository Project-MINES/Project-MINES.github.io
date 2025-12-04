import React, { useState, useEffect, useCallback } from 'react';

// Firebase import (주석 처리됨 - V2에서 사용)
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, doc, setDoc, collection, onSnapshot, query, updateDoc, arrayUnion } from 'firebase/firestore';

// --- Local Storage Key ---
const STORAGE_KEY = 'photoExhibitionData';
// Emotion values for calculation
const EMOTION_MAP = {
  '기쁨': 3, '행복': 3, '설렘': 2, '평온': 1, 
  '슬픔': -2, '화남': -3, '걱정': -1, '무념': 0
};

// Utility function to safely get data from Local Storage
const getInitialData = () => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error("Local Storage 데이터 로드 실패:", error);
  }
  return { lines: [], globalEmotionTotal: 0 };
};

// Utility function to save data to Local Storage
const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Local Storage 데이터 저장 실패:", error);
  }
};

// 날짜를 YYYY-MM-DD 형식으로 포맷
const getTodayDate = () => new Date().toISOString().substring(0, 10);

// --- Component: PhotoCard (사진 한 장과 메모를 담당) ---
const PhotoCard = ({ photo, lineId, updateData }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [backContent, setBackContent] = useState(photo.backContent);

  const calculateEmotionValue = (emotions) => {
    return emotions.reduce((total, emotion) => total + (EMOTION_MAP[emotion] || 0), 0);
  };

  const handleBackContentChange = (field, value) => {
    setBackContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmotionToggle = (emotion) => {
    const newEmotions = backContent.emotions.includes(emotion)
      ? backContent.emotions.filter(e => e !== emotion)
      : [...backContent.emotions, emotion];
    
    // 감정은 최소 1개 이상 선택되어야 함
    if (newEmotions.length === 0 && backContent.emotions.length === 1) {
        alert("감정은 최소 1개 이상 선택해야 합니다.");
        return;
    }

    setBackContent(prev => ({
      ...prev,
      emotions: newEmotions
    }));
  };

  const handleSave = () => {
    const emotionValue = calculateEmotionValue(backContent.emotions);
    updateData(lineId, photo.photoId, {
      ...photo,
      backContent: {
        ...backContent,
        totalEmotionValue: emotionValue
      }
    });
    setIsFlipped(false);
  };

  // UI에서 날짜를 선택하지 않았다면 오늘 날짜로 초기화
  useEffect(() => {
    if (!backContent.date) {
        setBackContent(prev => ({ ...prev, date: getTodayDate() }));
    }
  }, [backContent.date]);

  // Flip Card UI
  return (
    <div className="relative group w-64 h-80 perspective-1000 m-4 flex-shrink-0">
      {/* Pin/Clip Icon */}
      <div className="absolute top-[-1rem] left-1/2 transform -translate-x-1/2 z-20">
        <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="3"></circle>
          <line x1="12" y1="22" x2="12" y2="8"></line>
        </svg>
      </div>

      <div 
        className={`w-full h-full relative duration-700 preserve-3d shadow-xl rounded-lg 
                    ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front Side: Photo and Title */}
        <div className="absolute w-full h-full backface-hidden bg-white p-2 rounded-lg flex flex-col justify-between">
          <img 
            src={photo.imageUrl} 
            alt={photo.frontTitle} 
            className="w-full h-56 object-cover rounded-md mb-2 shadow-inner" 
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/5C6BC0/FFFFFF?text=No+Image"; }}
          />
          <h3 className="text-xl font-bold text-gray-800 truncate">{photo.frontTitle}</h3>
          <button 
            onClick={() => setIsFlipped(true)} 
            className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 transition duration-150"
          >
            메모 확인하기
          </button>
        </div>

        {/* Back Side: Memo and Emotions */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-50 p-4 rounded-lg flex flex-col justify-between shadow-2xl overflow-y-auto">
          <div>
            <div className="flex justify-between items-center mb-2">
                <input 
                    type="date" 
                    value={backContent.date || getTodayDate()} 
                    onChange={(e) => handleBackContentChange('date', e.target.value)}
                    className="text-sm p-1 border rounded"
                />
                <input 
                    type="text" 
                    placeholder="날씨 (예: 맑음)" 
                    value={backContent.weather || ''} 
                    onChange={(e) => handleBackContentChange('weather', e.target.value)}
                    className="text-sm p-1 border rounded w-1/3 text-right"
                />
            </div>

            <textarea
              placeholder="자유 형식의 짧은 글 또는 일기"
              value={backContent.memo || ''}
              onChange={(e) => handleBackContentChange('memo', e.target.value)}
              className="w-full h-32 p-2 border rounded resize-none text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            
            <p className="text-xs font-semibold text-gray-600 mt-3 mb-1">감정 선택 (필수):</p>
            <div className="flex flex-wrap gap-1">
              {Object.keys(EMOTION_MAP).map(emotion => (
                <button
                  key={emotion}
                  onClick={() => handleEmotionToggle(emotion)}
                  className={`px-2 py-1 text-xs rounded-full transition duration-150 
                              ${backContent.emotions.includes(emotion) 
                                ? 'bg-indigo-500 text-white font-bold shadow-md' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                              }
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <button 
                onClick={() => setIsFlipped(false)} 
                className="text-sm text-gray-500 hover:text-gray-700 transition duration-150"
            >
              취소
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-full hover:bg-green-600 transition duration-150 shadow-md"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main App Component ---
const App = () => {
  const [data, setData] = useState(getInitialData);
  const [isAddLineModalOpen, setIsAddLineModalOpen] = useState(false);
  const [newLineTitle, setNewLineTitle] = useState('');
  
  // Custom Hook for Tailwind CSS perspective and preserve-3d
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .perspective-1000 { perspective: 1000px; }
      .preserve-3d { transform-style: preserve-3d; }
      .rotate-y-180 { transform: rotateY(180deg); }
      .backface-hidden { backface-visibility: hidden; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // 데이터를 로컬 스토리지에 저장하고 전체 감정값을 업데이트
  const updateLocalStorage = useCallback((newData) => {
    // 전체 감정값 재계산
    const newTotal = newData.lines.reduce((lineTotal, line) => 
        lineTotal + line.photos.reduce((photoTotal, photo) => 
            photoTotal + (photo.backContent.totalEmotionValue || 0), 0
        ), 0
    );
    const finalData = { ...newData, globalEmotionTotal: newTotal };
    setData(finalData);
    saveData(finalData);
  }, []);

  // 라인 추가
  const addLine = () => {
    if (!newLineTitle.trim()) return;
    const newLine = {
      lineId: crypto.randomUUID(),
      title: newLineTitle.trim(),
      photos: []
    };
    updateLocalStorage({ ...data, lines: [...data.lines, newLine] });
    setNewLineTitle('');
    setIsAddLineModalOpen(false);
  };

  // 사진 추가
  const addPhoto = (lineId, file, frontTitle) => {
    if (!file || !frontTitle.trim()) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newPhoto = {
        photoId: crypto.randomUUID(),
        imageUrl: e.target.result, // Base64 String
        frontTitle: frontTitle.trim(),
        backContent: {
          memo: '',
          date: getTodayDate(),
          weather: '',
          emotions: ['평온'], // 초기값으로 평온 선택
          totalEmotionValue: EMOTION_MAP['평온'] || 0,
        }
      };

      const newLines = data.lines.map(line =>
        line.lineId === lineId 
          ? { ...line, photos: [...line.photos, newPhoto] }
          : line
      );
      updateLocalStorage({ ...data, lines: newLines });
    };
    reader.readAsDataURL(file);
  };

  // 사진 업데이트 (메모 저장 시 사용)
  const updatePhoto = useCallback((lineId, photoId, updatedPhoto) => {
    const newLines = data.lines.map(line => 
      line.lineId === lineId
        ? {
            ...line,
            photos: line.photos.map(photo =>
              photo.photoId === photoId ? updatedPhoto : photo
            )
          }
        : line
    );
    updateLocalStorage({ ...data, lines: newLines });
  }, [data.lines, updateLocalStorage]);


  // 메인 화면 타이포그래피 스타일 계산
  const emotionStyle = {
    fontSize: `${40 + data.globalEmotionTotal * 0.5}px`, // 감정값에 따라 크기 조절
    fontWeight: 900,
    transition: 'font-size 0.5s ease-in-out',
    color: data.globalEmotionTotal > 0 ? '#4F46E5' : (data.globalEmotionTotal < 0 ? '#DC2626' : '#6B7280'),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans">
      <header className="text-center mb-10">
        <h1 
          className="text-4xl sm:text-6xl tracking-tight leading-none" 
          style={emotionStyle}
        >
          {data.globalEmotionTotal >= 0 ? '✨ 나의 빛나는 사진 전시대 ✨' : '🌧️ 나의 짙은 사진 전시대 🌧️'}
        </h1>
        <p className="text-gray-500 mt-2">
          현재 감정 누적값: <span className="font-mono font-bold text-lg">{data.globalEmotionTotal}</span> 
          (로컬 저장소에 저장 중입니다.)
        </p>
      </header>

      <main>
        {data.lines.length === 0 ? (
          <div className="text-center p-12 border-4 border-dashed border-gray-300 rounded-xl bg-white shadow-lg">
            <p className="text-xl text-gray-600 mb-6">아직 라인이 없습니다. 새로운 사진 전시 라인을 만들어보세요!</p>
            <button 
              onClick={() => setIsAddLineModalOpen(true)}
              className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
            >
              + 새 라인 추가하기
            </button>
          </div>
        ) : (
          data.lines.map(line => (
            <LineSection 
              key={line.lineId} 
              line={line} 
              addPhoto={addPhoto} 
              updateData={updatePhoto} 
            />
          ))
        )}
      </main>

      {/* Add Line Modal */}
      {isAddLineModalOpen && (
        <Modal onClose={() => setIsAddLineModalOpen(false)}>
          <h3 className="text-xl font-bold mb-4 text-gray-800">새로운 전시 라인 추가</h3>
          <input 
            type="text"
            placeholder="라인 제목 (예: 제주도 여행, 가족 2024)"
            value={newLineTitle}
            onChange={(e) => setNewLineTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button 
            onClick={addLine}
            className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            라인 만들기
          </button>
        </Modal>
      )}

      {/* Floating Action Button for adding a Line */}
      <button 
        onClick={() => setIsAddLineModalOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-pink-500 text-white rounded-full shadow-2xl hover:bg-pink-600 transition duration-300 z-50 text-xl font-bold"
        aria-label="Add New Line"
      >
        + 라인
      </button>

      {/* V2 Note */}
      <footer className="text-center mt-20 text-xs text-gray-400">
          <p>개발 노트: V1은 로컬 저장소에 데이터를 저장합니다. 추후 멀티/공유 기능을 위해 Firebase Firestore로 확장 가능합니다. 데이터베이스 삭제 금지 원칙을 따르기 위해 V1에서는 LocalStorage에만 저장합니다. DB_TODO 확인 완료.</p>
      </footer>
    </div>
  );
};

// --- Component: LineSection (각 주제별 라인) ---
const LineSection = ({ line, addPhoto, updateData }) => {
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoTitle, setPhotoTitle] = useState('');

  const handlePhotoUpload = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleAddPhoto = () => {
    if (photoFile && photoTitle.trim()) {
      addPhoto(line.lineId, photoFile, photoTitle);
      // Reset state
      setPhotoFile(null);
      setPhotoTitle('');
      setIsAddingPhoto(false);
    } else {
      alert("사진 파일과 제목을 모두 입력해주세요.");
    }
  };

  return (
    <section className="mb-12 p-6 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-indigo-200 pb-2 mb-4 flex justify-between items-center">
        {line.title}
        <button 
          onClick={() => setIsAddingPhoto(true)}
          className="text-sm px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition"
        >
          + 사진 걸기
        </button>
      </h2>
      
      {/* The Line UI: Horizontal scrollable container */}
      <div className="relative overflow-x-auto whitespace-nowrap py-4 border-t border-b border-gray-300 bg-gray-100 rounded-md">
        {/* The 'Rope' or 'Wire' visual line */}
        <div className="absolute top-1/2 w-full h-0.5 bg-gray-500 transform -translate-y-1/2 z-0"></div>

        <div className="flex items-start">
          {line.photos.map(photo => (
            <PhotoCard key={photo.photoId} photo={photo} lineId={line.lineId} updateData={updateData} />
          ))}
        </div>
      </div>
      
      {line.photos.length === 0 && (
          <p className="text-center text-gray-500 mt-4">이 라인에 사진이 없습니다. 사진을 걸어보세요!</p>
      )}

      {/* Add Photo Modal */}
      {isAddingPhoto && (
        <Modal onClose={() => setIsAddingPhoto(false)}>
          <h3 className="text-xl font-bold mb-4 text-gray-800">'{line.title}' 라인에 사진 걸기</h3>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handlePhotoUpload} 
            className="w-full mb-4 p-2 border rounded"
          />
          <input 
            type="text"
            placeholder="사진 앞장의 제목"
            value={photoTitle}
            onChange={(e) => setPhotoTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button 
            onClick={handleAddPhoto}
            disabled={!photoFile || !photoTitle.trim()}
            className={`w-full px-4 py-2 text-white font-semibold rounded-lg transition ${
              photoFile && photoTitle.trim() ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            사진 걸기
          </button>
        </Modal>
      )}
    </section>
  );
};

// --- Component: Simple Modal ---
const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div className="bg-white p-6 rounded-xl shadow-3xl w-full max-w-md transform transition-all duration-300 scale-100">
      <div className="flex justify-end">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      {children}
    </div>
  </div>
);

// CSS for 3D transforms (Tailwind doesn't provide these by default)
const GlobalStyles = () => (
  <style jsx="true">{`
    .perspective-1000 { perspective: 1000px; }
    .preserve-3d { transform-style: preserve-3d; }
    .rotate-y-180 { transform: rotateY(180deg); }
    .backface-hidden { backface-visibility: hidden; }
    /* Scrollbar for Line Section */
    .overflow-x-auto::-webkit-scrollbar {
        height: 8px;
    }
    .overflow-x-auto::-webkit-scrollbar-thumb {
        background: #D1D5DB;
        border-radius: 10px;
    }
    .overflow-x-auto::-webkit-scrollbar-track {
        background: #F3F4F6;
    }
    
    /* Custom Shadow for better visual depth */
    .shadow-3xl {
        box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.25);
    }
  `}</style>
);

export default () => (
    <>
      <GlobalStyles />
      <App />
    </>
);