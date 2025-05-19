// components/ChatInterface.tsx
import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import CanvasArea from './CanvasArea';
import ChatMessage from './ChatMessage';

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text?: string;
  imageUrls?: string[];
  buttonLabel?: string;
  modalImageSrc?: string;
}

interface ChatInterfaceProps {
  onImageClick: (src: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onImageClick }) => {
  // 聊天消息列表
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: '你好！欢迎使用智能助手。',
    },
    {
      id: 2,
      sender: 'ai',
      text: '请查看以下示例图片：',
      imageUrls: ['/images/01.png', '/images/02.png'],
    },
    {
      id: 3,
      sender: 'ai',
      text: '需要查看改进后的智能家居界面吗？',
      buttonLabel: '跳转到 改进智能家居界面',
      modalImageSrc: '/images/03.png',
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  // 处理用户发送消息
  const handleSendMessage = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const newId = Date.now();
    const userMsg: Message = {
      id: newId,
      sender: 'user',
      text: trimmed,
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // 模拟 AI 回复（根据业务可替换为实际 AI 接口调用）
    const aiMsg: Message = {
      id: newId + 1,
      sender: 'ai',
      text: '这是 AI 的自动回复。',
    };
    setTimeout(() => {
      setMessages(prev => [...prev, aiMsg]);
    }, 500);
  };

  // 点击聊天图片时调用父组件更新画布
  const handleImageClick = (src: string) => {
    onImageClick(src);
  };

  // 点击按钮时打开全屏 Modal 预览
  const handleButtonClick = (src: string | undefined) => {
    if (!src) return;
    setModalImage(src);
    setIsModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 消息展示区域 */}
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '0 16px' }}>
        {messages.map(msg => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            imageUrls={msg.imageUrls}
            buttonLabel={msg.buttonLabel}
            onImageClick={handleImageClick}
            onButtonClick={() => handleButtonClick(msg.modalImageSrc)}
          />
        ))}
      </div>
      {/* 用户输入框 */}
      <div style={{ padding: '16px' }}>
        <Input.Search
          placeholder="请输入消息"
          enterButton="发送"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onSearch={handleSendMessage}
        />
      </div>
      {/* 全屏图片预览 Modal */}
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        width="100%"
        style={{ top: 0 }}
        bodyStyle={{ padding: 0, height: '100vh' }}
      >
        <img
          src={modalImage}
          alt="全屏预览"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Modal>
    </div>
  );
};

export default ChatInterface;
