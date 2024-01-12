import {Button, Space, Spin} from "antd";
import {CloseCircleOutlined, LoadingOutlined} from "@ant-design/icons";

export function LoadingInfo(props) {
    const { onStop } = props;

    return (
        <Space direction={'horizontal'}>
            <Spin
                indicator={
                    <LoadingOutlined
                        style={{
                            fontSize: 24,
                        }}
                        spin
                    />
                }
            />
            <Button
                icon={<CloseCircleOutlined />}
                onClick={onStop}
                style={{
                    backgroundColor: '#ece5dd',
                    border: 'none',
                    color: 'black',
                }}
            >
                取消发送
            </Button>
        </Space>
    );
}