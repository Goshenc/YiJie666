import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState
} from 'react';
import {
  Layout,
  Menu,
  Space,
  Divider,
  Button,
  Modal,
  Input,
  Avatar
} from 'antd';
import {
  PlusOutlined,
  CustomerServiceFilled,
  UserOutlined,
  ShrinkOutlined,
  CloseOutlined,
  StarFilled,
  SendOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { PageType } from '../types';

const { Header, Sider, Content } = Layout;

// 画布组件
const CanvasArea: React.FC<{ imageSrc?: string }> = ({ imageSrc }) => (
  <div style={{
    background: `
      linear-gradient(90deg, #f0f0f0 1px, transparent 1px),
      linear-gradient(#f0f0f0 1px, transparent 1px),
      #fff`,
    backgroundSize: '20px 20px',
    height: '100%',
    position: 'relative',
    borderRadius: 8,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
  }}>
    {imageSrc ? (
      <img
        src={imageSrc}
        alt="canvas"
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'contain', borderRadius: 8
        }}
      />
    ) : (
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'rgba(0,0,0,0.25)', fontSize: 20
      }}>
        点击聊天中的图片在此预览
      </div>
    )}
  </div>
);

// 单条消息组件
interface ChatMessageProps {
  isAI: boolean;
  text: string;
  img?: string;
  jumpText?: string;
  modalImg?: string;
  onImageClick: (src: string) => void;
  onButtonClick: (src: string) => void;
}
const ChatMessage: React.FC<ChatMessageProps> = ({
  isAI, text, img, jumpText, modalImg, onImageClick, onButtonClick
}) => (
  <div style={{
    display: 'flex',
    justifyContent: isAI ? 'flex-start' : 'flex-end',
    padding: '8px 0'
  }}>
    <div style={{
      display: 'flex',
      flexDirection: isAI ? 'row' : 'row-reverse',
      alignItems: 'flex-start',
      gap: 8,
      maxWidth: '80%'
    }}>
      <Avatar
        src={isAI ? '/images/avatar.png' : undefined}
        icon={!isAI ? <UserOutlined /> : undefined}
        style={{ backgroundColor: isAI ? '#f0f0f0' : '#1890ff' }}
      />
      <div style={{
        backgroundColor: isAI ? '#f0f0f0' : '#1890ff',
        color: isAI ? '#000' : '#fff',
        padding: '8px 12px',
        borderRadius: 8,
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
      }}>
        <div>{text}</div>
        {img && (
          <img
            src={img}
            alt="chat"
            onClick={() => onImageClick(img)}
            style={{ maxWidth: 200, cursor: 'pointer', marginTop: 8, borderRadius: 4 }}
          />
        )}
        {jumpText && modalImg && (
          <Button
            size="small"
            onClick={() => onButtonClick(modalImg)}
            style={{ marginTop: 8 }}
          >{jumpText}</Button>
        )}
      </div>
    </div>
  </div>
);

