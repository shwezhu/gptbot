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
                        >
                            停止
                        </Button>
                    </>
                }
            />
        </List.Item>
    );
}