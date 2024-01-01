import { useState } from 'react';
import {message} from "antd";

function validMessageLength(messages) {
    const totalLength = messages.reduce((sum, message) => sum + message.content.length, 0);
    return totalLength < 3000;
}

export const useChatGPT = (props) => {
    const { fetchPath } = props;
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    function archiveCurrentMessage(msg) {
        if (msg) {
            setLoading(false)
            setMessages((messages) => [
                ...messages,
                {
                    role: 'assistant',
                    content: msg,
                }
            ]);
        }
    }

    async function fetchMessage(messages) {
        if (!validMessageLength(messages)) {
            // remove the last message
            setMessages((messages) => messages.slice(0, -1));
            message.warning({
                content: "消息太多啦喵~",
                duration: 5,
            }).then();
            return;
        }

        setLoading(true)

        try {
            const response = await fetch(fetchPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify({messages}),
            });
            const data = await response.json();

            if (!response.ok) {
                // remove the last message
                setMessages((messages) => messages.slice(0, -1));
                message.error({
                    content: "获取信息失败, 请联系截图主人喵~: " + data.error,
                    duration: 5,
                });
                return;
            }

            archiveCurrentMessage(data.content);
        } catch (e) {
            // remove the last message
            setMessages((messages) => messages.slice(0, -1));
            message.error("获取信息失败, 请联系截图主人喵~: " + e);
        }
    }

    const onSend = (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
        fetchMessage(newMessages).then();
    };

    const onClear = () => {
        setMessages([]);
    };

    return {
        messages,
        loading,
        onSend,
        onClear,
    };
};
