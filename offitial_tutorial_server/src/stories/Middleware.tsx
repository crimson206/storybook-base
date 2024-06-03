import axios from 'axios';

async function sendDataToServer(arg) {
  try {
    const response = await axios.post('/some_function', { arg });  // Adjust the URL based on your server configuration
    console.log('Response from server:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    return error;
  }
}

export default sendDataToServer;
