import React, { useState } from 'react';
import Button from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
import BaseModal from '../shared/BaseModal'; // 根据实际路径调整

interface ThermostatModalProps {
	isOpen: boolean;
	onClose: () => void;
	isThermostatOn: boolean;
	toggleThermostat: () => void;
}

const ThermostatModal: React.FC<ThermostatModalProps> = ({ isOpen, onClose, isThermostatOn, toggleThermostat }) => {
	if (!isOpen) return null;

	// 初始化状态
	const [mode, setMode] = useState('制冷');
	const [fanSpeed, setFanSpeed] = useState('中');
	const [swingStatus, setSwingStatus] = useState('扫风关闭');
	const [temperature, setTemperature] = useState(26);

	return (
		<BaseModal isOpen={isOpen} onClose={onClose}>
			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#E0EBE0] p-6 rounded-lg shadow-xl z-50">
				<div className="text-lg font-medium text-[#1F2937] mb-4">恒温器控制面板</div>
				<div className="space-y-6">
					{/* Display Screen */}
					<div className="bg-[#C2DBC2] p-4 rounded-lg space-y-4">
						<div className="flex justify-between items-center">
							<span className="text-[#2D5A27] text-lg">室内温度</span>
							<span className="text-4xl font-bold text-[#2D5A27]">28°C</span>
						</div>
						<div id="thermostatStatus" className="grid grid-cols-3 gap-2 text-sm">
							<div
								id="modeStatus"
								className={`bg-[#2D5A27] text-white px-2 py-1 rounded text-center ${!isThermostatOn ? 'opacity-50' : ''}`}
								style={!isThermostatOn ? { pointerEvents: 'none' } : {}}
							>
								{mode}
							</div>
							<div
								className={`text-[#2D5A27] px-2 py-1 rounded text-center ${!isThermostatOn ? 'opacity-50' : ''}`}
								style={!isThermostatOn ? { pointerEvents: 'none' } : {}}
							>
								风速：{fanSpeed}
							</div>
							<div
								id="swingStatus"
								className={`text-[#2D5A27] px-2 py-1 rounded text-center ${!isThermostatOn ? 'opacity-50' : ''}`}
								style={!isThermostatOn ? { pointerEvents: 'none' } : {}}
							>
								{swingStatus}
							</div>
						</div>
					</div>
					{/* Power Button */}
					<Button className="w-full h-12 bg-[#C2DBC2] hover:bg-[#C2DBC2]/90 text-[#2D5A27] font-bold text-xl" onClick={toggleThermostat}>
						开/关
					</Button>
					{/* Mode Buttons */}
					<div className="grid grid-cols-2 gap-4">
						<Button
							className="h-12 bg-[#BAE6FF] hover:bg-[#BAE6FF]/90 text-[#1F2937] font-medium text-xl"
							onClick={() => {
								if (isThermostatOn) {
									setMode('制冷');
								}
							}}
						>
							制冷
						</Button>
						<Button
							className="h-12 bg-[#FFB4B4] hover:bg-[#FFB4B4]/90 text-[#1F2937] font-medium text-xl"
							onClick={() => {
								if (isThermostatOn) {
									setMode('制热');
								}
							}}
						>
							制热
						</Button>
					</div>
					{/* Control Ring */}
					<div className="relative w-72 h-72 mx-auto">
						<div className="absolute inset-0 rounded-full bg-[#C2DBC2] flex items-center justify-center">
							<Button
								className="absolute top-6 transform -translate-x-1/2 w-16 h-16 rounded-full bg-transparent hover:bg-[#2D5A27]/10"
								style={{ left: '50%' }}
								onClick={() => {
									if (isThermostatOn && temperature < 30) {
										setTemperature(temperature + 1);
									}
								}}
							>
								<i className="fas fa-chevron-up text-[#2D5A27] text-3xl"></i>
							</Button>
							<Button
								className="absolute bottom-6 transform -translate-x-1/2 w-16 h-16 rounded-full bg-transparent hover:bg-[#2D5A27]/10"
								style={{ left: '50%' }}
								onClick={() => {
									if (isThermostatOn && temperature > 16) {
										setTemperature(temperature - 1);
									}
								}}
							>
								<i className="fas fa-chevron-down text-[#2D5A27] text-3xl"></i>
							</Button>
							<Button
								className="absolute left-6 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-transparent hover:bg-[#2D5A27]/10"
								onClick={() => {
									if (isThermostatOn) {
										setMode('睡眠');
									}
								}}
							>
								<i className="fas fa-bed text-[#2D5A27] text-3xl"></i>
							</Button>
							<Button
								className="absolute right-6 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-transparent hover:bg-[#2D5A27]/10"
								onClick={() => {
									if (isThermostatOn) {
										let newSpeed;
										switch (fanSpeed) {
											case '低':
												newSpeed = '中';
												break;
											case '中':
												newSpeed = '高';
												break;
											case '高':
												newSpeed = '低';
												break;
											default:
												newSpeed = '高';
										}
										setFanSpeed(newSpeed);
									}
								}}
							>
								<i className="fas fa-wind text-[#2D5A27] text-3xl"></i>
							</Button>
							<div id="tempDisplay" className="text-[#2D5A27] text-4xl font-bold">{temperature}°C</div>
						</div>
					</div>
					{/* Mode Buttons */}
					<div className="grid grid-cols-2 gap-4">
						<Button
							className="h-14 bg-[#C2DBC2] hover:bg-[#C2DBC2]/90"
							onClick={() => {
								if (isThermostatOn) {
									setMode('静音');
								}
							}}
						>
							<i className="fas fa-volume-mute text-[#2D5A27] text-2xl mr-3"></i>
							<span className="text-[#2D5A27] text-lg">静音</span>
						</Button>
						<Button
							className="h-14 bg-[#C2DBC2] hover:bg-[#C2DBC2]/90"
							onClick={() => {
								if (isThermostatOn) {
									setMode('干燥');
								}
							}}
						>
							<i className="fas fa-tint text-[#2D5A27] text-2xl mr-3"></i>
							<span className="text-[#2D5A27] text-lg">干燥</span>
						</Button>
					</div>
					{/* Swing Buttons */}
					<div className="grid grid-cols-2 gap-4">
						<Button
							className="h-14 bg-[#C2DBC2] hover:bg-[#C2DBC2]/90"
							onClick={() => {
								if (isThermostatOn) {
									setSwingStatus('上下扫风');
								}
							}}
						>
							<i className="fas fa-arrows-alt-v text-[#2D5A27] text-2xl mr-3"></i>
							<span className="text-[#2D5A27] text-lg">上下扫风</span>
						</Button>
						<Button
							className="h-14 bg-[#C2DBC2] hover:bg-[#C2DBC2]/90"
							onClick={() => {
								if (isThermostatOn) {
									setSwingStatus('左右扫风');
								}
							}}
						>
							<i className="fas fa-arrows-alt-h text-[#2D5A27] text-2xl mr-3"></i>
							<span className="text-[#2D5A27] text-lg">左右扫风</span>
						</Button>
					</div>
				</div>
			</div>
		</BaseModal>
	);
};

export default ThermostatModal;