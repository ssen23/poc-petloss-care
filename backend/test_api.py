"""
백엔드 API 테스트 스크립트
사용법: python test_api.py
"""

import requests
import json

BASE_URL = "http://localhost:8000/api"


def test_health_check():
    """서버 상태 확인"""
    print("\n=== Health Check ===")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
    return response.status_code == 200


def test_create_user():
    """사용자 생성 테스트"""
    print("\n=== Create User ===")
    data = {
        "pet_name": "초코",
        "years_together": "5년 3개월",
        "user_type": "F"
    }
    response = requests.post(f"{BASE_URL}/users", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
    
    if response.status_code == 200:
        return response.json()["id"]
    return None


def test_chat(user_id=None):
    """채팅 테스트"""
    print("\n=== Chat Test ===")
    data = {
        "message": "안녕하세요. 오늘 하루가 너무 힘들었어요.",
        "user_type": "F",
        "pet_name": "초코",
        "years_together": "5년 3개월",
        "conversation_history": [],
        "user_id": user_id
    }
    
    print(f"Sending message: {data['message']}")
    response = requests.post(f"{BASE_URL}/chat", json=data)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"AI Reply: {result['reply']}")
    else:
        print(f"Error: {response.text}")


def test_chat_with_history(user_id=None):
    """대화 히스토리를 포함한 채팅 테스트"""
    print("\n=== Chat with History Test ===")
    data = {
        "message": "더 자세히 설명해줄 수 있나요?",
        "user_type": "F",
        "pet_name": "초코",
        "years_together": "5년 3개월",
        "conversation_history": [
            {
                "role": "user",
                "content": "안녕하세요. 오늘 하루가 너무 힘들었어요."
            },
            {
                "role": "assistant",
                "content": "안녕하세요. 오늘 하루가 많이 힘드셨군요. 초코와의 추억 때문에 더 힘드신가요? 편하게 말씀해주세요. 💙"
            }
        ],
        "user_id": user_id
    }
    
    print(f"Sending message: {data['message']}")
    response = requests.post(f"{BASE_URL}/chat", json=data)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"AI Reply: {result['reply']}")
    else:
        print(f"Error: {response.text}")


def test_save_test_result():
    """테스트 결과 저장"""
    print("\n=== Save Test Result ===")
    data = {
        "test_id": "test3",
        "result_type": "감정 공감형",
        "answers": [0, 1, 0, 0, 1]
    }
    response = requests.post(f"{BASE_URL}/test-results", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")


def test_thinking_type_chat(user_id=None):
    """Thinking 타입 채팅 테스트"""
    print("\n=== Thinking Type Chat Test ===")
    data = {
        "message": "제가 잘못한 게 있을까요?",
        "user_type": "T",
        "pet_name": "뭉치",
        "years_together": "10년",
        "conversation_history": [],
        "user_id": user_id
    }
    
    print(f"Sending message: {data['message']}")
    response = requests.post(f"{BASE_URL}/chat", json=data)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"AI Reply: {result['reply']}")
    else:
        print(f"Error: {response.text}")


def run_all_tests():
    """모든 테스트 실행"""
    print("=" * 60)
    print("Feto Backend API Test Suite")
    print("=" * 60)
    
    # 1. 헬스 체크
    if not test_health_check():
        print("\n❌ Server is not running or unhealthy!")
        print("Please start the server with: python main.py")
        return
    
    print("\n✅ Server is healthy!")
    
    # 2. 사용자 생성
    user_id = test_create_user()
    
    # 3. 채팅 테스트 (Feeling 타입)
    test_chat(user_id)
    
    # 4. 대화 히스토리 포함 채팅
    test_chat_with_history(user_id)
    
    # 5. Thinking 타입 채팅
    test_thinking_type_chat(user_id)
    
    # 6. 테스트 결과 저장
    test_save_test_result()
    
    print("\n" + "=" * 60)
    print("All tests completed!")
    print("=" * 60)


if __name__ == "__main__":
    try:
        run_all_tests()
    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Cannot connect to server!")
        print("Please make sure the server is running on http://localhost:8000")
        print("Start server with: python main.py")
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
