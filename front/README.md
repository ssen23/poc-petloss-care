# 🐾 페토 - FastAPI 연동 완료 버전

**반려동물 정서 케어 플랫폼 - 프론트엔드 + 백엔드 API 연동**

---

## 🎉 주요 변경사항

### ✅ API 연동 추가
- FastAPI 백엔드와 완전 연동
- 실시간 AI 채팅 (OpenAI/Claude)
- 사용자 데이터 저장
- 테스트 결과 저장

### 📁 프로젝트 구조

```
feto-api-integrated/
├── src/
│   ├── site1/                # 바이럴 테스트
│   │   ├── Site1Landing.jsx
│   │   ├── TestPage.jsx
│   │   └── TestResult.jsx    ✅ API 연동 (테스트 결과 저장)
│   │
│   ├── site2/                # 페토 플랫폼
│   │   ├── FetoLanding.jsx
│   │   ├── FetoApp.jsx
│   │   ├── Screen1.jsx
│   │   ├── Screen2.jsx
│   │   ├── Screen3.jsx       ✅ API 연동 (AI 채팅)
│   │   └── Screen4.jsx
│   │
│   ├── services/
│   │   └── api.js            ✅ NEW - FastAPI 클라이언트
│   │
│   ├── data/
│   │   └── testData.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env.example               ✅ NEW - API URL 설정
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md                  ✅ 이 파일
```

---

## 🚀 빠른 시작

### 1️⃣ 백엔드 실행 (먼저!)

```bash
cd ../feto-full-stack/backend

# 가상환경 활성화
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 패키지 설치
pip install -r requirements.txt

# 환경 변수 설정 (.env 파일)
OPENAI_API_KEY=your-key-here
ANTHROPIC_API_KEY=your-key-here
DATABASE_URL=sqlite:///./feto.db

# 서버 실행
uvicorn app.main:app --reload

# ✅ http://localhost:8000 에서 실행 중
```

### 2️⃣ 프론트엔드 실행

```bash
cd feto-api-integrated

# 패키지 설치
npm install

# 환경 변수 설정 (선택)
cp .env.example .env
# 기본값: http://localhost:8000/api

# 개발 서버 실행
npm run dev

# ✅ http://localhost:3000 자동 오픈!
```

---

## 🔌 API 연동 상세

### 연동된 기능

#### 1. **AI 채팅** (Screen3.jsx)
```javascript
// 실시간 AI 응답
const response = await fetoAPI.sendChatMessage({
  message: "안녕하세요",
  user_type: "F",  // F형 또는 T형
  pet_name: "초코",
  years_together: "5년",
  conversation_history: [...],
  user_id: 123
});

console.log(response.reply); // AI 응답
```

**작동 방식:**
- 사용자가 메시지 입력
- FastAPI의 `/api/chat` 엔드포인트 호출
- OpenAI 또는 Claude API로 AI 응답 생성
- 성향(F/T)에 맞춘 프롬프트 자동 적용
- 대화 기록 DB에 저장

---

#### 2. **테스트 결과 저장** (TestResult.jsx)
```javascript
// 테스트 완료 시 자동 저장
await fetoAPI.saveTestResult({
  test_id: "test3",
  result_type: "F",
  answers: ["F", "F", "T", "F", "F"]
});
```

**작동 방식:**
- 테스트 완료 시 자동 호출
- `/api/tests/results`에 결과 저장
- 통계 데이터로 활용 가능

---

#### 3. **사용자 생성** (Screen3.jsx - 자동)
```javascript
// 최초 채팅 시작 시 자동 생성
const user = await fetoAPI.createUser({
  pet_name: "초코",
  years_together: "5년",
  user_type: "F"
});

// localStorage에 저장
localStorage.setItem('fetoUserId', user.id);
```

---

### API 엔드포인트 목록

