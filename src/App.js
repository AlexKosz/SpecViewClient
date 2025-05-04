import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './Views/Dashboard';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './Views/LandingPage/LandingPage';
import FileDetailsPage from './Views/FileDetailsView/FileDetailsView';

import urls from './urls';
import SignIn from './Views/SignIn';

const App = () => (
  <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route path={urls.base} element={<LandingPage />} />
        <Route path={urls.dashboard} element={<Dashboard />} />
        <Route path={urls.fileDetails} element={<FileDetailsPage />} />
        <Route path={urls.uploadedFileDetails} element={<FileDetailsPage />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Router>
  </div>
);

export default App;
