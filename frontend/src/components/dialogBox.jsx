import {LoadingInfo} from "./loading-info.jsx";
import {useEffect, useRef} from "react";
import "../css/dialogBox.css";

export function DialogBox(props) {
    const { chatHistory, loading, onStop } = props;
    const endOfMessagesRef = useRef(null);

    function scrollToBottom() {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    return (
        <div className="dialog-box">
            <div className="messages-container">
                {chatHistory.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.role === 'user' ? 'user' : 'assistant'}`}
                    >
                        <strong>{message.role === 'assistant' ? '猫娘' : '妮妮'}</strong>: {message.content}
                    </div>
                ))}
            </div>
            { loading ? <LoadingInfo onStop={onStop} /> : null }
            <div ref={endOfMessagesRef} />
        </div>
    );
}