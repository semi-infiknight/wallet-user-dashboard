import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

type ModalProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
  children: ReactNode;
};

const Modal = ({ onClick, isOpen, children }: ModalProps) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="Modal bg-zinc-900 shadow-xl shadow-black bg-opacity-95 border p-10 rounded-lg  m-auto 
           overflow-y-auto overflow-x-hidden fixed top-[30%] right-44 left-0 z-50 justify-center items-center max-w-[600px]  max-h-full"
          variants={variant}
          initial="containerInitial"
          animate="containerAnimate"
          exit="containerExit"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <motion.div variants={modalVariant} initial="initial" animate="animate" exit="initial">
              {children}
            </motion.div>
            <div className=" flex justify-between mt-10 gap-10 text-white ">
              <button
                className=" w-full bg-zinc-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center neomorphic-expired"
                onClick={onClick}
              >
                Close
              </button>
              <button
                className=" w-full  bg-zinc-900  font-medium rounded-lg text-sm px-5 py-2.5 text-center neomorphic-expired"
                onClick={() => navigate('/rewards')}
              >
                Go To rewards section
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

const variant = {
  containerInitial: {
    opacity: 0,
  },
  containerAnimate: {
    opacity: 1,
  },
  containerExit: {
    opacity: 0,
    transition: {
      delay: 0.8,
    },
  },
};

const modalVariant = {
  initial: {
    opacity: 0,
    y: 50,
    transition: {
      type: 'spring',
      duration: 0.5,
      mass: 2,
      damping: 10,
      delay: 0.4,
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.5,
      mass: 2,
      damping: 10,
      delay: 0.2,
    },
  },
};

export default Modal;
