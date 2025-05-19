import React, { useState, useEffect } from "react";
import Button from "@/components/ui/button";
import BaseModal from "../shared/BaseModal";

// 自定义清理定时器的函数（如果有定时器相关操作可在此处添加，当前代码未涉及）
const cleanup = () => {
	// 此处可添加清理定时器等操作的逻辑
};

interface WaterHeaterModalProps {
	isOpen: boolean;
	onClose: () => void;
	isWaterHeaterOn: boolean; // 新增：接收热水器开关状态
	setIsWaterHeaterOn: (value: boolean) => void; // 新增：用于更新热水器开关状态的回调函数
}

const WaterHeaterModal: React.FC<WaterHeaterModalProps> = ({ isOpen, onClose, isWaterHeaterOn, setIsWaterHeaterOn }) => {
	// 控制热水器是否开启（使用传入的状态）
	const [waterHeaterOn, setLocalWaterHeaterOn] = useState(isWaterHeaterOn);
	// 当前温度
	const [currentTemp, setCurrentTemp] = useState(26);
	// 目标温度
	const [targetTemp, setTargetTemp] = useState(45);
	// 加热模式（单胆加热或双胆加热）
	const [heatingMode, setHeatingMode] = useState('single');

	useEffect(() => {
		// 当传入的 isWaterHeaterOn 变化时，更新本地状态
		setLocalWaterHeaterOn(isWaterHeaterOn);
	}, [isWaterHeaterOn]);

	useEffect(() => {
		return () => {
			cleanup();
		};
	}, []);

	return (
		<BaseModal isOpen={isOpen} onClose={onClose}>
			<div className="bg-[#E0EBE0] p-6 max-w-md mx-auto">
				<h2 className="text-[#1F2937] text-xl font-semibold mb-4">热水器控制面板</h2>
				<div className="space-y-8">
					{/* 显示屏 */}
					<div className="bg-[#1F2937] rounded-lg p-8">
						<div className="text-white text-center">
							<div className="text-6xl font-bold mb-4">{currentTemp}°C</div>
							<div className="text-lg mb-2">
								{waterHeaterOn ? (
									targetTemp > currentTemp ? '正在加热中...' : '已达到目标温度'
								) : '已关闭'}
							</div>
							<div className="text-lg font-medium">{heatingMode === 'double' ? '双胆加热' : '单胆加热'}</div>
						</div>
					</div>
					{/* 开关按钮 */}
					<Button
						variant="ghost"
						className="w-full py-8 bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] text-xl font-semibold !rounded-button"
						onClick={() => {
							const newValue = !waterHeaterOn;
							setLocalWaterHeaterOn(newValue);
							setIsWaterHeaterOn(newValue); // 调用回调函数更新父组件状态
						}}
					>
						<i className={`fas fa-power-off mr-3 text-xl`}></i>
						{waterHeaterOn ? '关闭' : '开启'}
					</Button>
					{/* 温度控制 */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<i className="fas fa-temperature-high text-[#2D5A27] text-2xl mr-3"></i>
								<span className="text-[#2D5A27] text-xl">目标温度</span>
							</div>
							<span className="text-[#2D5A27] text-xl">{targetTemp}°C</span>
						</div>
						<input
							type="range"
							value={targetTemp}
							onChange={(e) => setTargetTemp(Number(e.target.value))}
							max={65}
							min={45}
							step={1}
							className="w-full h-3"
						/>
						{/* 加热模式选择 */}
						<div className="grid grid-cols-2 gap-4 mt-6">
							<Button
								variant="ghost"
								className={`py-4 text-lg font-medium ${heatingMode === 'single' ? 'bg-[#2D5A27] text-white' : 'bg-[#C2DBC2] text-[#2D5A27]'} hover:bg-[#B2CBB2] !rounded-button`}
								onClick={() => setHeatingMode('single')}
							>
								单胆加热
							</Button>
							<Button
								variant="ghost"
								className={`py-4 text-lg font-medium ${heatingMode === 'double' ? 'bg-[#2D5A27] text-white' : 'bg-[#C2DBC2] text-[#2D5A27]'} hover:bg-[#B2CBB2] !rounded-button`}
								onClick={() => setHeatingMode('double')}
							>
								双胆加热
							</Button>
						</div>
					</div>
				</div>
			</div>
		</BaseModal>
	);
};

export default WaterHeaterModal;