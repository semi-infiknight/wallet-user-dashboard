import { useState, useEffect, useRef } from "react";
import gasless from "../assets/illustrations/gasless.png";
import multichain from "../assets/illustrations/multichain.png";
import dappConnection from "../assets/illustrations/dapp-connection.png";
import smartWallet from "../assets/illustrations/smart-wallets.png";
import stateOfArt from "../assets/illustrations/state-of-art.png";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    src: gasless,
    className: "absolute h-16 w-16 md:h-[8em] md:w-[8em] lg:h-[10em] lg:w-[10em] rotate-[40deg] lg:ml-[-4em] lg:mr-[-3em] ml-[-1.4em]",
    entry: { translateX: -150 },
    animate: { translateX: 0 },
  },
  {
    src: multichain,
    className: "absolute h-20 w-20 md:h-[9em] md:w-[9em] lg:h-[11em] lg:w-[11em] bottom-[20%] rotate-[30deg] lg:ml-[-3em] md:ml-[-2em] ml-[-1.4em]",
    entry: { translateX: -150 },
    animate: { translateX: 0 },
  },
  {
    src: dappConnection,
    className: "absolute h-20 w-20 md:h-[9em] md:w-[9em] lg:h-[11em] lg:w-[11em] right-[10%] rotate-180 lg:mt-[-4em] md:mt-[-3em] mt-[-2em]",
    entry: { translateY: -150 },
    animate: { translateY: 0 },
  },
  {
    src: smartWallet,
    className: "absolute h-20 w-20 md:h-[9em] md:w-[9em] lg:h-[12em] lg:w-[12em] bottom-0 right-[30%] lg:mb-[-4em] md:mb-[-3em] mb-[-2em]",
    entry: { translateY: 150 },
    animate: { translateY: 0 },
  },
  {
    src: stateOfArt,
    className: "absolute h-20 w-20 md:h-[9em] md:w-[9em] lg:h-[12em] lg:w-[12em] bottom-0 right-0 rotate-[-10deg] lg:mr-[-3em] lg:mb-[-2em] md:mr-[-2em] md:mb-[-1.6em] mr-[-1.4em] mb-[-1.2em]",
    entry: { translateX: 150, translateY: -150 },
    animate: { translateX: 0, translateY: 0 },
  },
];

const PeekIllustration = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(() => Math.floor(Math.random() * 5));
  const [showImage, setShowImage] = useState(true);
  const constraintsRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowImage(false);
      setTimeout(() => {
        setShowImage(true);
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * images.length);
        } while (newIndex === currentImageIndex);
        setCurrentImageIndex(newIndex);
      }, 500); // 0.5-second gap for animation exit
    }, 10000); // 10 seconds total interval

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const currentImage = images[currentImageIndex];

  return (
    <div ref={constraintsRef} className="h-screen w-full fixed top-0 left-0 overflow-hidden">
      <div className="relative h-full w-full">
        <AnimatePresence>
          {showImage && (
            <motion.div
              key={currentImageIndex}
              initial={currentImage.entry}
              animate={currentImage.animate}
              exit={currentImage.entry}
              transition={{ type: "spring", stiffness: 300, duration: 0.5 }}
              className={currentImage.className}
            >
              <motion.div

                drag
                dragConstraints={{ top: 0, bottom: 0, right: 0, left: 0 }}
                dragTransition={{bounceStiffness: 500, bounceDamping: 50, }}
                dragElastic={1}
                whileDrag={{ cursor: "grabbing" }}
              >
                <img
                  src={currentImage.src}
                  className=""
                  alt="Illustration"
                  draggable="false"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PeekIllustration;
