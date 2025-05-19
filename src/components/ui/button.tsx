import React from 'react';

// 扩展 variant 类型，添加 secondary
interface ButtonProps {
  variant?: 'ghost' | 'default' | 'outline' | 'secondary';
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  size?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'default', className, onClick, children, style, onMouseDown, disabled = false, size }) => {
  const variantClass = variant === 'ghost'
    ? 'bg-transparent'
    : variant === 'outline'
      ? 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100'
      : variant === 'secondary'
        ? 'bg-green-500 text-white' // 定义 secondary 变体的样式
        : 'bg-[#2D5A27] text-white'; // 将默认背景色改为 #2D5A27

  const sizeClass = size === 'small'
    ? 'text-sm px-2 py-1'
    : size === 'large'
      ? 'text-lg px-4 py-2'
      : '';

  return (
    <button
      className={`${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
      style={style}
      onMouseDown={onMouseDown}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;