// 사이트 1: 바이럴 심리 테스트 데이터

export const psychTests = {
  test1: {
    id: 'test1',
    title: '당신이 지금 키우고 싶은 반려동물은?',
    description: '당신의 라이프스타일에 맞는 반려동물을 찾아보세요',
    questions: [
      {
        id: 1,
        question: '주말에 주로 무엇을 하나요?',
        options: [
          { text: '집에서 조용히 쉰다', value: 'cat' },
          { text: '밖에서 활동적으로 논다', value: 'dog' },
          { text: '친구들과 모임을 갖는다', value: 'bird' },
          { text: '혼자만의 시간을 즐긴다', value: 'fish' }
        ]
      },
      {
        id: 2,
        question: '당신의 성격은?',
        options: [
          { text: '독립적이고 자유로운', value: 'cat' },
          { text: '사교적이고 활발한', value: 'dog' },
          { text: '창의적이고 독특한', value: 'bird' },
          { text: '차분하고 평화로운', value: 'fish' }
        ]
      },
      {
        id: 3,
        question: '스트레스를 받을 때 당신은?',
        options: [
          { text: '혼자만의 공간이 필요하다', value: 'cat' },
          { text: '산책이나 운동을 한다', value: 'dog' },
          { text: '음악을 듣거나 취미 활동을 한다', value: 'bird' },
          { text: '명상하거나 조용히 쉰다', value: 'fish' }
        ]
      },
      {
        id: 4,
        question: '이상적인 주거 환경은?',
        options: [
          { text: '아늑한 원룸이나 작은 집', value: 'cat' },
          { text: '마당이 있는 넓은 집', value: 'dog' },
          { text: '창문이 많은 밝은 집', value: 'bird' },
          { text: '조용하고 평온한 환경', value: 'fish' }
        ]
      },
      {
        id: 5,
        question: '반려동물과의 교감 방식은?',
        options: [
          { text: '서로의 공간을 존중하며', value: 'cat' },
          { text: '끊임없이 놀아주며', value: 'dog' },
          { text: '관찰하고 소통하며', value: 'bird' },
          { text: '조용히 함께 있으며', value: 'fish' }
        ]
      }
    ],
    results: {
      cat: {
        type: '고양이',
        title: '당신은 우아한 고양이형 🐱',
        description: '독립적이고 자유로우며, 자신만의 공간과 시간을 중요하게 생각하는 당신. 고양이처럼 우아하면서도 애정이 넘치는 관계를 선호합니다.',
        traits: ['독립적', '우아함', '신중함', '관찰력']
      },
      dog: {
        type: '강아지',
        title: '당신은 활발한 강아지형 🐶',
        description: '사교적이고 활동적이며, 사람들과의 교감을 즐기는 당신. 강아지처럼 충성스럽고 사랑이 넘치는 관계를 만들어갑니다.',
        traits: ['활발함', '충성심', '사교성', '에너지']
      },
      bird: {
        type: '새',
        title: '당신은 자유로운 새형 🦜',
        description: '창의적이고 독특하며, 새로운 것을 추구하는 당신. 새처럼 자유롭고 밝은 에너지로 주변을 환하게 만듭니다.',
        traits: ['창의성', '자유로움', '밝음', '독특함']
      },
      fish: {
        type: '물고기',
        title: '당신은 평화로운 물고기형 🐠',
        description: '차분하고 평온하며, 조용한 환경을 선호하는 당신. 물고기처럼 평화롭고 안정적인 분위기를 만들어갑니다.',
        traits: ['평온함', '차분함', '안정감', '조화']
      }
    }
  },

  test2: {
    id: 'test2',
    title: '당신이 동물이라면 어떤 동물?',
    description: '당신의 성격을 동물에 비유해보세요',
    questions: [
      {
        id: 1,
        question: '친구들 사이에서 당신의 역할은?',
        options: [
          { text: '리더 역할을 한다', value: 'lion' },
          { text: '분위기 메이커', value: 'dolphin' },
          { text: '조언자 역할', value: 'owl' },
          { text: '든든한 지원군', value: 'elephant' }
        ]
      },
      {
        id: 2,
        question: '문제 해결 방식은?',
        options: [
          { text: '빠르고 과감하게', value: 'lion' },
          { text: '창의적이고 유연하게', value: 'dolphin' },
          { text: '신중하고 분석적으로', value: 'owl' },
          { text: '인내심 있게 천천히', value: 'elephant' }
        ]
      },
      {
        id: 3,
        question: '당신의 강점은?',
        options: [
          { text: '결단력과 추진력', value: 'lion' },
          { text: '사교성과 유머', value: 'dolphin' },
          { text: '통찰력과 지혜', value: 'owl' },
          { text: '포용력과 안정감', value: 'elephant' }
        ]
      },
      {
        id: 4,
        question: '새로운 환경에서 당신은?',
        options: [
          { text: '적극적으로 주도한다', value: 'lion' },
          { text: '빠르게 적응하며 즐긴다', value: 'dolphin' },
          { text: '관찰하며 천천히 적응한다', value: 'owl' },
          { text: '안정을 찾을 때까지 기다린다', value: 'elephant' }
        ]
      },
      {
        id: 5,
        question: '스트레스 상황에서 당신은?',
        options: [
          { text: '정면돌파한다', value: 'lion' },
          { text: '긍정적으로 해석한다', value: 'dolphin' },
          { text: '원인을 분석한다', value: 'owl' },
          { text: '시간을 두고 처리한다', value: 'elephant' }
        ]
      }
    ],
    results: {
      lion: {
        type: '사자',
        title: '당신은 카리스마 넘치는 사자형 🦁',
        description: '리더십이 강하고 결단력 있는 당신. 사자처럼 당당하고 용감하게 목표를 향해 나아갑니다.',
        traits: ['리더십', '용기', '결단력', '카리스마']
      },
      dolphin: {
        type: '돌고래',
        title: '당신은 유쾌한 돌고래형 🐬',
        description: '사교적이고 긍정적인 에너지를 가진 당신. 돌고래처럼 즐겁고 창의적으로 삶을 즐깁니다.',
        traits: ['사교성', '긍정', '창의성', '유머']
      },
      owl: {
        type: '올빼미',
        title: '당신은 지혜로운 올빼미형 🦉',
        description: '분석적이고 통찰력이 뛰어난 당신. 올빼미처럼 신중하고 깊이 있게 사고합니다.',
        traits: ['지혜', '통찰력', '신중함', '분석력']
      },
      elephant: {
        type: '코끼리',
        title: '당신은 든든한 코끼리형 🐘',
        description: '포용력이 크고 안정적인 당신. 코끼리처럼 신뢰할 수 있고 든든한 존재입니다.',
        traits: ['포용력', '안정감', '신뢰', '인내']
      }
    }
  },

  test3: {
    id: 'test3',
    title: '당신이 원하는 위로는? 어떤 말이 힘이 되나요?',
    description: '당신에게 맞는 위로의 방식을 찾아보세요',
    emoji: '💝',
    isCore: true, // 핵심 테스트 표시
    questions: [
      {
        id: 1,
        question: '슬플 때 어떤 도움이 필요한가요?',
        options: [
          { text: '따뜻한 공감과 위로', value: 'F' },
          { text: '객관적인 조언과 해결책', value: 'T' }
        ]
      },
      {
        id: 2,
        question: '힘든 순간, 당신에게 필요한 것은?',
        options: [
          { text: '함께 있어주는 존재', value: 'F' },
          { text: '상황을 정리해주는 조언', value: 'T' }
        ]
      },
      {
        id: 3,
        question: '위로받을 때 선호하는 방식은?',
        options: [
          { text: '감정을 이해하고 공유하는', value: 'F' },
          { text: '사실을 바탕으로 설명하는', value: 'T' }
        ]
      },
      {
        id: 4,
        question: '대화할 때 편한 스타일은?',
        options: [
          { text: '따뜻하고 부드러운', value: 'F' },
          { text: '명확하고 간결한', value: 'T' }
        ]
      },
      {
        id: 5,
        question: '상실을 경험했을 때, 당신은?',
        options: [
          { text: '감정을 충분히 표현하고 싶다', value: 'F' },
          { text: '이성적으로 받아들이고 싶다', value: 'T' }
        ]
      }
    ],
    results: {
      F: {
        type: '감정 공감형',
        title: '당신의 위로 코드는 "따뜻한 공감형" 💙',
        description: '당신은 감정을 함께 나누고 공감받을 때 힘을 얻습니다. 따뜻한 말 한마디, 함께 있어주는 존재가 가장 큰 위로가 됩니다.',
        traits: ['감성적', '공감 능력', '표현적', '관계 중심'],
        message: '당신의 감정은 소중합니다. 그 마음을 충분히 느끼고 표현해도 괜찮아요.'
      },
      T: {
        type: '논리 분석형',
        title: '당신의 위로 코드는 "사실 기반 분석형" 🧠',
        description: '당신은 상황을 객관적으로 이해하고 정리할 때 마음의 평안을 찾습니다. 명확한 설명과 해결 방향이 가장 큰 위로가 됩니다.',
        traits: ['이성적', '분석적', '문제 해결', '목표 지향'],
        message: '당신이 느끼는 감정에는 충분한 이유가 있습니다. 함께 객관적으로 살펴볼까요?'
      }
    }
  }
};

// 테스트 결과 Key(가장 많이 선택된 값) 계산
export const calculateResultKey = (answers = []) => {
  if (!Array.isArray(answers) || answers.length === 0) return null;

  const counts = {};
  answers.forEach((answer) => {
    counts[answer] = (counts[answer] || 0) + 1;
  });

  const keys = Object.keys(counts);
  if (keys.length === 0) return null;

  return keys.reduce((a, b) => (counts[a] > counts[b] ? a : b));
};

// 테스트 결과 계산 (명시적 resultKey가 있으면 그 값을 우선)
export const calculateResult = (answers, testId, explicitResultKey = null) => {
  const test = psychTests[testId];
  if (!test) return null;

  const resultKey = explicitResultKey ?? calculateResultKey(answers);
  if (!resultKey) return null;

  return test.results?.[resultKey] ?? null;
};
