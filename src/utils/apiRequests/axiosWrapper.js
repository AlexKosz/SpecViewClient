import axios from 'axios';
import pako from 'pako';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const axiosWrapper = async ({ method, path, data = {}, config = {}, compress = false }) => {
  const url = `${baseURL}${path}`;

  let finalData = data;
  const headers = { ...config.headers };

  if (compress && data && typeof data === 'object') {
    try {
      const jsonString = JSON.stringify(data);
      const gzipData = pako.gzip(jsonString); // Compress the JSON data

      finalData = new Blob([gzipData], { type: 'application/gzip' });

      headers['Content-Encoding'] = 'gzip';
      headers['Content-Type'] = 'application/json';
    } catch (compressionError) {
      return { data: null, error: compressionError };
    }
  }

  try {
    const response = await axios({
      method,
      url,
      data: finalData,
      withCredentials: true,
      headers,
      ...config,
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export default axiosWrapper;
