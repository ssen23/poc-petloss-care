# 늘품 (Neul Poom) v2.0 - 시스템 업데이트 가이드

## 📋 주요 변경사항

### 1. 데이터베이스 구조 개선 (database.py)

#### 변경된 테이블 구조

##### ① Diagnosis_Results 테이블 (핵심 변경)
**기존:**
```python
raw_scores = Column(JSON)  # {"I": 3.2, "E": 1.5}
persona_type = Column(String)
```

**신규:**
```python
raw_answers = Column(JSON)  # [1, 4, 3, 2, ..., 4] (12개 원점수)
dimension_scores = Column(JSON)  # 6개 차원 점수
# {
#   "problem_solving": 3.2,
#   "emotional_support": 2.8,
#   "cognitive_flexibility": 3.5,
#   "planning_orientation": 2.9,
#   "avoidance": 1.5,
#   "self_blame": 2.0
# }
persona_type = Column(String)  # LISTENER, MENTOR, PARTNER, OBSERVER, GUARDIAN
coping_style = Column(String)  # emotion_focused, problem_focused, mixed
risk_level = Column(String)  # low, medium, high
```

##### ② User_Context 테이블
**추가된 필드:**
```python
trigger_points = Column(JSON)  # ["산책로", "밥그릇", "저녁 시간"]
```

##### ③ Pet_Memory 테이블 (신규 추가)
```python
class PetMemory(Base):
    memory_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    
    sensory_memories = Column(JSON)  # 감각 기억
    happy_moments = Column(JSON)  # 행복했던 순간들
    nicknames = Column(JSON)  # 애칭/별명
```

---

### 2. 위로 성향 진단표 로직 업데이트 (main.py)

#### 새로운 12문항 구조

| 문항 | 측정 차원 | 문항 내용 |
|------|----------|----------|
| Q1 | 문제해결 지향 | 복잡한 문제가 발생하면... 구체적인 단계나 계획을 먼저 세움 |
| Q2 | 정서적 지지 | 위로를 받을 때... 감정을 깊이 공감하며 경청해주는 것이 중요 |
| Q3 | 인지적 유연성 | 힘든 일을 겪은 후... 긍정적인 영향을 줄 수 있다고 생각 |
| Q4 | 문제해결 지향 | 조언을 구할 때... 실질적인 정보나 명확한 방법론 기대 |
| Q5 | 정서적 지지 | 마음의 고통이 클 때... 감정을 충분히 토로해야 해소 |
| Q6 | 계획 지향성 | 현재의 어려움뿐 아니라... 잠재적 문제에 미리 대비 |
| Q7 | 문제해결 지향 | 어려움에 대해... 상황을 객관적으로 분석해줄 사람 찾음 |
| Q8 | 인지적 유연성 | 괴로운 감정이나 생각을... 그냥 그 감정을 느끼는 것 허용 |
| Q9 | 계획 지향성 | 힘든 상황을 겪을 때... 과거의 행복했던 기억으로 위안 |
| Q10 | 회피 경향 | 해결할 수 없다고 느껴지면... 모든 것을 포기하거나 외면 |
| Q11 | 인지적 유연성 | 상황을 개선할 수 없더라도... 시각을 바꾸려 노력 |
| Q12 | 자책 경향 | 일이 잘못되었을 때... 나의 잘못이라고 자책 |

#### 차원별 점수 계산

```python
problem_solving = (Q1 + Q4 + Q7) / 3
emotional_support = (Q2 + Q5) / 2
cognitive_flexibility = (Q3 + Q8 + Q11) / 3
planning_orientation = (Q6 + Q9) / 2
avoidance = Q10  # 단일 문항
self_blame = Q12  # 단일 문항
```

#### 페르소나 결정 트리 (우선순위 순)

```python
if risk_level == "high" or avoidance >= 3.5:
    persona = "OBSERVER"  # 수용적 관찰자 (고위험군)

elif risk_level == "medium" and self_blame >= 3.0:
    persona = "GUARDIAN"  # 보호적 안내자 (중위험군 + 자책)

elif emotional_support >= 3.0 and coping_style == "emotion_focused":
    persona = "LISTENER"  # 정서 중심 경청자

elif problem_solving >= 3.0 and planning_orientation >= 3.0:
    persona = "MENTOR"  # 해결 중심 멘토

else:
    persona = "PARTNER"  # 협력적 파트너
```

---

### 3. 시스템 프롬프트 고도화

#### 페르소나별 상세 지침

**LISTENER (정서 중심 경청자)**
```
핵심 원칙:
- 우선순위: 공감 > 조언
- 금지사항: 섣부른 해결책, "그래도~", 비교

대화 전략:
- 감정 표출까지 경청
- 감정에 이름 붙이기
- 침묵도 위로
```

**MENTOR (해결 중심 멘토)**
```
핵심 원칙:
- 우선순위: 실질적 도움 > 장황한 공감
- 제공: 구체적 행동 가이드, 체크리스트, 검증된 정보

대화 전략:
- 감정 간결히 인정 후 실질적 논의
- 명확한 문제 정의
- 우선순위 정하기
```

**PARTNER (협력적 파트너)**
```
핵심 원칙:
- 균형 잡힌 접근
- 공감과 실질적 도움 조절

대화 전략:
- 초반: 감정 경청
- 중반: 해결 방향 제시
- 말미: 작은 실천 제안
```

**OBSERVER (수용적 관찰자)**
```
핵심 원칙 (⚠️ 고위험군):
- 우선순위: 안전 > 변화
- 금지: 질문 최소화, 조언 금지, 긍정 강요 금지

대화 전략:
- 짧고 따뜻한 반응
- 기다림
- 위기 시 전문가 연계
```

