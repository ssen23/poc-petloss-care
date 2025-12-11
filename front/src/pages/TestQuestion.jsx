import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StarryBackground from '../components/StarryBackground';

function TestQuestion() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const progress = 40; // 데모용

  const question = "주말에 주로 무엇을 하나요?";
  const options = [
    { emoji: '🏠', text: '집에서 조용히 쉰다' },
    { emoji: '🏃', text: '밖에서 활동적으로 논다' },
    { emoji: '👥', text: '친구들과 모임을 갖는다' },
    { emoji: '🧘', text: '혼자만의 시간을 즐긴다' }
  ];

  return (
    <div className="space-bg">
      <StarryBackground />
      
      <div className="min-h-screen p-6 relative z-10">
        <div className="max-w-2xl mx-auto pt-12">
          {/* 진행률 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-2 text-white">
              <span className="text-sm">질문 2 / 5</span>
              <span className="text-sm font-bold">{progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </motion.div>

          {/* 질문 카드 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-storybook mb-6"
          >
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🤔</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {question}
              </h2>
              <p className="text-gray-600">가장 가까운 답을 골라주세요</p>
            </div>

            {/* 선택지 */}
            <div className="space-y-3">
              {options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelected(index)}
                  className={`option-card ${selected === index ? 'selected' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{option.emoji}</span>
                    <span className="text-lg text-gray-800">{option.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 다음 버튼 */}
          {selected !== null && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => navigate('/test-result')}
              className="btn-storybook w-full"
            >
              다음 질문 →
            </motion.button>
          )}

          {/* 뒤로 가기 */}
          <button
            onClick={() => navigate('/test-intro')}
            className="mt-6 text-white opacity-70 hover:opacity-100 transition-opacity mx-auto block"
          >
            ← 이전
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestQuestion;
