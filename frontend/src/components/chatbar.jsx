import {List} from "antd";
import {LoadingInfo} from "./loading-info.jsx";
import {useEffect, useRef} from "react";

export function ChatBar(props) {
    const { messages, loading } = props;
    const endOfMessagesRef = useRef(null);

    function scrollToBottom() {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <List
            dataSource={messages}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta title={item.role}/>
                    {item.content}
                </List.Item>
            )}
            style={{
                height: '70vh',
                overflow: 'scroll',
                marginBottom: '5vh',
            }}
        >
            { loading ? <LoadingInfo/> : null }
            <div ref={endOfMessagesRef} />
        </List>
    );
}