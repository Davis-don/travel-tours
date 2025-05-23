import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Layout from './components/Layout/Layout';
import ToursPage from './pages/ToursPage';
import Aboutpage from './pages/Aboutpage/Aboutpage';
import Contactpage from './pages/Contactpage';
import Agentaccount from './pages/Agentaccount';
import Login from './components/Login/Login';
import ScrollToTop from './components/Sroll top/Scrolltop';
import Signup from './components/signup/Signup';

function App() {
  return (
    <div className="app">
      <HashRouter>
        <ScrollToTop /> 
        <Routes>
          <Route path="/" element={<Layout><Homepage/></Layout>} />
          <Route path="/tours" element={<Layout><ToursPage/></Layout>} />
          <Route path="/about" element={<Layout><Aboutpage/></Layout>} />
          <Route path="/contact" element={<Layout><Contactpage/></Layout>} />
          <Route path="/login" element={<Layout><Login/></Layout>} />
          <Route path="/signup" element={<Layout><Signup/></Layout>} />
          <Route path="/agent" element={<Agentaccount />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
