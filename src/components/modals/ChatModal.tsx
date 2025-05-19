// ChatModal.tsx
import React, { useState, useContext } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import Button from '../ui/button';

// 假设 DevicePage 的状态和函数可以通过上下文传递
const DeviceContext = React.createContext({
	devices: {},
	setDevices: (devices: { [key: string]: boolean }) => { }, // 确保这里接受一个参数
	isTVModalOpen: false,
	setIsTVModalOpen: (value: boolean) => { },
	isFridgeModalOpen: false,
	setIsFridgeModalOpen: (value: boolean) => { },
	isLightModalOpen: false,
	setIsLightModalOpen: (value: boolean) => { },
	isThermostatModalOpen: false,
	setIsThermostatModalOpen: (value: boolean) => { },
	isSpeakerModalOpen: false,
	setIsSpeakerModalOpen: (value: boolean) => { },
	isSmartLockModalOpen: false,
	setIsSmartLockModalOpen: (value: boolean) => { },
	isCurtainModalOpen: false,
	setIsCurtainModalOpen: (value: boolean) => { },
	isHeatingModalOpen: false,
	setIsHeatingModalOpen: (value: boolean) => { },
	isFanModalOpen: false,
	setIsFanModalOpen: (value: boolean) => { },
	isRiceCookerModalOpen: false,
	setIsRiceCookerModalOpen: (value: boolean) => { },
	isWaterHeaterModalOpen: false,
	setIsWaterHeaterModalOpen: (value: boolean) => { }
});

interface ChatModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	// 状态管理：聊天记录和输入框内容
	const [messages, setMessages] = useState([
		{ text: "请问有什么可以帮您？", isUser: false }
	]);
	const [inputValue, setInputValue] = useState('');

	const {
		setIsTVModalOpen,
		setIsFridgeModalOpen,
		setIsLightModalOpen,
		setIsThermostatModalOpen,
		setIsSpeakerModalOpen,
		setIsSmartLockModalOpen,
		setIsCurtainModalOpen,
		setIsHeatingModalOpen,
		setIsFanModalOpen,
		setIsRiceCookerModalOpen,
		setIsWaterHeaterModalOpen
	} = useContext(DeviceContext);

	const handleSend = () => {
		if (inputValue.trim() === '') return; // 如果输入为空，不发送
		setMessages([...messages, { text: inputValue, isUser: true }]);
		setInputValue(''); // 清空输入框
		// 添加自动回复
		setTimeout(() => {
			setMessages(prev => [...prev, { text: "好的，请稍候", isUser: false }]);
			// 根据用户输入打开对应的 Modal
			switch (inputValue) {
				case "电视":
					setIsTVModalOpen(true);
					break;
				case "冰箱":
					setIsFridgeModalOpen(true);
					break;
				case "灯光":
					setIsLightModalOpen(true);
					break;
				case "恒温器":
					setIsThermostatModalOpen(true);
					break;
				case "智能音响":
					setIsSpeakerModalOpen(true);
					break;
				case "智能门锁":
					setIsSmartLockModalOpen(true);
					break;
				case "窗帘":
					setIsCurtainModalOpen(true);
					break;
				case "地暖":
					setIsHeatingModalOpen(true);
					break;
				case "电风扇":
					setIsFanModalOpen(true);
					break;
				case "电饭煲":
					setIsRiceCookerModalOpen(true);
					break;
				case "热水器":
					setIsWaterHeaterModalOpen(true);
					break;
				default:
					console.log(`未找到对应的设备：${inputValue}`);
			}
		}, 700);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSend();
		}
	};

	return (
		<div id="chatModal" className="fixed top-0 right-0 h-screen bg-[#E0EBE0] shadow-xl p-6 w-[480px] z-50 transition-all duration-300 transform translate-x-0 flex flex-col">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-medium">AI 助手</h3>
				<button onClick={onClose} className="text-gray-500 hover:text-gray-700">
					<i className="fas fa-times"></i>
				</button>
			</div>
			<ScrollArea className="flex-1 pr-4 overflow-y-auto">
				<div className="space-y-4">
					{messages.map((message, index) => (
						<div key={index} className={`flex ${message.isUser ? 'justify-end' : ''}`}>
							<div
								className={`rounded-lg p-3 shadow-sm ${message.isUser ? 'bg-[#2D5A27] text-white' : 'bg-white text-[#1F2973]'}`
								}>
								<p>{message.text}</p>
							</div>
						</div>
					))}
				</div>
			</ScrollArea>
			<div className="border-t border-gray-200 pt-4">
				<div className="flex gap-2">
					<div className="relative flex-1">
						<input
							type="text"
							placeholder="输入消息..."
							className="w-full h-[44px] pl-10 pr-4 rounded-lg bg-white border-none text-sm"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
						<i className="fas fa-keyboard absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
					</div>
					<Button className="bg-[#2D5A27] hover:bg-[#1F4A1F] !rounded-button h-[44px] w-[44px]" onClick={handleSend}>
						<i className="fas fa-paper-plane"></i>
					</Button>
					<Button className="bg-[#2D5A27] hover:bg-[#1F4A1F] !rounded-button h-[44px] w-[44px]">
						<i className="fas fa-microphone"></i>
					</Button>
				</div>
			</div>
		</div>
	);
};

export { ChatModal, DeviceContext };