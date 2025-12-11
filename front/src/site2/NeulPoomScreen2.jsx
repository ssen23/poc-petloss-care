import React, { useState } from 'react';
import { Sparkles, Check, AlertCircle } from 'lucide-react';

function NeulPoomScreen2({ onComplete }) {
  const [surveyAnswers, setSurveyAnswers] = useState({});

  const surveyQuestions = [
    { id: 1, question: "복잡한 문제가 발생하면, 감정 정리보다 상황을 개선할 구체적인 단계나 계획을 먼저 세우는 데 집중합니다.", dimension: "문제해결 지향" },
    { id: 2, question: "위로를 받을 때, 상대방이 내 감정을 깊이 공감하며 충분히 경청해주는 것이 가장 중요합니다.", dimension: "정서적 지지" },
    { id: 3, question: "힘든 일을 겪은 후에도, 이 경험이 미래에 긍정적인 영향을 줄 수 있다고 생각하려고 노력합니다.", dimension: "인지적 유연성" },
    { id: 4, question: "조언을 구할 때, 실질적인 정보나 명확한 방법론이 포함된 답변을 기대합니다.", dimension: "문제해결 지향" },
    { id: 5, question: "마음의 고통이 클 때, 감정을 숨기지 않고 주변 사람들에게 충분히 토로해야 해소됩니다.", dimension: "정서적 지지" },
    { id: 6, question: "현재의 어려움뿐만 아니라, 앞으로 닥칠 잠재적인 문제에 미리 대비하여 계획을 세우는 것이 중요하다고 생각합니다.", dimension: "계획 지향성" },
    { id: 7, question: "어려움에 대해 이야기할 때, 감정적인 부분보다 상황 자체를 객관적으로 분석해 줄 사람을 찾습니다.", dimension: "문제해결 지향" },
    { id: 8, question: "괴로운 감정이나 생각을 억지로 떨쳐내려 애쓰기보다, 그냥 그 감정을 느끼는 것을 허용합니다.", dimension: "인지적 유연성" },
    { id: 9, question: "힘든 상황을 겪을 때, 과거의 행복했던 기억을 되짚어보며 위안을 얻으려고 합니다.", dimension: "계획 지향성" },
    { id: 10, question: "도저히 해결할 수 없는 일이라고 느껴지면, 모든 것을 포기하거나 외면하고 싶어집니다.", dimension: "회피 경향" },
    { id: 11, question: "상황을 개선할 수 없더라도, 나쁜 일에 대한 나의 시각을 바꾸려고 노력하여 상황을 덜 고통스럽게 만듭니다.", dimension: "인지적 유연성" },
    { id: 12, question: "일이 잘못되었을 때, 이 모든 것이 나의 잘못이거나 실수 때문이라고 자책하는 경향이 있습니다.", dimension: "자책 경향" }
  ];

  const scaleLabels = ["전혀 그렇지 않다", "조금 그렇다", "자주 그렇다", "매우 그렇다"];

  const handleSurveyAnswer = (questionId, score) => {
    setSurveyAnswers({ ...surveyAnswers, [questionId]: score });
  };

  const handleComplete = () => {
    if (Object.keys(surveyAnswers).length === 12) {
      const answersArray = [];
      for (let i = 1; i <= 12; i++) {
        answersArray.push(surveyAnswers[i]);
      }
      onComplete({ answers: answersArray });
    }
  };

  const isComplete = Object.keys(surveyAnswers).length === 12;
  const progress = (Object.keys(surveyAnswers).length / 12) * 100;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto py-12">
        <div className="mb-12 fade-in">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">진행률</span>
            <span className="text-sm font-medium text-gray-900">{Object.keys(surveyAnswers).length} / 12</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-2xl mb-6">
            <Sparkles className="w-7 h-7 text-gray-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">나에게 맞는 위로 찾기</h1>
          <p className="text-lg text-gray-600 font-light">당신에게 가장 적합한 위로의 방식을 찾아드릴게요.</p>
        </div>

        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-8 fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-teal-900">
              <p className="font-medium mb-1">평소 당신의 모습을 떠올리며 답변해주세요</p>
              <p className="text-teal-700">정답은 없습니다. 솔직하게 응답하시면 더 정확한 위로를 받으실 수 있어요.</p>
            </div>
          </div>
        </div>

        <div className="space-y-12 mb-12">
          {surveyQuestions.map((q, idx) => (
            <div key={q.id} className="fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <div className="mb-6">
                <div className="flex items-start gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white text-sm font-medium shadow-sm flex-shrink-0">{idx + 1}</span>
                  <div>
                    <p className="text-base font-medium text-gray-900 leading-relaxed">{q.question}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">측정 차원: {q.dimension}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {scaleLabels.map((label, scoreIdx) => {
                  const score = scoreIdx + 1;
                  const isSelected = surveyAnswers[q.id] === score;
                  return (
                    <button
                      key={scoreIdx}
                      onClick={() => handleSurveyAnswer(q.id, score)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${isSelected ? 'border-teal-500 bg-teal-50 shadow-sm' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className={`text-sm font-medium ${isSelected ? 'text-teal-700' : 'text-gray-700'}`}>{score}점</span>
                        <span className={`text-xs ${isSelected ? 'text-teal-600' : 'text-gray-500'}`}>{label}</span>
                        {isSelected && <Check className="w-5 h-5 text-teal-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {isComplete && (
          <div className="text-center fade-in sticky bottom-6">
            <button
              onClick={handleComplete}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-full font-medium text-lg hover:from-teal-600 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              <span>진단 완료하기</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NeulPoomScreen2;
