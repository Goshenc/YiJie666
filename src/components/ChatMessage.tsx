// components/ChatMessage.tsx
import React from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';

interface ChatMessageProps {
  sender: 'user' | 'ai';
  text?: string;
  imageUrls?: string[];
  buttonLabel?: string;
  onImageClick?: (src: string) => void;
  onButtonClick?: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  text,
  imageUrls,
  buttonLabel,
  onImageClick,
  onButtonClick
}) => {
  // 根据发送者设置对齐方向和气泡样式
  const justify = sender === 'user' ? 'flex-end' : 'flex-start';
  const bubbleColor = sender === 'user' ? '#1890ff' : '#f5f5f5';
  const textColor = sender === 'user' ? '#fff' : '#000';

  return (
    <div style={{ display: 'flex', justifyContent: justify, marginBottom: 12 }}>
      {/* 如果是 AI 则左侧头像，否则用户右侧头像 */}
      {sender === 'ai' && (
        <Avatar icon={<RobotOutlined />} style={{ marginRight: 8 }} />
      )}
      <div
        style={{
          backgroundColor: bubbleColor,
          color: textColor,
          padding: '8px 12px',
          borderRadius: 6,
          maxWidth: '60%'
        }}
      >
        {/* 文本内容 */}
        {text && <div style={{ marginBottom: imageUrls || buttonLabel ? 8 : 0 }}>{text}</div>}
        {/* 图片列表 */}
        {imageUrls && imageUrls.map((src) => (
          <img
            key={src}
            src={src}
            alt="chat-img"
            style={{ maxWidth: '100%', cursor: 'pointer', display: 'block', marginBottom: 8 }}
            onClick={() => onImageClick && onImageClick(src)}
          />
        ))}
        {/* 按钮 */}
        {buttonLabel && (
          <Button type="primary" onClick={onButtonClick}>
            {buttonLabel}
          </Button>
        )}
      </div>
      {sender === 'user' && (
        <Avatar icon={<UserOutlined />} style={{ marginLeft: 8 }} />
      )}
    </div>
  );
};

export default ChatMessage;