// 聊天界面
interface ChatInterfaceHandle { resetMessage: () => void; }
interface ChatInterfaceProps {
  onImageClick: (src: string) => void;
  onOpenModal: (src: string) => void;
}
const ChatInterface = forwardRef<ChatInterfaceHandle, ChatInterfaceProps>(
  ({ onImageClick, onOpenModal }, ref) => {
    // **改用 useState**
    const [messages, setMessages] = useState<any[]>([]);
    const [aiIndex, setAiIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const endRef = useRef<HTMLDivElement>(null);

    const defaultMsgs = [
      { text: '你好，我是翌界AI助手，请告诉我想要的界面风格。', isAI: true },
      { text: '我想生成一个智能家居界面', isAI: false },
      { text: '好的！您希望界面包含哪些功能？', isAI: true }
    ];

    // 初始化默认消息
    useEffect(() => {
      if (messages.length === 0) {
        setMessages(defaultMsgs);
      }
    }, []);

    // 滚动到底部
    useEffect(() => {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // 暴露 resetMessage
    useImperativeHandle(ref, () => ({
      resetMessage() {
        setMessages([]);
        setAiIndex(0);
      }
    }));

    // AI 回复列表
    const aiResponses = [
      {
    text: '正在为您生成智能家居界面…',
    img: '/images/01.png',
    jumpText: '跳转到 智能家居界面',
    modalImg: '/images/01.png'
  },
      {
        text: '这是改进的界面效果',
        img: '/images/02.png',
        jumpText: '跳转到 改进智能家居界面',
        modalImg: '/images/02.png'
      },
      {
        text: '设备管理界面如图',
        img: '/images/03.png',
        jumpText: '跳转到 设备界面',
        modalImg: '/images/03.png'
      },
      {
        text: '智能分析界面预览',
        img: '/images/04.png',
        jumpText: '跳转到 智能分析界面',
        modalImg: '/images/04.png'
      }
    ];

    const handleSend = () => {
      const val = inputValue.trim();
      if (!val) return;
      const userMsg = { text: val, isAI: false };
      setInputValue('');
      // 立即添加用户消息
      setMessages(prev => [...prev, userMsg]);
      // 延迟添加 AI 回复
      setTimeout(() => {
        setMessages(prev => {
          const ai = aiResponses[aiIndex % aiResponses.length];
          setAiIndex(i => i + 1);
          return [...prev, { ...ai, isAI: true }];
        });
      }, 500);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* 消息区 */}
        <div
          style={{
            flex: 1,
            padding: 16,
            overflowY: 'auto',
            background: '#fafafa'
          }}
        >
          {messages.map((m, i) => (
            <ChatMessage
              key={i}
              text={m.text}
              isAI={m.isAI}
              img={m.img}
              jumpText={m.jumpText}
              modalImg={m.modalImg}
              onImageClick={onImageClick}
              onButtonClick={onOpenModal}
            />
          ))}
          <div ref={endRef} />
        </div>
        {/* 输入区 */}
        <div
          style={{
            padding: 8,
            borderTop: '1px solid #e8e8e8',
            background: '#fff'
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <Input.TextArea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              autoSize={{ minRows: 1, maxRows: 4 }}
              placeholder="输入消息..."
              style={{ flex: 1, borderRadius: 20 }}
              onPressEnter={e => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button type="primary" icon={<SendOutlined />} onClick={handleSend} />
          </div>
        </div>
      </div>
    );
  }
);

// 主页面
interface AIGenerateProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
}
const AIGenerate: React.FC<AIGenerateProps> = ({ setCurrentPage }) => {
  const [canvasImg, setCanvasImg] = useState<string>();
  const [modalImg, setModalImg] = useState<string>();
  const chatRef = useRef<any>(null);

  const sideMenuItems: MenuProps['items'] = [
    { key: '2', label: '页面2' },
    { key: '3', label: '页面1' },
    { key: '4', label: '翌界论坛' },
    { key: '5', label: '翌界首页' }
  ];

  return (
    <Layout style={{ height: '100vh', background: '#f5f5f5' }}>
      {/* 全屏 Modal */}
      <Modal
        open={!!modalImg}
        footer={null}
        onCancel={() => setModalImg(undefined)}
        width="100%"
        style={{ top: 0 }}
        bodyStyle={{ padding: 0, height: '100vh', background: '#000' }}
      >
        <img
          src={modalImg!}
          alt="full"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />

      </Modal>

      {/* Header */}
      <Header
        style={{
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <img
          src="/images/logo.png"
          alt="logo"
          style={{ height: 30, marginRight: 12 }}
        />{' '}
        AI 生成界面
        <Space style={{ marginLeft: 'auto' }}>
          <StarFilled
            onClick={() => chatRef.current?.resetMessage()}
            style={{ cursor: 'pointer' }}
          />
          <Divider type="vertical" />
          <CustomerServiceFilled />
          <Divider type="vertical" />
          <UserOutlined />
          <Divider type="vertical" />
          <ShrinkOutlined />
          <Divider type="vertical" />
          <CloseOutlined />
        </Space>
      </Header>

      <Layout>
        {/* 最左侧导航 */}
        <Sider
          width={240}
          style={{
            background: '#fff',
            padding: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Button icon={<PlusOutlined />} block style={{ marginBottom: 16 }}>
            新页面
          </Button>
          <Menu mode="inline" items={sideMenuItems} />
        </Sider>

        {/* 中间画布 */}
        <Content style={{ padding: 16 }}>
          <CanvasArea imageSrc={canvasImg} />
        </Content>

        {/* 最右侧聊天 */}
        <Sider
          width={400}
          style={{
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          <ChatInterface
            ref={chatRef}
            onImageClick={setCanvasImg}
            onOpenModal={setModalImg}
          />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default AIGenerate;
