import PrivateRoutes from './PrivateRoutes';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import LocationProvider from '../components/LocationProvider';
import { motion } from 'framer-motion';
import { ReactChildProps } from '../utils/Types';

const fadeAndScaleVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const AppRoutes = () => {
  const location = useLocation();
  const AnimatedPageTransition = ({ children }: ReactChildProps) => {
    return (
      <motion.div
        //   h-screen
        // className="bg-white flex h-auto items-center justify-center"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeAndScaleVariant}
      >
        {children}
      </motion.div>
    );
  };
  return (
    <>
      <LocationProvider>
        <Routes location={location} key={location.key}>
          <Route element={<PrivateRoutes />}>
            <Route
              path="/dashboard"
              element={
                <AnimatedPageTransition>
                  <Dashboard />
                </AnimatedPageTransition>
              }
            />
            {/* <Route path="/products" element={<Products />} /> */}
          </Route>
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
