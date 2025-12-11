import React from 'react';
import { Share2, ArrowRight, Heart, Sparkles, ArrowLeft } from 'lucide-react';

function NeulPoomScreen2_5_Share({ diagnosisResult, onStartChat, onBack, onViewDetail }) {
  
  const getPersonaInfo = (persona) => {
    const personaMap = {
      'LISTENER': {
        name: '정서 중심 경청자',
        emoji: '💙',
        color: 'from-blue-400 to-indigo-500',
        bgColor: 'bg-blue-50',
        title: '마음을 알아주는 따뜻한 친구',
        catchphrase: '"네 마음, 내가 들어줄게"',
        traits: ['공감 능력 MAX', '감정 표현 자유로움', '위로의 달인'],
        funFact: '친구가 힘들 때 3시간이고 전화 통화 가능!'
      },
      'MENTOR': {
        name: '해결 중심 멘토',
        emoji: '📚',
        color: 'from-purple-400 to-pink-500',
        bgColor: 'bg-purple-50',
        title: '문제를 척척 해결하는 해결사',
        catchphrase: '"걱정 말아요, 방법이 있어요"',
        traits: ['계획왕', '정보 수집가', '실용주의자'],
        funFact: '고민 상담하면 5분 안에 해결책 3개 제시!'
      },
      'PARTNER': {
        name: '협력적 파트너',
        emoji: '🤝',
        color: 'from-green-400 to-teal-500',
        bgColor: 'bg-green-50',
        title: '함께 걸어가는 든든한 동반자',
        catchphrase: '"우리 함께 해결해봐요"',
        traits: ['균형감각', '적응력 높음', '팀워크 최고'],
        funFact: '공감도 하고 해결책도 제시하는 만능 타입!'
      },
      'OBSERVER': {
        name: '수용적 관찰자',
        emoji: '🌙',
        color: 'from-gray-400 to-slate-500',
        bgColor: 'bg-gray-50',
        title: '조용히 지켜보는 평화주의자',
        catchphrase: '"괜찮아, 천천히 가도 돼"',
        traits: ['마음이 깊음', '강요하지 않음', '안전 지대'],
        funFact: '침묵도 위로가 되는 신기한 능력 보유!'
      },
      'GUARDIAN': {
        name: '보호적 안내자',
        emoji: '🛡️',
        color: 'from-amber-400 to-orange-500',
        bgColor: 'bg-amber-50',
        title: '너를 지켜줄 따뜻한 방패',
        catchphrase: '"네 잘못이 아니야, 잘하고 있어"',
        traits: ['자책 금지 요원', '긍정 에너지', '보호 본능'],
        funFact: '자책하는 친구 보면 자동으로 보호 모드 ON!'
      }
    };
    return personaMap[persona] || personaMap['PARTNER'];
  };

  const personaInfo = getPersonaInfo(diagnosisResult?.persona);

  const handleShare = () => {
    alert('SNS 공유 기능은 실제 서비스에서 구현됩니다.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-6">
      <div className="max-w-2xl mx-auto py-12">
        {/* 뒤로 가기 */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{onViewDetail ? '자세한 결과지 보기' : '돌아가기'}</span>
          </button>
        )}

        {/* 메인 결과 카드 */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl mb-6 fade-in relative overflow-hidden">
          {/* 배경 데코 */}
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${personaInfo.color} opacity-10 rounded-full -mr-32 -mt-32`}></div>
          
          <div className="relative z-10">
            {/* 이모지 */}
            <div className="text-center mb-6">
              <div className="text-8xl mb-4 animate-bounce">{personaInfo.emoji}</div>
              <div className={`inline-block px-6 py-2 rounded-full ${personaInfo.bgColor} mb-3`}>
                <span className={`font-bold bg-gradient-to-r ${personaInfo.color} bg-clip-text text-transparent`}>
                  {personaInfo.name}
                </span>
              </div>
            </div>

            {/* 타이틀 */}
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              {personaInfo.title}
            </h1>

            {/* 캐치프레이즈 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border-2 border-purple-100">
              <p className="text-center text-xl text-gray-700 font-medium italic">
                {personaInfo.catchphrase}
              </p>
            </div>

            {/* 특성 태그 */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {personaInfo.traits.map((trait, idx) => (
                <span
                  key={idx}
                  className={`px-5 py-2 rounded-full bg-gradient-to-r ${personaInfo.color} text-white font-medium text-sm shadow-md`}
                >
                  ✨ {trait}
                </span>
              ))}
            </div>

            {/* Fun Fact */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="font-bold text-gray-900 mb-1">재미있는 사실</p>
                  <p className="text-gray-700">{personaInfo.funFact}</p>
                </div>
              </div>
            </div>

            {/* 점수 (간단하게) */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold text-teal-600">
                  {Math.round((diagnosisResult?.dimension_scores?.emotional_support || 3) * 25)}%
                </div>
                <div className="text-sm text-gray-600 mt-1">감성 지수</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold text-purple-600">
                  {Math.round((diagnosisResult?.dimension_scores?.problem_solving || 3) * 25)}%
                </div>
                <div className="text-sm text-gray-600 mt-1">논리 지수</div>
              </div>
            </div>
          </div>
        </div>

        {/* 공유 버튼 */}
        <div className="mb-6 fade-in">
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all"
          >
            <Share2 className="w-6 h-6" />
            <span>나의 위로타입 알리기</span>
          </button>
        </div>

        {/* 하단 문구 */}
        <div className="text-center text-sm text-gray-500 mt-6">
          <p>✨ 이 결과는 당신만의 특별한 위로 성향입니다</p>
        </div>
      </div>
    </div>
  );
}

export default NeulPoomScreen2_5_Share;
