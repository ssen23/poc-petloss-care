import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NeulPoomScreen1 from './NeulPoomScreen1';
import NeulPoomScreen2 from './NeulPoomScreen2';
import NeulPoomScreen2_5_Choice from './NeulPoomScreen2_5_Choice';
import NeulPoomScreen2_5_Share from './NeulPoomScreen2_5_Share';
import NeulPoomScreen2_5_Detail from './NeulPoomScreen2_5_Detail';
import NeulPoomScreen3 from './NeulPoomScreen3';
import NeulPoomScreen4 from './NeulPoomScreen4';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function NeulPoomApp({ savedUserData }) {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState('diagnosis');
  const [petInfo, setPetInfo] = useState({ 
    guardianName: '',  // ✨ 추가
    petName: '', 
    yearsTogether: '',
    species: '반려동물',
    careStatus: 'LOSS'
  });
  const [userId, setUserId] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [fromChat, setFromChat] = useState(false);

  // 재방문 사용자 처리
  useEffect(() => {
    if (savedUserData) {
      setUserId(savedUserData.user_id);
      setPetInfo({
        guardianName: savedUserData.nickname || '보호자님',  // ✨ 추가
        petName: savedUserData.pet_name || '반려동물',
        yearsTogether: '함께한 시간',
        species: '반려동물',
        careStatus: savedUserData.care_status || 'LOSS'
      });
      
      if (savedUserData.persona) {
        setDiagnosisResult({
          persona: savedUserData.persona,
          dimension_scores: savedUserData.dimension_scores
        });
      }
      
      setCurrentScreen('chat');
    }
  }, [savedUserData]);

  // Screen2 완료: 진단표 제출
  const handleDiagnosisComplete = async (data) => {
    try {
      const tempDiagnosis = {
        answers: data.answers,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('temp_diagnosis', JSON.stringify(tempDiagnosis));
      
      const mockResult = calculateMockResult(data.answers);
      setDiagnosisResult(mockResult);
      
      setCurrentScreen('choice');
    } catch (error) {
      console.error('❌ 진단 계산 오류:', error);
      alert('진단 처리 중 오류가 발생했습니다.');
    }
  };

  const calculateMockResult = (answers) => {
    const avg = answers.reduce((a, b) => a + b, 0) / answers.length;
    const persona = avg > 3 ? 'LISTENER' : avg > 2.5 ? 'MENTOR' : 'PARTNER';
    
    return {
      persona: persona,
      dimension_scores: {
        problem_solving: 3.2,
        emotional_support: 3.8,
        cognitive_flexibility: 2.9,
        planning_orientation: 3.1,
        avoidance: 2.0,
        self_blame: 1.8
      },
      coping_style: 'emotion_focused',
      risk_level: 'low'
    };
  };

  // Choice: 공유용 결과지
  const handleViewShareResult = () => {
    setFromChat(false);
    setCurrentScreen('share');
  };

  // Choice: 설명용 결과지
  const handleViewDetailResult = () => {
    if (userId) {
      setFromChat(false);
      setCurrentScreen('detail');
    } else {
      alert('자세한 설명용 결과지는 정보 입력 후 이용할 수 있습니다.');
      setCurrentScreen('input');
    }
  };

  // Choice: 정보입력
  const handleGoToInput = () => {
    setCurrentScreen('input');
  };

  // Choice: 홈페이지로
  const handleGoToHome = () => {
    navigate('/neulpoom');
  };

  // Input: 뒤로가기 → Choice
  const handleBackToChoice = () => {
    setCurrentScreen('choice');
  };

  // Screen1 완료: 정보 입력
  const handleInputComplete = async (data) => {
    try {
      setPetInfo({
        guardianName: data.guardianName,  // ✨ 추가
        petName: data.petName,
        yearsTogether: data.yearsTogether,
        species: data.species || '반려동물',
        careStatus: data.careStatus || 'LOSS'
      });

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: data.guardianName,  // ✨ 변경: 사용자가 입력한 이름 사용
          pet_name: data.petName,
          species: data.species || '반려동물',
          care_status: data.careStatus || 'LOSS',
          years_together: data.yearsTogether
        })
      });

      if (!response.ok) throw new Error('사용자 생성 실패');

      const result = await response.json();
      setUserId(result.id);
      localStorage.setItem('neulpoom_user_id', result.id);

      const tempDiagnosis = localStorage.getItem('temp_diagnosis');
      if (tempDiagnosis) {
        const diagData = JSON.parse(tempDiagnosis);
        
        const diagResponse = await fetch(`${API_BASE_URL}/diagnosis`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: result.id,
            answers: diagData.answers
          })
        });

        if (diagResponse.ok) {
          const diagResult = await diagResponse.json();
          setDiagnosisResult(diagResult);
          localStorage.removeItem('temp_diagnosis');
        }
      }
      
      setFromChat(false);
      setCurrentScreen('detail');
    } catch (error) {
      console.error('❌ 정보 입력 오류:', error);
      alert('정보 저장 중 오류가 발생했습니다.');
    }
  };

  // 치유 시작
  const handleStartChat = () => {
    setFromChat(false);
    setCurrentScreen('chat');
  };

  // 채팅에서 결과지 보기
  const handleViewResultFromChat = () => {
    setFromChat(true);
    setCurrentScreen('detail');
  };

  // Detail → Share
  const handleDetailToShare = () => {
    setCurrentScreen('share');
  };

  // Share → Detail
  const handleShareToDetail = () => {
    setCurrentScreen('detail');
  };

  // Detail/Share에서 뒤로가기
  const handleBackFromResult = () => {
    if (fromChat) {
      if (currentScreen === 'share') {
        setCurrentScreen('detail');
      } else {
        setFromChat(false);
        setCurrentScreen('chat');
      }
    } else {
      if (userId) {
        setCurrentScreen('chat');
      } else {
        setCurrentScreen('choice');
      }
    }
  };

  // 다음 치유 여정
  const handleNextJourney = () => {
    setFromChat(false);
    setCurrentScreen('journey');
  };

  // 여정에서 채팅으로
  const handleBackToChat = () => {
    setCurrentScreen('chat');
  };

  // 초기화 (경고 강화)
  const handleReset = () => {
    const petName = petInfo.petName || '반려동물';
    
    // 첫 번째 경고
    const firstConfirm = window.confirm(
      `⚠️ 정말 초기화하시겠습니까?\n\n` +
      `초기화하면 다음 정보가 모두 삭제됩니다:\n` +
      `• ${petName}님과의 대화 기록\n` +
      `• 위로 성향 진단 결과\n` +
      `• 입력하신 정보\n\n` +
      `이 작업은 되돌릴 수 없습니다.`
    );
    
    if (!firstConfirm) {
      return;
    }
    
    // 두 번째 경고 (재확인)
    const secondConfirm = window.confirm(
      `🔴 마지막 확인\n\n` +
      `정말로 ${petName}님과의 모든 기록을 삭제하시겠습니까?\n\n` +
      `삭제된 데이터는 복구할 수 없습니다.`
    );
    
    if (secondConfirm) {
      // 초기화 실행
      localStorage.removeItem('neulpoom_user_id');
      localStorage.removeItem('temp_diagnosis');
      setUserId(null);
      setPetInfo({ 
        guardianName: '',  // ✨ 추가
        petName: '', 
        yearsTogether: '', 
        species: '반려동물', 
        careStatus: 'LOSS' 
      });
      setDiagnosisResult(null);
      setFromChat(false);
      setCurrentScreen('diagnosis');
      alert('✅ 초기화가 완료되었습니다.');
    }
  };

  return (
    <div className="app">
      {(currentScreen === 'chat' || currentScreen === 'journey') && (
        <button
          onClick={handleReset}
          className="fixed top-4 right-4 z-50 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 text-xs rounded-lg transition-all font-medium"
          title="모든 데이터를 초기화합니다"
        >
          🔄 초기화
        </button>
      )}

      {currentScreen === 'diagnosis' && (
        <NeulPoomScreen2 onComplete={handleDiagnosisComplete} />
      )}

      {currentScreen === 'choice' && (
        <NeulPoomScreen2_5_Choice
          diagnosisResult={diagnosisResult}
          onViewShare={handleViewShareResult}
          onViewDetail={handleViewDetailResult}
          onGoToInput={handleGoToInput}
          onGoToHome={handleGoToHome}
        />
      )}

      {currentScreen === 'share' && (
        <NeulPoomScreen2_5_Share
          diagnosisResult={diagnosisResult}
          onStartChat={handleStartChat}
          onBack={handleBackFromResult}
          onViewDetail={fromChat ? handleShareToDetail : null}
        />
      )}

      {currentScreen === 'detail' && (
        <NeulPoomScreen2_5_Detail
          petInfo={petInfo}
          diagnosisResult={diagnosisResult}
          onStartChat={handleStartChat}
          onBack={handleBackFromResult}
          onViewShare={fromChat ? handleDetailToShare : null}
        />
      )}

      {currentScreen === 'input' && (
        <NeulPoomScreen1 
          onComplete={handleInputComplete}
          onBack={handleBackToChoice}
        />
      )}

      {currentScreen === 'chat' && (
        <NeulPoomScreen3
          petInfo={petInfo}
          userId={userId}
          diagnosisResult={diagnosisResult}
          onViewResult={handleViewResultFromChat}
          onNextJourney={handleNextJourney}
        />
      )}

      {currentScreen === 'journey' && (
        <NeulPoomScreen4 petInfo={petInfo} onBack={handleBackToChat} />
      )}
    </div>
  );
}

export default NeulPoomApp;
