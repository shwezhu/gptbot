import {Button, List, Spin} from "antd";
import {CloseCircleOutlined, LoadingOutlined} from "@ant-design/icons";

export function LoadingInfo(props) {
    const { onStop } = props;

    return (
        <List.Item>
            <List.Item.Meta
                title={'assistant'}
                description={
                    <>
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
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: 'white',
                            }}
                        >
                            取消发送
                        </Button>
                    </>
                }
            />
        </List.Item>
    );
}