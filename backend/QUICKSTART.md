# 🚀 Feto 백엔드 빠른 시작 가이드

## ⚡ 5분 안에 시작하기

### 1단계: OpenAI API 키 받기
1. https://platform.openai.com/api-keys 접속
2. 로그인 후 "+ Create new secret key" 클릭
3. 키 복사 (sk-로 시작)

### 2단계: 환경 설정
```bash
# backend 폴더로 이동
cd backend

# 가상환경 생성
python -m venv venv

# 가상환경 활성화
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# 패키지 설치
pip install -r requirements.txt
```

### 3단계: API 키 설정
`.env` 파일 생성:
```bash
echo "OPENAI_API_KEY=sk-your-actual-key-here" > .env
```

또는 직접 생성:
```
OPENAI_API_KEY=sk-your-actual-key-here
```

### 4단계: 서버 실행
```bash
python main.py
```

✅ 서버가 http://localhost:8000 에서 실행됩니다!

## 🧪 테스트

브라우저에서:
- http://localhost:8000/docs - API 문서
- http://localhost:8000/api/health - 상태 확인

또는 테스트 스크립트:
```bash
python test_api.py
```

## 🎯 주요 변경사항

### ✨ 업데이트된 기능
1. **F/T 타입 구분 제거** - 모든 사용자에게 자연스럽고 적응적인 대화 제공
2. **OpenAI API 최신 버전** - openai==1.3.7 사용
3. **향상된 에러 처리** - 더 명확한 에러 메시지

### 💡 작동 방식
- AI가 사용자의 입력을 보고 자동으로 감정적/분석적 대응을 선택
- 설문 결과(F/T)는 참고만 하고, 실제 대화 내용에 따라 유연하게 반응
- 더 자연스럽고 인간적인 대화 경험

## 🔧 문제 해결

### "OpenAI API key not configured"
→ `.env` 파일에 API 키가 올바르게 설정되었는지 확인

### "Module 'openai' has no attribute 'ChatCompletion'"
→ `pip install --upgrade openai==1.3.7` 실행

### CORS 에러
→ main.py의 `allow_origins`에 프론트엔드 URL 추가

## 💰 비용 절감 팁
- main.py 183번 줄: `model="gpt-3.5-turbo"` (저렴)
- GPT-4로 변경하려면: `model="gpt-4"` (고품질이지만 비쌈)

## 📊 API 사용 예시

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "오늘 하루가 너무 힘들었어요",
    "pet_name": "초코",
    "years_together": "5년",
    "conversation_history": [],
    "user_type": "F"
  }'
```

응답:
```json
{
  "reply": "오늘 하루가 많이 힘드셨군요. 초코와의 추억이 떠올라서 더 힘드셨나요? 💙 편하게 말씀해주세요.",
  "status": "success"
}
```

## 🎓 다음 단계
1. 프론트엔드 연동
2. 대화 기록 데이터베이스 연결
3. 사용자 인증 추가
4. 프로덕션 배포

## 📞 도움이 필요하신가요?
- API 문서: http://localhost:8000/docs
- 상태 확인: http://localhost:8000/api/health
