import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Share2, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { psychTests, calculateResult, calculateResultKey } from '../data/testData';
import fetoAPI from '../services/api';

function TestResult() {
  const { testId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const test = psychTests[testId];

  const [copied, setCopied] = useState(false);

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const explicitResultKey = searchParams.get('r');

  const answers = useMemo(() => {
    const stateAnswers = location.state?.answers;
    if (Array.isArray(stateAnswers) && stateAnswers.length > 0) return stateAnswers;

    // 새로고침/공유 링크 진입 시 로컬 저장 값으로 복구
    try {
      const raw = localStorage.getItem(`site1_${testId}_answers`);
      const parsed = JSON.parse(raw || 'null');
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (_) {
      // ignore
    }
    return [];
  }, [location.state, testId]);

  const resultKey = useMemo(() => {
    if (explicitResultKey && test?.results?.[explicitResultKey]) return explicitResultKey;
    return calculateResultKey(answers);
  }, [answers, explicitResultKey, test]);

  const result = useMemo(() => calculateResult(answers, testId, resultKey), [answers, testId, resultKey]);

  const isTest3 = testId === 'test3';

  const hasAnswers = Array.isArray(answers) && answers.length > 0;

  useEffect(() => {
    // 답변이 있을 때만 (공유 링크로 결과만 보는 케이스는 스킵)
    if (!hasAnswers || !result?.type) return;

    // dev(StrictMode/HMR)에서 effect가 여러 번 실행되며 fetch가 반복되는 걸 방지
    // - sessionStorage는 새로고침/핫리로드에도 남아서 "중복 저장"을 막음
    const dedupeKey = `site1_saved:${testId}:${resultKey}:${answers.join(',')}`;
    try {
      const already = sessionStorage.getItem(dedupeKey);
      if (already === '1') return;
      sessionStorage.setItem(dedupeKey, '1');
    } catch (_) {
      // ignore
    }

    saveTestResult();
  }, []);

  const saveTestResult = async () => {
    try {
      await fetoAPI.saveTestResult({
        test_id: testId,
        result_type: result.type,
        result_key: resultKey,
        answers: answers
      });
      console.log('테스트 결과 저장 완료');
    } catch (error) {
      // 백엔드 미기동/네트워크/CORS 상황에서 흔히 발생 (POC에서는 UX에 영향 없게 조용히 처리)
      console.warn('테스트 결과 저장 실패(백엔드 미구동 가능):', error);
    }
  };

  const getShareUrl = () => {
    const origin = window.location.origin;
    const key = resultKey;
    return `${origin}/test/${testId}/result?r=${encodeURIComponent(key || '')}&utm_source=share`;
  };

  const shareText = useMemo(() => {
    const title = result?.title || '심리 테스트 결과';
    const traits = Array.isArray(result?.traits) ? result.traits.slice(0, 3).map((t) => `#${t}`).join(' ') : '';
    const hook = '너도 해보고 결과 공유해줘!';
    return [title, traits, hook].filter(Boolean).join('\n').trim();
  }, [result]);

  const handleCopyLink = async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // clipboard API가 막힌 환경 fallback
      window.prompt('아래 링크를 복사해 공유하세요:', url);
    }
  };

  const handleNativeShare = async () => {
    const url = getShareUrl();
    const title = test?.title || '심리 테스트 결과';
    const text = shareText || '테스트 결과를 확인해보세요!';

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (_) {
        // 사용자가 취소한 경우 포함 - fallback로 링크 복사 제공
      }
    }
    await handleCopyLink();
  };

  const recommendedTests = useMemo(() => {
    return Object.values(psychTests)
      .filter((t) => t?.id && t.id !== testId)
      .sort((a, b) => {
        const aCore = a?.isCore ? 1 : 0;
        const bCore = b?.isCore ? 1 : 0;
        if (aCore !== bCore) return bCore - aCore;
        return String(a.id).localeCompare(String(b.id));
      })
      .slice(0, 2);
  }, [testId]);

  const uiMetaByTestId = {
    test1: { icon: '🐾', gradient: 'from-blue-400 to-cyan-400' },
    test2: { icon: '🦁', gradient: 'from-purple-400 to-pink-400' },
    test3: { icon: '💝', gradient: 'from-rose-400 to-orange-400' },
  };

  if (!test) {
    return <div className="min-h-screen p-6">테스트를 찾을 수 없습니다.</div>;
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 shadow-2xl mb-8 fade-in text-center">
            <h1 className="heading-font text-3xl font-bold text-gray-800 mb-3">결과를 불러올 수 없어요</h1>
            <p className="text-gray-600 mb-6">
              링크로만 진입한 경우, 결과를 다시 계산하려면 테스트를 진행해야 합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate(`/test/${testId}`)}
                className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                테스트 다시하기
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-4 bg-white text-gray-800 rounded-xl font-semibold border-2 border-gray-200 hover:shadow-lg transition-all"
              >
                홈으로
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Share2 className="w-5 h-5" />
              공유하기
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Share2 className="w-5 h-5" />
              {copied ? '링크 복사됨!' : '링크 복사'}
            </button>
          </div>
        </div>

        {/* 다른 테스트 CTA */}
        <div className="mb-8 fade-in" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">다른 테스트도 해볼래요?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {recommendedTests.map((t) => {
              const ui = uiMetaByTestId[t.id] || { icon: '✨', gradient: 'from-gray-400 to-slate-400' };
              return (
                <button
                  key={t.id}
                  onClick={() => navigate(`/test/${t.id}`)}
                  className="text-left bg-white rounded-2xl p-5 border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {/* 아이콘 + 그라데이션 배경 "겹치기" */}
                    <div className="relative w-10 h-10 shrink-0">
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${ui.gradient} opacity-20`} />
                      <span className="absolute inset-0 flex items-center justify-center text-2xl">
                        {ui.icon}
                      </span>
                    </div>
                  </div>
                  <div className="font-bold text-gray-900">{t.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{t.description}</div>
                </button>
              );
            })}
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
