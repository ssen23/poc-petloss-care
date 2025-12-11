import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Shield, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

function NeulPoomLanding() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: '따뜻한 공감',
      description: '당신의 마음을 이해하고\n함께 위로합니다',
      icon: '💙'
    },
    {
      title: '전문적 케어',
      description: '심리학 기반의\n과학적 접근',
      icon: '🌱'
    },
    {
      title: '안전한 공간',
      description: '당신만의 프라이빗한\n치유 시간',
      icon: '🕊️'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ✨ 고정 네비게이션 바 */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-white shadow-sm border-gray-200' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* 로고 - 클릭하면 홈으로 */}
            <button 
              onClick={() => navigate('/neulpoom')}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                <Heart className="w-5 h-5 text-white" strokeWidth={1.5} fill="white" />
              </div>
              <span className="text-xl font-medium text-gray-900">늘품</span>
            </button>

            {/* 메뉴 */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => navigate('/trust')}
                className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
              >
                진단 신뢰성
              </button>
              <button
                onClick={() => navigate('/service')}
                className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
              >
                서비스
              </button>
              <button
                onClick={() => navigate('/partners')}
                className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
              >
                연계 서비스
              </button>
              <button
                onClick={() => navigate('/reviews')}
                className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
              >
                후기
              </button>
            </div>

            {/* CTA 버튼 */}
            <button
              onClick={() => navigate('/neulpoom/onboarding')}
              className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-full font-medium text-sm hover:from-teal-600 hover:to-emerald-700 transition-all shadow-sm hover:shadow-md"
            >
              시작하기
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center fade-in">
            {/* 로고 - 늘품 */}
            <div className="mb-12">
              <div className="inline-flex flex-col items-center">
                <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-md">
                  <Heart className="w-10 h-10 text-white" strokeWidth={1.5} fill="white" />
                </div>
                <h1 className="text-3xl font-light tracking-wider text-gray-900 mb-2">
                  늘품
                </h1>
                <p className="text-sm text-gray-500 tracking-wide">
                  Neul Poom
                </p>
              </div>
            </div>

            {/* 메인 헤드라인 */}
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-relaxed">
              이별의 시간을<br />
              <span className="font-normal">홀로 견디지 마세요</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light">
              당신의 마음을 안아주는, 늘품
            </p>

            {/* CTA 버튼 */}
            <button
              onClick={() => navigate('/neulpoom/onboarding')}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-full font-medium text-lg hover:from-teal-600 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              <span>치유의 여정 시작하기</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="mt-6 text-sm text-gray-500">
              3분이면 충분합니다 · 무료로 시작하세요
            </p>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-sm text-gray-500 tracking-widest uppercase mb-4">About</p>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              늘품은
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light">
              '품(안아줌)'의 순우리말로,<br />
              보호자의 마음이 앞으로 더 나은 방향으로<br />
              치유될 수 있도록 돕는다는 긍정적 메시지를 담았습니다
            </p>
          </div>

          {/* 특징 카드 */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-sm text-gray-500 tracking-widest uppercase mb-4">How it Works</p>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              어떻게 도와드릴까요
            </h2>
          </div>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-3xl font-light shadow-lg">
                01
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-medium text-gray-900 mb-3">
                  당신을 이해합니다
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  간단한 질문을 통해 당신이 선호하는 위로의 방식을 파악합니다.<br />
                  모든 과정은 당신의 속도에 맞춰 진행됩니다.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-lime-600 flex items-center justify-center text-white text-3xl font-light shadow-lg">
                02
              </div>
              <div className="flex-1 text-center md:text-right">
                <h3 className="text-2xl font-medium text-gray-900 mb-3">
                  맞춤형 대화
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  당신의 성향에 맞춘 AI가 함께 대화합니다.<br />
                  판단하지 않는 안전한 공간에서 마음을 나누세요.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-lime-500 to-teal-600 flex items-center justify-center text-white text-3xl font-light shadow-lg">
                03
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-medium text-gray-900 mb-3">
                  치유의 여정
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  전문 파트너와 함께 다음 단계를 준비합니다.<br />
                  당신은 혼자가 아닙니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-12 md:p-16 shadow-sm border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                신뢰할 수 있는 케어
              </h2>
              <p className="text-lg text-gray-600 font-light">
                늘품은 전문성과 따뜻함을 모두 갖춘 서비스입니다
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <CheckCircle className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                <p className="text-sm text-gray-700 font-medium">심리학 기반</p>
              </div>
              <div className="text-center p-6">
                <CheckCircle className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                <p className="text-sm text-gray-700 font-medium">전문가 검증</p>
              </div>
              <div className="text-center p-6">
                <CheckCircle className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                <p className="text-sm text-gray-700 font-medium">24/7 지원</p>
              </div>
              <div className="text-center p-6">
                <CheckCircle className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                <p className="text-sm text-gray-700 font-medium">개인정보 보호</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-light">
            당신은 혼자가 아닙니다.<br />
            늘품이 함께합니다.
          </p>
          <button
            onClick={() => navigate('/neulpoom/onboarding')}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-full font-medium text-lg hover:bg-gray-100 transform hover:scale-105 transition-all shadow-xl"
          >
            <Heart className="w-5 h-5" />
            <span>무료로 시작하기</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-950 text-gray-400">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm mb-2">© 2025 늘품 (Neul Poom). All rights reserved.</p>
          <p className="text-xs text-gray-500">반려동물과 함께하는 모든 순간을 소중히</p>
        </div>
      </footer>
    </div>
  );
}

export default NeulPoomLanding;
