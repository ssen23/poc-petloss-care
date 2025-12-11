// ========================================
// PartnersPage.jsx
// ========================================
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Phone, Mail, MapPin, CheckCircle, Star } from 'lucide-react';

function PartnersPage() {
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
              <button onClick={() => navigate('/service')} className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">서비스</button>
              <button onClick={() => navigate('/partners')} className="text-sm font-medium text-teal-600 transition-colors">연계 서비스</button>
              <button onClick={() => navigate('/reviews')} className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">후기</button>
            </div>

            <button onClick={() => navigate('/neulpoom/onboarding')} className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-full font-medium text-sm hover:from-teal-600 hover:to-emerald-700 transition-all shadow-sm hover:shadow-md">
              시작하기
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-purple-100 rounded-full">
            <span className="text-purple-700 text-sm font-semibold">PARTNERS & SERVICES</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            전문가와 함께하는<br/>다음 단계
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            늘품과의 대화 이후, 필요시 신뢰할 수 있는<br/>
            전문 파트너들과 연결됩니다
          </p>
        </div>
      </section>

      {/* 3가지 연계 서비스 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-20">
            {/* 1. 전문 심리 상담 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block mb-6 px-4 py-2 bg-blue-100 rounded-full">
                  <span className="text-blue-700 text-sm font-semibold">COUNSELING</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  전문 심리 상담
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  펫로스 전문 심리 상담사와 1:1 상담을 통해 더 깊은 치유를 경험하세요.
                  늘품이 검증한 전문가들과 함께합니다.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">펫로스 전문가</h4>
                      <p className="text-sm text-gray-600">반려동물 이별 전문 상담 경력 5년 이상</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">온라인/오프라인</h4>
                      <p className="text-sm text-gray-600">화상 상담 또는 대면 상담 선택 가능</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">보험 적용</h4>
                      <p className="text-sm text-gray-600">일부 건강보험 적용 가능 (상담사별 상이)</p>
                    </div>
                  </div>
                </div>

                <button className="px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-md hover:shadow-lg">
                  상담 센터 찾기
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">제휴 상담 센터</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-3">마음샘 심리상담센터</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>서울 강남구</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>02-1234-5678</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>4.9 / 5.0 (234 후기)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-3">힐링펫 상담센터</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>경기 성남시</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>031-9876-5432</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>4.8 / 5.0 (189 후기)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 장례 서비스 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10 border border-purple-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">제휴 장례 업체</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-3">21그램</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        반려동물 전문 장례 서비스. 투명한 가격과 정성스러운 케어.
                      </p>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">개별 화장</span>
                        <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">추모 예식</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-3">펫메모리얼</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        24시간 장례 상담. 전국 네트워크로 어디서든 이용 가능.
                      </p>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">24시간</span>
                        <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">전국 서비스</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="inline-block mb-6 px-4 py-2 bg-purple-100 rounded-full">
                  <span className="text-purple-700 text-sm font-semibold">FUNERAL</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  장례 서비스 연계
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  소중한 이별을 정성껏 준비할 수 있도록 전문 장례 업체를 소개합니다.
                  늘품이 신뢰하는 파트너들입니다.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">개별 화장 서비스</h4>
                      <p className="text-sm text-gray-600">소중한 아이 혼자만의 시간을 보장합니다</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">추모 예식 지원</h4>
                      <p className="text-sm text-gray-600">마지막 인사를 정성스럽게 준비합니다</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">투명한 가격 안내</h4>
                      <p className="text-sm text-gray-600">사전에 모든 비용을 명확히 안내합니다</p>
                    </div>
                  </div>
                </div>

                <button className="px-8 py-4 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-all shadow-md hover:shadow-lg">
                  장례 업체 추천받기
                </button>
              </div>
            </div>

            {/* 3. 추모 커머스 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block mb-6 px-4 py-2 bg-amber-100 rounded-full">
                  <span className="text-amber-700 text-sm font-semibold">COMMERCE</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  추모 커머스
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  소중한 추억을 간직할 수 있는 다양한 추모 용품을 만나보세요.
                  맞춤 제작도 가능합니다.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">유골함 & 보관함</h4>
                      <p className="text-sm text-gray-600">다양한 디자인과 소재의 유골함</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">사진 액자 & 앨범</h4>
                      <p className="text-sm text-gray-600">소중한 순간을 아름답게 보관</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">맞춤 제작</h4>
                      <p className="text-sm text-gray-600">이름 각인, 발도장 등 맞춤 서비스</p>
                    </div>
                  </div>
                </div>

                <button className="px-8 py-4 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all shadow-md hover:shadow-lg">
                  추모 용품 쇼핑하기
                </button>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 border border-amber-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">인기 추모 용품</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">⚱️</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">세라믹 유골함</h4>
                    <p className="text-xs text-gray-600">₩89,000</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">🖼️</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">추모 액자</h4>
                    <p className="text-xs text-gray-600">₩45,000</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">📿</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">유골 목걸이</h4>
                    <p className="text-xs text-gray-600">₩120,000</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">🐾</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">발도장 키트</h4>
                    <p className="text-xs text-gray-600">₩35,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-500 to-pink-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            먼저 늘품과 대화해보세요
          </h2>
          <p className="text-xl text-purple-50 mb-10">
            전문가 연계는 언제든 가능합니다
          </p>
          <button
            onClick={() => navigate('/neulpoom/onboarding')}
            className="px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all shadow-xl"
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

export default PartnersPage;
