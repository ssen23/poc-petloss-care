import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { psychTests } from '../data/testData';

function TestPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const test = psychTests[testId];
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  if (!test) {
    return <div>테스트를 찾을 수 없습니다.</div>;
  }

  const question = test.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / test.questions.length) * 100;

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 결과/복구를 위해 로컬에 저장 (새로고침/공유 진입 대비)
      try {
        localStorage.setItem(`site1_${testId}_answers`, JSON.stringify(newAnswers));
      } catch (_) {
        // ignore
      }
      // 테스트 완료 - 결과 페이지로 이동
      navigate(`/test/${testId}/result`, { 
        state: { answers: newAnswers }
      });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* 뒤로 가기 버튼 */}
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>이전</span>
        </button>

        {/* 진행률 */}
        <div className="mb-8 fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              {test.title}
            </span>
            <span className="text-sm font-bold text-purple-600">
              {currentQuestion + 1} / {test.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 질문 */}
        <div className="glass-effect rounded-3xl p-8 shadow-xl mb-6 fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {question.question}
            </h2>
            <p className="text-gray-600">
              가장 가까운 답변을 선택해주세요
            </p>
          </div>

          {/* 선택지 */}
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-6 rounded-2xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-800 group-hover:text-purple-600">
                    {option.text}
                  </span>
                  <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 진행 상태 */}
        <div className="text-center text-sm text-gray-500 mb-6">
          <p>💡 직관적으로 선택해주세요!</p>
        </div>

        {/* ✨ 하단 네비게이션 링크 추가 */}
        <div className="mt-8 pt-6 border-t border-gray-200 fade-in">
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
      </div>
    </div>
  );
}

export default TestPage;
