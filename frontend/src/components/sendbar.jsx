import {Space, Input, Button, message} from "antd";
import {ClearOutlined, SendOutlined} from "@ant-design/icons";
import SetKeyBar from "./setkeybar.jsx";

export default function SendBar(props) {
    let input = '';

    function onChange(e) {
        input = e.target.value;
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
    }

    return (
        <Space.Compact
            block={true}
        >
            <Button
                icon={<ClearOutlined />}
                onClick={props.onClear}
            >清空</Button>
            <Input.TextArea
                placeholder="Let's chat!"
                autoSize={{ maxRows: 4 }}
                onChange={onChange}
                allowClear
                autoComplete="off"
            />
            <Button
                icon={<SendOutlined />}
                onClick={onClick}
            >发送</Button>
            <SetKeyBar />
        </Space.Compact>
    );
}
