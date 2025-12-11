import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Brain, TrendingUp, CheckCircle, Award, BarChart, Zap } from 'lucide-react';

function TrustPage() {
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
              <button onClick={() => navigate('/trust')} className="text-sm font-medium text-teal-600 transition-colors">진단 신뢰성</button>
              <button onClick={() => navigate('/service')} className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">서비스</button>
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
      <section className="pt-32 pb-20 bg-gradient-to-br from-teal-50 via-white to-emerald-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-teal-100 rounded-full">
            <span className="text-teal-700 text-sm font-semibold">RELIABILITY & SCIENCE</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            과학적으로 검증된<br/>진단 시스템
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            늘품의 진단은 심리학 이론을 기반으로 한 12문항 분석으로,<br/>
            당신에게 가장 적합한 위로 방식을 정확하게 찾아냅니다
          </p>
        </div>
      </section>

      {/* 심리학 기반 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-6 px-4 py-2 bg-blue-100 rounded-full">
                <span className="text-blue-700 text-sm font-semibold">PSYCHOLOGICAL BASIS</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                심리학 이론에<br/>뿌리를 둔 진단
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                늘품의 진단 시스템은 펫로스 애도 이론(Pet Loss Grief Theory)과 
                대처 스타일 연구(Coping Style Research)를 기반으로 설계되었습니다.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">6개 차원 분석</h3>
                    <p className="text-gray-600 text-sm">
                      문제해결, 정서지지, 인지유연성, 계획지향, 회피, 자책 차원을 
                      종합적으로 분석하여 당신의 대처 스타일을 파악합니다
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">전문가 검증</h3>
                    <p className="text-gray-600 text-sm">
                      심리학 전공 연구진과 펫로스 전문 상담사의 검토를 거쳐 
                      문항과 알고리즘의 타당성을 확보했습니다
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <BarChart className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">데이터 기반 개선</h3>
                    <p className="text-gray-600 text-sm">
                      1,000명 이상의 실제 사용자 데이터를 분석하여 
                      진단 정확도를 지속적으로 개선하고 있습니다
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">진단 과정</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">12문항 응답</h4>
                    <p className="text-sm text-gray-600">각 상황에서의 선호도를 4점 척도로 응답</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">6개 차원 점수 계산</h4>
                    <p className="text-sm text-gray-600">응답을 기반으로 각 차원별 점수 산출</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">페르소나 매칭</h4>
                    <p className="text-sm text-gray-600">점수 패턴을 분석하여 5가지 타입 중 최적 매칭</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">맞춤형 AI 설정</h4>
                    <p className="text-sm text-gray-600">진단 결과를 기반으로 AI의 대화 스타일 조정</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5가지 페르소나 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">5가지 페르소나 타입</h2>
            <p className="text-xl text-gray-600">각 타입은 과학적 근거를 기반으로 설계되었습니다</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">L</div>
              <h3 className="font-bold text-gray-900 text-center mb-2">경청자</h3>
              <p className="text-xs text-gray-600 text-center mb-4">Listener</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                정서 중심 대화를 선호하며, 공감과 위로를 통해 치유받는 타입
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-semibold mb-2">특징</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• 정서지지 높음</li>
                  <li>• 문제해결 낮음</li>
                  <li>• 감정 표현 중시</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">M</div>
              <h3 className="font-bold text-gray-900 text-center mb-2">멘토</h3>
              <p className="text-xs text-gray-600 text-center mb-4">Mentor</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                해결 중심적 접근을 선호하며, 실질적 조언을 통해 앞으로 나아가는 타입
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-semibold mb-2">특징</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• 문제해결 높음</li>
                  <li>• 계획지향 높음</li>
                  <li>• 구체적 조언 선호</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">P</div>
              <h3 className="font-bold text-gray-900 text-center mb-2">파트너</h3>
              <p className="text-xs text-gray-600 text-center mb-4">Partner</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                협력적 대화를 선호하며, 함께 문제를 풀어가는 방식을 선호하는 타입
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-semibold mb-2">특징</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• 균형잡힌 점수</li>
                  <li>• 대화 중심</li>
                  <li>• 유연한 접근</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">O</div>
              <h3 className="font-bold text-gray-900 text-center mb-2">관찰자</h3>
              <p className="text-xs text-gray-600 text-center mb-4">Observer</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                수용적 태도를 선호하며, 스스로 생각할 시간을 중요하게 여기는 타입
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-semibold mb-2">특징</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• 회피 높음</li>
                  <li>• 인지유연성 높음</li>
                  <li>• 수용적 대화</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">G</div>
              <h3 className="font-bold text-gray-900 text-center mb-2">보호자</h3>
              <p className="text-xs text-gray-600 text-center mb-4">Guardian</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                자책 경향이 높으며, 안심과 격려를 통해 자기 비난을 줄이는 타입
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-semibold mb-2">특징</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• 자책 높음</li>
                  <li>• 안심 필요</li>
                  <li>• 보호적 언어</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI 성능 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">지속적으로 개선되는 AI</h2>
            <p className="text-xl text-gray-600">실제 대화 데이터를 분석하여 AI의 성능을 꾸준히 향상시킵니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 border border-teal-100">
              <TrendingUp className="w-12 h-12 text-teal-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">90% 이상</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                정보 추출 정확도
              </p>
              <p className="text-sm text-gray-600">
                대화에서 반려동물 정보, 감정 상태, 트리거 포인트 등을 
                90% 이상의 정확도로 자동 추출합니다
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
              <Zap className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">실시간 분석</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                감정 점수 1~10점
              </p>
              <p className="text-sm text-gray-600">
                매 대화마다 사용자의 감정 상태를 1~10점으로 실시간 분석하여
                위험 신호를 즉시 감지합니다
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
              <CheckCircle className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">위기 감지</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                3단계 대응 시스템
              </p>
              <p className="text-sm text-gray-600">
                Stable, Warning, Critical 3단계로 위험도를 분류하고,
                위기 상황 시 즉시 전문가 연락처를 제공합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-teal-500 to-emerald-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            과학적 진단을 직접 경험해보세요
          </h2>
          <p className="text-xl text-teal-50 mb-10">
            3분이면 당신에게 맞는 위로 방식을 찾을 수 있습니다
          </p>
          <button
            onClick={() => navigate('/neulpoom/onboarding')}
            className="px-10 py-5 bg-white text-teal-600 rounded-full font-bold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all shadow-xl"
          >
            무료 진단 시작하기
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

export default TrustPage;
