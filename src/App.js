import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Dashboard from './Views/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './Views/LandingPage/LandingPage';
import FileDetailsPage from './Views/FileDetailsView/FileDetailsView';
import SignIn from './Views/SignIn';
import urls from './urls';

const App = () => {
  const user = useSelector((state) => state.user.userInfo);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path={urls.base} element={user ? <Dashboard /> : <LandingPage />} />
          <Route path={urls.dashboard} element={<Dashboard />} />
          <Route path={urls.fileDetails} element={<FileDetailsPage />} />
          <Route path={urls.uploadedFileDetails} element={<FileDetailsPage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
