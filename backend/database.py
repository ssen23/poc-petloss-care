from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey, Text, JSON, Float, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from datetime import datetime
import enum

# 1. SQLite DB 파일 생성 설정
DATABASE_URL = "sqlite:///./neulpoom_care.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 2. CareStatus 상태값 정의
class CareStatus(enum.Enum):
    LOSS = "LOSS"               # 사별 (펫로스)
    ANTICIPATORY = "ANTICIPATORY" # 예기 애도 (노령, 위독, 이별 준비)
    CARE = "CARE"               # 일반 양육/투병 중

# ---------------------------------------------------------
# 3. 테이블 정의
# ---------------------------------------------------------

# ① Users 테이블
class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    nickname = Column(String(50), nullable=False, default="보호자님")
    created_at = Column(Date, default=datetime.now)

    # 관계 설정
    pets = relationship("Pet", back_populates="owner", cascade="all, delete-orphan")
    diagnoses = relationship("DiagnosisResult", back_populates="user", cascade="all, delete-orphan")
    context = relationship("UserContext", back_populates="user", uselist=False, cascade="all, delete-orphan")
    memories = relationship("PetMemory", back_populates="user", cascade="all, delete-orphan")
    conversations = relationship("Conversation", back_populates="user", cascade="all, delete-orphan")

# ② Pets 테이블
class Pet(Base):
    __tablename__ = "pets"

    pet_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    
    pet_name = Column(String(50), nullable=False)
    species = Column(String(20), nullable=False, default="반려동물") # 강아지, 고양이
    breed = Column(String(50), nullable=True)    # 말티즈, 코숏 등
    
    # 상태 분류
    care_status = Column(String(20), nullable=False, default="LOSS") 
    
    # 날짜 정보
    birth_date = Column(Date, nullable=True)
    death_date = Column(Date, nullable=True)
    met_date = Column(Date, nullable=True)
    approx_period = Column(String(50), nullable=True) # "약 10년", "5년 3개월"
    
    # 성격/특성
    personality_keywords = Column(JSON, nullable=True) # ["겁쟁이", "식탐왕", "사교적"]
    
    owner = relationship("User", back_populates="pets")

# ③ Diagnosis_Results 테이블
class DiagnosisResult(Base):
    __tablename__ = "diagnosis_results"

    diagnosis_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    
    # 12문항 원점수 저장 (리스트 형태)
    raw_answers = Column(JSON, nullable=False)
    
    # 계산된 차원 점수 (6개 차원)
    dimension_scores = Column(JSON, nullable=False)
    
    # 최종 페르소나 타입
    persona_type = Column(String(20), nullable=False)
    
    # 부가 정보
    coping_style = Column(String(50), nullable=True)
    risk_level = Column(String(20), nullable=True)
    
    updated_at = Column(Date, default=datetime.now)

    user = relationship("User", back_populates="diagnoses")

# ④ User_Context 테이블 (✨ 수정됨)
class UserContext(Base):
    __tablename__ = "user_contexts"

    context_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    
    # 현재 심리 상태
    current_struggle = Column(Text, nullable=True)     # "자책감", "그리움", "일상 붕괴"
    social_support = Column(Text, nullable=True)       # "가족 지지 있음", "혼자 감당 중"
    
    # ✨ 변경: emotional_temperature → emotional_score (1~10점, 명확한 기준)
    emotional_score = Column(Integer, default=5)  # 1~3: 평온, 4~6: 슬픔, 7~8: 심각, 9~10: 위험
    
    # ✨ 추가: 연속 부정 카운트 (위기 감지용)
    consecutive_negative_count = Column(Integer, default=0)
    
    # ✨ 유지: 트리거 포인트 (구체적 예시로 수집 개선)
    trigger_points = Column(JSON, nullable=True)  # ["밥그릇 치울 때", "산책로 지날 때"]
    
    updated_at = Column(DateTime, default=datetime.now)

    user = relationship("User", back_populates="context")

# ⑤ Pet_Memory 테이블 (✨ 수정됨: nicknames 삭제)
class PetMemory(Base):
    __tablename__ = "pet_memories"

    memory_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    
    # 감각 기억
    sensory_memories = Column(JSON, nullable=True)
    # {
    #   "touch": "보드라운 털",
    #   "sound": "낑낑대는 소리",
    #   "smell": "발 꼬순내"
    # }
    
    # 행복했던 순간들
    happy_moments = Column(JSON, nullable=True)  # ["첫 산책", "눈 속에서 뛰놀기"]
    
    # ❌ 삭제: nicknames (불필요)
    
    created_at = Column(Date, default=datetime.now)

    user = relationship("User", back_populates="memories")

# ⑥ Conversations 테이블
class Conversation(Base):
    __tablename__ = "conversations"

    conversation_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    
    # 대화 내용
    user_message = Column(Text, nullable=False)
    ai_response = Column(Text, nullable=False)
    
    # 타임스탬프
    timestamp = Column(DateTime, default=datetime.now, nullable=False)
    
    # 추출된 정보 (선택적)
    extracted_info = Column(JSON, nullable=True)
    
    # 관계 설정
    user = relationship("User", back_populates="conversations")

# ---------------------------------------------------------
# 4. 테이블 생성 함수
# ---------------------------------------------------------

def init_db():
    """데이터베이스 초기화 및 테이블 생성"""
    Base.metadata.create_all(bind=engine)
    print("✅ SQLite 데이터베이스(neulpoom_care.db)와 테이블 생성이 완료되었습니다!")
    print("📊 생성된 테이블:")
    print("   - users (사용자 기본 정보)")
    print("   - pets (반려동물 상세 정보)")
    print("   - diagnosis_results (위로 성향 진단 결과)")
    print("   - user_contexts (심리 상태 맥락) ✨ emotional_score 추가")
    print("   - pet_memories (감성 데이터) ✨ nicknames 삭제")
    print("   - conversations (대화 내역)")

if __name__ == "__main__":
    init_db()
