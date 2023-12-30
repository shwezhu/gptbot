import {Space, Input, Button, message} from "antd";
import {ClearOutlined, SendOutlined} from "@ant-design/icons";

export default function SendBar(props) {
    let input = '';

    function onChange(e) {
        input = e.target.value;
    }

    function onClick() {
        if (input === '') {
            message.info("请输入内容").then();
            return;
        }

        props.onSend({
            role: 'user',
            content: input,
        });
        input = ''
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
        </Space.Compact>
    );
}
