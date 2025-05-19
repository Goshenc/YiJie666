import React from 'react';
import Button from "@/components/ui/button";
import BaseModal from '../shared/BaseModal'; // 根据实际路径调整
import Slider from "@/components/ui/slider";

type HeatingModalProps = {
	isOpen: boolean;
	onClose: () => void;
	toggleHeating: () => void;
	isHeatingOn: boolean;
	selectedRoom: string;
	roomTemperatures: { [room: string]: number };
	selectedTemp: number[];
	setIsHeatingOn: (value: boolean) => void;
	setSelectedRoom: (value: string) => void;
	setSelectedTemp: (value: number[]) => void;
};

const HeatingModal: React.FC<HeatingModalProps> = ({
	isOpen,
	onClose,
	toggleHeating,
	isHeatingOn,
	selectedRoom,
	roomTemperatures,
	selectedTemp,
	setIsHeatingOn,
	setSelectedRoom,
	setSelectedTemp
}) => {
	return (
		<BaseModal isOpen={isOpen} onClose={onClose}>
			<div id="heatingModal" className="w-[360px]">
				<h2 className="text-[#1F2937] text-xl font-semibold mb-4">地暖控制面板</h2>
				<div className="space-y-6">
					{/* 显示屏 */}
					<div className="bg-[#1F2937] rounded-lg p-6">
						<div className="text-white text-center space-y-4">
							<div className="text-4xl font-bold mb-2">
								{selectedRoom === 'livingRoom' && '客厅当前室温: '}
								{selectedRoom === 'bedroom' && '卧室当前室温: '}
								{selectedRoom === 'study' && '书房当前室温: '}
								{roomTemperatures[selectedRoom]}°C
							</div>
							{isHeatingOn && (
								<div className="text-2xl">设定温度: {selectedTemp[0]}°C</div>
							)}
							<div className="text-lg">
								{isHeatingOn ? (
									selectedTemp[0] > roomTemperatures[selectedRoom] ? '正在加热中...' : '已达到目标温度'
								) : '已关闭'}
							</div>
						</div>
					</div>
					{/* 开关按钮 */}
					<Button
						variant="ghost"
						className="w-full py-8 bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] text-xl font-semibold!rounded-button"
						onClick={() => setIsHeatingOn(!isHeatingOn)}
					>
						<i className={`fas fa-power-off mr-3 text-xl`}></i>
						{isHeatingOn ? '关闭' : '开启'}
					</Button>
					{/* 温度控制 */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<i className="fas fa-temperature-high text-[#2D5A27] text-2xl mr-3"></i>
								<span className="text-[#2D5A27] text-xl">设定温度</span>
							</div>
							<span className="text-[#2D5A27] text-xl">{selectedTemp[0]}°C</span>
						</div>
						<Slider
							value={selectedTemp}
							onValueChange={setSelectedTemp}
							max={45}
							min={20}
							step={1}
							className="w-full h-3 bg-gray-300"
						/>
					</div>
					{/* 房间选择 */}
					<div className="grid grid-cols-3 gap-6">
						<Button
							variant="ghost"
							className={`p-8 text-lg font-medium ${selectedRoom === 'livingRoom' ? 'bg-[#2D5A27] text-white' : 'bg-[#C2DBC2] text-[#2D5A27]'} hover:bg-[#B2CBB2]!rounded-button flex-1 h-32`}
							onClick={() => setSelectedRoom('livingRoom')}
						>
							<div className="flex flex-col items-center space-y-3">
								<i className="fas fa-couch text-2xl"></i>
								<span className="text-lg whitespace-nowrap">客厅</span>
							</div>
						</Button>
						<Button
							variant="ghost"
							className={`p-8 text-lg font-medium ${selectedRoom === 'bedroom' ? 'bg-[#2D5A27] text-white' : 'bg-[#C2DBC2] text-[#2D5A27]'} hover:bg-[#B2CBB2]!rounded-button flex-1 h-32`}
							onClick={() => setSelectedRoom('bedroom')}
						>
							<div className="flex flex-col items-center space-y-3">
								<i className="fas fa-bed text-2xl"></i>
								<span className="text-lg whitespace-nowrap">卧室</span>
							</div>
						</Button>
						<Button
							variant="ghost"
							className={`p-8 text-lg font-medium ${selectedRoom === 'study' ? 'bg-[#2D5A27] text-white' : 'bg-[#C2DBC2] text-[#2D5A27]'} hover:bg-[#B2CBB2]!rounded-button flex-1 h-32`}
							onClick={() => setSelectedRoom('study')}
						>
							<div className="flex flex-col items-center space-y-3">
								<i className="fas fa-book text-2xl"></i>
								<span className="text-lg whitespace-nowrap">书房</span>
							</div>
						</Button>
					</div>
				</div>
			</div>
		</BaseModal>
	);
};

export default HeatingModal;