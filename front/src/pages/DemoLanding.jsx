import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StarryBackground from '../components/StarryBackground';

function DemoLanding() {
  const navigate = useNavigate();

  return (
    <div className="space-bg">
      <StarryBackground />
      
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
        {/* 말풍선 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="speech-bubble text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            너의 우주를 함께 탐험해보지 않을래?
          </h1>
          <p className="text-lg text-gray-600">
            꿈만에서 만나!
          </p>
        </motion.div>

        {/* 캐릭터 */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.3,
            type: "spring",
            stiffness: 200
          }}
          className="character mb-12"
        >
          🦄
        </motion.div>

        {/* 버튼들 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-4"
        >
          <button
            onClick={() => navigate('/test-intro')}
            className="btn-storybook"
          >
            ✨ 심리 테스트 시작하기
          </button>
          
          <button
            onClick={() => navigate('/feto-intro')}
            className="btn-storybook"
            style={{
              background: 'linear-gradient(135deg, #c084fc 0%, #7c3aed 100%)'
            }}
          >
            💜 페토와 대화하기
          </button>
        </motion.div>

        {/* 하단 텍스트 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-white text-center mt-12 text-sm opacity-70"
        >
          별들 사이에서 너의 이야기를 들려줘 ⭐
        </motion.p>
      </div>
    </div>
  );
}

export default DemoLanding;
