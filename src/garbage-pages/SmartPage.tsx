import React from "react";
import './styles.css';
import { Dispatch, SetStateAction } from "react";

interface SmartPageProps {
	setCurrentPage: Dispatch<SetStateAction<'yijie' | 'home' | 'devices' | 'analysis' | 'history' | 'settings' | 'login' | 'smart' | 'garbage1' | 'garbage2'>>;
}

const SmartPage: React.FC<SmartPageProps> = ({ setCurrentPage }) => {
	const handleClick = () => {
		setTimeout(() => {
			setCurrentPage('home');
		}, 500);
	};

	return (
		<div className="flex h-screen">
			<div className="flex-1 bg-cover bg-center left-background relative" style={{
				backgroundImage: "url('/images/smart_home_login_page_background.jpg')",
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat'
			}}>
				<div className="absolute inset-0" style={{ backgroundColor: 'rgba(194, 219, 194, 0.9)' }}></div>
				<div className="flex flex-col justify-center h-full px-16 relative">
					{/* SmartHome 标题 */}
					<h1 className="text-4xl font-bold mb-20" style={{ color: "#1F2937" }}>
						SmartHome
					</h1>
					{/* 中间文案 */}
					<h2 className="text-4xl font-bold mb-8" style={{ color: "#000000", fontFamily: 'AlimamaShuHeiTi' }}>
						让每个家庭都能享受
					</h2>
					{/* 底部文案 */}
					<h2 className="text-6xl font-bold tracking-wider" style={{ color: "#2D5A27", fontFamily: 'AlimamaShuHeiTi' }}>
						简单 方便 舒适
					</h2>
				</div>
			</div>
			<div className="w-[500px] bg-[#E5EFE5] flex flex-col justify-center items-center p-12">
				<h2 className="text-3xl font-bold mb-12">登录</h2>
				<form className="w-full space-y-6">
					<div>
						<label htmlFor="phone-email" className="block text-gray-700 text-base mb-2">手机号/邮箱</label>
						<input type="text" id="phone-email" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500" />
					</div>
					<div>
						<label htmlFor="password" className="block text-gray-700 text-base mb-2">密码</label>
						<input type="password" id="password" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500" />
					</div>
					<button
						type="button"
						className="w-full py-3 mt-4 bg-[#2D5A27] text-white text-lg rounded-md hover:bg-green-800 focus:outline-none"
						onClick={handleClick}
					>
						切换到主页
					</button>
				</form>
				<div className="mt-6">
					<a href="#" className="text-sm text-gray-600 hover:text-gray-800">忘记密码？</a>
				</div>
				<div className="mt-4 flex items-center space-x-1">
					<span className="text-sm text-gray-600">还没有账号？</span>
					<a href="#" className="text-sm text-blue-500 hover:text-blue-700">去注册</a>
				</div>
			</div>
		</div>
	);
};

export default SmartPage;