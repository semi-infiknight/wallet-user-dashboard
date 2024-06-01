import { motion } from 'framer-motion';
import { ReactChildProps } from '../utils/Types';

const fadeAndScaleVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const AnimatedPageTransition = ({ children }: ReactChildProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.4 }}
      variants={fadeAndScaleVariant}
      className='h-screen'
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPageTransition;
