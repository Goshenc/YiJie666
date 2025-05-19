import React, { useEffect, useState } from 'react';
import BaseModal from '../shared/BaseModal'; // 根据实际路径调整
import Button from "@/components/ui/button";

interface CurtainModalProps {
	isOpen: boolean;
	onClose: () => void;
	toggleCurtain: () => void;
	isCurtainOpen: boolean; // 当前窗帘状态
}

const CurtainModal: React.FC<CurtainModalProps> = ({ isOpen, onClose, toggleCurtain, isCurtainOpen }) => {
	const [curtainPosition, setCurtainPosition] = useState(isCurtainOpen ? 'open' : 'closed'); // 根据设备状态初始化
	const [isCurtainMoving, setIsCurtainMoving] = useState(false);

	useEffect(() => {
		// 当模态框打开时，更新状态
		setCurtainPosition(isCurtainOpen ? 'open' : 'closed');
	}, [isOpen, isCurtainOpen]);

	const handleCurtainControl = (action: 'open' | 'close') => {
		setIsCurtainMoving(true);
		setCurtainPosition(action);
		// Simulate curtain movement
		setTimeout(() => {
			setIsCurtainMoving(false);
			toggleCurtain(); // 调用父组件的 toggleCurtain 方法更新设备状态
		}, 2000);
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose}>
			<div className="bg-[#E0EBE0] p-6 max-w-md mx-auto">
				<div className="w-[360px] p-6 bg-[#E0EBE0] rounded-lg">
					<h2 className="text-[#1F2937] text-xl font-semibold mb-4">窗帘控制面板</h2>
					<div className="space-y-6">
						{/* 虚拟窗户和窗帘显示屏 */}
						<div className="relative h-48 bg-[#1F2937] rounded-lg overflow-hidden p-4">
							<div className="w-full h-full bg-[#E6F3FF] rounded-lg relative">
								{/* 左侧窗帘 */}
								<div
									className={`absolute top-0 left-0 h-full w-1/2 bg-[#C2DBC2] transition-transform duration-[2000ms] ease-in-out ${curtainPosition === 'open' ? 'translate-x-[-100%]' : 'translate-x-0'}`}
								></div>
								{/* 右侧窗帘 */}
								<div
									className={`absolute top-0 right-0 h-full w-1/2 bg-[#C2DBC2] transition-transform duration-[2000ms] ease-in-out ${curtainPosition === 'open' ? 'translate-x-[100%]' : 'translate-x-0'}`}
								></div>
								{/* 状态指示 */}
								<div className="absolute bottom-2 right-2">
									<div className="flex items-center space-x-2">
										<div className={`w-2 h-2 rounded-full ${isCurtainMoving ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
										<span className="text-xs text-gray-600">{isCurtainMoving ? '移动中' : '就绪'}</span>
									</div>
								</div>
							</div>
						</div>
						{/* 控制按钮 */}
						<div className="grid grid-cols-2 gap-4">
							<Button
								className="bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] !rounded-button p-6"
								variant="ghost"
								onClick={() => handleCurtainControl('close')}
								disabled={isCurtainMoving}
							>
								<i className="fas fa-arrow-left mr-3 text-2xl"></i>
								<span className="text-xl font-bold">关闭</span>
							</Button>
							<Button
								className="bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] !rounded-button p-6"
								variant="ghost"
								onClick={() => handleCurtainControl('open')}
								disabled={isCurtainMoving}
							>
								<i className="fas fa-arrow-right mr-3 text-2xl"></i>
								<span className="text-xl font-bold">开启</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</BaseModal>
	);
};

export default CurtainModal;