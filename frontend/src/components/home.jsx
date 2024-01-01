import {Layout} from "antd";
import {ChatGPT} from "./chatgpt.jsx";
import SetKeyBar from "./setkeybar.jsx";
const { Content, Footer, Header } = Layout;
import Background from "./background.jsx";

export default function Home() {
    return (
        <>
            <Background/>
            <Layout style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'transparent',
                zIndex: 1,
            }}>
                <Header style={{
                    display: 'flex',
                    alignItems: 'center', // vertical alignment
                    justifyContent: 'end', // horizontal alignment
                    backgroundColor: 'transparent',
                }}>
                    <SetKeyBar/>
                </Header>
                <Content>
                    <ChatGPT fetchPath={'https://shaowenzhu.top:2096/api/chat'}/>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                        backgroundColor: 'transparent',
                    }}
                >
                    妮妮殿下的专属机器人 ©2023 Created by 为霜
                </Footer>
            </Layout>
        </>
    );
}