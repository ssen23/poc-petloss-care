import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StarryBackground from '../components/StarryBackground';

function FetoOnboarding() {
  const navigate = useNavigate();
  const [petName, setPetName] = useState('');
  const [years, setYears] = useState('');

  const handleSubmit = () => {
    if (petName && years) {
      navigate('/feto-chat');
    }
  };

  return (
    <div className="space-bg">
      <StarryBackground />
      
      <div className="min-h-screen p-6 relative z-10 flex items-center">
        <div className="max-w-xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="text-7xl mb-4">🦄</div>
            <h1 className="text-3xl font-bold text-white mb-2 handwriting">
              소중한 친구 이야기를 들려줄래?
            </h1>
            <p className="text-white opacity-80">
              함께했던 시간을 기억해줄게
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="card-storybook"
          >
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-3">
                🐾 친구의 이름은?
              </label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="예: 초코"
                className="input-storybook"
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                ⏰ 함께한 시간은?
              </label>
              <input
                type="text"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="예: 5년"
                className="input-storybook"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!petName || !years}
              className={`btn-storybook w-full ${!petName || !years ? 'opacity-50' : ''}`}
            >
              다음 →
            </button>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => navigate('/feto-intro')}
            className="mt-6 text-white opacity-70 hover:opacity-100 transition-opacity mx-auto block"
          >
            ← 이전
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default FetoOnboarding;
