import { useRef, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import { setActiveFile } from '../../features/files/filesSlice';

import urls from '../../urls';
import validateUploadedJSON from '../../utils/validateUploadedJSON';

const LandingPage = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState(null);
  const [isFileValid, setIsFileValid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const json = JSON.parse(event.target.result);
      const isValid = validateUploadedJSON(json);
      if (!isValid) {
        // eslint-disable-next-line no-alert
        alert('Invalid Jest JSON file');
        return;
      }
      setIsFileValid(true);
      setFileContent(json);
    };
    reader.readAsText(file);

    setFileName(file.name); // Show file name after selection
  };

  const handleViewResults = () => {
    dispatch(setActiveFile(fileContent)); // Dispatch the action to set the active file in Redux store.
    navigate(urls.fileDetails);
  };

  return (
    <div>
      <section className="hero">
        <h1>SpecView</h1>
        <p className="heroDesc">Upload your Jest test output JSON and explore results with ease.</p>
        <div className={fileName ? '' : 'flex'}>
          <div className="flex">
            <Button
              size="large"
              onClick={() => fileInputRef.current?.click()}
              variant="contained"
              sx={{
                backgroundColor: 'var(--button-bg)',
                color: 'white',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                '&:hover': {
                  backgroundColor: 'var(--button-hover-bg)',
                },
              }}
            >
              <CloudUploadIcon className="uploadIcon" />
              {fileName ? ' Replace File' : ' Upload Jest JSON'}
            </Button>
            {fileName && <p className="file-name">Selected File: {fileName}</p>}
          </div>

          {fileName && (
            <Button
              size="large"
              variant={isFileValid ? 'outlined' : 'disabled'}
              onClick={handleViewResults}
            >
              View Results
            </Button>
          )}

          {!fileName && (
            <Button size="large" variant="outlined">
              Sign In / Create Account
            </Button>
          )}
        </div>
        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />
      </section>

      {/* Features */}
      <section>
        <div className="features">
          <div className="feature">
            <SearchIcon />
            <h3>Smart Search</h3>
            <p>Filter by file name, test name, or assertion message.</p>
          </div>
          <div className="feature">
            <CloudUploadIcon />
            <h3>Instant Upload</h3>
            <p>Drag and drop your Jest results. Preview right away.</p>
          </div>
          <div className="feature">
            <ShareIcon />
            <h3>Share with Teams</h3>
            <p>Save and share results (login required).</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        © 2025 JestView |{' '}
        <a href="/asd" className="underline">
          GitHub
        </a>{' '}
        |{' '}
        <a href="/bc" className="underline">
          Privacy
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;
