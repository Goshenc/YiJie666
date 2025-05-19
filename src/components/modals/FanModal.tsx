import React, { useState } from 'react';
import Button from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import BaseModal from '../shared/BaseModal';

type FanModalProps = {
	isOpen: boolean;
	onClose: () => void;
	isFanOn: boolean;
	toggleFan: (value: boolean) => void;
};

const FanModal: React.FC<FanModalProps> = ({ isOpen, onClose, isFanOn, toggleFan }) => {
	const [localIsFanOn, setLocalIsFanOn] = useState(isFanOn);
	const [fanMode, setFanMode] = useState('直吹风');
	const [fanSpeed, setFanSpeed] = useState('中');
	const [fanSwingMode, setFanSwingMode] = useState('左右扫风');

	const handleToggleFan = (value: boolean) => {
		setLocalIsFanOn(value);
		toggleFan(value);
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose}>
			<div className="space-y-6">
				{/* 显示屏 */}
				<div className="bg-[#1F2937] rounded-lg p-6">
					<div className="text-white text-center space-y-3">
						{localIsFanOn ? (
							<>
								<div className="text-2xl font-bold">
									风速: {fanSpeed}
								</div>
								<div className="text-xl">
									模式: {fanMode}
								</div>
								<div className="text-xl">
									扫风: {fanSwingMode}
								</div>
							</>
						) : (
							<div className="text-3xl font-bold py-8">
								待开机
							</div>
						)}
					</div>
				</div>
				{/* 开关按钮 */}
				<Button
					variant="ghost"
					className="w-full py-6 bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] text-xl font-semibold!rounded-button"
					onClick={() => handleToggleFan(!localIsFanOn)}
				>
					<i className={`fas fa-power-off mr-3`}></i>
					{localIsFanOn ? '关闭' : '开启'}
				</Button>
				{/* 风速模式按钮 */}
				<div className="grid grid-cols-3 gap-4">
					<Button
						variant="ghost"
						className={`py-12 px-6 ${fanMode === '直吹风' ? 'bg-[#2D5A27] text-white' : 'bg-[#C2DBC2] text-[#2D5A27]'} hover:bg-[#B2CBB2]!rounded-button ${!localIsFanOn ? 'opacity-50 cursor-not-allowed' : ''}`}
						onClick={() => setFanMode('直吹风')}
						disabled={!localIsFanOn}
					>
						<div className="flex flex-col items-center">
							<i className="fas fa-wind text-3xl mb-3"></i>
							<span className="text-lg font-medium">直吹风</span>
						</div>
					</Button>
					<Button
						variant="ghost"
						className={`py-12 px-6 ${fanMode === '自然风' ? 'bg-[#2D5A27] text-white' : 'bg-[#C2DBC2] text-[#2D5A27]'} hover:bg-[#B2CBB2]!rounded-button ${!localIsFanOn ? 'opacity-50 cursor-not-allowed' : ''}`}
						onClick={() => setFanMode('自然风')}
						disabled={!localIsFanOn}
					>
						<div className="flex flex-col items-center">
							<i className="fas fa-leaf text-3xl mb-3"></i>
							<span className="text-lg font-medium">自然风</span>
						</div>
					</Button>
					<Button
						variant="ghost"
						className={`py-12 px-6 ${fanMode === '睡眠风' ? 'bg-[#2D5A27] text-white' : 'bg-[#C2DBC2] text-[#2D5A27]'} hover:bg-[#B2CBB2]!rounded-button ${!localIsFanOn ? 'opacity-50 cursor-not-allowed' : ''}`}
						onClick={() => setFanMode('睡眠风')}
						disabled={!localIsFanOn}
					>
						<div className="flex flex-col items-center">
							<i className="fas fa-moon text-3xl mb-3"></i>
							<span className="text-lg font-medium">睡眠风</span>
						</div>
					</Button>
				</div>
				{/* 风速控制 */}
				<div className="grid grid-cols-3 gap-4">
					<Button
						variant="ghost"
						className={`py-6 text-lg font-bold ${fanSpeed === '低' ? 'bg-[#2D5A27] text-white' : 'bg-[#C2DBC2] text-[#2D5A27]'} hover:bg-[#B2CBB2]!rounded-button ${!localIsFanOn ? 'opacity-50 cursor-not-allowed' : ''}`}
						onClick={() => setFanSpeed('低')}
						disabled={!localIsFanOn}
					>
						低速
					</Button>
					<Button
						variant="ghost"
						className={`py-6 text-lg font-bold ${fanSpeed === '中' ? 'bg-[#2D5A27] text-white' : 'bg-[#C2DBC2] text-[#2D5A27]'} hover:bg-[#B2CBB2]!rounded-button ${!localIsFanOn ? 'opacity-50 cursor-not-allowed' : ''}`}
						onClick={() => setFanSpeed('中')}
						disabled={!localIsFanOn}
					>
						中速
					</Button>
					<Button
						variant="ghost"
						className={`py-6 text-lg font-bold ${fanSpeed === '高' ? 'bg-[#2D5A27] text-white' : 'bg-[#C2DBC2] text-[#2D5A27]'} hover:bg-[#B2CBB2]!rounded-button ${!localIsFanOn ? 'opacity-50 cursor-not-allowed' : ''}`}
						onClick={() => setFanSpeed('高')}
						disabled={!localIsFanOn}
					>
						高速
					</Button>
				</div>
				{/* 扫风模式控制 */}
				<div className="grid grid-cols-3 gap-4">
					<Button
						variant="ghost"
						className={`py-6 text-lg font-bold ${fanSwingMode === '左右扫风' ? 'bg-[#2D5A27] text-white' : 'bg-[#C2DBC2] text-[#2D5A27]'} hover:bg-[#B2CBB2]!rounded-button ${!localIsFanOn ? 'opacity-50 cursor-not-allowed' : ''}`}
						onClick={() => setFanSwingMode('左右扫风')}
						disabled={!localIsFanOn}
					>
						<i className="fas fa-arrows-alt-h text-xl mr-2"></i>
						左右扫风
					</Button>
					<Button
						variant="ghost"
						className={`py-6 text-lg font-bold ${fanSwingMode === '上下扫风' ? 'bg-[#2D5A27] text-white' : 'bg-[#C2DBC2] text-[#2D5A27]'} hover:bg-[#B2CBB2]!rounded-button ${!localIsFanOn ? 'opacity-50 cursor-not-allowed' : ''}`}
						onClick={() => setFanSwingMode('上下扫风')}
						disabled={!localIsFanOn}
					>
						<i className="fas fa-arrows-alt-v text-xl mr-2"></i>
						上下扫风
					</Button>
					<Button
						variant="ghost"
						className={`py-6 text-lg font-bold ${fanSwingMode === '左右上下扫风' ? 'bg-[#2D5A27] text-white' : 'bg-[#C2DBC2] text-[#2D5A27]'} hover:bg-[#B2CBB2]!rounded-button ${!localIsFanOn ? 'opacity-50 cursor-not-allowed' : ''}`}
						onClick={() => setFanSwingMode('左右上下扫风')}
						disabled={!localIsFanOn}
					>
						<i className="fas fa-arrows-alt text-xl mr-2"></i>
						全方位
					</Button>
				</div>
			</div>
		</BaseModal>
	);
};

export default FanModal;