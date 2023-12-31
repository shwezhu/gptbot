import {Space, Input, Button, message} from "antd";
import {ClearOutlined, SendOutlined} from "@ant-design/icons";
import {useState} from "react";

export default function SendBar(props) {
    const [input, setInput] = useState('');

    function onChange(e) {
        setInput(e.target.value);
    }

    async function onClick() {
        if (input === '') {
            message.info("请输入").then();
            return;
        }

        if (localStorage.getItem('token') == null) {
            message.info({
                content: "请先设置暗号喵~",
                duration: 3,
            }).then();
            return;
        }

        props.onSend({
            role: 'user',
            content: input,
        });

        setInput('');
    }

    return (
        <Space.Compact block={true}>
            <Button
                icon={<ClearOutlined />}
                onClick={props.onClear}
            >清空</Button>
            <Input.TextArea
                placeholder="Let's chat!"
                autoSize={{ maxRows: 1 }}
                onChange={onChange}
                value={input}
                allowClear
            />
            <Button
                icon={<SendOutlined />}
                onClick={onClick}
            >发送</Button>
        </Space.Compact>
    );
}
