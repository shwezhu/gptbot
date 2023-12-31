import SendBar from "./sendbar.jsx";
import {Space} from "antd";
import {ChatBar} from "./chatbar.jsx";
import {useChatGPT} from "../hooks/usechatgpt.jsx";

export function ChatGPT(props) {
    const { messages, onSend, onClear } = useChatGPT(props)

    return (
        <Space style={{width: '100%',}}
            direction="vertical">
            <ChatBar messages={messages}/>
            <SendBar onSend={onSend} onClear={onClear}/>
        </Space>
    );
}