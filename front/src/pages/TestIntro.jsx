import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StarryBackground from '../components/StarryBackground';
import { Sparkles, Heart, Stars } from 'lucide-react';

function TestIntro() {
  const navigate = useNavigate();

  const tests = [
    {
      emoji: '🐾',
      title: '반려동물 타입 찾기',
      desc: '나랑 잘 맞는 친구는?',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      emoji: '🦁',
      title: '동물로 보는 나',
      desc: '내가 동물이라면?',
      color: 'from-purple-400 to-pink-400'
    },
    {
      emoji: '💝',
      title: '위로 받는 방법',
      desc: '내게 맞는 위로는?',
      color: 'from-rose-400 to-orange-400',
      badge: '인기'
    }
  ];

  return (
    <div className="space-bg">
      <StarryBackground />
      
      <div className="min-h-screen p-6 relative z-10">
        <div className="max-w-2xl mx-auto pt-20">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="text-6xl mb-4 sparkle">✨</div>
            <h1 className="text-4xl font-bold text-white mb-4 handwriting">
              별똥별 심리 테스트
            </h1>
            <p className="text-white opacity-80 text-lg">
              재미있는 테스트로 나를 알아가요!
            </p>
          </motion.div>

          {/* 테스트 카드들 */}
          <div className="space-y-4">
            {tests.map((test, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                onClick={() => navigate('/test-question')}
                className="card-storybook cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{test.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-800">
                        {test.title}
                      </h3>
                      {test.badge && (
                        <span className="px-3 py-1 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-bold rounded-full">
                          {test.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{test.desc}</p>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 뒤로 가기 */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={() => navigate('/')}
            className="mt-8 text-white opacity-70 hover:opacity-100 transition-opacity mx-auto block"
          >
            ← 돌아가기
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default TestIntro;
