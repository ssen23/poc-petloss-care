import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StarryBackground from '../components/StarryBackground';
import { Send } from 'lucide-react';

function FetoChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '안녕! 오늘 기분은 어때? 편하게 이야기해줘 💜'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // 사용자 메시지 추가
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');

    // 데모 AI 응답 (1초 후)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: '그렇구나... 충분히 슬플 수 있어. 그 마음을 표현하는 건 정말 용감한 일이야. 천천히 이야기해줘도 돼 🌟'
      }]);
    }, 1000);
  };

  return (
    <div className="space-bg">
      <StarryBackground />
      
      <div className="min-h-screen p-6 relative z-10 flex flex-col">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-storybook mb-4 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="text-4xl">🦄</div>
            <div>
              <h3 className="font-bold text-gray-800">페토</h3>
              <p className="text-sm text-gray-600">감정 공감 모드</p>
            </div>
          </div>
        </motion.div>

        {/* 채팅 영역 */}
        <div className="flex-1 card-storybook mb-4 p-6 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`message-bubble ${msg.sender === 'user' ? 'message-user' : 'message-ai'}`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 입력 영역 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-storybook p-4"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="메시지를 입력하세요..."
              className="input-storybook flex-1"
            />
            <button
              onClick={handleSend}
              className="btn-storybook px-6"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* 퀵 액션 */}
          <div className="flex gap-2 mt-3">
            {['오늘의 기분', '기억 회상하기', '감정 일기'].map((action, index) => (
              <button
                key={index}
                onClick={() => setInput(action)}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 뒤로 가기 */}
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-white opacity-70 hover:opacity-100 transition-opacity text-center"
        >
          ← 나가기
        </button>
      </div>
    </div>
  );
}

export default FetoChat;
