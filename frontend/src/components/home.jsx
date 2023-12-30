import {Layout, theme} from "antd";
import {ChatGPT} from "./chatgpt.jsx";
const { Content, Footer } = Layout;

export default function Home() {
    const {token: { colorBgContainer}} = theme.useToken();

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Content
                style={{
                    paddingLeft: '20vh',
                    paddingRight: '20vh',
                    height: '90vh',
                    background: colorBgContainer,
                }}
            >
                <ChatGPT fetchPath={'/api/chat'} />
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                妮妮殿下的专属机器人 ©2023 Created by 为霜
            </Footer>
        </Layout>
    );
}