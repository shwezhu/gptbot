import InputBar from "./inputbar.jsx";
import {Space} from "antd";
import {DialogBox} from "./dialog_box.jsx";
import {useChatGPT} from "../hooks/usechatgpt.jsx";

export function ChatGPT(props) {
    const { chatHistory, loading, onSend, onClear, onStop } = useChatGPT(props)

    return (
        <Space style={{width: '100%', paddingLeft: '2vh'}} direction="vertical">
            <DialogBox chatHistory={chatHistory} loading={loading} onStop={onStop} />
            <InputBar onSend={onSend} onClear={onClear}/>
        </Space>
    );
}