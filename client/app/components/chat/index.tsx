import axios from "axios";
import React, { useEffect, useState } from "react";

interface IReplyMessage {
    message: string;
}

function Chat() {
    const [userMessage, setUserMessage] = useState<string>("");
    const [reply, setReply] = useState("reply");

    const onSendBtnClick = async () => {
        const response = await axios.post("http://localhost:8080/sendMessage", {
            userMessage,
        });
        console.log(response.data);
    };

    const fetchReplyMessage = async () => {
        const response = await fetch("http://localhost:8080/hello");
        const data = await response.json();
        const message: IReplyMessage = data.message;
        
        if (message && typeof message === "string") setReply(message);
        else setReply("error");
    };

    useEffect(() => {
      const interval = setInterval(fetchReplyMessage, 5000);
    
      return () => {
        interval.close()
      }
    }, [])
    

    return (
        <div className="bg-slate-900 rounded-2xl">
            <p className="p-10 py-28">{reply}</p>
            <div
                className="flex items-center rounded-2xl p-3 m-2 
            bg-slate-800 hover:bg-slate-700"
            >
                <textarea
                    className="focus-visible:outline-none"
                    name="write your message here"
                    id="user-message-area"
                    placeholder="your message"
                    value={userMessage}
                    onChange={(e) => {
                        setUserMessage(e.target.value);
                    }}
                ></textarea>
                <button
                    className="p-2 px-4 mx-2 bg-slate-600 rounded-2xl"
                    onClick={onSendBtnClick}
                >
                    send
                </button>
            </div>
        </div>
    );
}

export default Chat;
