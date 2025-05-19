// components/shared/Sidebar.tsx
import React from 'react';
import Button from '../../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type PageType = 'home0' | 'settings' | 'history' | 'yijie' | 'home' | 'devices' | 'analysis' | 'garbage1' | 'garbage2' | 'garbage3' | 'login' | 'smart';

interface GarbageSidebar1Props {
	currentPage: PageType;
	setCuSidebarPropsrrentPage: React.Dispatch<React.SetStateAction<PageType>>;
}

const GarbageSidebar1: React.FC<GarbageSidebar1Props> = ({ currentPage, setCuSidebarPropsrrentPage }) => {
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
			</nav>
		</aside>
	);
};

export default GarbageSidebar1;