import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://674ccaa154e1fca9290d911c.mockapi.io/api/v1/videoGallery'
});

export default Api;
