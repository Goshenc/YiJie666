import React from 'react';
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import { PageType } from '../types';
import { Dispatch, SetStateAction } from "react";
interface LoginPageProps {
	setCurrentPage: Dispatch<SetStateAction<'home0' | 'home' | 'analysis' | 'history' | 'devices' | 'yijie' | 'login' | 'garbage1' | 'garbage2' | 'garbage3' | 'settings' | 'smart'>>;
}
const LoginPage: React.FC<LoginPageProps> = ({ setCurrentPage }) => {
	const backgroundImage = 'https://ai-public.mastergo.com/ai/img_res/aa11ce87faf94db7f32b14695b14b604.jpg';

	const handleLogin = () => {
		setTimeout(() => {
			setCurrentPage('yijie');
		}, 500);
	};

	return (
		<div className="flex min-h-screen w-full">
			{/* Left Section */}
			<div className="relative w-3/5 overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
					style={{ backgroundImage: `url(${backgroundImage})` }}
				/>
				<div className="relative z-10 p-12 h-full flex flex-col">
					<div className="flex items-center gap-4">
						<img src="/icons/yijie_logo.svg" alt="翌界" className="h-16" />
						<div className="text-4xl font-bold text-blue-600">
							翌界
						</div>
					</div>
					<div className="flex-1 flex items-center justify-center">
						<div className="bg-gradient-to-b from-blue-200 via-white to-blue-200 p-20 rounded-[60px] shadow-xl w-full h-full flex flex-col items-start justify-center mt-16">
							<div className="text-[40px] font-bold text-gray-800 leading-tight">
								每个人都是自己的
								<br />
								UI 设计师
							</div>
							<p className="mt-6 text-gray-600 text-lg">
								让设计变得简单，让创意自由流动
							</p>
						</div>
					</div>
				</div>
			</div>
			{/* Right Section */}
			<div className="w-2/5 px-16 py-12 bg-white flex flex-col justify-center">
				<div className="w-full max-w-md mx-auto">
					<h1 className="text-2xl font-bold text-gray-900 mb-8">欢迎回来</h1>
					<div className="space-y-6">
						<div className="space-y-2">
							<Input
								type="email"
								placeholder="请输入邮箱"
								className="w-full px-10 py-8 text-lg border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none hover:border-blue-400 transition-colors duration-200 bg-gray-50 placeholder:text-lg"
							/>
						</div>
						<div className="space-y-2">
							<Input
								type="password"
								placeholder="请输入密码"
								className="w-full px-10 py-8 text-lg border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none hover:border-blue-400 transition-colors duration-200 bg-gray-50 placeholder:text-lg"
							/>
						</div>
						<div className="flex items-center">
							<Checkbox id="remember" className="mr-2 cursor-pointer h-5 w-5" />
							<label htmlFor="remember" className="text-xl text-gray-600">
								记住密码
							</label>
						</div>
						<Button
							onClick={handleLogin}
							className="w-full !rounded-button bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xl py-8 transition-colors duration-200"
						>
							开始使用
						</Button>
						<div className="flex items-center justify-between text-xl">
							<a href="#" className="text-blue-600 hover:underline">忘记密码？</a>
							<a href="#" className="text-blue-600 hover:underline">注册新账号</a>
						</div>
						<div className="relative my-8">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-200"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500 text-xl">其他登录方式</span>
							</div>
						</div>
						<div className="flex justify-center space-x-6">
							<Button variant="outline" className="!rounded-button text-xl py-6 px-8">
								<i className="fab fa-weixin text-[#07C160] mr-2 text-2xl"></i>
								微信登录
							</Button>
							<Button variant="outline" className="!rounded-button text-xl py-6 px-8">
								SSO 登录
							</Button>
						</div>
						<div className="mt-6 text-lg text-gray-500 text-center">
							登录即表示您同意<a href="#" className="text-blue-600 hover:underline">服务条款</a>和<a href="#" className="text-blue-600 hover:underline">隐私政策</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;