let API_URL = '';

switch (process.env.REACT_APP_ENV) {
  case 'prod':
    if (process.env.REACT_APP_API_URL) API_URL = process.env.REACT_APP_API_URL;
    break;
  default:
    API_URL = 'http://localhost:6060';
    break;
}

export default API_URL;
