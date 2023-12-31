import {Layout, theme} from "antd";
import {ChatGPT} from "./chatgpt.jsx";
import SetKeyBar from "./setkeybar.jsx";
const { Content, Footer, Header } = Layout;

export default function Home() {
    const {token: { colorBgContainer}} = theme.useToken();

    return (
        <Layout style={{height: '100vh',}}>
            <Header style={{
                display: 'flex',
                background: colorBgContainer,
                alignItems: 'center', // vertical alignment
                justifyContent: 'end', // horizontal alignment
            }}>
                <SetKeyBar />
            </Header>
            <Content
                style={{
                    background: colorBgContainer,
                }}
            >
                <ChatGPT fetchPath={'https://shaowenzhu.top:2096/api/chat'} />
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    background: colorBgContainer,
                }}
            >
                妮妮殿下的专属机器人 ©2023 Created by 为霜
            </Footer>
        </Layout>
    );
}