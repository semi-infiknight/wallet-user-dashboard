import React from 'react';
import Confetti from 'react-confetti';

const ConfettiAnimation: React.FC = () => {
  return (
    <Confetti
      className="h-screen w-screen z-50"
      recycle
      numberOfPieces={1000}
      colors={['#3016b2', '#4722cc', '#a954fd']}
    />
  );
};

export default ConfettiAnimation;
