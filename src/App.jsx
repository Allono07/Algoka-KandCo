import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';
import { TransitionProvider } from './context/TransitionContext';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Services from './pages/Services';
import './styles/global.css';
import './styles/canvas.css';
import './styles/text-reveal.css';
import './styles/pages.css';
import BrandIntro from './components/BrandIntro';

gsap.registerPlugin(ScrollTrigger, Observer);

function AppShell() {
  return (
    <TransitionProvider>
      <div className="app-shell">
        <CustomCursor />
        <div className="route-layer">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </TransitionProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <BrandIntro />
      <AppShell />
    </BrowserRouter>
  );
}
