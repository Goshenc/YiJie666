import React from 'react';
import Button from '../../components/ui/button';

interface HeaderProps {
	currentPage: 'home0' | 'home' | 'history' | 'devices' | 'analysis' | 'settings' | 'login' | 'smart' | 'yijie' | 'garbage1' | 'garbage2' | 'garbage3';
	setCurrentPage: React.Dispatch<React.SetStateAction<| 'home0' | 'home' | 'history' | 'devices' | 'analysis' | 'settings' | 'login' | 'smart' | 'yijie' | 'garbage1' | 'garbage2' | 'garbage3'>>;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
	return (
		<header className="flex flex-col items-center justify-between p-4 border-b border-[#c4b7a6]">
			{/* 第一行：导航按钮 */}
			{/*	<div className="flex justify-between w-full">
				<div className="flex space-x-4">
					<Button
						variant="ghost"
						className={`text-lg py-4 ${currentPage === 'home' ? 'text-blue-400' : 'text-gray-600'}`}
						onClick={() => setCurrentPage('home')}
					>
						我的家
					</Button>
					<Button
						variant="ghost"
						className={`text-lg py-4 ${currentPage === 'devices' ? 'text-blue-400' : 'text-gray-600'}`}
						onClick={() => setCurrentPage('devices')}
					>
						设备
					</Button>
					<Button
						variant="ghost"
						className={`text-lg py-4 ${currentPage === 'analysis' ? 'text-blue-400' : 'text-gray-600'}`}
						onClick={() => setCurrentPage('analysis')}
					>
						智能分析
					</Button>
					<Button
						variant="ghost"
						className={`text-lg py-4 ${currentPage === 'login' ? 'text-blue-400' : 'text-gray-600'}`}
						onClick={() => setCurrentPage('login')}
					>
						登录
					</Button>
					<Button
						variant="ghost"
						className={`text-lg py-4 ${currentPage === 'smart' ? 'text-blue-400' : 'text-gray-600'}`}
						onClick={() => setCurrentPage('smart')}
					>
						SmartHome登录
					</Button>
					<Button
						variant="ghost"
						className={`text-lg py-4 ${currentPage === 'yijie' ? 'text-blue-400' : 'text-gray-600'}`}
						onClick={() => setCurrentPage('yijie')}
					>
						翌界
					</Button>
				</div>
			</div>	*/}
			{/* 第二行：图标和文字，仅在非登录页面显示 */}
			{currentPage !== 'login' && currentPage !== 'smart' && currentPage !== 'yijie' && (
				<div className="flex justify-between w-full mt-4">
					<div className="flex items-center space-x-2">
						<span className="text-xl font-bold">SmartHome</span>
						<i className="fas fa-bars ml-4 text-gray-400"></i>
					</div>
					<div className="flex items-center space-x-4">
						<i className="fas fa-question-circle text-gray-600"></i>
						<i className="fas fa-envelope text-gray-600"></i>
						<i className="fas fa-bell text-gray-600"></i>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
