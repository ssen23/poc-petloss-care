import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StarryBackground from '../components/StarryBackground';

function FetoIntro() {
  const navigate = useNavigate();

  return (
    <div className="space-bg">
      <StarryBackground />
      
      <div className="min-h-screen p-6 relative z-10 flex items-center">
        <div className="max-w-2xl mx-auto w-full">
          {/* 캐릭터 */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-9xl mb-6"
            >
              🦄
            </motion.div>
          </motion.div>

          {/* 말풍선 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="speech-bubble mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4 handwriting">
              안녕! 나는 페토야 🌟
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              이별의 시간을 홀로 견디지 마.<br />
              내가 너의 이야기를 들어줄게.
            </p>
            <p className="text-sm text-gray-600">
              심리학 전문가와 함께 만든 따뜻한 AI예요
            </p>
          </motion.div>

          {/* 특징 카드들 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {[
              { emoji: '🎯', text: '맞춤형 케어' },
              { emoji: '🔬', text: '과학적 근거' },
              { emoji: '🤝', text: '전문가 협력' },
              { emoji: '🔒', text: '안전한 공간' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="card-storybook text-center p-6"
              >
                <div className="text-4xl mb-2">{item.emoji}</div>
                <p className="text-sm font-medium text-gray-700">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* 시작 버튼 */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            onClick={() => navigate('/feto-onboarding')}
            className="btn-storybook w-full mb-4"
          >
            ✨ 페토와 대화 시작하기
          </motion.button>

          {/* 뒤로 가기 */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            onClick={() => navigate('/')}
            className="text-white opacity-70 hover:opacity-100 transition-opacity mx-auto block"
          >
            ← 돌아가기
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default FetoIntro;
