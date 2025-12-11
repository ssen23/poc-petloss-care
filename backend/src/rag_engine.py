"""
늘품 RAG 검색 엔진 v2.1
Multi-Intent Support + Flexible Parsing
"""

import json
import os
from typing import List, Dict, Any, Optional
import re

class NeulPoomRAG:
    """
    늘품 RAG 검색 엔진 v2.1
    - 복합 Intent 지원 (한 질문에 여러 의도)
    - 죄책감 감지 시 자동으로 medical_comfort_facts 검색
    """
    
    def __init__(self, data_dir="./data"):
        self.data_dir = data_dir
        self.core_logic = {}
        self.exoneration_facts = {}  # ✨ 02_domain_knowledge → 02_exoneration_facts
        self.structured_data = {}
        
        # 데이터 로딩
        self._load_all_data()
    
    def _load_all_data(self):
        """모든 데이터 로딩"""
        print("🔄 RAG 데이터 로딩 중...")
        
        # 1. Core Logic (상담 프로토콜, CBT, Continuing Bonds)
        core_path = os.path.join(self.data_dir, "01_core_logic")
        if os.path.exists(core_path):
            self.core_logic = self._load_markdown(core_path)
            print(f"✅ Core Logic: {len(self.core_logic)}개 파일")
        
        # 2. Exoneration Facts (죄책감 해소 팩트)
        exoneration_path = os.path.join(self.data_dir, "02_exoneration_facts")
        if os.path.exists(exoneration_path):
            self.exoneration_facts = self._load_markdown(exoneration_path)
            print(f"✅ Exoneration Facts: {len(self.exoneration_facts)}개 파일")
        else:
            # 하위 호환: 02_domain_knowledge도 시도
            domain_path = os.path.join(self.data_dir, "02_domain_knowledge")
            if os.path.exists(domain_path):
                self.exoneration_facts = self._load_markdown(domain_path)
                print(f"⚠️ Domain Knowledge (legacy): {len(self.exoneration_facts)}개 파일")
        
        # 3. Structured Data (JSON)
        structured_path = os.path.join(self.data_dir, "03_structured_data")
        if os.path.exists(structured_path):
            self.structured_data = self._load_json(structured_path)
            print(f"✅ Structured Data: {len(self.structured_data)}개 파일")
        
        print("✅ RAG 데이터 로딩 완료!")
    
    def _load_markdown(self, path: str) -> Dict[str, str]:
        """Markdown 파일 로딩"""
        files = {}
        if os.path.exists(path):
            for filename in os.listdir(path):
                if filename.endswith('.md'):
                    filepath = os.path.join(path, filename)
                    with open(filepath, 'r', encoding='utf-8') as f:
                        files[filename] = f.read()
        return files
    
    def _load_json(self, path: str) -> Dict[str, Any]:
        """JSON 파일 로딩"""
        files = {}
        if os.path.exists(path):
            for filename in os.listdir(path):
                if filename.endswith('.json'):
                    filepath = os.path.join(path, filename)
                    with open(filepath, 'r', encoding='utf-8') as f:
                        files[filename] = json.load(f)
        return files
    
    def search(
        self, 
        query: str, 
        intent: str = "auto",
        max_results: int = 3
    ) -> Dict[str, Any]:
        """
        통합 검색 (복합 Intent 지원)
        
        Args:
            query: 사용자 질문
            intent: "emotional", "factual", "service", "guilt", "auto"
            max_results: 각 카테고리별 최대 결과 수
        
        Returns:
            {
                "core_logic": [...],
                "exoneration_facts": [...],
                "structured_data": [...],
                "detected_intents": [...]  # ✨ 복수형!
            }
        """
        # Intent 자동 감지 (복수 반환)
        if intent == "auto":
            intents = self._detect_intents(query)  # ✨ 복수형 함수
        else:
            intents = [intent]
        
        results = {
            "core_logic": [],
            "exoneration_facts": [],
            "structured_data": [],
            "detected_intents": intents  # ✨ 리스트로 저장
        }
        
        # 1. 감정/상담 관련 → Core Logic 검색
        if "emotional" in intents or "auto" in intents:
            results["core_logic"] = self._search_core_logic(query, max_results)
        
        # 2. 죄책감 관련 → Exoneration Facts 검색 (우선순위 높음)
        if "guilt" in intents:
            results["exoneration_facts"] = self._search_exoneration_facts(query, max_results)
        
        # 3. 정보/지식 관련 → Exoneration Facts 검색
        if "factual" in intents:
            # factual이지만 죄책감 키워드가 있으면 exoneration_facts도 검색
            if not results["exoneration_facts"]:  # 아직 안 찾았으면
                results["exoneration_facts"] = self._search_exoneration_facts(query, max_results)
        
        # 4. 서비스/업체 관련 → Structured Data 검색
        if "service" in intents or "auto" in intents:
            results["structured_data"] = self._search_structured_data(query, max_results)
        
        return results
    
    def _detect_intents(self, query: str) -> List[str]:
        """
        질문 의도 파악 (복합 Intent 지원)
        
        Returns:
            List[str]: 감지된 모든 의도들
        """
        intents = []
        query_lower = query.lower()
        
        # 우선순위 1: 죄책감 (가장 중요!)
        guilt_keywords = [
            "미안", "죄책감", "내 탓", "잘못", "후회",
            "늦게", "놓쳤", "알았어야", "조급했나",
            "너무 일찍", "너무 늦게", "살렸을", "죽인"
        ]
        if any(k in query_lower for k in guilt_keywords):
            intents.append("guilt")
        
        # 우선순위 2: 서비스 (명확한 요청)
        service_keywords = [
            "장례", "식장", "상담", "추천", "어디", "전화", "예약", "가격",
            "도움", "받고 싶", "연결", "찾아", "핫라인", "센터",
            "상담사", "전문가", "병원", "치료", "문의", "알려"
        ]
        if any(k in query_lower for k in service_keywords):
            intents.append("service")
        
        # 우선순위 3: 정보 (질병, 법률)
        factual_keywords = [
            "증상", "질병", "신부전", "심장", "심장병", "암",
            "법률", "등록", "말소", "보험",
            "경련", "호흡", "요독", "발작", "행정", "신고"
        ]
        if any(k in query_lower for k in factual_keywords):
            intents.append("factual")
        
        # 우선순위 4: 감정 (기본값)
        emotional_keywords = [
            "슬프", "죄책감", "힘들", "괴롭", "우울", "미안", "보고 싶",
            "그리", "외로", "아프", "무너", "눈물", "울", "견디",
            "힘들어", "괴로워", "슬퍼", "아파"
        ]
        if any(k in query_lower for k in emotional_keywords):
            intents.append("emotional")
        
        # 아무것도 없으면 기본적으로 emotional (공감이 베이스)
        if not intents:
            intents.append("emotional")
        
        # 중복 제거
        return list(set(intents))
    
    def _search_core_logic(self, query: str, max_results: int) -> List[Dict]:
        """
        Core Logic 검색 (상담 프로토콜, CBT, Continuing Bonds)
        키워드 매칭 + 유연한 파싱
        """
        matches = []
        query_lower = query.lower()
        
        for filename, content in self.core_logic.items():
            # CHUNK 단위로 분할 (유연한 파싱)
            # ### [CHUNK, ###[CHUNK, ## [CHUNK 모두 허용
            chunks = re.split(r'###+\s*\[?CHUNK', content, flags=re.IGNORECASE)
            
            for i, chunk in enumerate(chunks[1:], start=1):  # CHUNK 1부터
                # 메타데이터 추출
                metadata_match = re.search(r'\*\*Metadata:\*\*\n(.*?)\n\n', chunk, re.DOTALL)
                keywords = []
                if metadata_match:
                    metadata_text = metadata_match.group(1)
                    keyword_match = re.search(r'Keywords?:\s*(.+)', metadata_text, re.IGNORECASE)
                    if keyword_match:
                        keywords = [k.strip() for k in keyword_match.group(1).split(',')]
                
                # 키워드 매칭
                score = 0
                for keyword in keywords:
                    if keyword.lower() in query_lower:
                        score += 2  # 키워드 매칭은 높은 점수
                
                # 본문 키워드 매칭
                chunk_words = query_lower.split()
                for word in chunk_words:
                    if len(word) > 1 and word in chunk.lower():
                        score += 0.5
                
                if score > 0:
                    matches.append({
                        "source": filename,
                        "chunk_id": f"CHUNK {i}",
                        "content": chunk[:800],  # 800자만
                        "score": score,
                        "keywords": keywords
                    })
        
        # 점수순 정렬
        matches.sort(key=lambda x: x["score"], reverse=True)
        return matches[:max_results]
    
    def _search_exoneration_facts(self, query: str, max_results: int) -> List[Dict]:
        """
        Exoneration Facts 검색 (죄책감 해소 팩트)
        Scenario 단위 검색
        """
        matches = []
        query_lower = query.lower()
        
        for filename, content in self.exoneration_facts.items():
            # SCENARIO 단위로 분할 (유연한 파싱)
            scenarios = re.split(r'##\s*\[?SCENARIO', content, flags=re.IGNORECASE)
            
            for i, scenario in enumerate(scenarios[1:], start=1):
                # 제목 추출
                title_match = re.search(r'^\s*\d+\]?\s*"?(.+?)"?\s*$', scenario.split('\n')[0])
                title = title_match.group(1) if title_match else f"Scenario {i}"
                
                # Keywords 추출
                keywords_match = re.search(r'\*\*Keywords\*\*:\s*(.+)', scenario, re.IGNORECASE)
                keywords = []
                if keywords_match:
                    keywords = [k.strip() for k in keywords_match.group(1).split(',')]
                
                # 키워드 매칭
                score = 0
                for keyword in keywords:
                    if keyword.lower() in query_lower:
                        score += 3  # Exoneration은 더 높은 점수
                
                # 제목 매칭
                if any(word in title.lower() for word in query_lower.split()):
                    score += 2
                
                if score > 0:
                    matches.append({
                        "source": filename,
                        "scenario": title,
                        "content": scenario[:600],  # 600자만
                        "score": score,
                        "keywords": keywords
                    })
        
        matches.sort(key=lambda x: x["score"], reverse=True)
        return matches[:max_results]
    
    def _search_structured_data(self, query: str, max_results: int) -> List[Dict]:
        """
        Structured Data 검색 (JSON)
        - emergency_hotlines.json
        - peer_stories.json (✨ 신규)
        - funeral_homes.json
        """
        results = []
        query_lower = query.lower()
        
        # 1. 위기 핫라인 검색
        hotline_keywords = [
            "상담", "전화", "도움", "핫라인", "센터",
            "힘들", "괴롭", "우울", "죽고", "자살",
            "받고 싶", "연결", "찾아", "문의", "알려"
        ]
        
        if any(k in query_lower for k in hotline_keywords) and "emergency_hotlines.json" in self.structured_data:
            hotlines = self.structured_data["emergency_hotlines.json"]
            
            matched = []
            for hotline in hotlines:
                score = 0
                for keyword in hotline.get("keywords", []):
                    if keyword in query_lower:
                        score += 2
                
                if score > 0 or len(matched) < 3:  # 최소 3개
                    matched.append((hotline, score))
            
            matched.sort(key=lambda x: x[1], reverse=True)
            results.extend([{
                "type": "hotline",
                "data": h[0]
            } for h in matched[:max_results]])
        
        # 2. ✨ 피어 스토리 검색 (신규)
        story_keywords = [
            "사례", "다른 분", "경험", "이야기", "후기",
            "어떻게", "극복", "회복", "나아", "괜찮"
        ]
        
        if any(k in query_lower for k in story_keywords) and "peer_stories.json" in self.structured_data:
            stories = self.structured_data["peer_stories.json"]
            
            matched_stories = []
            for story in stories:
                score = 0
                # 상황 매칭
                situation = story.get("situation", "")
                for word in query_lower.split():
                    if len(word) > 1 and word in situation.lower():
                        score += 1
                
                # 감정 매칭
                emotion = story.get("emotion", "")
                for word in query_lower.split():
                    if len(word) > 1 and word in emotion.lower():
                        score += 2
                
                if score > 0:
                    matched_stories.append((story, score))
            
            matched_stories.sort(key=lambda x: x[1], reverse=True)
            results.extend([{
                "type": "peer_story",
                "data": s[0]
            } for s in matched_stories[:max_results]])
        
        # 3. 장례식장 검색
        if ("장례" in query_lower or "화장" in query_lower) and "funeral_homes.json" in self.structured_data:
            funeral_homes = self.structured_data["funeral_homes.json"]
            
            # 지역 필터링
            region = None
            if "서울" in query_lower: region = "서울"
            elif "경기" in query_lower: region = "경기"
            elif "인천" in query_lower: region = "인천"
            
            filtered = funeral_homes
            if region:
                filtered = [f for f in filtered if f.get("region") == region]
            
            filtered.sort(key=lambda x: x.get("rating", 0), reverse=True)
            results.extend([{
                "type": "funeral_home",
                "data": f
            } for f in filtered[:max_results]])
        
        return results
    
    def get_context_for_llm(self, search_results: Dict[str, Any]) -> str:
        """
        검색 결과를 LLM이 읽을 수 있는 형식으로 변환
        """
        context_parts = []
        
        # 1. Exoneration Facts (죄책감 해소 - 최우선)
        if search_results["exoneration_facts"]:
            context_parts.append("[죄책감 해소를 위한 팩트]")
            context_parts.append("⚠️ 주의: 이 정보는 보호자의 죄책감을 덜어주는 용도로만 사용하세요.")
            context_parts.append("절대 질병을 설명하려 들지 마세요.\n")
            for item in search_results["exoneration_facts"]:
                context_parts.append(f"\n[{item['scenario']}]:")
                context_parts.append(item['content'])
        
        # 2. Core Logic (상담 프로토콜)
        if search_results["core_logic"]:
            context_parts.append("\n\n[상담 가이드라인]")
            for item in search_results["core_logic"]:
                context_parts.append(f"\n{item['chunk_id']}:")
                context_parts.append(item['content'])
        
        # 3. Structured Data
        if search_results["structured_data"]:
            context_parts.append("\n\n[도움이 될 만한 정보]")
            for item in search_results["structured_data"]:
                if item["type"] == "hotline":
                    data = item["data"]
                    context_parts.append(f"\n- {data['name']}: {data['number']}")
                    context_parts.append(f"  운영: {data['available']}")
                    context_parts.append(f"  설명: {data['description']}")
                
                elif item["type"] == "peer_story":
                    data = item["data"]
                    context_parts.append(f"\n[비슷한 사례]")
                    context_parts.append(f"상황: {data['situation']}")
                    context_parts.append(f"감정: {data['emotion']}")
                    context_parts.append(f"극복: {data['healing_journey']}")
                
                elif item["type"] == "funeral_home":
                    data = item["data"]
                    context_parts.append(f"\n- {data['name']}")
                    context_parts.append(f"  위치: {data['address']}")
                    context_parts.append(f"  전화: {data['tel']}")
        
        return "\n".join(context_parts)


# 사용 예시
if __name__ == "__main__":
    rag = NeulPoomRAG(data_dir="./data")
    
    # 테스트 쿼리
    test_queries = [
        "늦게 병원에 가서 미안해요",  # guilt + emotional
        "신부전으로 떠났는데 너무 슬퍼요",  # factual + emotional
        "전문 상담 받고 싶어요"  # service
    ]
    
    for query in test_queries:
        print(f"\n{'='*60}")
        print(f"Query: {query}")
        print(f"{'='*60}")
        
        results = rag.search(query)
        print(f"Detected Intents: {results['detected_intents']}")  # ✨ 복수형!
        print(f"Core Logic: {len(results['core_logic'])} results")
        print(f"Exoneration Facts: {len(results['exoneration_facts'])} results")
        print(f"Structured Data: {len(results['structured_data'])} results")
        
        context = rag.get_context_for_llm(results)
        print(f"\n[LLM Context Preview]")
        print(context[:500] + "..." if len(context) > 500 else context)
