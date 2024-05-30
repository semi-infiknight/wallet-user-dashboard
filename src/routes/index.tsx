import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LocationProvider from '../components/LocationProvider';
import { getFromLocalStorage } from '../utils/helper';
import Authentication from '../pages/Authentication';
import Layout from '../pages/Layout';
import Home from '../pages/Home';
import Reward from '../pages/Reward';
import AnimatedPageTransition from '../components/AnimatedPageTransition';

const AppRoutes = () => {
  const location = useLocation();

  const isAuthenticated = getFromLocalStorage('authenticated');

  return isAuthenticated ? (
    <>
      <LocationProvider>
        <Layout>
          <Routes location={location} key={location.key}>
            <Route path="/" element={<Home />} />
            <Route path="/rewards" element={<Reward />} />
            <Route path="*" element={<Navigate to="/ " />} />
          </Routes>
        </Layout>
      </LocationProvider>
    </>
  ) : (
    <>
      <LocationProvider>
        <AnimatedPageTransition>
          <Routes location={location} key={location.key}>
            <Route path="/login" element={<Authentication />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </AnimatedPageTransition>
      </LocationProvider>
    </>
  );
};

export default AppRoutes;
