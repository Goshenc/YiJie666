import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Button from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
import BaseModal from '../shared/BaseModal'; // 根据实际路径调整

interface FridgeModalProps {
	isOpen: boolean;
	onClose: () => void;
	toggleFridge: () => void; // 新增控制冰箱开关的函数
}

const FridgeModal: React.FC<FridgeModalProps> = ({ isOpen, onClose, toggleFridge }) => {
	const [coldTemp, setColdTemp] = useLocalStorage('coldTemp', 4);
	const [freezeTemp, setFreezeTemp] = useLocalStorage('freezeTemp', -18);

	if (!isOpen) return null;

	return (
		<BaseModal isOpen={isOpen} onClose={onClose}>
			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#E0EBE0] p-6 rounded-lg shadow-xl z-50">
				<div className="flex justify-between items-center mb-6">
					<span className="text-lg font-medium">冰箱控制面板</span>
					<div className="relative group">
						<Button
							className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white"
							onClick={() => {
								toggleFridge(); // 调用传递进来的函数控制冰箱开关
								onClose(); // 恢复关闭模态框的逻辑
							}}
						>
							<i className="fas fa-power-off"></i>
						</Button>
					</div>
				</div>
				<div className="space-y-8">
					<div className="bg-[#C2DBC2] p-4 rounded-lg">
						<div className="text-center mb-2">冷藏温度</div>
						<div className="flex items-center justify-between">
							<Button
								className="w-12 h-12 rounded-full bg-transparent hover:bg-[#2D5A27]/10"
								onClick={() => {
									if (coldTemp > 2) {
										setColdTemp(coldTemp - 1);
									}
								}}
							>
								<i className="fas fa-minus text-[#2D5A27] text-xl"></i>
							</Button>
							<span id="coldTemp" className="text-4xl font-bold text-[#2D5A27] w-28 text-center">{coldTemp}°C</span>
							<Button
								className="w-12 h-12 rounded-full bg-transparent hover:bg-[#2D5A27]/10"
								onClick={() => {
									if (coldTemp < 8) {
										setColdTemp(coldTemp + 1);
									}
								}}
							>
								<i className="fas fa-plus text-[#2D5A27] text-xl"></i>
							</Button>
						</div>
					</div>
					<div className="bg-[#C2DBC2] p-4 rounded-lg">
						<div className="text-center mb-2">冷冻温度</div>
						<div className="flex items-center justify-between">
							<Button
								className="w-12 h-12 rounded-full bg-transparent hover:bg-[#2D5A27]/10"
								onClick={() => {
									if (freezeTemp > -24) {
										setFreezeTemp(freezeTemp - 1);
									}
								}}
							>
								<i className="fas fa-minus text-[#2D5A27] text-xl"></i>
							</Button>
							<span id="freezeTemp" className="text-4xl font-bold text-[#2D5A27] w-20 text-center">{freezeTemp}°C</span>
							<Button
								className="w-12 h-12 rounded-full bg-transparent hover:bg-[#2D5A27]/10"
								onClick={() => {
									if (freezeTemp < -16) {
										setFreezeTemp(freezeTemp + 1);
									}
								}}
							>
								<i className="fas fa-plus text-[#2D5A27] text-xl"></i>
							</Button>
						</div>
					</div>
					<div className="border-t border-[#2D5A27] my-4"></div>
					<div className="mt-8 flex flex-col gap-4">
						<Button
							className="w-full h-16 bg-[#C2DBC2] hover:bg-[#C2DBC2]/90 text-[#2D5A27] font-bold flex items-center justify-center text-xl"
							onClick={() => {
								// 这里可以添加日常运行的逻辑
							}}
						>
							<i className="fas fa-home text-2xl mr-3"></i>
							<span>日常运行</span>
						</Button>
						<Button
							className="w-full h-16 bg-[#C2DBC2] hover:bg-[#C2DBC2]/90 text-[#2D5A27] font-bold flex items-center justify-center text-xl"
							onClick={() => {
								// 这里可以添加外出节能的逻辑
							}}
						>
							<i className="fas fa-power-off text-2xl mr-3"></i>
							<span>外出节能</span>
						</Button>
						<Button
							className="w-full h-16 bg-[#C2DBC2] hover:bg-[#C2DBC2]/90 text-[#2D5A27] font-bold flex items-center justify-center text-xl"
							onClick={() => {
								// 这里可以添加智能储存的逻辑
							}}
						>
							<i className="fas fa-database text-2xl mr-3"></i>
							<span>智能储存</span>
						</Button>
					</div>
				</div>
			</div>
		</BaseModal>
	);
};

export default FridgeModal;