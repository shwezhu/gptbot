import {LoadingInfo} from "./loading_info.jsx";
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
                        <strong>{message.role === 'assistant' ? '猫娘' : '妮妮'}</strong>:
                        {
                            message.content.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br/>
                                </span>
                            ))
                        }
                    </div>
                ))}
            </div>
            { loading ? <LoadingInfo onStop={onStop} /> : null }
            <div ref={endOfMessagesRef} />
        </div>
    );
}