import React, { useEffect, useState } from 'react';

function StarryBackground() {
  const [stars, setStars] = useState([]);
  const [bigStars, setBigStars] = useState([]);

  useEffect(() => {
    // 작은 별들 생성
    const smallStars = [];
    for (let i = 0; i < 100; i++) {
      smallStars.push({
        id: i,
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3
      });
    }
    setStars(smallStars);

    // 큰 별들 생성 (이모지)
    const largeStars = ['⭐', '✨', '🌟', '💫'];
    const bigStarsArray = [];
    for (let i = 0; i < 15; i++) {
      bigStarsArray.push({
        id: i,
        emoji: largeStars[Math.floor(Math.random() * largeStars.length)],
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        delay: Math.random() * 6
      });
    }
    setBigStars(bigStarsArray);
  }, []);

  return (
    <>
      {/* 작은 별들 */}
      <div className="stars">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size + 'px',
              height: star.size + 'px',
              animationDelay: star.delay + 's'
            }}
          />
        ))}
      </div>

      {/* 큰 별들 */}
      {bigStars.map(star => (
        <div
          key={star.id}
          className="big-star"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay + 's'
          }}
        >
          {star.emoji}
        </div>
      ))}
    </>
  );
}

export default StarryBackground;
