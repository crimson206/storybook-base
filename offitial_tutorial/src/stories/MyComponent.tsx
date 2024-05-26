// React (socket.io-client)
import React, { useState, useEffect } from 'react';
import Button from './Button';
import axios from 'axios'

function MyComponent() {

  const simulateTyping = async () => {
    try {
      const response = await axios.post('http://172.23.72.240:5000/simpleclick', {
        text: 'HI'
      });
      alert('Simulation complete: ' + response.data.message);
    } catch (error) {
      console.error('Error simulating typing:', error);
      alert('Error: ' + error.message);
    }
  };

  const button = new Button({label:"button1", onClick:simulateTyping})

  return (
    button
  );
}

export default MyComponent
