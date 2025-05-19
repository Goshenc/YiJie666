// components/shared/Sidebar.tsx
import React from 'react';
import Button from '../../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProps {
	currentPage: 'home0' | 'home' | 'analysis' | 'devices' | 'history' | 'yijie' | 'login' | 'garbage1' | 'garbage2' | 'garbage3' | 'smart' | 'settings';
	setCurrentPage: React.Dispatch<React.SetStateAction<'home0' | 'home' | 'history' | 'analysis' | 'devices' | 'yijie' | 'login' | 'garbage1' | 'garbage2' | 'garbage3' | 'smart' | 'settings'>>;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
	const handlePageChange = (page: 'home0' | 'home' | 'analysis' | 'devices' | 'yijie' | 'login' | 'garbage1' | 'garbage2' | 'garbage3') => {
		// 只有在页面已实现时才切换页面
		if (['home0', 'garbage3'].includes(page)) {
			setCurrentPage(page);
		}
	};

	return (
		<aside className="w-72 bg-[#e0ebe0] p-6">
			<div className="flex flex-col items-center mb-8">
				<Avatar className="w-20 h-20 mb-2">
					<AvatarImage src="/images/MissLi_20_south_dog.jpg" />
					<AvatarFallback>用户</AvatarFallback>
				</Avatar>
				<div className="text-center">
					<h3 className="font-medium">李小姐</h3>
					<p className="text-sm text-gray-600">福建省福州市鼓楼区杨桥中路148号陆庄花园4座301</p>
				</div>
			</div>
			<nav className="space-y-6">
				<Button
					variant="ghost"
					className={`w-full text-left text-lg py-6 ${currentPage === 'home0' ? 'text-blue-400' : 'text-gray-600'}`}
					onClick={() => handlePageChange('home0')}
				>
					<i className="fas fa-home mr-3 text-lg"></i>
					我的家
				</Button>
				<Button
					variant="ghost"
					className={`w-full text-left text-lg py-4 ${currentPage === 'garbage3' ? 'text-blue-400' : 'text-gray-600'}`}
					onClick={() => handlePageChange('garbage3')}
				>
					<i className="fas fa-database mr-3 text-lg"></i>
					设备
				</Button>
			</nav>
		</aside>
	);
};

export default Sidebar;