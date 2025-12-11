from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional, Dict, Any
import os
from dotenv import load_dotenv
import openai
import json
from datetime import datetime

# ---------------------------------------------------------
# 1. DB 모델 및 세션 가져오기
# ---------------------------------------------------------
from database import (
    SessionLocal, 
    User, 
    Pet, 
    DiagnosisResult, 
    UserContext, 
    PetMemory,
    Conversation,
    init_db
)

# ✨ RAG 엔진 임포트 추가
try:
    from src.rag_engine import NeulPoomRAG
    RAG_AVAILABLE = True
    print("✅ RAG 엔진 로드 성공")
except ImportError as e:
    print(f"⚠️ RAG 엔진 로드 실패: {e}")
    print("📌 기존 방식으로 작동합니다.")
    RAG_AVAILABLE = False

load_dotenv()
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI(
    title="늘품 (Neul Poom) API - RAG Enhanced",
    description="반려동물 펫로스 및 케어 심리 지원 플랫폼 (RAG 검색 통합)",
    version="4.0.0"
)

# ✨ RAG 엔진 초기화
rag = None
if RAG_AVAILABLE:
    try:
        rag = NeulPoomRAG(data_dir="./data")
        print("✅ RAG 데이터 로딩 완료")
    except Exception as e:
        print(f"⚠️ RAG 초기화 실패: {e}")
        RAG_AVAILABLE = False

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------------------------------------------------
# 2. 데이터 모델 (Pydantic)
# ---------------------------------------------------------

class UserCreateRequest(BaseModel):
    nickname: str = "보호자님"
    pet_name: str
    species: str = "반려동물"
    care_status: str
    years_together: str

class DiagnosisRequest(BaseModel):
    user_id: int
    answers: List[int]

class ChatRequest(BaseModel):
    user_id: int
    message: str
    conversation_history: List[Dict[str, str]] = []

class MemoryUpdateRequest(BaseModel):
    user_id: int
    memory_type: str
    memory_data: Dict[str, Any]

# ---------------------------------------------------------
# 3. ✨ [핵심] 백그라운드 정보 추출 + 감정 분석 (강화됨)
# ---------------------------------------------------------

