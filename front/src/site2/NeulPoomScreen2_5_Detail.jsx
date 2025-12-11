import React from 'react';
import { Sparkles, ArrowRight, Heart, Share2, TrendingUp, ArrowLeft } from 'lucide-react';

function NeulPoomScreen2_5_Detail({ petInfo, diagnosisResult, onStartChat, onBack, onViewShare }) {
  
  const getPersonaInfo = (persona) => {
    const personaMap = {
      'LISTENER': {
        name: '정서 중심 경청자',
        color: 'from-blue-500 to-indigo-600',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        icon: '💙',
        description: '당신은 감정을 깊이 공감하고 경청하는 것을 선호하는 유형입니다. 타인의 감정적 경험을 진지하게 받아들이며, 공감과 이해를 통해 위로를 전달하는 것에 능숙합니다.',
        traits: ['뛰어난 공감 능력', '감정 표현을 중시함', '따뜻한 위로를 선호함'],
        strengths: [
          '타인의 감정 상태를 민감하게 포착합니다',
          '판단 없이 있는 그대로 경청할 수 있습니다',
          '감정적 지지를 통해 안정감을 제공합니다'
        ],
        growthAreas: [
          '때로는 실질적인 해결책도 필요할 수 있습니다',
          '감정에 과도하게 몰입하지 않도록 주의가 필요합니다'
        ],
        recommendation: '정서적 공감을 기반으로 한 대화 방식이 적합합니다. 충분한 시간을 가지고 감정을 표현하고 나누는 과정이 치유에 도움이 됩니다.'
      },
      'MENTOR': {
        name: '해결 중심 멘토',
        color: 'from-purple-500 to-pink-600',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-700',
        icon: '📚',
        description: '당신은 실질적인 해결책과 구체적인 조언을 선호하는 유형입니다. 문제를 체계적으로 분석하고, 검증된 정보를 바탕으로 실행 가능한 계획을 세우는 데 강점을 보입니다.',
        traits: ['문제 해결 지향적', '계획적이고 체계적', '정보 중심적 사고'],
        strengths: [
          '상황을 객관적으로 분석할 수 있습니다',
          '구체적이고 실행 가능한 해결책을 제시합니다',
          '단계별 계획을 통해 통제감을 회복합니다'
        ],
        growthAreas: [
          '감정적 측면도 함께 고려하면 더 균형잡힌 접근이 가능합니다',
          '때로는 해결책보다 공감이 먼저 필요할 수 있습니다'
        ],
        recommendation: '정보 제공과 실질적 가이드를 중심으로 한 접근이 효과적입니다. 명확한 단계와 구체적인 방법론이 치유 과정에 도움이 됩니다.'
      },
      'PARTNER': {
        name: '협력적 파트너',
        color: 'from-green-500 to-teal-600',
        bgColor: 'bg-green-50',
        textColor: 'text-green-700',
        icon: '🤝',
        description: '당신은 공감과 실질적 도움 사이의 균형을 추구하는 유형입니다. 상황에 따라 유연하게 대응하며, 협력적인 태도로 문제에 접근합니다.',
        traits: ['균형 잡힌 접근', '유연한 대처', '상황에 따른 적응력'],
        strengths: [
          '감정과 이성 사이의 균형을 잘 유지합니다',
          '상황에 맞춰 다양한 전략을 활용할 수 있습니다',
          '협력적 태도로 문제를 함께 해결합니다'
        ],
        growthAreas: [
          '때로는 한 가지 방식에 집중하는 것이 더 효과적일 수 있습니다',
          '우선순위를 명확히 하면 더 효율적인 대처가 가능합니다'
        ],
        recommendation: '감정적 지지와 실질적 해결책을 적절히 조합한 접근이 효과적입니다. 유연하게 상황을 판단하며 치유해나갈 수 있습니다.'
      },
      'OBSERVER': {
        name: '수용적 관찰자',
        color: 'from-gray-500 to-slate-600',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700',
        icon: '🌙',
        description: '당신은 현재 상태를 있는 그대로 수용하며, 서두르지 않고 자신의 속도로 치유해나가는 유형입니다. 강요 없는 자연스러운 과정을 중시합니다.',
        traits: ['천천히 치유', '강제하지 않는 접근', '안전한 공간 우선'],
        strengths: [
          '자신의 감정을 억압하지 않고 그대로 느낍니다',
          '서두르지 않고 자연스러운 치유 과정을 존중합니다',
          '안전한 환경에서 편안함을 느낍니다'
        ],
        growthAreas: [
          '때로는 작은 실천이 변화의 시작이 될 수 있습니다',
          '필요시 전문가의 도움을 받는 것도 고려해보세요'
        ],
        recommendation: '강요하지 않는 부드러운 접근이 필요합니다. 충분한 시간과 안전한 공간 속에서 자신의 속도로 치유해나가는 것이 중요합니다.'
      },
      'GUARDIAN': {
        name: '보호적 안내자',
        color: 'from-amber-500 to-orange-600',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-700',
        icon: '🛡️',
        description: '당신은 자책감을 완화하고 관점을 전환하는 것이 필요한 유형입니다. 자신을 보호하고, 객관적으로 상황을 바라보는 연습이 도움이 됩니다.',
        traits: ['자기 보호 필요', '긍정적 재해석', '객관적 시각 유지'],
        strengths: [
          '자신의 헌신과 노력을 인정할 수 있습니다',
          '상황을 다른 관점에서 볼 수 있는 능력이 있습니다',
          '자책에서 벗어나 건강한 방향으로 나아갈 수 있습니다'
        ],
        growthAreas: [
          '비합리적인 자책 패턴을 인식하고 재구성해야 합니다',
          '객관적 사실과 감정을 분리하는 연습이 필요합니다'
        ],
        recommendation: '자책감을 완화하고 자신의 노력을 인정하는 과정이 중요합니다. 인지적 재구성을 통해 건강한 관점을 형성할 수 있습니다.'
      }
    };
    return personaMap[persona] || personaMap['PARTNER'];
  };

  const personaInfo = getPersonaInfo(diagnosisResult?.persona);
  const scores = diagnosisResult?.dimension_scores || {};

  const getDimensionInfo = (key) => {
    const info = {
      'problem_solving': { label: '문제해결 지향', desc: '구체적인 해결책을 찾고 실행하는 경향' },
      'emotional_support': { label: '정서적 지지', desc: '감정적 공감과 위로를 중시하는 정도' },
      'cognitive_flexibility': { label: '인지적 유연성', desc: '관점을 전환하고 재해석하는 능력' },
      'planning_orientation': { label: '계획 지향성', desc: '미래를 대비하고 체계적으로 준비하는 성향' },
      'avoidance': { label: '회피 경향', desc: '어려운 상황을 피하려는 정도 (낮을수록 좋음)' },
      'self_blame': { label: '자책 경향', desc: '자신을 비난하는 정도 (낮을수록 좋음)' }
    };
    return info[key] || { label: key, desc: '' };
  };

  const handleShare = () => {
    alert('결과 공유 기능은 실제 서비스에서 구현됩니다.');
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto py-12">
        {/* 뒤로 가기 */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>돌아가기</span>
          </button>
        )}

        {/* 헤더 */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            위로 성향 분석 결과
          </h1>
          {petInfo?.petName && (
            <p className="text-lg text-gray-600 font-light">
              {petInfo.petName}님과 함께하는 당신의 치유 여정
            </p>
          )}
        </div>

        {/* 페르소나 메인 카드 */}
        <div className="bg-white rounded-3xl p-10 mb-8 shadow-lg border-2 border-gray-100 fade-in">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{personaInfo.icon}</div>
            <div className={`inline-block px-6 py-2 rounded-full ${personaInfo.bgColor} mb-4`}>
              <span className={`font-bold ${personaInfo.textColor} text-lg`}>
                {personaInfo.name}
              </span>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              {personaInfo.description}
            </p>
          </div>

          {/* 특성 */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              주요 특성
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {personaInfo.traits.map((trait, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-gray-700 font-medium text-center">{trait}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 강점 */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4">💪 강점</h3>
            <div className="space-y-3">
              {personaInfo.strengths.map((strength, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                  <span className="text-green-600">✓</span>
                  <p className="text-gray-700 flex-1">{strength}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 성장 영역 */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4">🌱 성장할 영역</h3>
            <div className="space-y-3">
              {personaInfo.growthAreas.map((area, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="text-amber-600">→</span>
                  <p className="text-gray-700 flex-1">{area}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 추천 사항 */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-6 border-2 border-teal-200">
            <h3 className="font-bold text-gray-900 mb-3">💡 맞춤 추천</h3>
            <p className="text-gray-700 leading-relaxed">{personaInfo.recommendation}</p>
          </div>
        </div>

        {/* 차원별 점수 상세 */}
        <div className="bg-white rounded-3xl p-10 mb-8 shadow-lg border-2 border-gray-100 fade-in">
          <h2 className="font-bold text-gray-900 text-xl mb-6 text-center">대처 성향 상세 분석</h2>
          <div className="space-y-6">
            {Object.entries(scores).map(([key, value]) => {
              const info = getDimensionInfo(key);
              return (
                <div key={key}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-medium text-gray-900">{info.label}</span>
                      <p className="text-xs text-gray-500 mt-1">{info.desc}</p>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{value}/4</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full bg-gradient-to-r ${personaInfo.color} transition-all duration-500`}
                      style={{ width: `${(value / 4) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ✨ 간단한 결과지로 보기 버튼 추가 */}
        {onViewShare && (
          <div className="mb-6 fade-in">
            <button
              onClick={onViewShare}
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl font-medium transition-all shadow-md"
            >
              <Share2 className="w-5 h-5" />
              <span>간단한 결과지로 보기</span>
            </button>
          </div>
        )}

        {/* 공유 버튼 */}
        <div className="mb-6 fade-in">
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-3 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
          >
            <Share2 className="w-5 h-5" />
            <span>결과 공유하기</span>
          </button>
        </div>

        {/* 치유 시작 */}
        {onStartChat && (
          <div className="text-center fade-in">
            <button
              onClick={onStartChat}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-full font-medium text-lg hover:from-teal-600 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-lg"
            >
              <Heart className="w-5 h-5" fill="white" strokeWidth={1.5} />
              {petInfo?.petName ? (
                <span>{petInfo.petName}님과 함께하는 치유 시작하기</span>
              ) : (
                <span>맞춤형 치유 시작하기</span>
              )}
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-4 text-sm text-gray-500">
              당신에게 맞는 방식으로 함께 치유해나갑니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NeulPoomScreen2_5_Detail;
