# Feto Backend API

반려동물 정서 케어 플랫폼 Feto의 백엔드 API 서버입니다.

## 기술 스택

- **FastAPI**: 고성능 웹 프레임워크
- **OpenAI API**: GPT-4 기반 AI 채팅
- **Python 3.8+**

## 주요 기능

1. **AI 채팅**: OpenAI GPT-4를 활용한 맞춤형 상담
2. **사용자 관리**: 사용자 정보 및 반려동물 정보 관리
3. **대화 기록**: 사용자별 대화 히스토리 저장
4. **테스트 결과**: 심리 테스트 결과 저장

## 설치 방법

### 1. 저장소 클론 (또는 백엔드 폴더로 이동)

```bash
cd backend
```

### 2. 가상환경 생성 및 활성화

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. 패키지 설치

```bash
pip install -r requirements.txt
```

### 4. 환경 변수 설정

`.env` 파일을 생성하고 OpenAI API 키를 설정합니다:

```bash
cp .env.example .env
```

`.env` 파일을 열어서 실제 API 키로 수정:

```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

**OpenAI API 키 발급 방법:**
1. https://platform.openai.com/ 접속
2. 회원가입 또는 로그인
3. API Keys 메뉴에서 새 키 생성
4. 생성된 키를 복사하여 `.env` 파일에 붙여넣기

## 실행 방법

### 개발 서버 실행

```bash
python main.py
```

또는

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

서버가 실행되면 다음 주소로 접속 가능합니다:
- API: http://localhost:8000
- 자동 생성 문서: http://localhost:8000/docs
- 대체 문서: http://localhost:8000/redoc

## API 엔드포인트

### 1. 사용자 관리

#### 사용자 생성
```http
POST /api/users
Content-Type: application/json

{
  "pet_name": "초코",
  "years_together": "5년 3개월",
  "user_type": "F"
}
```

#### 사용자 조회
```http
GET /api/users/{user_id}
```

### 2. AI 채팅

```http
POST /api/chat
Content-Type: application/json

{
  "message": "안녕하세요",
  "user_type": "F",
  "pet_name": "초코",
  "years_together": "5년 3개월",
  "conversation_history": [],
  "user_id": "user-uuid"
}
```

**응답:**
```json
{
  "reply": "AI의 응답 메시지",
  "status": "success"
}
```

### 3. 테스트 결과 저장

```http
POST /api/test-results
Content-Type: application/json

{
  "test_id": "test3",
  "result_type": "감정 공감형",
  "answers": [0, 1, 0, 0, 1]
}
```

### 4. 대화 기록 조회

```http
GET /api/conversations/{user_id}
```

### 5. 헬스 체크

```http
GET /api/health
```

## 프론트엔드 연동

프론트엔드 `.env` 파일 설정:

```
VITE_API_URL=http://localhost:8000/api
```

## 데이터 구조

### 사용자 타입

- **F (Feeling)**: 감정 공감형 - 따뜻하고 공감적인 대화 스타일
- **T (Thinking)**: 사실 기반 분석형 - 객관적이고 구조적인 대화 스타일

### 대화 히스토리 형식

```python
{
  "role": "user" | "assistant",
  "content": "메시지 내용"
}
```

## 주의사항

1. **API 키 보안**: `.env` 파일은 절대 Git에 커밋하지 마세요
2. **비용 관리**: OpenAI API는 사용량에 따라 과금되므로 모니터링 필요
3. **Rate Limit**: OpenAI API에는 분당 요청 제한이 있을 수 있습니다

## 프로덕션 배포

프로덕션 환경에서는:
1. PostgreSQL 등 실제 데이터베이스 사용
2. Redis로 세션 관리
3. 환경 변수를 안전하게 관리
4. HTTPS 사용
5. API Rate Limiting 구현
6. 로깅 및 모니터링 추가

## 문제 해결

### OpenAI API 에러
- API 키가 올바른지 확인
- 계정에 크레딧이 있는지 확인
- Rate Limit 초과 여부 확인

### CORS 에러
- `main.py`의 `allow_origins`에 프론트엔드 URL 추가

### 서버 실행 안됨
- Python 버전 확인 (3.8+)
- 가상환경 활성화 확인
- 패키지 재설치: `pip install -r requirements.txt --force-reinstall`

## 라이선스

MIT License

## 문의

문제가 발생하면 이슈를 등록해주세요.