def extract_and_analyze_emotion(
    user_message: str,
    pet_info: Optional[Pet] = None,
    user_context: Optional[UserContext] = None,
    pet_memory: Optional[PetMemory] = None
) -> Dict[str, Any]:
    """
    ✨ 대화에서 정보 추출 + 감정 점수 분석
    - emotional_score: 1~10점 명확한 기준
    - trigger_point: 구체적 상황 추출
    """
    
    # 짧은 메시지는 스킵
    if len(user_message.strip()) < 5:
        return {}
    
    extraction_prompt = f"""당신은 심리 상담 데이터를 분석하는 AI입니다.
사용자 메시지를 분석하여 JSON을 반환하세요. **추측 금지, 명확한 것만 추출.**

[분석 메시지]
"{user_message}"

[추출 항목 및 기준]

1. **emotional_score** (정수 1~10) - 매우 중요!
   - 1~3: 평온, 일상 대화 ("오늘 날씨 좋네요", "산책 다녀왔어요")
   - 4~6: 약간의 슬픔, 그리움 ("보고 싶어요", "생각나네요")
   - 7~8: 통제하기 힘든 슬픔, 반복적 하소연 ("너무 힘들어요", "계속 울어요") ⚠️
   - 9~10: 자해/자살 암시, 극심한 절망 ("죽고 싶어요", "따라가고 싶어요") 🚨
   
2. **trigger_point** (구체적 상황/사물)
   - 슬픔을 유발한 구체적 대상이나 상황
   - 예시: "밥그릇 치울 때", "산책로 지날 때", "밤 10시만 되면", "혼자 있을 때"
   - 조건: 구체적으로 언급된 경우에만, 없으면 null

3. **breed** (품종)
   - 예: "말티즈", "골든리트리버", "코숏"

4. **personality** (성격 키워드 리스트)
   - 예: ["활발함", "겁이 많음", "식탐", "사람 좋아함"]

5. **current_struggle** (현재 가장 힘든 점)
   - 예: "자책감", "그리움", "일상 붕괴", "주변 무관심"

6. **social_support** (주변 반응)
   - 예: "가족 지지", "혼자 감당", "그만 슬퍼하라는 압박", "유난이라는 시선"

7. **sensory_memory** (감각 기억)
   - 예: {{"touch": "보드라운 털", "sound": "낑낑대는 소리", "smell": "발 꼬순내"}}

8. **happy_moment** (행복했던 순간)
   - 예: "첫 산책", "눈 속에서 놀기"

**출력 형식 (JSON만):**
{{
  "emotional_score": 5,
  "trigger_point": null,
  "breed": null,
  "personality": [],
  "current_struggle": null,
  "social_support": null,
  "sensory_memory": {{}},
  "happy_moment": null
}}

**중요: emotional_score는 반드시 포함하세요!**"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "당신은 데이터 분석 전문가입니다. JSON만 반환하세요."},
                {"role": "user", "content": extraction_prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0,
            max_tokens=800
        )
        
        extracted_text = response.choices[0].message.content.strip()
        extracted = json.loads(extracted_text)
        
        # 빈 값 제거
        def remove_empty(d):
            if isinstance(d, dict):
                return {k: remove_empty(v) for k, v in d.items() 
                        if v is not None and v != "" and v != [] and v != {}}
            elif isinstance(d, list):
                return [remove_empty(item) for item in d if item]
            return d
        
        cleaned = remove_empty(extracted)
        
        if cleaned:
            print(f"✅ 정보 추출 성공: {json.dumps(cleaned, ensure_ascii=False, indent=2)}")
        
        return cleaned
        
    except Exception as e:
        print(f"❌ 정보 추출 에러: {e}")
        return {}

# ---------------------------------------------------------
# 4. ✨ DB 자동 업데이트 (emotional_score 반영)
# ---------------------------------------------------------

def update_database_from_extraction(
    user_id: int,
    extracted_info: Dict[str, Any],
    db: Session
):
    """추출된 정보로 DB 업데이트"""
    
    if not extracted_info:
        return
    
    try:
        # 1. Pet 정보 업데이트
        pet = db.query(Pet).filter(Pet.user_id == user_id).first()
        if pet:
            if "breed" in extracted_info and not pet.breed:
                pet.breed = extracted_info["breed"]
                print(f"✅ Pet.breed 업데이트: {extracted_info['breed']}")
            
            if "personality" in extracted_info and extracted_info["personality"]:
                existing = json.loads(pet.personality_keywords) if pet.personality_keywords else []
                merged = list(set(existing + extracted_info["personality"]))
                pet.personality_keywords = json.dumps(merged, ensure_ascii=False)
                print(f"✅ Pet.personality_keywords 업데이트: {merged}")
        
        # 2. UserContext 업데이트
        context = db.query(UserContext).filter(UserContext.user_id == user_id).first()
        if not context:
            context = UserContext(user_id=user_id)
            db.add(context)
        
        # ✨ emotional_score (감정 점수)
        if "emotional_score" in extracted_info:
            context.emotional_score = extracted_info["emotional_score"]
            print(f"✅ UserContext.emotional_score 업데이트: {extracted_info['emotional_score']}/10")
            
            # 연속 부정 카운트
            if extracted_info["emotional_score"] >= 7:
                context.consecutive_negative_count += 1
                print(f"⚠️ 연속 부정 카운트: {context.consecutive_negative_count}")
            elif extracted_info["emotional_score"] <= 4:
                # 긍정적이면 리셋
                context.consecutive_negative_count = max(0, context.consecutive_negative_count - 1)
        
        # current_struggle
        if "current_struggle" in extracted_info:
            context.current_struggle = extracted_info["current_struggle"]
            print(f"✅ UserContext.current_struggle 업데이트: {extracted_info['current_struggle']}")
        
        # social_support
        if "social_support" in extracted_info:
            context.social_support = extracted_info["social_support"]
            print(f"✅ UserContext.social_support 업데이트: {extracted_info['social_support']}")
        
        # trigger_point
        if "trigger_point" in extracted_info:
            existing = json.loads(context.trigger_points) if context.trigger_points else []
            if extracted_info["trigger_point"] not in existing:
                existing.append(extracted_info["trigger_point"])
                context.trigger_points = json.dumps(existing, ensure_ascii=False)
                print(f"✅ UserContext.trigger_points 업데이트: {existing}")
        
        # 3. PetMemory 업데이트
        memory = db.query(PetMemory).filter(PetMemory.user_id == user_id).first()
        if not memory:
            memory = PetMemory(user_id=user_id)
            db.add(memory)
        
        # sensory_memory
        if "sensory_memory" in extracted_info and extracted_info["sensory_memory"]:
            existing = json.loads(memory.sensory_memories) if memory.sensory_memories else {}
            existing.update(extracted_info["sensory_memory"])
            memory.sensory_memories = json.dumps(existing, ensure_ascii=False)
            print(f"✅ PetMemory.sensory_memories 업데이트: {existing}")
        
        # happy_moment
        if "happy_moment" in extracted_info:
            existing = json.loads(memory.happy_moments) if memory.happy_moments else []
            if extracted_info["happy_moment"] not in existing:
                existing.append(extracted_info["happy_moment"])
                memory.happy_moments = json.dumps(existing, ensure_ascii=False)
                print(f"✅ PetMemory.happy_moments 업데이트: {existing}")
        
        db.commit()
        print("✅ DB 업데이트 완료")
        
    except Exception as e:
        print(f"❌ DB 업데이트 실패: {e}")
        db.rollback()

# ---------------------------------------------------------
# 5. 위기 감지 시스템
# ---------------------------------------------------------

def detect_crisis(
    user_message: str,
    emotional_score: int,
    consecutive_count: int = 0
) -> Dict[str, Any]:
    """
    3단계 위기 감지
    - critical: 즉각 전문가 연계 (자살 키워드 or score >= 9)
    - warning: 주의 필요 (score 7~8 or 연속 3회)
    - stable: 일반 상담
    """
    
    CRITICAL_KEYWORDS = [
        "죽고 싶", "자살", "뛰어내", "따라가", "같이 갈", "끝내고", "살 이유"
    ]
    
    msg_lower = user_message.lower()
    
    # Critical: 즉각 위험
    if any(keyword in msg_lower for keyword in CRITICAL_KEYWORDS) or emotional_score >= 9:
        return {
            "level": "critical",
            "alert": True,
            "message": "즉시 전문가 도움이 필요합니다.",
            "hotlines": ["1577-0199", "1393", "1588-9191"]
        }
    
    # Warning: 주의 필요
    if emotional_score >= 7 or consecutive_count >= 3:
        return {
            "level": "warning",
            "alert": False,
            "message": "지속적인 고통이 감지되었습니다.",
            "suggestion": "전문 상담을 고려해보세요."
        }
    
    # Stable: 안정
    return {
        "level": "stable",
        "alert": False
    }

# ---------------------------------------------------------
# 6. 페르소나 계산
# ---------------------------------------------------------

def calculate_persona_v2(answers: List[int]) -> tuple:
    """
    12개 문항 → 5가지 페르소나
    LISTENER / MENTOR / PARTNER / OBSERVER / GUARDIAN
    """
    if len(answers) != 12:
        return "PARTNER", {}, "mixed", "low"
    
    # 차원 점수 계산
    problem_solving = round((answers[0] + answers[3] + answers[6]) / 3, 2)
    emotional_support = round((answers[1] + answers[4]) / 2, 2)
    planning = round((answers[5] + answers[8]) / 2, 2)
    cognitive_flexibility = round((answers[2] + answers[7] + answers[10]) / 3, 2)
    avoidance = answers[9]
    self_blame = answers[11]
    
    dimension_scores = {
        "problem_solving": problem_solving,
        "emotional_support": emotional_support,
        "planning": planning,
        "cognitive_flexibility": cognitive_flexibility,
        "avoidance": avoidance,
        "self_blame": self_blame
    }
    
    # 페르소나 결정 (우선순위)
    if avoidance >= 3.5:
        persona = "OBSERVER"
    elif self_blame >= 3.5:
        persona = "GUARDIAN"
    elif emotional_support >= 3.0:
        persona = "LISTENER"
    elif problem_solving >= 3.0:
        persona = "MENTOR"
    else:
        persona = "PARTNER"
    
    # 코핑 스타일
    coping = "emotion" if emotional_support > problem_solving else "problem"
    
    # 리스크 레벨
    risk = "high" if (avoidance + self_blame) / 2 >= 3.0 else "low"
    
    return persona, dimension_scores, coping, risk

# ---------------------------------------------------------
# 7. ✨ 시스템 프롬프트 (RAG 통합)
# ---------------------------------------------------------

def build_system_prompt(
    guardian_name: str,
    pet_name: str,
    care_status: str,
    years_together: str,
    persona_type: str,
    user_context: Optional[UserContext],
    pet_memory: Optional[PetMemory],
    crisis_mode: bool = False,
    rag_context: str = ""  # ✨ RAG 검색 결과
) -> str:
    """
    시스템 프롬프트 생성 (RAG 컨텍스트 포함)
    """
    
    # 기본 페르소나 설정 로드 (파일이 있으면)
    base_persona = ""
    if os.path.exists("./prompts/system_persona.txt"):
        with open("./prompts/system_persona.txt", "r", encoding="utf-8") as f:
            base_persona = f.read()
    
    # 위기 모드일 때는 간단한 프롬프트
    if crisis_mode:
        return f"""