| 엔드포인트 | 메서드 | 설명 |
|-----------|--------|------|
| `/api/chat` | POST | AI 대화 |
| `/api/users` | POST | 사용자 생성 |
| `/api/users/{id}` | GET | 사용자 조회 |
| `/api/tests/results` | POST | 테스트 결과 저장 |
| `/api/tests/stats` | GET | 테스트 통계 |
| `/api/conversations/{user_id}` | GET | 대화 기록 조회 |

---

## 💡 오프라인 모드 (Fallback)

**API 연결 실패 시에도 작동!**

```javascript
// Screen3.jsx에 자동 구현됨
try {
  const response = await fetoAPI.sendChatMessage(...);
  // API 응답 사용
} catch (error) {
  // 폴백: 기본 응답 사용
  const fallbackResponse = "당신의 감정을 이해합니다...";
  setMessages([...messages, { text: fallbackResponse }]);
}
```

---

## 🎯 테스트 방법

### 1. 백엔드 API 테스트
```bash
# API 문서 열기
open http://localhost:8000/docs

# 테스트 요청 (curl)
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "안녕하세요",
    "user_type": "F",
    "pet_name": "초코",
    "years_together": "5년"
  }'
```

### 2. 프론트엔드 테스트
1. 심리 테스트 완료 → 결과 저장 확인
2. 페토 온보딩 → 사용자 생성 확인
3. AI 채팅 → 실시간 응답 확인
4. 개발자 도구 → Network 탭에서 API 호출 확인

---

## 🔧 환경 변수 설정

### 프론트엔드 (.env)
```bash
VITE_API_URL=http://localhost:8000/api
```

### 백엔드 (.env)
```bash
DATABASE_URL=sqlite:///./feto.db
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
FRONTEND_URL=http://localhost:3000
```

---

## 🚢 배포 가이드

### 프론트엔드 (Vercel)
```bash
# Vercel 환경 변수 설정
VITE_API_URL=https://your-backend.railway.app/api

# 배포
vercel
```

### 백엔드 (Railway)
1. Railway.app에서 New Project
2. GitHub 연동
3. 환경 변수 추가 (API 키들)
4. 자동 배포 완료!

---

## 📊 데이터 흐름

```
사용자 입력
  ↓
React (Screen3.jsx)
  ↓
fetoAPI.sendChatMessage()
  ↓
FastAPI (/api/chat)
  ↓
LLM Service (OpenAI/Claude)
  ↓
성향별 프롬프트 적용
  ↓
AI 응답 생성
  ↓
DB 저장 (PostgreSQL)
  ↓
React로 응답 반환
  ↓
화면에 표시
```

---

## 🐛 트러블슈팅

### 문제 1: API 연결 안됨
```bash
# 백엔드 실행 확인
curl http://localhost:8000/health

# CORS 에러 시 backend/app/main.py 확인
allow_origins=["http://localhost:3000"]
```

### 문제 2: AI 응답이 안 나옴
```bash
# .env 파일의 API 키 확인
echo $OPENAI_API_KEY

# 백엔드 로그 확인
uvicorn app.main:app --reload --log-level debug
```

### 문제 3: 오프라인 모드로만 작동
- `.env` 파일에서 `VITE_API_URL` 확인
- 백엔드 서버 실행 여부 확인
- 브라우저 Console에서 에러 메시지 확인

---

## ✨ 주요 개선사항

### 이전 버전 대비
| 항목 | 이전 | 현재 (API 연동) |
|------|------|-----------------|
| AI 응답 | 하드코딩 | 실시간 LLM |
| 데이터 저장 | 없음 | DB 저장 |
| 대화 기록 | 휘발성 | 영구 저장 |
| 성향 분석 | 프론트만 | 백엔드 프롬프팅 |
| 확장성 | 제한적 | 무한 확장 |

---

## 📈 다음 단계

- [ ] 로그인/회원가입 추가
- [ ] 대화 기록 불러오기
- [ ] 감정 일기 기능
- [ ] 파일 업로드 (펫 사진)
- [ ] 실시간 알림

---

## 💬 문의

문제가 있으면 이슈를 등록하거나 개발자에게 문의하세요!

---

**Made with 💜 and FastAPI**
