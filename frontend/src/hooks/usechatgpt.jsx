import { useState } from 'react';
import {message} from "antd";

export const useChatGPT = (props) => {
    const { fetchPath } = props;
    const [messages, setMessages] = useState([]);

    function archiveCurrentMessage(msg) {
        if (msg) {
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
        message.open({
            content: "正在获取信息, 请稍等喵~",
            duration: 3,
        }).then();

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
                message.error({
                    content: "获取信息失败, 请联系截图主人喵~: " + data.message,
                    duration: 5,
                });
                return;
            }

            archiveCurrentMessage(data.message);
        } catch (e) {
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
        onSend,
        onClear,
    };
};



