import {message} from "antd";

const chatKey = 'chat_history';
const sizeKey = 'size';
const clearSize = 60;

function getChatHistory() {
    const chatHistoryStr = localStorage.getItem(chatKey);
    if (!chatHistoryStr) {
        return [];
    }

    try {
        return JSON.parse(chatHistoryStr);
    } catch (e) {
        console.error('Error parsing chat history: ' + e);
        return [];
    }
}

function saveChatHistory(history) {
    let chatHistoryStr;
    try {
        chatHistoryStr = JSON.stringify(history);
    } catch (e) {
        message.error({
            content: "存储聊天记录失败~",
            duration: 5,
        }).then();
        console.error('Error stringifying chat history: ' + e);
        return;
    }

    if(localStorage && !localStorage.getItem(sizeKey)) {
        setLocalStorageSize();
    }

    if (chatHistoryStr.length >= Number(localStorage.getItem(sizeKey))) {
        message.error({
            content: "历史聊天记录过大, 请清理喵~",
            duration: 5,
        }).then();
        return;
    }

    localStorage.setItem(chatKey, chatHistoryStr);
}

function clearChatHistory() {
    let chatHistory = getChatHistory();
    if (!chatHistory) {
        return;
    }

    // remove the last 50 messages
    chatHistory.splice(0, Math.min(clearSize, chatHistory.length));

    saveChatHistory(chatHistory);
}

function setLocalStorageSize() {
    let i = 0;
    try {
        // Roughly 10240000 UTF-16 code units.
        for (i = 250; i <= 10000; i += 250) {
            localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
        }
    } catch (e) {
        localStorage.removeItem('test');
        // Size in utf-16 code units, not bytes.
        localStorage.setItem(sizeKey, String(i - 250));
    }
}

export {getChatHistory, saveChatHistory, clearChatHistory}

