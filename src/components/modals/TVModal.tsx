import React, { useRef, useState, useEffect } from 'react';
import Button from "@/components/ui/button";
import BaseModal from '../shared/BaseModal'; // 根据实际路径调整
import { useLocalStorage } from '../../hooks/useLocalStorage';

// 自定义钩子，用于管理音量和亮度状态并保存到 localStorage
const useVolumeAndBrightness = () => {
	const [volumeValue, setVolumeValue] = useState(() => {
		const storedVolume = localStorage.getItem('volumeValue');
		return storedVolume ? Number(storedVolume) : 50;
	});
	const [brightnessValue, setBrightnessValue] = useState(() => {
		const storedBrightness = localStorage.getItem('brightnessValue');
		return storedBrightness ? Number(storedBrightness) : 75;
	});

	useEffect(() => {
		localStorage.setItem('volumeValue', volumeValue.toString());
	}, [volumeValue]);

	useEffect(() => {
		localStorage.setItem('brightnessValue', brightnessValue.toString());
	}, [brightnessValue]);

	return { volumeValue, setVolumeValue, brightnessValue, setBrightnessValue };
};

interface TVModalProps {
	isOpen: boolean;
	onClose: () => void;
	toggleTV: () => void;
}

const TVModal: React.FC<TVModalProps> = ({ isOpen, onClose, toggleTV }) => {
	const { volumeValue, setVolumeValue, brightnessValue, setBrightnessValue } = useVolumeAndBrightness();
	const [localVolumeValue, setLocalVolumeValue] = useLocalStorage('volumeValue', 50);
	const [localBrightnessValue, setLocalBrightnessValue] = useLocalStorage('brightnessValue', 50);

	if (!isOpen) return null;

	return (
		<BaseModal isOpen={isOpen} onClose={onClose}>
			<div id="tvModal" className="w-[360px]">
				<div className="flex justify-between items-center mb-6">
					<span className="text-lg font-medium">电视遥控器</span>
					<Button className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white" onClick={() => {
						toggleTV();
					}}>
						<i className="fas fa-power-off"></i>
					</Button>
				</div>
				<div className="flex flex-col items-center gap-6">
					<div className="flex justify-between w-full mb-4">
						<Button className="h-10 px-6 bg-[#C2DBC2] hover:bg-[#C2DBC2]/90!rounded-button">
							<i className="fas fa-cog text-[#2D5A27] text-xl"></i>
						</Button>
						<Button className="h-10 px-6 bg-[#C2DBC2] hover:bg-[#C2DBC2]/90!rounded-button">
							<i className="fas fa-bars text-[#2D5A27] text-xl"></i>
						</Button>
					</div>
					<div className="relative w-64 h-64">
						<div className="absolute inset-0 rounded-full bg-[#C2DBC2] flex items-center justify-center">
							<Button className="absolute top-4 transform -translate-x-1/2 w-12 h-12 rounded-full bg-transparent hover:bg-[#2D5A27]/10" style={{ left: '50%' }}>
								<i className="fas fa-chevron-up text-[#2D5A27] text-xl"></i>
							</Button>
							<Button className="absolute bottom-4 transform -translate-x-1/2 w-12 h-12 rounded-full bg-transparent hover:bg-[#2D5A27]/10" style={{ left: '50%' }}>
								<i className="fas fa-chevron-down text-[#2D5A27] text-xl"></i>
							</Button>
							<Button className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-transparent hover:bg-[#2D5A27]/10">
								<i className="fas fa-chevron-left text-[#2D5A27] text-xl"></i>
							</Button>
							<Button className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-transparent hover:bg-[#2D5A27]/10">
								<i className="fas fa-chevron-right text-[#2D5A27] text-xl"></i>
							</Button>
							<Button className="w-32 h-32 rounded-full bg-[#E0EBE0] hover:bg-[#E0EBE0]/90 text-[#2D5A27] text-xl font-bold">
								OK
							</Button>
						</div>
					</div>
					<div className="flex justify-center gap-4 w-full">
						<Button className="flex-1 h-12 bg-[#C2DBC2] hover:bg-[#C2DBC2]/90">
							<i className="fas fa-arrow-left text-[#2D5A27] text-xl"></i>
						</Button>
						<Button className="flex-1 h-12 bg-[#C2DBC2] hover:bg-[#C2DBC2]/90">
							<i className="fas fa-home text-[#2D5A27] text-xl"></i>
						</Button>
					</div>
					<div className="w-full space-y-4">
						<div className="w-full h-12 bg-[#C2DBC2] rounded-lg flex items-center justify-between px-4">
							<div>
								{(() => {
									if (localVolumeValue === 0) {
										return <i className="fas fa-volume-xmark text-[#2D5A27] text-xl mr-4"></i>;
									} else if (localVolumeValue >= 1 && localVolumeValue <= 50) {
										return <i className="fas fa-volume-down text-[#2D5A27] text-xl mr-4"></i>;
									} else {
										return <i className="fas fa-volume-high text-[#2D5A27] text-xl mr-4"></i>;
									}
								})()}
							</div>
							<div className="w-[240px] h-2 bg-[#2D5A27]/20 rounded-full relative">
								<input
									type="range"
									min="0"
									max="100"
									value={localVolumeValue}
									onChange={(e) => setLocalVolumeValue(Number(e.target.value))}
									className="absolute inset-0 h-full w-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2D5A27] [&::-webkit-slider-thumb]:cursor-pointer"
								/>
							</div>
						</div>
						<div className="w-full h-12 bg-[#C2DBC2] rounded-lg flex items-center justify-between px-4">
							<div>
								<i className="fas fa-sun text-[#2D5A27] text-xl mr-4"></i>
							</div>
							<div className="w-[240px] h-2 bg-[#2D5A27]/20 rounded-full relative">
								<input
									type="range"
									min="0"
									max="100"
									value={localBrightnessValue}
									onChange={(e) => setLocalBrightnessValue(Number(e.target.value))}
									className="absolute inset-0 h-full w-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2D5A27] [&::-webkit-slider-thumb]:cursor-pointer"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</BaseModal>
	);
};

export default TVModal;