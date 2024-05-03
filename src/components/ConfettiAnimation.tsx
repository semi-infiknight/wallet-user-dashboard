import React from 'react';
import Confetti from 'react-confetti';

const ConfettiAnimation: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const confettiRef = useRef<any | null>(null);

  //   useEffect(() => {
  //     if (showConfetti) {
  //       confettiRef.current?.start(); // Start confetti animation if visible
  //     } else {
  //       confettiRef.current?.stop(); // Stop animation if hidden
  //     }
  //     return () => confettiRef.current?.stop(); // Cleanup on unmount
  //   }, [showConfetti]);

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
