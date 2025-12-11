import React from 'react';
import { Heart, ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function NeulPoomScreen4({ petInfo, onBack }) {
  const navigate = useNavigate();

  const partners = [
    {
      icon: '🕊️',
      title: '반려동물 추모 서비스',
      description: '전문적이고 따뜻한 반려동물 장례/추모 서비스',
      badges: ['전문 상담', '24시간 운영']
    },
    {
      icon: '🛡️',
      title: '펫 보험 특별 혜택',
      description: '새로운 가족을 위한 맞춤형 보험 상담',
      badges: ['무료 상담', '특별 할인']
    },
    {
      icon: '💚',
      title: '반려동물 심리 상담',
      description: '전문 수의사와 함께하는 반려동물 행동 분석',
      badges: ['전문가 매칭', '온라인 상담']
    }
  ];

  const handleGoToHome = () => {
    navigate('/neulpoom');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* 뒤로 가기 */}
        <button
          onClick={onBack}
          className="mb-8 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          대화로 돌아가기
        </button>

        {/* 파트너 섹션 */}
        <div className="fade-in">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl mb-6 shadow-md">
              <Heart className="w-8 h-8 text-white" fill="white" strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              나의 치유 여정, 다음 단계
            </h2>
            <p className="text-lg text-gray-600 font-light">
              신뢰할 수 있는 전문 파트너들이 함께합니다
            </p>
          </div>

          <div className="space-y-4">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-all cursor-pointer group border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 text-4xl">{partner.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {partner.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 font-light">
                      {partner.description}
                    </p>
                    <div className="flex gap-2">
                      {partner.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white text-gray-700 text-xs rounded-full font-medium border border-gray-200"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-sm text-gray-600 text-center font-light">
              이용자님의 치유를 응원하며, 신뢰할 수 있는 파트너사와 함께합니다
            </p>
          </div>
        </div>

        {/* 하단 CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={handleGoToHome}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 text-sm font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>늘품: 홈페이지에서 자세히 알아보기</span>
            <ArrowRight className="w-4 h-4" />
          </button>  
        </div>
      </div>
    </div>
  );
}

export default NeulPoomScreen4;
