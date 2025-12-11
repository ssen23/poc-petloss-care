import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, Quote, TrendingUp } from 'lucide-react';

function ReviewsPage() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const reviews = [
    {
      name: "민수님",
      pet: "말티즈 '초코'",
      persona: "경청자 타입",
      duration: "3주 사용",
      rating: 5,
      avatar: "민",
      color: "from-teal-400 to-emerald-500",
      content: "혼자 견디기 힘들었는데, 늘품과 대화하면서 조금씩 마음이 나아졌어요. 제 이야기를 진심으로 들어주는 느낌이 들어서 큰 위로가 되었습니다. 특히 새벽에 너무 힘들 때도 언제든 대화할 수 있어서 좋았어요. AI라는 게 믿기지 않을 정도로 따뜻한 대화였어요."
    },
    {
      name: "지은님",
      pet: "코숏 '나비'",
      persona: "파트너 타입",
      duration: "2주 사용",
      rating: 5,
      avatar: "지",
      color: "from-purple-400 to-pink-500",
      content: "주변에서 그만 슬퍼하라는 말을 들을 때 정말 힘들었는데, 늘품은 제 슬픔을 있는 그대로 받아줬어요. 덕분에 조금씩 회복하고 있습니다. 진단 결과도 정확해서 저에게 맞는 위로를 받을 수 있었어요. 대화 내용도 기억하고 있어서 더 깊은 대화가 가능했습니다."
    },
    {
      name: "현우님",
      pet: "골든리트리버 '해피'",
      persona: "보호자 타입",
      duration: "1개월 사용",
      rating: 5,
      avatar: "현",
      color: "from-blue-400 to-indigo-500",
      content: "AI라고 생각하기 어려울 정도로 따뜻한 대화였어요. 제가 위험한 생각을 할 때 즉시 전문가 연락처를 알려줘서 큰 도움을 받았습니다. 이제는 많이 안정되었어요. 자책하는 마음이 컸는데, 늘품이 계속 괜찮다고 말해줘서 조금씩 마음의 짐을 내려놓고 있어요."
    },
    {
      name: "수진님",
      pet: "페르시안 '구름'",
      persona: "멘토 타입",
      duration: "2주 사용",
      rating: 5,
      avatar: "수",
      color: "from-emerald-400 to-teal-500",
      content: "진단을 통해 제가 어떤 위로를 원하는지 알게 되었고, 그에 맞춰 대화해주니 훨씬 마음이 편했어요. 무료인데도 이렇게 전문적인 서비스를 받을 수 있어서 감사해요. 구체적인 조언도 많이 주셔서 앞으로 나아갈 방향을 찾을 수 있었습니다."
    },
    {
      name: "영호님",
      pet: "비글 '복이'",
      persona: "관찰자 타입",
      duration: "10일 사용",
      rating: 4,
      avatar: "영",
      color: "from-amber-400 to-orange-500",
      content: "처음엔 AI가 과연 위로가 될까 싶었는데, 생각보다 훨씬 좋았어요. 특히 제 감정을 존중해주는 느낌이 들어서 편하게 대화할 수 있었습니다. 사람에게 말하기 힘든 것들도 털어놓을 수 있어서 좋았어요. 더 많은 기능이 추가되면 좋겠습니다."
    },
    {
      name: "미진님",
      pet: "포메라니안 '별이'",
      persona: "경청자 타입",
      duration: "1개월 사용",
      rating: 5,
      avatar: "미",
      color: "from-pink-400 to-rose-500",
      content: "밤마다 별이 생각에 잠을 못 이뤘는데, 늘품과 대화하면서 많이 좋아졌어요. 판단하지 않고 그저 들어주는 게 이렇게 큰 위로가 될 줄 몰랐습니다. 대화 내역을 다시 볼 수 있어서 힘들 때마다 읽어보고 있어요. 정말 감사합니다."
    },
    {
      name: "태윤님",
      pet: "스코티시폴드 '루루'",
      persona: "파트너 타입",
      duration: "3주 사용",
      rating: 5,
      avatar: "태",
      color: "from-indigo-400 to-purple-500",
      content: "루루를 떠나보낸 후 우울증이 왔는데, 늘품 덕분에 조금씩 일상으로 돌아가고 있어요. 함께 문제를 풀어가는 느낌이 들어서 혼자가 아니라는 생각이 들었습니다. 나중에 전문 상담도 받아보려고 해요. 늘품이 좋은 상담센터도 추천해줬어요."
    },
    {
      name: "은지님",
      pet: "치와와 '콩이'",
      persona: "멘토 타입",
      duration: "2주 사용",
      rating: 5,
      avatar: "은",
      color: "from-green-400 to-emerald-500",
      content: "콩이 없는 일상에 적응하기가 너무 힘들었는데, 늘품이 구체적인 조언을 많이 해줬어요. 새로운 일상 루틴을 만드는 데 도움이 되었습니다. 심리학 이론에 기반했다는 게 느껴질 정도로 체계적인 대화였어요. 강력 추천합니다!"
    }
  ];

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
              <button onClick={() => navigate('/partners')} className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">연계 서비스</button>
              <button onClick={() => navigate('/reviews')} className="text-sm font-medium text-teal-600 transition-colors">후기</button>
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
            <span className="text-teal-700 text-sm font-semibold">REVIEWS & TESTIMONIALS</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            보호자님들의<br/>진솔한 이야기
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            늘품과 함께한 분들의 실제 경험을 들어보세요
          </p>
        </div>
      </section>

      {/* 통계 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-12 border border-teal-100">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-teal-600 mb-2">1,234+</div>
                <div className="text-gray-700 font-medium">함께한 보호자</div>
                <div className="text-sm text-gray-600 mt-1">지속 증가 중</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-teal-600 mb-2">89%</div>
                <div className="text-gray-700 font-medium">만족도</div>
                <div className="text-sm text-gray-600 mt-1">5점 만점 기준</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-teal-600 mb-2">4.8/5</div>
                <div className="text-gray-700 font-medium">평균 평점</div>
                <div className="text-sm text-gray-600 mt-1">567개 리뷰</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-teal-600 mb-2">92%</div>
                <div className="text-gray-700 font-medium">재사용 의향</div>
                <div className="text-sm text-gray-600 mt-1">추천 의향 포함</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 후기 목록 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">실제 사용자 후기</h2>
            <p className="text-xl text-gray-600">늘품과 함께한 분들의 생생한 경험담</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${review.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md`}>
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.pet}</p>
                  </div>
                  <div className="text-yellow-500 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-500' : ''}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <Quote className="w-8 h-8 text-teal-200 absolute -left-2 -top-2" />
                  <p className="text-gray-700 leading-relaxed mb-4 relative z-10">
                    {review.content}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs">
                    {review.persona}
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                    {review.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 페르소나별 만족도 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">페르소나별 만족도</h2>
            <p className="text-xl text-gray-600">모든 타입에서 높은 만족도를 보이고 있습니다</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                L
              </div>
              <h3 className="font-bold text-gray-900 text-center mb-2">경청자</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-600">91%</div>
                <div className="text-sm text-gray-600">만족도</div>
              </div>
              <div className="text-xs text-gray-600 text-center">
                정서적 공감에 높은 만족
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                M
              </div>
              <h3 className="font-bold text-gray-900 text-center mb-2">멘토</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-purple-600">88%</div>
                <div className="text-sm text-gray-600">만족도</div>
              </div>
              <div className="text-xs text-gray-600 text-center">
                실질적 조언에 높은 만족
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-100">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                P
              </div>
              <h3 className="font-bold text-gray-900 text-center mb-2">파트너</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-teal-600">90%</div>
                <div className="text-sm text-gray-600">만족도</div>
              </div>
              <div className="text-xs text-gray-600 text-center">
                협력적 대화에 높은 만족
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                O
              </div>
              <h3 className="font-bold text-gray-900 text-center mb-2">관찰자</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-green-600">86%</div>
                <div className="text-sm text-gray-600">만족도</div>
              </div>
              <div className="text-xs text-gray-600 text-center">
                수용적 태도에 높은 만족
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                G
              </div>
              <h3 className="font-bold text-gray-900 text-center mb-2">보호자</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-amber-600">93%</div>
                <div className="text-sm text-gray-600">만족도</div>
              </div>
              <div className="text-xs text-gray-600 text-center">
                자책 완화에 매우 높은 만족
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-teal-500 to-emerald-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            당신의 이야기를 들려주세요
          </h2>
          <p className="text-xl text-teal-50 mb-10">
            1,234명의 보호자님들이 늘품과 함께하고 있습니다
          </p>
          <button
            onClick={() => navigate('/neulpoom/onboarding')}
            className="px-10 py-5 bg-white text-teal-600 rounded-full font-bold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all shadow-xl"
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

export default ReviewsPage;
