import Inputbar from "./inputbar.jsx";
import {Space} from "antd";
import {ChatBar} from "./chatbar.jsx";
import {useChatGPT} from "../hooks/usechatgpt.jsx";

export function ChatGPT(props) {
    const { messages, loading, onSend, onClear, onStop } = useChatGPT(props)

    return (
        <Space style={{width: '100%',}}
            direction="vertical">
            <ChatBar messages={messages} loading={loading} onStop={onStop} />
            <Inputbar onSend={onSend} onClear={onClear}/>
        </Space>
    );
}