import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Dashboard from './Views/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './Views/LandingPage/LandingPage';
import FileDetailsPage from './Views/FileDetailsView/FileDetailsView';
import urls from './urls';

const App = () => {
  const user = useSelector((state) => state.user.userInfo);

  const homePage = user ? <Dashboard /> : <LandingPage />;
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path={urls.base} element={homePage} />
          <Route path={urls.dashboard} element={<Dashboard />} />
          <Route path={urls.fileDetails} element={<FileDetailsPage />} />
          <Route path={urls.uploadedFileDetails} element={<FileDetailsPage />} />
          <Route path="*" element={homePage} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
