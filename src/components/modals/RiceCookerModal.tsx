import React, { useState, useEffect } from 'react';
import Button from "@/components/ui/button";
import BaseModal from '../shared/BaseModal'; // 根据实际路径调整

// 自定义清理定时器的函数
const cleanup = (timerId: NodeJS.Timeout | null) => {
	if (timerId) {
		clearInterval(timerId);
	}
};

interface RiceCookerModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const RiceCookerModal: React.FC<RiceCookerModalProps> = ({ isOpen, onClose }) => {
	// 控制电饭煲是否正在工作
	const [isRiceCookerWorking, setIsRiceCookerWorking] = useState(false);
	// 存储选择的功能
	const [selectedFunction, setSelectedFunction] = useState('');
	// 剩余时间
	const [remainingTime, setRemainingTime] = useState(0);
	// 电饭煲模式，本地模式和拓展模式
	const [riceCookerMode, setRiceCookerMode] = useState('local');
	// 定时器ID
	const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

	useEffect(() => {
		return () => {
			cleanup(timerId);
		};
	}, [timerId]);

	return (
		<BaseModal isOpen={isOpen} onClose={onClose}>
			<div className="bg-[#E0EBE0] p-6 max-w-md mx-auto">
				<h2 className="text-[#1F2937] text-xl font-semibold mb-4">电饭煲控制面板</h2>
				<div className="space-y-6">
					{/* 显示屏 */}
					<div className="bg-[#1F2937] rounded-lg p-6 text-center">
						<div className="text-white">
							{selectedFunction ? (
								<>
									<div className="text-2xl font-bold mb-2">{selectedFunction}</div>
									<div className="text-4xl">
										{Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
									</div>
									<div className="text-sm mt-2">{isRiceCookerWorking ? '正在运行中...' : '准备就绪'}</div>
								</>
							) : (
								<div className="text-2xl">请选择功能</div>
							)}
						</div>
					</div>
					{/* 导航栏 */}
					<div className="flex justify-between items-center border-b border-gray-300 mb-4">
						<div className="flex space-x-4">
							<Button
								variant="ghost"
								className={`pb-2 text-lg font-bold ${riceCookerMode === 'local' ? 'border-b-2 border-[#2D5A27] text-[#2D5A27]' : ''} !rounded-button`}
								onClick={() => setRiceCookerMode('local')}
							>
								本机
							</Button>
							<Button
								variant="ghost"
								className={`pb-2 text-lg font-bold ${riceCookerMode === 'extended' ? 'border-b-2 border-[#2D5A27] text-[#2D5A27]' : ''} !rounded-button`}
								onClick={() => setRiceCookerMode('extended')}
							>
								拓展
							</Button>
						</div>
						<div className="flex justify-end space-x-2">
							<Button
								variant="ghost"
								className="bg-[#2D5A27] text-white hover:bg-[#1D4A17] !rounded-button text-lg font-bold py-3 px-4"
								onClick={() => {
									if (selectedFunction) {
										if (isRiceCookerWorking) {
											cleanup(timerId);
											setIsRiceCookerWorking(false);
										} else {
											setIsRiceCookerWorking(true);
											cleanup(timerId); // 清理之前的定时器
											const newTimer = setInterval(() => {
												setRemainingTime((prev) => {
													if (prev <= 0) {
														cleanup(newTimer);
														setIsRiceCookerWorking(false);
														return 0;
													}
													return prev - 1;
												});
											}, 1000);
											setTimerId(newTimer);
										}
									}
								}}
								disabled={!selectedFunction}
							>
								<i className={`fas ${isRiceCookerWorking ? 'fa-pause' : 'fa-play'} mr-3 text-xl`}></i>
								{isRiceCookerWorking ? '暂停' : '开始'}
							</Button>
							<Button
								variant="ghost"
								className="bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] !rounded-button text-lg font-bold py-3 px-4"
								onClick={() => {
									cleanup(timerId);
									setIsRiceCookerWorking(false);
									setSelectedFunction('');
									setRemainingTime(0);
								}}
							>
								<i className="fas fa-rotate-left mr-3 text-xl"></i>
								复位
							</Button>
						</div>
					</div>
					{/* 功能按钮 */}
					{riceCookerMode === 'local' ? (
						<div className="grid grid-cols-3 gap-4">
							<Button variant="ghost" className="bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] !rounded-button p-6 flex flex-col items-center justify-center" onClick={() => { setSelectedFunction('煮粥'); setRemainingTime(90 * 60); }}>
								<i className="fas fa-bowl-rice mr-3 text-2xl"></i>
								<span className="text-lg font-bold">煮粥</span>
							</Button>
							<Button variant="ghost" className="bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] !rounded-button p-6 flex flex-col items-center justify-center" onClick={() => { setSelectedFunction('蒸煮'); setRemainingTime(30 * 60); }}>
								<i className="fas fa-cloud mr-3 text-2xl"></i>
								<span className="text-lg font-bold">蒸煮</span>
							</Button>
							<Button variant="ghost" className="bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] !rounded-button p-6 flex flex-col items-center justify-center" onClick={() => { setSelectedFunction('热饭'); setRemainingTime(20 * 60); }}>
								<i className="fas fa-fire mr-3 text-2xl"></i>
								<span className="text-lg font-bold">热饭</span>
							</Button>
							<Button variant="ghost" className="bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] !rounded-button p-6 flex flex-col items-center justify-center" onClick={() => { setSelectedFunction('稀饭'); setRemainingTime(45 * 60); }}>
								<i className="fas fa-coffee mr-3 text-2xl"></i>
								<span className="text-lg font-bold">稀饭</span>
							</Button>
							<Button variant="ghost" className="bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] !rounded-button p-6 flex flex-col items-center justify-center" onClick={() => { setSelectedFunction('煲汤'); setRemainingTime(120 * 60); }}>
								<i className="fas fa-utensils mr-3 text-2xl"></i>
								<span className="text-lg font-bold">煲汤</span>
							</Button>
							<Button variant="ghost" className="bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] !rounded-button p-6 flex flex-col items-center justify-center" onClick={() => { setSelectedFunction('杂粮饭'); setRemainingTime(70 * 60); }}>
								<i className="fas fa-seedling mr-3 text-2xl"></i>
								<span className="text-lg font-bold">杂粮饭</span>
							</Button>
						</div>
					) : (
						<div className="grid grid-cols-2 gap-4">
							<Button variant="ghost" className="bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] !rounded-button p-6 flex flex-col items-center justify-center" onClick={() => { setSelectedFunction('蛋糕'); setRemainingTime(50 * 60); }}>
								<i className="fas fa-cake-candles mr-3 text-2xl"></i>
								<span className="text-lg font-bold">蛋糕</span>
							</Button>
							<Button variant="ghost" className="bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] !rounded-button p-6 flex flex-col items-center justify-center" onClick={() => { setSelectedFunction('酸奶'); setRemainingTime(480 * 60); }}>
								<i className="fas fa-glass-water mr-3 text-2xl"></i>
								<span className="text-lg font-bold">酸奶</span>
							</Button>
							<Button variant="ghost" className="bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] !rounded-button p-6 flex flex-col items-center justify-center" onClick={() => { setSelectedFunction('低糖饭'); setRemainingTime(40 * 60); }}>
								<i className="fas fa-wheat-awn mr-3 text-2xl"></i>
								<span className="text-lg font-bold">低糖饭</span>
							</Button>
							<Button variant="ghost" className="bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] !rounded-button p-6 flex flex-col items-center justify-center" onClick={() => { setSelectedFunction('保温'); setRemainingTime(24 * 60 * 60); }}>
								<i className="fas fa-temperature-high mr-3 text-2xl"></i>
								<span className="text-lg font-bold">保温</span>
							</Button>
						</div>
					)}
				</div>
			</div>
		</BaseModal>
	);
};

export default RiceCookerModal;