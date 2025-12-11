import React from 'react';
import { Sparkles, Share2, FileText, ArrowRight, Home } from 'lucide-react';

function NeulPoomScreen2_5_Choice({ diagnosisResult, onViewShare, onViewDetail, onGoToInput, onGoToHome }) {
  
  const getPersonaName = (persona) => {
    const names = {
      'LISTENER': '정서 중심 경청자',
      'MENTOR': '해결 중심 멘토',
      'PARTNER': '협력적 파트너',
      'OBSERVER': '수용적 관찰자',
      'GUARDIAN': '보호적 안내자'
    };
    return names[persona] || '파트너';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* 헤더 */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            진단 완료!
          </h1>
          <p className="text-lg text-gray-600 font-light mb-2">
            당신은 <strong className="text-teal-600">{getPersonaName(diagnosisResult?.persona)}</strong> 타입입니다
          </p>
          <p className="text-sm text-gray-500">
            결과를 확인하는 방법을 선택해주세요
          </p>
        </div>

        {/* 3개 선택 카드 */}
        <div className="space-y-4 mb-8">
          {/* 1. 공유용 결과지 */}
          <button
            onClick={onViewShare}
            className="w-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all text-left group border-2 border-transparent hover:border-pink-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center">
                  <Share2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                    간단한 결과지 보기
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    전문적인 내용이 쉽게 정리된 결과지 (위로타입을 친구들에게 알리기)
                  </p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-pink-600 transition-colors" />
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-pink-50 text-pink-600 text-xs rounded-full font-medium">
                간편보기
              </span>
              <span className="px-3 py-1 bg-pink-50 text-pink-600 text-xs rounded-full font-medium">
                공유하기 좋음
              </span>
            </div>
          </button>

          {/* 2. 설명용 결과지 (정보 필요) */}
          <button
            onClick={onViewDetail}
            className="w-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all text-left group border-2 border-transparent hover:border-teal-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                    자세한 설명용 결과지 보기
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    전문적인 내용이 자세하게 서술된 결과지 (정보 입력 필요)
                  </p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-teal-600 transition-colors" />
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-teal-50 text-teal-600 text-xs rounded-full font-medium">
                세부 분석
              </span>
              <span className="px-3 py-1 bg-teal-50 text-teal-600 text-xs rounded-full font-medium">
                전문적 내용
              </span>
              <span className="px-3 py-1 bg-amber-50 text-amber-600 text-xs rounded-full font-medium">
                🔒 정보 입력 후
              </span>
            </div>
          </button>

          {/* 3. 정보입력하러가기 */}
          <button
            onClick={onGoToInput}
            className="w-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  치유의 여정 떠나기
                </h3>
                <p className="text-sm text-white/90">
                  펫의 기억과 함께하는 위로, 감정 케어
                </p>
              </div>
              <ArrowRight className="w-8 h-8 text-white group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
        </div>

        {/* 안내 문구 */}
        <div className="text-center text-sm text-gray-500 mb-4">
          <p>💡 자세한 결과는 정보 입력 후 더 세분화된 치유를 제공합니다</p>
        </div>

        {/* ✨ 홈페이지 링크 추가 */}
        {onGoToHome && (
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onGoToHome}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-teal-600 text-sm transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>늘품: 홈페이지 둘러보기</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NeulPoomScreen2_5_Choice;
