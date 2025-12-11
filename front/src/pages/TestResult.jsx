import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StarryBackground from '../components/StarryBackground';

function TestResult() {
  const navigate = useNavigate();

  return (
    <div className="space-bg">
      <StarryBackground />
      
      <div className="min-h-screen p-6 relative z-10">
        <div className="max-w-2xl mx-auto pt-12">
          {/* 결과 카드 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="card-storybook text-center mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-8xl mb-6"
            >
              🐱
            </motion.div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4 handwriting">
              당신은 우아한 고양이형!
            </h1>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              독립적이고 자유로우며,<br />
              자신만의 공간과 시간을 소중히 여기는 당신.<br />
              고양이처럼 우아하면서도 애정이 넘쳐요!
            </p>

            {/* 특성 태그 */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['독립적', '우아함', '신중함', '관찰력'].map((trait, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                >
                  #{trait}
                </motion.span>
              ))}
            </div>

            {/* 공유 버튼 */}
            <div className="grid grid-cols-2 gap-3">
              <button className="btn-storybook" style={{
                background: 'linear-gradient(135deg, #E1306C 0%, #FD1D1D 100%)'
              }}>
                Instagram 공유
              </button>
              <button className="btn-storybook" style={{
                background: 'linear-gradient(135deg, #FFE812 0%, #FFC800 100%)',
                color: '#3C1E1E'
              }}>
                KakaoTalk 공유
              </button>
            </div>
          </motion.div>

          {/* 페토 CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="card-storybook mb-6"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">💜</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                혼자 힘든 시간을 보내고 있나요?
              </h3>
              <p className="text-gray-600 mb-4">
                페토가 당신의 이야기를 들어드릴게요
              </p>
              <button
                onClick={() => navigate('/feto-intro')}
                className="btn-storybook w-full"
              >
                페토와 대화하기 →
              </button>
            </div>
          </motion.div>

          {/* 다른 테스트 */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => navigate('/test-intro')}
            className="text-white opacity-70 hover:opacity-100 transition-opacity mx-auto block"
          >
            다른 테스트 해보기 →
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default TestResult;
