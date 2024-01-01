import {useRef, useState} from 'react';
import {message} from "antd";

function validMessageSize(messages) {
    const totalCharacters = messages.reduce((sum, message) => sum + message.content.length, 0);

    if (totalCharacters > 6000) {
        while (messages.length > 6) {
            messages.shift();  // remove the first message
        }
    }

    return totalCharacters < 6000;
}

export const useChatGPT = (props) => {
    const { fetchPath } = props;
    const [messages, setMessages] = useState([]); // used to send to the server
    const [chatHistory, setChatHistory] = useState([]); // used to display
    const [loading, setLoading] = useState(false);
    const controller = useRef(null)

    function updateMessages(msg, role) {
        setMessages((messages) => [
            ...messages,
            {
                role: role,
                content: msg,
            }
        ]);
        setChatHistory(
            (chatHistory) => [
                ...chatHistory,
                {
                    role: role,
                    content: msg,
                }
            ]
        )
    }

    function archiveCurrentMessage(msg) {
        if (msg) {
            updateMessages(msg, 'assistant');
        }
    }

    async function fetchMessage(messages) {
        if (!validMessageSize(messages)) {
            // remove the last message
            setMessages((messages) => messages.slice(0, -1));
            message.warning({
                content: "消息太多啦喵~",
                duration: 5,
            }).then();
            return;
        }

        setLoading(true)
        controller.current = new AbortController()
        try {
            const response = await fetch(fetchPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify({messages}),
                signal: controller?.current?.signal,
            });
            const data = await response.json();

            setLoading(false)

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
            setLoading(false)
            // remove the last message
            setMessages((messages) => messages.slice(0, -1));

            if (e.name === 'AbortError') {
                return
            }

            message.error("获取信息失败, 请联系截图主人喵~: " + e);
        }
    }

    const onSend = (message) => {
        updateMessages(message, 'user');
        const newMessages = [...messages, {role: 'user', content: message}];
        fetchMessage(newMessages).then();
    };

    const onClear = () => {
        setMessages([]);
    };

    const onStop = () => {
        if (controller.current) {
            controller.current.abort()
            setLoading(false)
        }
    }

    return {
        loading,
        chatHistory,
        onSend,
        onClear,
        onStop,
    };
};
