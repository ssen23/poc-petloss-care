import React, { useState } from 'react';
import { Heart, ArrowRight, ArrowLeft, Shield, User } from 'lucide-react';

function NeulPoomScreen1({ onComplete, onBack }) {
  const [guardianName, setGuardianName] = useState(''); // ✨ 보호자 이름 추가
  const [petName, setPetName] = useState('');
  const [yearsTogether, setYearsTogether] = useState('');
  const [species, setSpecies] = useState('강아지');
  const [careStatus, setCareStatus] = useState('LOSS');
  const [agreeToDataCollection, setAgreeToDataCollection] = useState(false);

  const handleNext = () => {
    if (guardianName && petName && yearsTogether && agreeToDataCollection) {
      onComplete({ 
        guardianName,  // ✨ 추가
        petName, 
        yearsTogether,
        species,
        careStatus
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* 뒤로가기 버튼 */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>이전으로</span>
          </button>
        )}

        {/* 헤더 */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex flex-col items-center mb-8">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-md">
              <Heart className="w-8 h-8 text-white" strokeWidth={1.5} fill="white" />
            </div>
            <h1 className="text-2xl font-light tracking-wider text-gray-900">늘품</h1>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-relaxed">
            펫의 기억,<br />
            그리고 나의 치유를 시작합니다
          </h2>
          <p className="text-lg text-gray-600 font-light">
            당신만을 위한 맞춤형 감정 케어
          </p>
        </div>

        {/* 입력 폼 */}
        <div className="bg-white rounded-3xl p-8 md:p-12 fade-in shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-light text-lg shadow-sm">
              1
            </div>
            <h3 className="text-2xl font-light text-gray-900">함께한 시간을 기억하며</h3>
          </div>
          
          <div className="space-y-6">
            {/* ✨ 보호자 이름 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>보호자님의 이름 또는 호칭</span>
                </div>
              </label>
              <input
                type="text"
                placeholder="예) 민수님, 지은씨, 엄마..."
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all text-gray-900"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-2">AI가 당신을 부를 때 사용할 이름입니다</p>
            </div>

            {/* 반려동물 이름 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                사랑했던 반려동물의 이름
              </label>
              <input
                type="text"
                placeholder="예) 초코, 뭉치, 나비..."
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all text-gray-900"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
              />
            </div>

            {/* 종 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                반려동물의 종류
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['강아지', '고양이'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSpecies(type)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      species === type
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className={`font-medium ${
                      species === type ? 'text-teal-700' : 'text-gray-700'
                    }`}>
                      {type}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 현재 상태 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                현재 상황
              </label>
              <div className="space-y-3">
                <button
                  onClick={() => setCareStatus('LOSS')}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    careStatus === 'LOSS'
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">사별 (펫로스)</div>
                  <div className="text-sm text-gray-600 mt-1">무지개다리를 건넌 아이를 그리워하고 있어요</div>
                </button>
                
                <button
                  onClick={() => setCareStatus('ANTICIPATORY')}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    careStatus === 'ANTICIPATORY'
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">예기 애도 (이별 준비)</div>
                  <div className="text-sm text-gray-600 mt-1">노령이나 투병 중이며 이별을 준비하고 있어요</div>
                </button>
                
                <button
                  onClick={() => setCareStatus('CARE')}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    careStatus === 'CARE'
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">일반 양육/돌봄</div>
                  <div className="text-sm text-gray-600 mt-1">현재 함께 지내며 양육의 어려움을 겪고 있어요</div>
                </button>
              </div>
            </div>
            
            {/* 함께한 시간 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                함께한 시간
              </label>
              <input
                type="text"
                placeholder="예) 5년 3개월, 10년, 약 8년..."
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all text-gray-900"
                value={yearsTogether}
                onChange={(e) => setYearsTogether(e.target.value)}
              />
            </div>

            {/* 개인정보 수집 동의 */}
            <div className="pt-6 border-t border-gray-200">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">개인정보 수집 및 이용 동의</h4>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>• <strong>수집 항목:</strong> 보호자 이름, 반려동물 이름, 종류, 현재 상황, 함께한 시간, 대화 내용</p>
                      <p>• <strong>수집 목적:</strong> 맞춤형 감정 케어 및 위로 제공</p>
                      <p>• <strong>보유 기간:</strong> 서비스 이용 기간 동안</p>
                      <p className="text-xs text-gray-500 mt-3">
                        위 개인정보 수집 및 이용에 동의하지 않을 수 있으나, 동의하지 않을 경우 서비스 이용이 제한됩니다.
                      </p>
                    </div>
                  </div>
                </div>
                
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreeToDataCollection}
                    onChange={(e) => setAgreeToDataCollection(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-900 group-hover:text-teal-600 transition-colors">
                    개인정보 수집 및 이용에 동의합니다 (필수)
                  </span>
                </label>
              </div>
            </div>
            
            <button
              onClick={handleNext}
              disabled={!guardianName || !petName || !yearsTogether || !agreeToDataCollection}
              className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-4 rounded-xl font-medium hover:from-teal-600 hover:to-emerald-700 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-8 shadow-md"
            >
              <span>다음 단계로</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 안내 문구 */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>당신의 소중한 추억을 함께 간직하겠습니다</p>
        </div>
      </div>
    </div>
  );
}

export default NeulPoomScreen1;
