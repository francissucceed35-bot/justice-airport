import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import LiveNotification from './components/LiveNotification.jsx'; // <-- NEW
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  return (
    <div>
      <Navbar />
      <main>
        <AnimatePresence mode='wait'>
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <LiveNotification /> {/* <-- NEW */}
    </div>
  )
}

export default App;
