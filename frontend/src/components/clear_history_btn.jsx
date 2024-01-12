import {Button} from "antd";
import {clearChatHistory} from "../functions/chat_history.jsx";

export default function ClearHistoryButton() {
    return (
        <Button
            onClick={clearChatHistory}
            style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
            }}
        >
            删除旧信息
        </Button>
    );
}