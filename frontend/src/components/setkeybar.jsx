import { useState } from 'react';
import {Button, Input, message, Modal} from 'antd';

export default function SetKeyBar() {
    const [open, setOpen] = useState(false);
    let input = '';

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        if (input === '') {
            message.warning({
                content: "暗号不可以是不填哦, 喵~",
                duration: 2,
            }).then();
            return;
        }
        localStorage.setItem('token', input);
        input = '';
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={showModal}>设置暗号</Button>
            <Modal
                open={open}
                title="设置暗号"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn }) => (
                    <OkBtn />
                )}>
                <Input
                    placeholder="请输入你和主人的暗号喵~"
                    allowClear
                    onChange={(e) => {
                        input = e.target.value;
                    }}
                />
            </Modal>
        </>
    );
}
