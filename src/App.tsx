import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import AppRoutes from './routes';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <>
      <AnimatePresence>
        <Router>
          <AppRoutes />
        </Router>
      </AnimatePresence>
    </>
  );
}

export default App;
