import {Layout} from "antd";
import {ChatGPT} from "./chatgpt.jsx";
import SetKeyBar from "./setkeybar.jsx";

const { Content, Footer, Header } = Layout;
import Background from "./background.jsx";
import ClearHistoryButton from "./clear_history_btn.jsx";

export default function Home() {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
            }}
        >
            <Background/>
            <Layout style={{
                height: '100vh',
                width: '100%',
                backgroundColor: 'transparent',
                zIndex: 1,
            }}>
                <Header style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',
                    backgroundColor: 'transparent',
                }}>
                    <SetKeyBar/>
                    <ClearHistoryButton/>
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
        </div>
    );
}