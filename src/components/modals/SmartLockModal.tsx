import React from 'react';
import BaseModal from '../shared/BaseModal'; // 根据实际路径调整
import Button from "@/components/ui/button";

interface SmartLockModalProps {
	showLockDialog: boolean;
	setShowLockDialog: (value: boolean) => void;
	isSmartLockOn: boolean;
	toggleSmartLock: () => void;
}

const SmartLockModal: React.FC<SmartLockModalProps> = ({
	showLockDialog,
	setShowLockDialog,
	isSmartLockOn,
	toggleSmartLock
}) => {
	return (
		<BaseModal isOpen={showLockDialog} onClose={() => setShowLockDialog(false)}>
			<div className="bg-[#E0EBE0] p-6 max-w-md mx-auto">
				<h2 className="text-[#1F2937] text-xl font-semibold mb-4">智能门锁控制面板</h2>
				<div className="space-y-6">
					<div className="bg-[#1F2937] rounded-lg p-6">
						<div className="text-white text-center space-y-4">
							<i className="fas fa-lock text-4xl"></i>
							<div className="text-2xl font-bold">{isSmartLockOn ? '已关锁' : '已开锁'}</div>
							<div className="text-gray-300 space-y-2">
								<div>设备型号：F300</div>
								<div className="flex items-center justify-center space-x-2">
									<i className="fas fa-battery-three-quarters"></i>
									<span>电量：80%</span>
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<Button
							variant="ghost"
							className="py-12 bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] !rounded-button"
							onClick={() => {
								// 这里可以添加临时密码相关逻辑
								console.log('临时密码功能被触发');
							}}
						>
							<div className="flex flex-col items-center space-y-4">
								<i className="fas fa-key text-4xl"></i>
								<span className="text-2xl font-bold">临时密码</span>
							</div>
						</Button>
						<Button
							variant="ghost"
							className="py-12 bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] !rounded-button"
							onClick={() => {
								// 这里可以添加指纹开锁相关逻辑
								console.log('指纹开锁功能被触发');
							}}
						>
							<div className="flex flex-col items-center space-y-4">
								<i className="fas fa-fingerprint text-4xl"></i>
								<span className="text-2xl font-bold">指纹</span>
							</div>
						</Button>
					</div>
					<Button
						variant="ghost"
						className="w-full py-8 bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] !rounded-button"
						onClick={() => {
							// 这里可以添加管理员信息相关逻辑
							console.log('管理员信息功能被触发');
						}}
					>
						<div className="flex items-center justify-between w-full">
							<div className="flex items-center space-x-4">
								<i className="fas fa-users-cog text-3xl"></i>
								<span className="text-2xl font-bold">管理员信息</span>
							</div>
							<i className="fas fa-plus text-3xl"></i>
						</div>
					</Button>
				</div>
			</div>
		</BaseModal>
	);
};

export default SmartLockModal;    