import {List} from "antd";
import {Loading} from "./loading.jsx";

export function ChatBar(props) {
    const { messages, loading } = props;

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
            { loading ? <Loading/> : null }
        </List>
    );
}