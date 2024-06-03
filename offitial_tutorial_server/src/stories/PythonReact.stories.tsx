import React, {useEffect, useState} from 'react'
import sendDataToServer from './Middleware'
import Dummy from './Deco'

export default {
    title: "Example"
}

export const ssendDataToServer = () => {
    const [inputData, setInputData] = useState('');
    const [result, setResult] = useState("")

    const handleInputChange = (e) => {
      setInputData(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const result = await sendDataToServer(inputData);
      console.log(result);
      setResult(result)
    };

    const typeinfo = typeof(sendDataToServer)
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputData} onChange={handleInputChange} />
        <button type="submit">Send Data</button>
        <p>{JSON.stringify(result)}</p>
        <p>{JSON.stringify(typeinfo)}</p>
      </form>
    );
  }
