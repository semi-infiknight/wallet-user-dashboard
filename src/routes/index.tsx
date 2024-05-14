import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import LocationProvider from '../components/LocationProvider';
import { motion } from 'framer-motion';
import { ReactChildProps } from '../utils/Types';
import { getFromLocalStorage } from '../utils/helper';

const fadeAndScaleVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const AppRoutes = () => {
  const location = useLocation();

  const isAuthenticated = getFromLocalStorage('authenticated');
  const AnimatedPageTransition = ({ children }: ReactChildProps) => {
    return (
      <motion.div initial="hidden" animate="visible" exit="exit" variants={fadeAndScaleVariant}>
        {children}
      </motion.div>
    );
  };

  return isAuthenticated ? (
    <>
      <LocationProvider>
        <Routes location={location} key={location.key}>
          <Route
            path="/dashboard"
            element={
              <AnimatedPageTransition>
                <Dashboard />
              </AnimatedPageTransition>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </LocationProvider>
    </>
  ) : (
    <>
      <LocationProvider>
        <Routes location={location} key={location.key}>
          <Route
            path="/login"
            element={
              <AnimatedPageTransition>
                <Home />
              </AnimatedPageTransition>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </LocationProvider>
    </>
  );
};

export default AppRoutes;
