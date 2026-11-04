import { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { trackPageView } from './treats/pixel';
import './App.css';
import FirstScreen from './screens/FirstScreen';

// Everything below the hero is split into its own chunk so the initial
// bundle only carries what is needed to paint the first screen.
const SecondScreen = lazy(() => import('./screens/SecondScreen'));
const Syllabus = lazy(() => import('./components/Course/Course'));
const ForthScreen = lazy(() => import('./screens/ForthScreen'));
const CourseSuitability = lazy(() => import('./components/fit/Fit'));
const ThirdScreen = lazy(() => import('./screens/ThirdScreen'));
const FifthScreen = lazy(() => import('./screens/FifthScreen'));
const PrivacyPolicy = lazy(() => import('./components/privacy/Privacy'));
const ByMe = lazy(() => import('./components/ByMe/ByMe'));

// Paid-campaign landing page for lip pigment (/treats) - fully separate chunk.
const TreatsPage = lazy(() => import('./treats/TreatsPage'));
const ThankYouPage = lazy(() => import('./treats/ThankYouPage'));

// The pixel in index.html already reports the first PageView; this covers in-app navigations.
const PixelPageViews = () => {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    trackPageView();
  }, [pathname]);
  return null;
};

const Home = () => (
  <main>
    <FirstScreen />
    <Suspense fallback={null}>
      <SecondScreen />

      <Syllabus />
      <ForthScreen />

      <CourseSuitability />
      <ThirdScreen />
      <FifthScreen />
      <PrivacyPolicy ownerName="שירן שלום" phone="+972 50-936-5362" domain="https://shiranshalomacademy.co.il/" />
      <ByMe />
    </Suspense>
  </main>
);

function App() {
  return (
    <BrowserRouter>
      <PixelPageViews />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/treats" element={<TreatsPage />} />
          <Route path="/thanks" element={<ThankYouPage />} />
          <Route path="/תודה" element={<ThankYouPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
