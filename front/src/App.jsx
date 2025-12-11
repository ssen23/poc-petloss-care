import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Site 1 - 바이럴 테스트
import Site1Landing from './site1/Site1Landing';
import TestPage from './site1/TestPage';
import TestResult from './site1/TestResult';

// Site 2 - 늘품 플랫폼
import NeulPoomLanding from './site2/NeulPoomLanding';
import NeulPoomApp from './site2/NeulPoomApp';

// ✨ 새로 추가된 페이지들
import TrustPage from './site2/TrustPage';
import ServicePage from './site2/ServicePage';
import PartnersPage from './site2/PartnersPage';
import ReviewsPage from './site2/ReviewsPage';

// API 설정
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const [savedUserData, setSavedUserData] = useState(null);

  // ✅ 앱 시작 시 재방문 사용자 체크
  useEffect(() => {
    const checkReturningUser = async () => {
      // 늘품 관련 페이지가 아니면 체크 스킵
      if (!location.pathname.includes('/neulpoom') && !location.pathname.includes('/feto')) {
        setIsCheckingUser(false);
        return;
      }

      try {
        // 1. localStorage에서 저장된 userId 확인
        const savedUserId = localStorage.getItem('neulpoom_user_id');
        
        if (savedUserId) {
          console.log('✅ 저장된 사용자 ID 발견:', savedUserId);
          
          // 2. 서버에 사용자 정보 요청
          const response = await fetch(`${API_BASE_URL}/users/${savedUserId}`);
          
          if (response.ok) {
            const userData = await response.json();
            console.log('✅ 사용자 정보 로드 성공:', userData);
            
            setSavedUserData(userData);
            
            // 3. 온보딩 페이지에 있다면 자동으로 앱으로 이동 (재방문)
            if (location.pathname === '/neulpoom/onboarding' || location.pathname === '/feto/onboarding') {
              console.log('🚀 재방문 사용자 - 채팅 화면으로 자동 이동');
              // NeulPoomApp에서 자동으로 Screen3으로 이동하도록 설정
            }
          } else {
            // 서버에 사용자가 없으면 localStorage 정리
            console.log('⚠️ 서버에 사용자 정보 없음 - localStorage 정리');
            localStorage.removeItem('neulpoom_user_id');
            setSavedUserData(null);
          }
        } else {
          console.log('ℹ️ 신규 사용자 - 온보딩 필요');
        }
      } catch (error) {
        console.error('❌ 재방문 사용자 체크 실패:', error);
      } finally {
        setIsCheckingUser(false);
      }
    };

    checkReturningUser();
  }, [location.pathname]);

  // 로딩 중 화면
  if (isCheckingUser && (location.pathname.includes('/neulpoom') || location.pathname.includes('/feto'))) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">잠시만 기다려주세요...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* 사이트 1: 바이럴 심리 테스트 */}
      <Route path="/" element={<Site1Landing />} />
      <Route path="/test/:testId" element={<TestPage />} />
      <Route path="/test/:testId/result" element={<TestResult />} />

      {/* 사이트 2: 늘품 플랫폼 */}
      <Route path="/neulpoom" element={<NeulPoomLanding />} />
      <Route 
        path="/neulpoom/onboarding" 
        element={<NeulPoomApp savedUserData={savedUserData} />} 
      />
      
      {/* ✨ 새로 추가된 페이지들 */}
      <Route path="/trust" element={<TrustPage />} />
      <Route path="/service" element={<ServicePage />} />
      <Route path="/partners" element={<PartnersPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      
      {/* 기존 페토 라우트 리다이렉트 (하위 호환성) */}
      <Route path="/feto" element={<NeulPoomLanding />} />
      <Route 
        path="/feto/onboarding" 
        element={<NeulPoomApp savedUserData={savedUserData} />} 
      />
    </Routes>
  );
}

export default App;
