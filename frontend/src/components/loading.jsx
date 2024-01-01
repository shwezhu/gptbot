import {List, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

export function Loading() {
    return (
        <List.Item>
            <List.Item.Meta
                title={'assistant'}
                description={
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
                }
            />
        </List.Item>
    );
}