import { AnimatePresence } from 'framer-motion';
import { ReactChildProps } from '../utils/Types';

export default function LocationProvider({ children }: ReactChildProps) {
  return <AnimatePresence>{children}</AnimatePresence>;
}