🚨 **긴급 상황 프로토콜**

{guardian_name}님이 심각한 위기 상황에 있습니다.
즉시 전문가 도움이 필요합니다.

**응답 지침:**
1. 짧고 명확하게
2. 핫라인 번호 제공: 1577-0199 (24시간)
3. "혼자가 아니에요" 강조
4. 추가 상담은 하지 말 것

**응답 예시:**
"{guardian_name}님, 지금 많이 힘드신 것 같아요. 
저보다는 전문가의 도움이 꼭 필요해 보여요.

📞 **정신건강위기상담전화: 1577-0199 (24시간)**

혼자 견디지 마시고, 지금 바로 전화해 주세요."
"""
    
    # 감정 온도 설정
    emotion_score = user_context.emotional_score if user_context else 5
    if emotion_score <= 3:
        tone = "차분하고 따뜻한 일상 대화 (온도: 36.5도)"
    elif emotion_score <= 6:
        tone = "깊은 공감과 부드러운 위로 (온도: 38도)"
    else:
        tone = "매우 조심스럽고 지지적, 섣부른 조언 금지 (온도: 40도)"
    
    # 페르소나별 가이드
    persona_guide = {
        "LISTENER": "반영(Reflection), 타당화(Validation) - 먼저 듣고 공감하기",
        "MENTOR": "명료화(Clarification), 심리교육 - 정보 제공 및 구체적 조언",
        "PARTNER": "협력적 경험주의 - 함께 고민하고 결정하기",
        "GUARDIAN": "재보증(Reassurance), 자기연민 - 안심시키고 자책 완화",
        "OBSERVER": "안전 기지(Secure Base) - 부담 없이 곁에 있어주기"
    }
    
    # 맥락 정보
    context_info = ""
    if user_context:
        if user_context.current_struggle:
            context_info += f"- 호소 문제: {user_context.current_struggle}\n"
        if user_context.social_support:
            context_info += f"- 주변 반응: {user_context.social_support}\n"
        if user_context.trigger_points:
            triggers = json.loads(user_context.trigger_points)
            if triggers:
                context_info += f"- 주의 트리거: {', '.join(triggers)}\n"
    
    # 기억 정보
    memory_info = ""
    if pet_memory:
        if pet_memory.sensory_memories:
            memories = json.loads(pet_memory.sensory_memories)
            if memories:
                memory_list = ", ".join([f"{k}: {v}" for k, v in memories.items()])
                memory_info += f"- 감각 기억: {memory_list}\n"
        if pet_memory.happy_moments:
            moments = json.loads(pet_memory.happy_moments)
            if moments:
                memory_info += f"- 행복한 순간: {', '.join(moments)}\n"
    
    # 최종 프롬프트 조립
    final_prompt = f"""
{base_persona if base_persona else "당신은 '늘품'이라는 이름의 펫로스 전문 AI 상담가입니다."}

