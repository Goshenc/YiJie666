import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Layout, Menu, Space, Divider,Button } from 'antd';
import { AudioOutlined,PictureOutlined,SwapOutlined,FullscreenOutlined,LeftSquareTwoTone,PlusOutlined,CustomerServiceFilled,ShrinkOutlined , UserOutlined,CloseOutlined ,StarFilled} from '@ant-design/icons';
import type { MenuProps  } from 'antd';
// import Button from "@/components/ui/button";
import { Input, Avatar } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useLocalStorage, } from '../hooks/useLocalStorage';
import { PageType } from '../types';

const { Footer } = Layout;

const { Header, Sider, Content } = Layout;

const CanvasArea = () => {
  return (
    <div style={{
      background: `
        linear-gradient(90deg, #f0f0f0 1px, transparent 1px),
        linear-gradient(#f0f0f0 1px, transparent 1px),
        #fff`,
      backgroundSize: '20px 20px',
      height: '600px',
      borderRadius: 8,
      position: 'relative',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'rgba(0,0,0,0.25)',
        fontSize: 20,
        userSelect: 'none'
      }}>
      </div>
    </div>
  );
};


interface AnalysisPageProps {
	setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
}
const AIGenerate: React.FC<AnalysisPageProps> = ({setCurrentPage}) => {
  const topMenuItems: MenuProps['items'] = [
  ];

  const chatInterfaceRef = useRef<HTMLDivElement>(null);
  const messageStoreKey = 'AIGeneratechatMessages';

  const sideMenuItems: MenuProps['items'] = [
    { key: '2', label: '页面2' },
    { key: '3', label: '页面1' },
    { key: '4', label: '翌界论坛' },
    { key: '5', label: '翌界首页' },
  ];

  const handleResetMessage = () => {
    if(chatInterfaceRef.current) {
      chatInterfaceRef.current.resetMessage();
    }
  };

  const ChatMessage = ({ isAI, text, img,jumpPath,jumpText }: { isAI?: boolean; text: string; img?: string,jumpPath?: string,jumpText?: string }) => {

    const handleJump = (path: any) => {
      console.log(path,'path');
      
      setTimeout(() => {
          setCurrentPage(path); // 0.5秒后跳转到 垃圾界面1
      }, 500);
  };
    
    return (
      <div style={{
        display: 'flex',
        flexDirection: isAI ? 'row' : 'row-reverse',
        margin: '16px 0',
        gap: 12
      }}>
        <Avatar 
          src={isAI ? "avatar.png" : <UserOutlined />}
          style={{ 
            backgroundColor: isAI ? '#1890ff' : '#1890ff',
            width: 40,
            height: 40
          }}
        />
        <div style={{
          backgroundColor: isAI ? '#f0faff' : '#e6f7ff',
          padding: 12,
          borderRadius: 8,
          maxWidth: '70%',
          border: '1px solid #e6f7ff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          {text}
          {img && <img src={img}  />}
          {jumpPath && <Button onClick={() => handleJump(jumpPath)} className="mt-0 ml-3 text-sm px-2 py-1" >{jumpText}</Button>}
        </div>
      </div>
    )
  };
  
  const ChatInterface = forwardRef((props, ref) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [messages, setMessages] = useLocalStorage<Array<any>>(messageStoreKey, []);
    const defaultMessages = [
      { text: '你好，我是翌界AI助手，请告诉我你想要的界面设计风格，我会为你生成完美的用户界面。', isAI: true, img: "" ,default: true},
      { text: '我想生成一个智能家居界面', isAI: false, img: "",default: true },
      { text: '好的！ 您希望这个界面包含哪些功能呢？', isAI: true, img: "",default: true },
    ];
    const [inputValue, setInputValue] = React.useState('');
    const [aiResponseIndex, setAiResponseIndex] = useLocalStorage<number>('aiResponseIndex', 0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const aiResponses = [
 
      {
        text:"好的，我将为您生成智能家具界面。根据您的需求，智能家居界面要包含常用设备开关与数据监测统计功能。请问您家中一共有哪些智能家具设备呢？",
        img: "", 
        jumpPath:"",
      },
      {
        text:"好的。正在为您生成智能家居界面",
        jumpPath: "garbage1",  
        jumpText:"跳转到 智能家居界面",
      },
      {
        text:"好的！我将为您在主页轮播家中智能摄像头的实时画面，并对整个房间的耗电量进行实时监控，实现对家庭设备的实时检测与控制。",
        jumpPath: "garbage2",  
        jumpText:"跳转到 改进智能家居界面",
      },
      {
        text:"好的，我将为您生成设备界面，可以对所有的设备进行便捷操作。",
        jumpPath: "garbage3",  
        jumpText:"跳转到 设备界面",
      },
      {
        text:"好的，我将结合大数据，为您生成智能分析界面（生成智能分析界面），同时，您还可以在主页右上方点击输入指令，我会对您的要求进行智能回答。",
        jumpPath: "analysis",  
        jumpText:"跳转到 智能分析界面",
      },
    ];


  // **检查默认消息是否存在**
  const checkAndAddDefaultMessages = (oldMessage:any) => {
 let oldMsg = JSON.parse(oldMessage);

    const existingDefaultMessages = oldMsg.filter((msg:any) => msg.default);
    if(existingDefaultMessages.length > 0) {
      setMessages(oldMsg);
      return;
    }
    setMessages([...defaultMessages, ...oldMsg]);  // 如果没有默认消息，则添加默认消息
  };

  // **首次加载时校验消息**，如果没有消息则填充默认消息
  useEffect(() => {
    let  oldMessage = localStorage.getItem(messageStoreKey);
    console.log(oldMessage,'oldMessage');
    if (!oldMessage) {
      setMessages(defaultMessages);  // 没有任何历史消息则直接添加默认消息
    } else {
      checkAndAddDefaultMessages(oldMessage);  // 有历史消息则检查是否缺少默认消息
    }
  }, []);  // 只在组件首次加载时执行

    //  自动滚动
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const resetMessage = () => {
      // 重置消息到初始状态
      setMessages([ ]);
      setAiResponseIndex(0);
    };

    useImperativeHandle(ref, () => ({
      resetMessage,
    }));

    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const handleSend = () => {
      if (!inputValue.trim()) return;

      // 添加用户消息
      const newMessages = [...messages, { text: inputValue, isAI: false, img: "" }];
      setMessages(newMessages);
      setInputValue("");

      // 添加AI回复
      setTimeout(() => {
        const aiResponse = aiResponses[aiResponseIndex];
        setMessages([...newMessages, {...aiResponse, isAI: true}]);
        setAiResponseIndex((prevIndex) => (prevIndex + 1) % aiResponses.length);
      }, 500);
    };





    return (
      <Layout style={{
        height: 'calc(100vh - 112px)',
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        <Content style={{
          flex: 1,
          padding: 24,
          overflowY: 'auto',
          background: '#fafafa'
        }}>
          {messages.map((msg, index) => (
            <ChatMessage key={index} isAI={msg.isAI} text={msg.text} img={msg.img} jumpPath={msg.jumpPath} jumpText={msg.jumpText} />
          ))}
          <div ref={messagesEndRef} />
        </Content>
  
        <Footer style={{
          padding: 16,
          borderTop: '1px solid #f0f0f0',
          background: '#fff'
        }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <Input.TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="输入消息..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              style={{ borderRadius: 20 }}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />&nbsp;&nbsp;
            <Button 
              type="default" 
              icon={<AudioOutlined style={{color:'white'}} />}
              onClick={showModal}
              style={{ 
                width: 32,
                height: 32,
                borderRadius: 4,
                border: '1px solid #d9d9d9',
                backgroundColor: '#1890ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
            
            <Modal
              title=""
              visible={isModalOpen}
              onCancel={handleCancel}
              footer={null}
              centered
              width={800}
            >
              <div style={{ 
                textAlign: 'center',
                padding: '40px 0',
                position: 'relative'
              }}>
                                <img 
                  src="" 
                  style={{
                    width: 600,
                    height: 200,
                    margin: '0 auto',
                    display: 'block',
                    marginTop: 40
                  }}
                />

              </div>
            </Modal>
            &nbsp;<Button 
              type="default" 
              icon={<PictureOutlined style={{color:'white'}} />}
              style={{ 
                width: 32,
                height: 32,
                borderRadius: 4,
                border: '1px solid #d9d9d9',
                backgroundColor: '#1890ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />&nbsp;&nbsp;
            <Button 
            onClick={handleSend}
              type="primary" 
              shape="circle" 
              icon={<SendOutlined />}
              style={{ 
                backgroundColor: '#1890ff',
                borderColor: '#1890ff'
              }}
            />
          </div>
        </Footer>
      </Layout>
    );
  });

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Header
        style={{
          background: '#fff',
          padding: '0 24px',
          height: 64,   
          position: 'sticky',
          top: 10 ,
          zIndex: 100,
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          margin: '16px 16px 0',
          width: 'calc(100% - 32px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <div style={{ 
            fontSize: 18, 
            fontWeight: 600, 
            marginRight: 40,
            display: 'flex',
            alignItems: 'center',

            flex: 1  
          }}>
            <img src="logo.png" style={{ height: 30, marginRight: 8 }} />
            AI 生成界面
          </div>
          
          <Menu
            mode="horizontal"
            items={topMenuItems}
            style={{ flex: 1, borderBottom: 'none' }}
          />

          <Space>
            <StarFilled onClick={handleResetMessage} style={{ fontSize: 16, cursor: 'pointer' }} />
            <Divider type="vertical" />
            <CustomerServiceFilled style={{ fontSize: 16, cursor: 'pointer' }} />
            <Divider type="vertical" />
            <UserOutlined style={{ fontSize: 16, cursor: 'pointer' }} />
            <Divider type="vertical" />
            <ShrinkOutlined style={{ fontSize: 16, cursor: 'pointer' }} />
            <Divider type="vertical" />
            <CloseOutlined style={{ fontSize: 16, cursor: 'pointer' }} />
          </Space>
        </div>
      </Header>

      {/* 主内容区域 */}
      <Layout style={{ margin: '16px', gap: 16 }}>
        {/* 左侧导航栏 - 卡片样式 */}
        <Sider
          theme="light"
          width={240}
          style={{
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            height: 'calc(100vh - 112px)',
            position: 'sticky',
            top: 80,
            overflow: 'auto'
          }}
        >
         <div style={{ 
            padding: '16px 24px',
            fontSize: 16,
            fontWeight: 500,
            border: '2px solid #d9d9d9',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 16px 8px',
            background: '#fff',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
          }}>
            <PlusOutlined style={{ fontSize: 14 }} />
            <span style={{ marginLeft: 8 }}>新页面</span>
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={['4']}
            items={sideMenuItems}
            style={{ borderRight: 0, padding: '0 16px' }}
          />
        </Sider>

        {/* 中间内容区域 - 卡片样式 */}
<Content
  style={{
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    minHeight: 'calc(100vh - 112px)',
    display: 'flex',
    flexDirection: 'column'
  }}
>
  <div style={{ flex: 1, padding: 24 }}>
    <CanvasArea />
  </div>

  <div style={{
    borderTop: '1px solid #f0f0f0',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fff'
  }}>
    <Space>
      <Button 
        icon={<LeftSquareTwoTone />} 
        type="text"
        style={{ padding: '4px 8px' }}
      />
      <Button
        style={{
            fontSize: 16,
          background: '#f0f5ff',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 12px',
          color: '#1890ff'
        }}
      >
        V8
      </Button>
  
    </Space>
    
    <Space>
    <FullscreenOutlined  style={{
          background: '#f0f5ff',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 12px',
        }} />
      <Button
        type="primary"
        style={{
          background: '#1677ff',
          borderRadius: '4px'
        }}
      >
        插入到画布
      </Button>
      &nbsp;&nbsp;
      <Button
        type="default"
        style={{
          background: '#ffffff',
          borderRadius: '4px',
          border: '2px solid #d9d9d9',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <div  
        style={{
          borderRadius: '4px',
          color: '#000000'
        }}>
        React - Shadcn &nbsp;&nbsp;
        <SwapOutlined />
        </div>
      </Button>
      <Button 
        icon={<span>{"</>"}</span>} 
        type="text"
        style={{ 
          background: '#f5f5f5',
          borderRadius: '4px',
          marginLeft: '8px'
        }}
      />
    </Space>
  </div>
</Content>

        {/* 右侧侧边栏 - 卡片样式 */}
        <ChatInterface ref={chatInterfaceRef} />
      </Layout>
    </Layout>
  );
};

export default AIGenerate;
