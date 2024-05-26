import React, { Component } from 'react';
import axios from 'axios'

const clickHandler  = async () => {
    const response = await axios.post('http://172.23.72.240:5000/simpleclick', {
        text: 'HI'
      });
}

const Button = () => {
    return (
        <div>
        <button onClick={clickHandler}>Flask</button>
        </div>
    )
}

export default Button;
