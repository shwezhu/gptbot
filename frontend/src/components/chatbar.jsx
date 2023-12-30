import {List} from "antd";

export function ChatBar(props) {
    const { messages} = props;

    return (
        <List
            dataSource={messages}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        title={item.role}
                    />
                    {item.content}
                </List.Item>
            )}
            style={{
                height: '70vh',
                overflow: 'scroll',
                marginBottom: '5vh',
            }}
        >
        </List>
    );
}