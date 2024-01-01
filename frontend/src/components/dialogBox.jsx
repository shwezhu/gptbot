import {LoadingInfo} from "./loading-info.jsx";
import {useEffect, useRef} from "react";

export function ChatBar(props) {
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
            {chatHistory.map((message, index) => (
                <div
                    key={index}
                    className={`message ${message.role === 'user' ? 'right' : 'left'}`}
                >
                    <strong>{message.role}</strong>: {message.content}
                </div>
            ))}

            { loading ? <LoadingInfo onStop={onStop} /> : null }
            <div ref={endOfMessagesRef} />
        </div>
    );
}