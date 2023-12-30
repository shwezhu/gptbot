import {useRef} from "react";

const SendBar = (props) => {
    const inputRef = useRef(null);

    const sendMessage = () => {
        const message = inputRef.current.value;
        props.sendMessage(message);
        inputRef.current.value = "";
    }

    return (
        <div className="send-bar">
            <input type="text" ref={inputRef} />
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}