import logo from './logo.svg';
import './App.css';
import Loader from './components/Loader/Loader';
import FirstScreen from './screens/FirstScreen';
import SecondScreen from './screens/SecondScreen';
import Syllabus from './components/Course/Course';
import CourseSuitability from './components/fit/Fit';
import ByMe from './components/ByMe/ByMe';
import ThirdScreen from './screens/ThirdScreen';
import ForthScreen from './screens/ForthScreen';
import AboutMe from './components/me/Me';
import FifthScreen from './screens/FifthScreen';
import PrivacyPolicy from './components/privacy/Privacy';

function App() {
  return <>
<FirstScreen/>
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
  </>
}

export default App;
