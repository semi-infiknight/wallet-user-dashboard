import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import AppRoutes from './routes';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <AnimatePresence>
        <Router>
          <AppRoutes />
          <Toaster />
        </Router>
      </AnimatePresence>
    </>
  );
}

export default App;
