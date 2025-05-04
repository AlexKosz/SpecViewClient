import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './Views/Dashboard';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './Views/LandingPage/LandingPage';
import FileDetailsPage from './Views/FileDetailsView/FileDetailsView';

import urls from './urls';

const App = () => (
  <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route path={urls.base} element={<LandingPage />} />
        <Route path={urls.dashboard} element={<Dashboard />} />
        <Route path={urls.fileDetails} element={<FileDetailsPage />} />
      </Routes>
    </Router>
  </div>
);

export default App;
