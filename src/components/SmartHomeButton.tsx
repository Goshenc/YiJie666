import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PageType } from '../types';

// 封装从 localStorage 读取数据的函数
const getFromLocalStorage = (key: string, defaultValue: unknown) => {
	try {
		const stored = localStorage.getItem(key);
		return stored ? JSON.parse(stored) : defaultValue;
	} catch (error) {
		console.error(`Error parsing localStorage value for key ${key}:`, error);
		return defaultValue;
	}
};

// 封装写入数据到 localStorage 的函数
const setToLocalStorage = (key: string, value: unknown) => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error(`Error setting localStorage value for key ${key}:`, error);
	}
};

// 封装判断是否显示按钮的逻辑
const shouldShowButton = () => {
	const messageCount = getFromLocalStorage("messageCount", "0");
	return messageCount === "3";
};

interface SmartHomeButtonProps {
	setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
}

const SmartHomeButton: React.FC<SmartHomeButtonProps> = ({ setCurrentPage }) => {
	const [messageCount, setMessageCount] = useLocalStorage("messageCount", "0");
	const [showButton, setShowButton] = useLocalStorage("showSmartHomeButton", false);

	const handleClick = () => {
		setShowButton(!showButton);
	};

	return (
		<button
			onClick={handleClick}
			className={`fixed bottom-4 right-4 p-4 rounded-full shadow-lg transition-all duration-300 ${
				showButton ? 'bg-green-500' : 'bg-gray-500'
			}`}
		>
			<i className={`fas fa-home text-white text-2xl ${showButton ? 'animate-bounce' : ''}`}></i>
			{messageCount !== "0" && (
				<span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
					{messageCount}
				</span>
			)}
		</button>
	);
};

export default SmartHomeButton;    