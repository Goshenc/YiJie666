// components/CanvasArea.tsx
import React, { useRef, useEffect } from 'react';

interface CanvasAreaProps {
  imageSrc: string;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({ imageSrc }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // 将画布尺寸设为父元素大小
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    // 如果没有图片路径，则清空画布
    if (!imageSrc) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // 加载并绘制图片到画布上，填充整个区域
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, [imageSrc]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default CanvasArea;
