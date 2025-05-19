import React, { useState } from 'react';
import Button from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
import BaseModal from '../shared/BaseModal'; // 根据实际路径调整

interface LightModalProps {
	isOpen: boolean;
	onClose: () => void;
	isLightOn: boolean;
	setIsLightOn: (value: boolean) => void;
}

const LightModal: React.FC<LightModalProps> = ({ isOpen, onClose, isLightOn, setIsLightOn }) => {
	if (!isOpen) return null;

	const handleTotalOn = () => {
		if (!isLightOn) {
			setIsLightOn(true);
		}
	};

	const handleTotalOff = () => {
		if (isLightOn) {
			setIsLightOn(false);
		}
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose}>
			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#E0EBE0] p-6 rounded-lg shadow-xl z-50">
				<div className="space-y-4 mb-8">
					<div className="text-lg font-medium text-[#1F2937]">灯光控制面板</div>
					<div className="flex justify-between items-center">
						<Button
							className="bg-[#C2DBC2] hover:bg-[#C2DBC2]/90 text-[#2D5A27] px-6"
							onClick={handleTotalOn}
						>
							总开
						</Button>
						<Button
							className="bg-[#C2DBC2] hover:bg-[#C2DBC2]/90 text-[#2D5A27] px-6"
							onClick={handleTotalOff}
						>
							总关
						</Button>
					</div>
				</div>
				<div className="relative w-64 h-64 mx-auto mb-8">
					<div className="absolute inset-0 rounded-full bg-[#C2DBC2] flex items-center justify-center">
						<Button className="absolute top-4 transform -translate-x-1/2 w-12 h-12 rounded-full bg-transparent hover:bg-[#2D5A27]/10" style={{ left: '50%' }}>
							<i className="fas fa-plus text-[#2D5A27] text-xl"></i>
						</Button>
						<Button className="absolute bottom-4 transform -translate-x-1/2 w-12 h-12 rounded-full bg-transparent hover:bg-[#2D5A27]/10" style={{ left: '50%' }}>
							<i className="fas fa-minus text-[#2D5A27] text-xl"></i>
						</Button>
						<Button className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-transparent hover:bg-[#2D5A27]/10">
							<i className="fas fa-temperature-low text-[#2D5A27] text-xl"></i>
						</Button>
						<Button className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-transparent hover:bg-[#2D5A27]/10">
							<i className="fas fa-temperature-high text-[#2D5A27] text-xl"></i>
						</Button>
						<Button className="w-32 h-32 rounded-full bg-[#E0EBE0] hover:bg-[#E0EBE0]/90 text-[#2D5A27] text-xl font-bold">
							对码
						</Button>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<Button className="h-16 bg-[#C2DBC2] hover:bg-[#C2DBC2]/90!rounded-button">
						<i className="fas fa-sun text-[#2D5A27] text-2xl mr-3"></i>
						<span className="text-[#2D5A27] text-xl">白光</span>
					</Button>
					<Button className="h-16 bg-[#C2DBC2] hover:bg-[#C2DBC2]/90!rounded-button">
						<i className="fas fa-moon text-[#2D5A27] text-2xl mr-3"></i>
						<span className="text-[#2D5A27] text-xl">黄光</span>
					</Button>
				</div>
				<div className="grid grid-cols-2 gap-4 mt-4">
					<Button className="h-16 bg-[#C2DBC2] hover:bg-[#C2DBC2]/90!rounded-button">
						<i className="fas fa-bed text-[#2D5A27] text-2xl mr-3"></i>
						<span className="text-[#2D5A27] text-xl">夜灯</span>
					</Button>
					<Button className="h-16 bg-[#C2DBC2] hover:bg-[#C2DBC2]/90!rounded-button">
						<i className="fas fa-lightbulb text-[#2D5A27] text-2xl mr-3"></i>
						<span className="text-[#2D5A27] text-xl">辅光</span>
					</Button>
				</div>
			</div>
		</BaseModal>
	);
};

export default LightModal;