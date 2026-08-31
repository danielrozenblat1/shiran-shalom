import { lazy, Suspense } from 'react';
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

function App() {
  return <main>
<FirstScreen/>
<Suspense fallback={null}>
<SecondScreen/>

<Syllabus/>
<ForthScreen/>

<CourseSuitability/>
<ThirdScreen/>
<FifthScreen/>
<PrivacyPolicy
  ownerName="שירן שלום"

  phone="+972 50-936-5362"
  domain="https://shiranshalomacademy.co.il/"
/>
<ByMe/>
</Suspense>
  </main>
}

export default App;
