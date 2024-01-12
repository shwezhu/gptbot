import {useEffect, useRef, useState} from 'react';
import {message} from "antd";
import {getSystemInstruction, trimMessage} from "../functions/chat_message.jsx";
import {getChatHistory, saveChatHistory} from "../functions/chat_history.jsx";

export const useChatGPT = (props) => {
    const { fetchPath } = props;
    const [messages, setMessages] = useState([]); // for real request
    const [chatHistory, setChatHistory] = useState([]); // for display
    const [loading, setLoading] = useState(false);
    const controller = useRef(null)

    // load the chat history from local storage.
    useEffect(() => {
        const chat = getChatHistory();
        if (chat && chat.length > 0) {
            setChatHistory(chat);
        }
    }, []);

    useEffect(() => {
        // save the chat history to local storage.
        saveChatHistory(chatHistory);
    }, [chatHistory]);

    function saveMessage(msg, role) {
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
        );
    }

    async function fetchMessage(messages) {
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

            return data;
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

    const onSend = async (message, role=null) => {
        saveMessage(message, 'user');
        trimMessage(messages)

        let newMessages;
        if (role) {
            const instruction = getSystemInstruction(role);
            if (role === 'translator') {
                newMessages = [instruction, {role: 'user', content: message}];
            } else {
                newMessages = [instruction, ...messages, {role: 'user', content: message}];
            }
        } else {
            newMessages = [...messages, {role: 'user', content: message}];
        }

        const res = await fetchMessage(newMessages).then();
        // save the chat history.
        if (res && res.content.trim()) {
            saveMessage(res.content, 'assistant');
        }
    };

    const onClear = () => {
        setMessages([]);
        message.info("已清空").then();
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
