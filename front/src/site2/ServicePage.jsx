import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Clock, MessageSquare, Lock, Shield, Zap, Users, BarChart } from 'lucide-react';

function ServicePage() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 바 */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/neulpoom')} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                <Heart className="w-5 h-5 text-white" strokeWidth={1.5} fill="white" />
              </div>
              <span className="text-xl font-medium text-gray-900">늘품</span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => navigate('/trust')} className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">진단 신뢰성</button>
              <button onClick={() => navigate('/service')} className="text-sm font-medium text-teal-600 transition-colors">서비스</button>
              <button onClick={() => navigate('/partners')} className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">연계 서비스</button>
              <button onClick={() => navigate('/reviews')} className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">후기</button>
            </div>

            <button onClick={() => navigate('/neulpoom/onboarding')} className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-full font-medium text-sm hover:from-teal-600 hover:to-emerald-700 transition-all shadow-sm hover:shadow-md">
              시작하기
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-emerald-100 rounded-full">
            <span className="text-emerald-700 text-sm font-semibold">HOW IT WORKS</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            간단한 3단계로<br/>시작하는 치유
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            복잡한 가입 절차 없이, 3분이면 당신만을 위한<br/>
            맞춤형 AI 위로 서비스를 이용할 수 있습니다
          </p>
        </div>
      </section>

      {/* 3단계 프로세스 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-24">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block mb-6 px-4 py-2 bg-teal-100 rounded-full">
                  <span className="text-teal-700 text-sm font-semibold">STEP 1</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  무료 진단<br/>
                  <span className="text-teal-600">(3분 소요)</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  12개의 간단한 질문에 답하면, AI가 당신의 위로 성향을 분석합니다.
                  모든 질문은 4점 척도로 답하기 쉽게 구성되어 있으며,
                  즉시 결과를 확인할 수 있습니다.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="text-teal-600 text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">심리학 기반 문항</h4>
                      <p className="text-sm text-gray-600">펫로스 대처 스타일 이론을 바탕으로 설계된 검증된 질문</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="text-teal-600 text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">즉시 결과 확인</h4>
                      <p className="text-sm text-gray-600">질문 완료 즉시 5가지 타입 중 당신의 페르소나 확인</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="text-teal-600 text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">완전 무료</h4>
                      <p className="text-sm text-gray-600">신용카드 등록 불필요, 이메일 인증만으로 이용 가능</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-10 border border-teal-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">진단 예시 문항</h3>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <p className="text-gray-900 font-medium mb-4">
                      "반려동물을 떠올릴 때, 나는..."
                    </p>
                    <div className="space-y-2">
                      <button className="w-full text-left px-4 py-3 rounded-lg border-2 border-teal-500 bg-teal-50 text-gray-900 text-sm hover:bg-teal-100 transition-all">
                        감정을 표현하고 위로받고 싶다
                      </button>
                      <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 text-gray-700 text-sm hover:bg-gray-50 transition-all">
                        앞으로 어떻게 해야 할지 조언을 듣고 싶다
                      </button>
                      <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 text-gray-700 text-sm hover:bg-gray-50 transition-all">
                        함께 대화하며 생각을 정리하고 싶다
                      </button>
                      <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 text-gray-700 text-sm hover:bg-gray-50 transition-all">
                        혼자 조용히 생각할 시간이 필요하다
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    12개의 이러한 문항을 통해 당신의 성향을 분석합니다
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-10 border border-emerald-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">대화 예시</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-2xl p-4 border border-gray-200">
                      <p className="text-sm text-gray-900">
                        "오늘 초코가 좋아하던 공원을 지나갔는데 너무 힘들었어요..."
                      </p>
                    </div>
                    <div className="bg-teal-500 text-white rounded-2xl p-4">
                      <p className="text-sm">
                        "공원을 지날 때 많이 힘드셨겠어요. 초코와 함께했던 그곳이니까요. 
                        그때 어떤 기억이 떠오르셨나요?"
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-gray-200">
                      <p className="text-sm text-gray-900">
                        "초코가 다른 강아지 친구들이랑 뛰어놀던 모습이 자꾸 생각나요..."
                      </p>
                    </div>
                    <div className="bg-teal-500 text-white rounded-2xl p-4">
                      <p className="text-sm">
                        "행복했던 순간을 기억하고 계시네요. 초코도 그때가 정말 즐거웠을 거예요. 
                        그 기억은 영원히 당신과 함께 있을 거예요."
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center mt-6">
                    💙 경청자 타입 대화 예시
                  </p>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="inline-block mb-6 px-4 py-2 bg-emerald-100 rounded-full">
                  <span className="text-emerald-700 text-sm font-semibold">STEP 2</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  맞춤형 AI 대화<br/>
                  <span className="text-emerald-600">(24/7 무제한)</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  당신의 성향에 맞춘 AI와 자유롭게 대화하세요.
                  24시간 언제든지 이용 가능하며, 횟수 제한이 없습니다.
                  대화는 자동으로 저장되어 언제든 이어서 할 수 있습니다.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <span className="text-emerald-600 text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">페르소나별 맞춤 대화</h4>
                      <p className="text-sm text-gray-600">진단 결과에 따라 AI의 대화 스타일이 자동으로 조정됩니다</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <span className="text-emerald-600 text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">자동 정보 추출</h4>
                      <p className="text-sm text-gray-600">대화 중 반려동물 정보, 감정 상태 등을 자동으로 파악하여 더 깊은 대화 가능</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <span className="text-emerald-600 text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">위기 감지 시스템</h4>
                      <p className="text-sm text-gray-600">위험 신호 감지 시 즉시 전문가 연락처 제공</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block mb-6 px-4 py-2 bg-purple-100 rounded-full">
                  <span className="text-purple-700 text-sm font-semibold">STEP 3</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  전문가 연계<br/>
                  <span className="text-purple-600">(필요시)</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  AI와의 대화만으로 부족하다면, 전문 심리 상담사, 
                  장례 서비스, 추모 커머스로 연결해드립니다.
                  늘품이 신뢰할 수 있는 파트너들과 함께합니다.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">펫로스 전문 상담사</h4>
                      <p className="text-sm text-gray-600">1:1 심리 상담을 통한 더 깊은 치유</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">장례 서비스 연계</h4>
                      <p className="text-sm text-gray-600">개별 화장, 추모 예식 등 전문 업체 추천</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">추모 용품 쇼핑</h4>
                      <p className="text-sm text-gray-600">유골함, 사진 액자 등 맞춤 추모 용품</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10 border border-purple-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">연계 파트너</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">심리 상담</h4>
                        <p className="text-xs text-gray-600">펫로스 전문 상담사</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      온라인/오프라인 1:1 상담, 보험 적용 가능
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Heart className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">장례 서비스</h4>
                        <p className="text-xs text-gray-600">21그램 등 제휴 업체</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      개별 화장, 추모 예식, 투명한 가격 안내
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🎁</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">추모 커머스</h4>
                        <p className="text-xs text-gray-600">다양한 추모 용품</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      유골함, 사진 액자, 맞춤 제작 가능
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 특징 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">늘품만의 특별함</h2>
            <p className="text-xl text-gray-600">다른 서비스와 차별화된 강점</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <Clock className="w-10 h-10 text-teal-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">24시간 지원</h3>
              <p className="text-sm text-gray-600">
                새벽이든 주말이든, 언제든 접속하여 대화할 수 있습니다
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <MessageSquare className="w-10 h-10 text-emerald-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">무제한 대화</h3>
              <p className="text-sm text-gray-600">
                횟수 제한 없이 원하는 만큼 대화할 수 있습니다
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <Lock className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">완벽한 보안</h3>
              <p className="text-sm text-gray-600">
                모든 대화는 암호화되어 안전하게 보관됩니다
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <Shield className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">위기 감지</h3>
              <p className="text-sm text-gray-600">
                위험 신호를 즉시 감지하여 전문가 연결
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-teal-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-emerald-50 mb-10">
            3분이면 당신만의 AI 위로 서비스를 시작할 수 있습니다
          </p>
          <button
            onClick={() => navigate('/neulpoom/onboarding')}
            className="px-10 py-5 bg-white text-emerald-600 rounded-full font-bold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all shadow-xl"
          >
            무료로 시작하기
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

export default ServicePage;