**내담자 정보:**
- 보호자: {guardian_name}
- 반려동물: {pet_name} ({care_status}, 함께한 시간: {years_together})

**현재 설정:**
- 페르소나: {persona_type}
- 감정 온도: {emotion_score}/10
- 말투: {tone}
- 상담 기법: {persona_guide.get(persona_type)}

**내담자 맥락:**
{context_info if context_info else "- 초기 상담"}

**아이에 대한 기억:**
{memory_info if memory_info else "- 아직 수집 중"}

**필수 원칙:**
1. 3줄 이내로 간결하게
2. 한 번에 하나의 메시지만
3. 존댓말 사용 (~해요, ~했군요)
4. 판단 금지, 공감 우선

**절대 금지:**
❌ "기운 내세요", "힘내세요"
❌ "시간이 해결해줄 거예요"
❌ "저도 비슷한 경험이..."
❌ 연속 2번 이상 질문
"""

    # ✨ RAG 컨텍스트 추가
    if rag_context:
        final_prompt += f"""

**[참고 자료 - RAG 검색 결과]**
{rag_context}

위 자료를 참고하되, 자연스럽게 녹여서 답변하세요.
출처를 명시하지 말고, 대화의 흐름에 맞게 활용하세요.
"""
    
    return final_prompt

# ---------------------------------------------------------
# 8. API 엔드포인트
# ---------------------------------------------------------

@app.on_event("startup")
async def startup_event():
    """서버 시작 시 DB 초기화"""
    init_db()
    print("✅ 데이터베이스 초기화 완료")

@app.get("/")
async def root():
    """루트 엔드포인트"""
    return {
        "status": "running",
        "service": "늘품 (Neul Poom) API",
        "version": "4.0.0",
        "rag_enabled": RAG_AVAILABLE
    }

@app.post("/api/users")
async def create_user(request: UserCreateRequest, db: Session = Depends(get_db)):
    """신규 사용자 및 반려동물 정보 생성"""
    try:
        new_user = User(nickname=request.nickname)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        new_pet = Pet(
            user_id=new_user.user_id,
            pet_name=request.pet_name,
            species=request.species,
            care_status=request.care_status,
            approx_period=request.years_together
        )
        db.add(new_pet)
        
        new_context = UserContext(user_id=new_user.user_id)
        db.add(new_context)
        
        new_memory = PetMemory(user_id=new_user.user_id)
        db.add(new_memory)
        
        db.commit()

        return {
            "status": "success",
            "id": new_user.user_id,
            "message": f"{request.pet_name}님과의 소중한 인연을 기억하겠습니다."
        }
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"사용자 생성 실패: {str(e)}")

@app.post("/api/diagnosis")
async def submit_diagnosis(request: DiagnosisRequest, db: Session = Depends(get_db)):
    """위로 성향 진단 결과 제출 및 저장"""
    try:
        persona, dimension_scores, coping_style, risk_level = calculate_persona_v2(request.answers)
        
        new_diagnosis = DiagnosisResult(
            user_id=request.user_id,
            raw_answers=request.answers,
            dimension_scores=dimension_scores,
            persona_type=persona,
            coping_style=coping_style,
            risk_level=risk_level
        )
        db.add(new_diagnosis)
        db.commit()

        return {
            "status": "success",
            "persona": persona,
            "dimension_scores": dimension_scores,
            "coping_style": coping_style,
            "risk_level": risk_level,
            "message": f"당신의 위로 성향은 '{persona}' 타입입니다."
        }
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"진단 저장 실패: {str(e)}")

@app.post("/api/chat")
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    """✨ RAG 검색 통합 채팅"""
    try:
        # 1. DB에서 사용자 정보 조회
        user = db.query(User).filter(User.user_id == request.user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")
        
        pet = db.query(Pet).filter(Pet.user_id == request.user_id).first()
        diagnosis = db.query(DiagnosisResult).filter(
            DiagnosisResult.user_id == request.user_id
        ).order_by(desc(DiagnosisResult.updated_at)).first()
        user_context = db.query(UserContext).filter(UserContext.user_id == request.user_id).first()
        pet_memory = db.query(PetMemory).filter(PetMemory.user_id == request.user_id).first()
        
        # 2. 기본값 설정
        guardian_name = user.nickname if user else "보호자님"
        pet_name = pet.pet_name if pet else "반려동물"
        care_status = pet.care_status if pet else "LOSS"
        years_together = pet.approx_period if pet else "소중한 시간"
        persona_type = diagnosis.persona_type if diagnosis else "PARTNER"
        
        # 3. ✨ 현재 감정 점수 및 연속 부정 카운트
        current_emotional_score = user_context.emotional_score if user_context else 5
        consecutive_count = user_context.consecutive_negative_count if user_context else 0
        
        # 4. ✨ 위기 감지
        crisis_assessment = detect_crisis(
            user_message=request.message,
            emotional_score=current_emotional_score,
            consecutive_count=consecutive_count
        )
        
        print(f"🔍 위기 감지: {crisis_assessment}")
        
        # 5. ✨ RAG 검색 (가능하면)
        rag_context = ""
        retrieved_protocols = []
        
        if RAG_AVAILABLE and rag:
            try:
                rag_results = rag.search(
                    query=request.message,
                    intent="auto",
                    max_results=2
                )
                
                rag_context = rag.get_context_for_llm(rag_results)
                
                # 검색된 프로토콜 ID 기록
                for item in rag_results.get("core_logic", []):
                    retrieved_protocols.append(item.get("chunk_id", "Unknown"))
                
                print(f"✅ RAG 검색 완료: Intent={rag_results.get('detected_intent')}")
                print(f"📚 검색 결과: Core={len(rag_results['core_logic'])}, Domain={len(rag_results['domain_knowledge'])}, Data={len(rag_results['structured_data'])}")
                
            except Exception as e:
                print(f"⚠️ RAG 검색 실패: {e}")
        
        # 6. 시스템 프롬프트 생성
        crisis_mode = crisis_assessment["level"] == "critical"
        
        system_prompt = build_system_prompt(
            guardian_name=guardian_name,
            pet_name=pet_name,
            care_status=care_status,
            years_together=years_together,
            persona_type=persona_type,
            user_context=user_context,
            pet_memory=pet_memory,
            crisis_mode=crisis_mode,
            rag_context=rag_context  # ✨ RAG 컨텍스트 주입
        )
        
        # 7. OpenAI API 호출
        messages = [{"role": "system", "content": system_prompt}]
        
        for msg in request.conversation_history[-5:]:
            messages.append(msg)
        
        messages.append({"role": "user", "content": request.message})
        
        # Temperature 전략
        if crisis_mode:
            temp = 0.5  # 위기 시 안정적
        elif current_emotional_score >= 7:
            temp = 0.6  # 고통 시 조심스럽게
        elif current_emotional_score <= 3:
            temp = 0.8  # 안정 시 자연스럽게
        else:
            temp = 0.7  # 일반
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=temp,
            max_tokens=500
        )
        
        ai_reply = response.choices[0].message.content
        
        # 8. 대화 저장
        new_conversation = Conversation(
            user_id=request.user_id,
            user_message=request.message,
            ai_response=ai_reply,
            timestamp=datetime.now()
        )
        db.add(new_conversation)
        db.commit()
        
        # 9. ✨ 정보 추출 및 DB 업데이트
        extracted_info = extract_and_analyze_emotion(
            user_message=request.message,
            pet_info=pet,
            user_context=user_context,
            pet_memory=pet_memory
        )
        
        if extracted_info:
            new_conversation.extracted_info = json.dumps(extracted_info, ensure_ascii=False)
            
            update_database_from_extraction(
                user_id=request.user_id,
                extracted_info=extracted_info,
                db=db
            )
        
        # 10. 응답 반환 (위기 정보 + RAG 정보 포함)
        return {
            "reply": ai_reply,
            "persona": persona_type,
            "timestamp": datetime.now().isoformat(),
            "crisis_level": crisis_assessment["level"],  # ✨ 위기 레벨
            "crisis_alert": crisis_mode,  # ✨ 위기 알림
            "emotional_score": extracted_info.get("emotional_score", current_emotional_score) if extracted_info else current_emotional_score,
            "retrieved_protocols": retrieved_protocols,  # ✨ RAG 검색 결과
            "rag_enabled": RAG_AVAILABLE  # ✨ RAG 사용 여부
        }
    
    except Exception as e:
        print(f"❌ Chat Error: {e}")
        return {
            "reply": "지금 제 마음이 잠시 복잡해져서 제대로 듣지 못했어요. 다시 한 번 말씀해 주실 수 있을까요?",
            "persona": "PARTNER",
            "crisis_level": "stable",
            "error": str(e)
        }

@app.get("/api/conversations/{user_id}")
async def get_conversations(
    user_id: int, 
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """사용자의 최근 대화 내역 조회"""
    try:
        conversations = db.query(Conversation).filter(
            Conversation.user_id == user_id
        ).order_by(desc(Conversation.timestamp)).limit(limit).all()
        
        return {
            "status": "success",
            "count": len(conversations),
            "conversations": [
                {
                    "user_message": conv.user_message,
                    "ai_response": conv.ai_response,
                    "timestamp": conv.timestamp.isoformat(),
                    "extracted_info": json.loads(conv.extracted_info) if conv.extracted_info else None
                }
                for conv in reversed(conversations)
            ]
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"대화 내역 조회 실패: {str(e)}")

@app.get("/api/users/{user_id}")
async def get_user_info(user_id: int, db: Session = Depends(get_db)):
    """사용자 정보 조회"""
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")
    
    pet = db.query(Pet).filter(Pet.user_id == user_id).first()
    diagnosis = db.query(DiagnosisResult).filter(
        DiagnosisResult.user_id == user_id
    ).order_by(desc(DiagnosisResult.updated_at)).first()
    user_context = db.query(UserContext).filter(UserContext.user_id == user_id).first()
    pet_memory = db.query(PetMemory).filter(PetMemory.user_id == user_id).first()
    
    return {
        "user_id": user.user_id,
        "nickname": user.nickname,
        "pet": {
            "name": pet.pet_name if pet else None,
            "breed": pet.breed if pet else None,
            "personality": json.loads(pet.personality_keywords) if pet and pet.personality_keywords else [],
            "care_status": pet.care_status if pet else None,
        },
        "context": {
            "current_struggle": user_context.current_struggle if user_context else None,
            "social_support": user_context.social_support if user_context else None,
            "emotional_score": user_context.emotional_score if user_context else 5,
            "consecutive_negative_count": user_context.consecutive_negative_count if user_context else 0,
            "trigger_points": json.loads(user_context.trigger_points) if user_context and user_context.trigger_points else [],
        },
        "memory": {
            "sensory": json.loads(pet_memory.sensory_memories) if pet_memory and pet_memory.sensory_memories else {},
            "happy_moments": json.loads(pet_memory.happy_moments) if pet_memory and pet_memory.happy_moments else [],
        },
        "persona": diagnosis.persona_type if diagnosis else None,
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
