import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Brain, Play } from 'lucide-react';

function Site1Landing() {
  const navigate = useNavigate();

  const tests = [
    {
      id: 'test1',
      title: '당신이 지금 키우고 싶은 반려동물은?',
      description: '당신의 라이프스타일에 맞는 반려동물 찾기',
      icon: '🐾',
      gradient: 'from-blue-400 to-cyan-400',
      path: '/test/test1'
    },
    {
      id: 'test2',
      title: '당신이 동물이라면 어떤 동물?',
      description: '당신의 성격을 동물에 비유해보세요',
      icon: '🦁',
      gradient: 'from-purple-400 to-pink-400',
      path: '/test/test2'
    },
    {
      id: 'test3',
      title: '당신이 원하는 위로는? 어떤 말이 힘이 되나요?',
      description: '당신에게 맞는 위로의 방식 찾기',
      icon: '💝',
      gradient: 'from-rose-400 to-orange-400',
      badge: '인기',
      path: '/test/test3'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-block p-4 mb-6">
            <Sparkles className="w-16 h-16 text-purple-500 mx-auto" />
          </div>
          <h1 className="heading-font text-5xl font-bold mb-4 text-gray-800 leading-tight">
            나의 심리 코드를 찾아줄,<br />
            반려 생활 진단 테스트
          </h1>
          <p className="text-gray-600 text-lg">
            재미있는 심리 테스트로 나를 알아가는 시간 ✨
          </p>
        </div>

        {/* 테스트 카드들 */}
        <div className="grid md:grid-cols-1 gap-6 mb-8">
          {tests.map((test, index) => (
            <div
              key={test.id}
              className="glass-effect rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(test.path)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-5xl">{test.icon}</span>
                    {test.badge && (
                      <span className="px-3 py-1 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-sm font-bold rounded-full">
                        {test.badge}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {test.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {test.description}
                  </p>
                  <div className="flex items-center gap-2 text-purple-600 font-semibold">
                    <Play className="w-5 h-5" />
                    <span>테스트 시작하기</span>
                  </div>
                </div>
                <div className={`hidden md:block w-24 h-24 rounded-2xl bg-gradient-to-br ${test.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
              </div>
            </div>
          ))}
        </div>

        {/* 하단 정보 */}
        <div className="text-center text-sm text-gray-500 fade-in mb-8">
          <p>💫 간단한 질문으로 나를 알아가는 시간</p>
          <p className="mt-2">✨ 친구들과 결과를 공유해보세요!</p>
        </div>

        {/* ✨ 늘품 링크 섹션 추가 */}
        <div className="mt-12 pt-8 border-t border-gray-200 fade-in">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-teal-600" fill="currentColor" />
              <p className="text-gray-600 font-medium">
                반려동물과의 이별이 힘드신가요?
              </p>
            </div>
            <button
              onClick={() => navigate('/neulpoom')}
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium hover:underline transition-all"
            >
              <span>늘품: 맞춤형 위로 성향 진단하기</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Site1Landing;