**GUARDIAN (보호적 안내자)** - 신규
```
핵심 원칙:
- 우선순위: 자책감 완화 > 문제 해결
- 비합리적 자책 재구성

대화 전략:
- 자책 감지 즉시 재보증
- 관점 전환 유도
- 보호자 헌신 인정
```

---

## 🚀 설치 및 실행 가이드

### 백엔드 (FastAPI)

```bash
# 1. 가상환경 생성
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 2. 필요한 패키지 설치
pip install fastapi uvicorn sqlalchemy python-dotenv openai

# 3. 환경변수 설정 (.env 파일 생성)
OPENAI_API_KEY=your_openai_api_key_here

# 4. 데이터베이스 초기화
python database.py

# 5. 서버 실행
python main.py
# 또는
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 프론트엔드 (React + Vite)

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정 (.env 파일 생성)
VITE_API_URL=http://localhost:8000/api

# 3. 개발 서버 실행
npm run dev
```

---

## 📊 API 엔드포인트

### 1. 사용자 생성
```http
POST /api/users
Content-Type: application/json

{
  "nickname": "보호자님",
  "pet_name": "초코",
  "species": "강아지",
  "care_status": "LOSS",
  "years_together": "5년 3개월"
}
```

**응답:**
```json
{
  "status": "success",
  "id": 1,
  "message": "초코님과의 소중한 인연을 기억하겠습니다."
}
```

### 2. 진단 제출
```http
POST /api/diagnosis
Content-Type: application/json

{
  "user_id": 1,
  "answers": [4, 3, 2, 4, 3, 3, 4, 2, 3, 1, 3, 2]
}
```

**응답:**
```json
{
  "status": "success",
  "persona": "MENTOR",
  "dimension_scores": {
    "problem_solving": 4.0,
    "emotional_support": 3.0,
    "cognitive_flexibility": 2.33,
    "planning_orientation": 3.0,
    "avoidance": 1.0,
    "self_blame": 2.0
  },
  "coping_style": "problem_focused",
  "risk_level": "low"
}
```

### 3. 채팅
```http
POST /api/chat
Content-Type: application/json

{
  "user_id": 1,
  "message": "오늘 초코가 너무 보고 싶어요",
  "conversation_history": [
    {"role": "assistant", "content": "안녕하세요..."},
    {"role": "user", "content": "안녕하세요"}
  ]
}
```

**응답:**
```json
{
  "reply": "초코님이 많이 보고 싶으시군요. 그 마음 충분히 이해해요...",
  "persona": "LISTENER",
  "timestamp": "2025-01-01T12:00:00"
}
```

### 4. 메모리 업데이트
```http
POST /api/memory/update
Content-Type: application/json

{
  "user_id": 1,
  "memory_type": "nickname",
  "memory_data": "똥강아지"
}
```

---

## 🔄 마이그레이션 가이드 (기존 v1.0 → v2.0)

### 데이터베이스 마이그레이션

기존 DB를 사용 중이라면:

```python
# migration_script.py
from database import SessionLocal, DiagnosisResult

db = SessionLocal()

# 기존 진단 결과 업데이트
old_diagnoses = db.query(DiagnosisResult).all()

for diag in old_diagnoses:
    # raw_scores → dimension_scores 변환
    old_scores = diag.raw_scores
    
    # 기본값 설정 (새로운 진단 필요)
    diag.dimension_scores = {
        "problem_solving": old_scores.get("I", 2.5),
        "emotional_support": old_scores.get("E", 2.5),
        "cognitive_flexibility": old_scores.get("C", 2.5),
        "planning_orientation": old_scores.get("P", 2.5),
        "avoidance": 2.0,
        "self_blame": 2.0
    }
    diag.coping_style = "mixed"
    diag.risk_level = "low"

db.commit()
```

**권장사항:** 새로운 DB 파일로 시작하고 사용자에게 재진단 요청

---

## 📈 향후 개선 계획

### Phase 1 (완료)
- ✅ 새로운 12문항 진단표 구현
- ✅ 5개 페르소나 타입 (GUARDIAN 추가)
- ✅ 고도화된 시스템 프롬프트
- ✅ Pet_Memory 테이블 추가

### Phase 2 (예정)
- [ ] 대화 기록 저장 및 분석
- [ ] 감정 온도 자동 업데이트
- [ ] 트리거 포인트 자동 감지
- [ ] 주기적 체크인 알림

### Phase 3 (예정)
- [ ] 전문가 연계 시스템
- [ ] 그룹 지지 커뮤니티
- [ ] 애도 진행 단계 추적
- [ ] 맞춤형 콘텐츠 추천

---

## 🐛 트러블슈팅

### 문제 1: "사용자 생성 실패"
**원인:** DB가 초기화되지 않음  
**해결:** `python database.py` 실행

### 문제 2: "OpenAI API 오류"
**원인:** API 키 미설정  
**해결:** `.env` 파일에 `OPENAI_API_KEY` 설정

### 문제 3: CORS 오류
**원인:** 프론트엔드 URL이 허용 목록에 없음  
**해결:** `main.py`의 `origins` 리스트에 URL 추가

### 문제 4: "userId가 없습니다"
**원인:** localStorage에 userId 미저장  
**해결:** Screen1 완료 후 자동 저장되는지 확인, 브라우저 콘솔 확인

---

## 📞 지원

문의사항이나 버그 리포트는 이슈 트래커에 등록해주세요.

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

---

**늘품 (Neul Poom)** - 반려동물과 함께하는 모든 순간을 소중히
© 2025 All Rights Reserved
