// API 베이스 URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class FetoAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // ===== 사용자 관리 =====
  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUser(userId) {
    return this.request(`/users/${userId}`);
  }

  // ===== AI 채팅 =====
  async sendChatMessage(chatData) {
    return this.request('/chat', {
      method: 'POST',
      body: JSON.stringify(chatData),
    });
  }

  async getConversations(userId, limit = 50) {
    return this.request(`/conversations/${userId}?limit=${limit}`);
  }

  // ===== 테스트 결과 =====
  async saveTestResult(testData) {
    return this.request('/tests/results', {
      method: 'POST',
      body: JSON.stringify(testData),
    });
  }

  async getTestResult(resultId) {
    return this.request(`/tests/results/${resultId}`);
  }

  async getTestStats(testId = null) {
    const query = testId ? `?test_id=${testId}` : '';
    return this.request(`/tests/stats${query}`);
  }
}

export const fetoAPI = new FetoAPI();
export default fetoAPI;
