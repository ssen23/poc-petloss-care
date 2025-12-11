"""
데이터베이스 모델 정의
실제 프로덕션 환경에서는 PostgreSQL 등 사용
"""

from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


class UserModel(BaseModel):
    """사용자 모델"""
    id: str
    pet_name: str
    years_together: str
    user_type: str  # 'F' or 'T'
    created_at: datetime
    updated_at: Optional[datetime] = None


class ConversationModel(BaseModel):
    """대화 모델"""
    id: str
    user_id: str
    timestamp: datetime
    user_message: str
    ai_message: str
    user_type: str


class TestResultModel(BaseModel):
    """테스트 결과 모델"""
    id: str
    test_id: str
    result_type: str
    answers: List[int]
    created_at: datetime
    user_id: Optional[str] = None


# 향후 SQLAlchemy 또는 MongoDB 연동 시 사용할 모델 예시

"""
# SQLAlchemy 예시
from sqlalchemy import Column, String, DateTime, JSON, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True)
    pet_name = Column(String, nullable=False)
    years_together = Column(String, nullable=False)
    user_type = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow)
    
    conversations = relationship("Conversation", back_populates="user")


class Conversation(Base):
    __tablename__ = "conversations"
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    user_message = Column(String, nullable=False)
    ai_message = Column(String, nullable=False)
    user_type = Column(String, nullable=False)
    
    user = relationship("User", back_populates="conversations")


class TestResult(Base):
    __tablename__ = "test_results"
    
    id = Column(String, primary_key=True)
    test_id = Column(String, nullable=False)
    result_type = Column(String, nullable=False)
    answers = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
"""
