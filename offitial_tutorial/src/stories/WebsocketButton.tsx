import React, { useState, useEffect } from 'react';

const FButton = () => {
    const [message, setMessage] = useState('');  // 메시지 상태 추가
    const [eventTrigger, setEvent] = useState('');

    useEffect(() => {
        // const ws = new WebSocket("ws://localhost:8000/ws");
        const ws = new WebSocket("ws://localhost:8000/ws2");

        ws.onopen = () => {
            console.log("WebSocket connection established");
            if (eventTrigger)
            {
            ws.send(eventTrigger);  // 연결 성립 후 메시지 전송
            }
        };


        ws.onmessage = (event) => {
            setMessage(event.data);  // 수신 메시지로 상태 업데이트
            console.log(event.data);  // 수신 메시지 출력
            ws.close(); // 메시지 받은 후에 연결 종료
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };



        return () => {
            ws.close();
        };
    }, [eventTrigger]);

    const clickHandler = () => {
        const message = "Button Clicked"
        setEvent(message)
      };

    return (
        <div>
            <button onClick={clickHandler}>Send to FastAPI</button>
            <p>Message from server: {message}</p>  // 수신 메시지 표시
        </div>
    );
};

export default FButton;
