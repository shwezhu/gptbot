import {Space, Button, message, Mentions} from "antd";
import {ClearOutlined, SendOutlined} from "@ant-design/icons";
import {useState} from "react";

export default function InputBar(props) {
    const [text, setText] = useState('');
    const [indicator, setIndicator] = useState('输入@选择猫娘');
    const [role, setRole] = useState('');

    const options = [
        { label: '翻译猫猫', value: 'translator' },
        { label: '医生猫猫', value: 'doctor' },
        { label: '重置', value: 'reset' },
    ];

    function onChange(value) {
        setText(value);
    }

    function onSelect(option) {
        if (option.value === 'translator') {
            setIndicator('翻译猫猫为陛下服务中~');
            setRole('translator')
            setText('');
        } else if (option.value === 'doctor') {
            setIndicator('医生猫猫为陛下服务中~');
            setRole('doctor')
            setText('');
        } else if (option.value === 'reset') {
            setIndicator('输入@选择猫娘');
            setRole('')
            setText('');
        }
    }

    async function onMessage(e) {
        e.preventDefault();
        const msg = text.trim();
        setText('');
        if (msg.length <= 0) {
            message.info("请输入信息").then();
            return;
        }

        if (localStorage.getItem('token') == null) {
            message.info({
                content: "请先设置暗号喵~",
                duration: 3,
            }).then();
            return;
        }

        if (role) {
            props.onSend(msg, role);
        } else {
            props.onSend(msg);
        }
    }

    return (
        <Space.Compact block={true}>
            <Button
                icon={<ClearOutlined />}
                onClick={props.onClear}
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'blueviolet',
                }}
            >删除记忆</Button>
            <Mentions
                style={{ width: '100%', overflow: 'hidden' }}
                onChange={onChange}
                onSelect={onSelect}
                onPressEnter={onMessage}
                value={text}
                placeholder={indicator}
                placement="top"
                options={options}
            >
            </Mentions>
            <Button
                icon={<SendOutlined />}
                onClick={onMessage}
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'blueviolet',
                }}
            >发送</Button>
        </Space.Compact>
    );
}
