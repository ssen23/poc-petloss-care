import React, { useState, useEffect, useRef } from 'react';
import { Heart, Send, Sparkles, FileText, Home, Phone, AlertCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class NeulPoomAPI {
  async sendChatMessage(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('API 호출 실패');
      return await response.json();
    } catch (error) {
      console.error('API 호출 에러:', error);
      throw error;
    }
  }

  async getConversations(userId, limit = 20) {
    try {
      const response = await fetch(`${API_BASE_URL}/conversations/${userId}?limit=${limit}`);
      if (!response.ok) throw new Error('대화 내역 조회 실패');
      return await response.json();
    } catch (error) {
      console.error('대화 내역 조회 에러:', error);
      throw error;
    }
  }
}

const neulpoomAPI = new NeulPoomAPI();

function NeulPoomScreen3({ petInfo, userId, diagnosisResult, onViewResult, onNextJourney }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [personaType, setPersonaType] = useState(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (diagnosisResult) {
      setPersonaType(diagnosisResult.persona);
    }
    initializeChat();
  }, [userId, diagnosisResult]);

  const initializeChat = async () => {
    if (!userId) {
      console.error('❌ userId가 없습니다.');
      return;
    }

    try {
      const historyResponse = await neulpoomAPI.getConversations(userId, 10);
      
      if (historyResponse.conversations && historyResponse.conversations.length > 0) {
        console.log('✅ 재방문 사용자 - 이전 대화 불러오기');
        setIsFirstVisit(false);
        
        const previousMessages = historyResponse.conversations.map((conv, idx) => [
          { sender: 'user', text: conv.user_message },
          { sender: 'ai', text: conv.ai_response }
        ]).flat();
        
        setMessages(previousMessages);
        
        if (diagnosisResult && diagnosisResult.persona) {
          setPersonaType(diagnosisResult.persona);
        }
        
      } else {
        console.log('✅ 첫 방문 사용자 - 초기 인사');
        setIsFirstVisit(true);
        
        const response = await neulpoomAPI.sendChatMessage({
          user_id: userId,
          message: "안녕하세요",
          conversation_history: []
        });

        setMessages([{ 
          sender: 'ai', 
          text: response.reply,
          crisis_level: response.crisis_level,
          crisis_alert: response.crisis_alert,
          emotional_score: response.emotional_score
        }]);
        
        if (response.persona) {
          setPersonaType(response.persona);
        }
      }
      
    } catch (error) {
      console.error('❌ 초기화 실패:', error);
      setMessages([{ 
        sender: 'ai', 
        text: '안녕하세요. 늘품입니다. 무엇을 도와드릴까요?'
      }]);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    const newUserMessage = { sender: 'user', text: userMessage };
    setMessages(prev => [...prev, newUserMessage]);

    setIsLoading(true);
    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await neulpoomAPI.sendChatMessage({
        user_id: userId,
        message: userMessage,
        conversation_history: conversationHistory
      });

      const aiMessage = { 
        sender: 'ai', 
        text: response.reply,
        crisis_level: response.crisis_level || 'stable',
        crisis_alert: response.crisis_alert || false,
        emotional_score: response.emotional_score
      };

      setMessages(prev => [...prev, aiMessage]);
      
      if (response.persona) {
        setPersonaType(response.persona);
      }
      
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: '죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해 주세요.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getPersonaName = () => {
    const personaNames = {
      'LISTENER': '정서 중심 경청자',
      'MENTOR': '해결 중심 멘토',
      'PARTNER': '협력적 파트너',
      'OBSERVER': '수용적 관찰자',
      'GUARDIAN': '보호적 안내자'
    };
    return personaNames[personaType] || '협력적 파트너';
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">늘품과의 대화</h1>
              {personaType && (
                <p className="text-xs text-gray-600">{getPersonaName()}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onViewResult}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 flex items-center gap-2"
              title="위로성향 진단 결과지"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">위로성향 진단 결과지</span>
            </button>
            <button
              onClick={onNextJourney}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium text-gray-700"
            >
              다음 치유 여정
            </button>
            <button
              onClick={() => navigate('/neulpoom')}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 flex items-center gap-2"
              title="늘품 홈페이지"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">늘품</span>
            </button>
          </div>
        </div>
      </header>

      {/* 채팅 영역 */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          {/* 재방문 환영 메시지 */}
          {!isFirstVisit && messages.length > 0 && (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 shadow-sm fade-in text-center">
              <p className="text-sm text-teal-700">
                💙 다시 찾아주셔서 감사합니다. 이전 대화를 불러왔습니다.
              </p>
            </div>
          )}

          {/* 진단 결과 안내 (첫 방문자만) */}
          {isFirstVisit && diagnosisResult && messages.length === 1 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm fade-in">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2">당신의 위로 성향 분석 완료</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    당신은 <strong className="text-teal-600">{getPersonaName()}</strong> 타입입니다.
                  </p>
                  {diagnosisResult.dimension_scores && (
                    <div className="text-xs text-gray-500 grid grid-cols-2 gap-2 mt-2">
                      <div>문제해결: {diagnosisResult.dimension_scores.problem_solving}/4</div>
                      <div>정서지지: {diagnosisResult.dimension_scores.emotional_support}/4</div>
                      <div>인지유연성: {diagnosisResult.dimension_scores.cognitive_flexibility}/4</div>
                      <div>계획지향: {diagnosisResult.dimension_scores.planning_orientation}/4</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ✨ 메시지 목록 - 위기 대응 UI 통합 */}
          {messages.map((msg, idx) => (
            <div key={idx}>
              {/* 기존 메시지 */}
              <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} fade-in`}>
                <div className={`max-w-[75%] rounded-2xl px-5 py-4 shadow-sm ${msg.sender === 'user' ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white' : 'bg-white text-gray-900 border border-gray-200'}`}>
                  <p className="leading-relaxed whitespace-pre-wrap text-sm">{msg.text}</p>
                </div>
              </div>

              {/* ✨ 위기 알림 UI - AI 메시지 다음에만 표시 */}
              {msg.sender === 'ai' && msg.crisis_level === 'critical' && (
                <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-6 my-4 fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                      <AlertCircle className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-red-900">
                      긴급 도움이 필요하신가요?
                    </h3>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <p className="text-gray-800 font-medium">
                      혼자 견디지 마세요. 전문가의 도움을 받으시면 분명히 나아질 수 있어요.
                    </p>
                    
                    <div className="bg-white rounded-xl p-4 space-y-3">
                      <p className="font-bold text-gray-900">📞 24시간 위기상담</p>
                      
                      <a 
                        href="tel:1393" 
                        className="flex items-center justify-between bg-red-500 hover:bg-red-600 text-white rounded-lg p-4 transition-all cursor-pointer"
                      >
                        <div>
                          <p className="font-bold text-lg">자살예방상담</p>
                          <p className="text-sm opacity-90">24시간 무료 상담</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-5 h-5" />
                          <span className="text-2xl font-bold">1393</span>
                        </div>
                      </a>
                      
                      <a 
                        href="tel:1577-0199" 
                        className="flex items-center justify-between bg-red-500 hover:bg-red-600 text-white rounded-lg p-4 transition-all cursor-pointer"
                      >
                        <div>
                          <p className="font-bold text-lg">정신건강위기상담</p>
                          <p className="text-sm opacity-90">24시간 전문상담</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-5 h-5" />
                          <span className="text-2xl font-bold">1577-0199</span>
                        </div>
                      </a>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-3">
                      지금 당장 전화하기 어려우시면, 제가 계속 함께 있을게요. 천천히 말씀해 주세요.
                    </p>
                  </div>
                </div>
              )}

              {msg.sender === 'ai' && msg.crisis_level === 'warning' && (
                <div className="bg-yellow-50 border border-yellow-400 rounded-2xl p-5 my-4 fade-in">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-yellow-800" />
                    </div>
                    <h4 className="font-bold text-gray-900">
                      요즘 계속 힘드신 것 같아요
                    </h4>
                  </div>
                  <p className="text-gray-700 mb-3">
                    전문 상담사와 이야기해보시는 건 어떨까요? 혼자 견디지 않으셔도 돼요.
                  </p>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      📞 도움을 받을 수 있는 곳
                    </p>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div className="flex items-center justify-between py-1">
                        <span>자살예방상담</span>
                        <a href="tel:1393" className="text-yellow-700 font-bold hover:underline">1393</a>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span>정신건강위기</span>
                        <a href="tel:1577-0199" className="text-yellow-700 font-bold hover:underline">1577-0199</a>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span>한국생명의전화</span>
                        <a href="tel:1588-9191" className="text-yellow-700 font-bold hover:underline">1588-9191</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 감정 점수 표시 (디버깅용, 선택사항) */}
              {msg.sender === 'ai' && msg.emotional_score && msg.emotional_score >= 7 && (
                <div className="text-xs text-gray-500 mt-2 flex items-center gap-2 justify-start">
                  <span>감정 상태: {msg.emotional_score}/10</span>
                  {msg.emotional_score >= 9 && <span className="text-red-500">🚨</span>}
                  {msg.emotional_score >= 7 && msg.emotional_score < 9 && <span className="text-yellow-500">⚠️</span>}
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start fade-in">
              <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 입력 영역 */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`${petInfo.petName}에 대한 생각을 자유롭게 나눠주세요...`}
              className="flex-1 px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all bg-white"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-6 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl font-medium hover:from-teal-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NeulPoomScreen3;
