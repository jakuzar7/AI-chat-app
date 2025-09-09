import axios from "axios";
import React, { useEffect, useState } from "react";

interface IReplyMessage {
    replyMessage: string;
}

function Chat() {
    const [userMessage, setUserMessage] = useState<string>("");
    const [reply, setReply] = useState("reply");

    const onSendBtnClick = async () => {

        try {
            const response = await axios.post(
                "http://localhost:8080/sendMessage",
                {
                    userMessage,
                }
            );
            if (response && response?.data?.replyMessage)
                setReply(response.data.replyMessage);
        } catch (e) {
            console.warn(`sending message failed ${e}`);
            setReply(`sending message failed ${e}`);
        }
    };

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
