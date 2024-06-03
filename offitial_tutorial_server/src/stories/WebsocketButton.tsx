import React, { useState, useEffect } from 'react';
import axios from 'axios'

interface IEventTrigger {
    event: string;
    arg?: any;  // 'arg'의 타입을 'any'로 설정하거나 더 구체적인 타입을 지정할 수 있습니다.
}

const FButton = () => {
    const [message, setMessage] = useState('');  // 메시지 상태 관리
    const [eventTrigger, setEvent] = useState<IEventTrigger | undefined>(undefined);  // 초기값을 'undefined'로 설정


    useEffect(() => {
        // const ws = new WebSocket("ws://localhost:8000/ws");
        const ws = new WebSocket("ws://localhost:8000/ws2");

        ws.onopen = () => {
            console.log("WebSocket connection established");
            if (eventTrigger)
            {
            ws.send(eventTrigger.arg.message);  // 연결 성립 후 메시지 전송
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
        setEvent({event:"button1",  arg: { message: "Button1 Clicked" } });
    }

    const clickHandler2 = () => {
        const message = "Button Clicked"
        setEvent({event:"button2", arg: { message: "Button2 Clicked" } });
    };

    const createItem = async (itemData) => {
        try {
          const response = await axios({
            method: 'post',
            url: 'http://localhost:8000/items/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: itemData
        });
          console.log(response.data);  // 서버로부터의 응답 출력
        } catch (error) {
          console.error('There was an error!', error);
        }
      };

    const clickHandler3 = () => {
        createItem({name:"Button3", description:"I am Button3."})
    };
    
    return (
        <div>
            <button onClick={clickHandler}>Button1</button>
            <button onClick={clickHandler2}>Button2</button>
            <button onClick={clickHandler3}>Button3</button>
            <p>Message from server: {message}</p>  // 수신 메시지 표시
        </div>
    );
};

export default FButton;
