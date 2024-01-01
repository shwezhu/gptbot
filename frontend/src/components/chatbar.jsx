import {List} from "antd";
import {LoadingInfo} from "./loading-info.jsx";
import {useEffect, useRef} from "react";

export function ChatBar(props) {
    const { chatHistory, loading, onStop } = props;
    const endOfMessagesRef = useRef(null);

    function scrollToBottom() {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    return (
        <List
            dataSource={chatHistory}
            renderItem={item => (
                <List.Item
                    style={{
                        backgroundColor: item.role === 'user' ? '#ece5dd' : '#dcf8c6',
                        color: 'black',
                        borderRadius: '1vh',
                        marginBottom: '1vh',
                        padding: '1vh',
                        width: '70%',
                        minHeight: '8vh',
                        display: 'flex',
                        justifyContent: item.role === 'user' ? 'flex-end' : 'flex-start',
                    }}
                >
                    <List.Item.Meta title={item.role === 'user'? '妮妮殿下' : '猫娘'}/>
                    {item.content}
                </List.Item>
            )}
            style={{
                height: '70vh',
                overflow: 'scroll',
                marginBottom: '5vh',
            }}
        >
            { loading ? <LoadingInfo onStop={onStop} /> : null }
            <div ref={endOfMessagesRef} />
        </List>
    );
}