import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Share2, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { psychTests, calculateResult } from '../data/testData';
import fetoAPI from '../services/api';

function TestResult() {
  const { testId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const test = psychTests[testId];
  const answers = location.state?.answers || [];
  const result = calculateResult(answers, testId);

  const isTest3 = testId === 'test3';

  useEffect(() => {
    saveTestResult();
  }, []);

  const saveTestResult = async () => {
    try {
      await fetoAPI.saveTestResult({
        test_id: testId,
        result_type: result.type,
        answers: answers
      });
      console.log('테스트 결과 저장 완료');
    } catch (error) {
      console.error('테스트 결과 저장 실패:', error);
    }
  };

  const handleShare = (platform) => {
    alert(`${platform}으로 공유 기능은 실제 서비스에서 구현됩니다.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* 결과 카드 */}
        <div className="glass-effect rounded-3xl p-8 shadow-2xl mb-8 fade-in">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mb-4">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h1 className="heading-font text-4xl font-bold text-gray-800 mb-3">
              {result.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {result.description}
            </p>
          </div>

          {/* 특성 태그들 */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {result.traits.map((trait, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium"
              >
                #{trait}
              </span>
            ))}
          </div>

          {/* Test3 전용 메시지 */}
          {result.message && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border-2 border-purple-200">
              <p className="text-center text-gray-700 leading-relaxed italic">
                "{result.message}"
              </p>
            </div>
          )}

          {/* 공유 버튼 */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleShare('Instagram')}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Share2 className="w-5 h-5" />
              Instagram
            </button>
            <button
              onClick={() => handleShare('KakaoTalk')}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Share2 className="w-5 h-5" />
              KakaoTalk
            </button>
          </div>
        </div>

        {/* ✨ 하단 네비게이션 링크 추가 */}
        <div className="mt-6 mb-8 fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-center items-center gap-3 text-sm">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              테스트 홈으로 돌아가기
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => navigate('/neulpoom')}
              className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
            >
              늘품: 위로 성향 진단해보기
            </button>
          </div>
        </div>

        {/* CTA 섹션 - 늘품 */}
        <div className="space-y-4">
          {/* 감정적 문구 1 */}
          <div className="glass-effect rounded-2xl p-6 shadow-lg fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-center text-gray-700 font-medium mb-3">
              💔 사랑하는 반려동물과의 이별을 준비하고 있는 당신에게
            </p>
            <p className="text-center text-sm text-gray-600">
              혼자 감당하기 힘든 그 시간, 함께하겠습니다
            </p>
          </div>

          {/* 감정적 문구 2 */}
          <div className="glass-effect rounded-2xl p-6 shadow-lg fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-center text-gray-700 font-medium mb-3">
              😢 채울 수 없는 상실, 펫로스 증후군을 겪는 당신에게
            </p>
            <p className="text-center text-sm text-gray-600">
              당신의 슬픔을 이해하고 함께 치유해나가겠습니다
            </p>
          </div>

          {/* 늘품 CTA - 깔끔한 흰색 배경 */}
          <div
            onClick={() => navigate('/neulpoom')}
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer group fade-in border-2 border-gray-200"
            style={{ animationDelay: '0.5s' }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-md">
                    <Heart className="w-8 h-8 text-white" fill="white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="heading-font text-2xl font-bold text-gray-900 mb-1">
                      늘품 (Neul Poom)
                    </h3>
                    <p className="text-sm text-gray-600">
                      반려동물 정서 케어 플랫폼
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-8 h-8 text-gray-400 group-hover:text-teal-600 transition-colors" />
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {isTest3 
                  ? `${result.type === '감정 공감형' ? '따뜻한 공감' : '사실 기반 분석'}으로 당신만을 위한 맞춤 케어를 시작하세요.`
                  : '전문적이고 따뜻한 AI와 함께 치유의 시간을 가져보세요.'
                }
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-full text-sm font-semibold shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span>당신의 마음을 안아주는, 늘품</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestResult;
