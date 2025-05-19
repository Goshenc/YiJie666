import React, { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface YijieMainPageProps {
	setCurrentPage: (page: 'home' | 'devices' | 'analysis' | 'history' | 'settings' | 'login' | 'smart' | 'yijie') => void;
}

const YijieMainPage: React.FC<YijieMainPageProps> = ({ setCurrentPage }) => {
	const [greeting, setGreeting] = useState<string>("");
	const [userInput, setUserInput] = useState<string>(""); // 保存输入框内容
	const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
		{ text: "你好！我是翌界 AI 助手，请告诉我你想要的界面设计风格，我会为你生成完美的用户界面。", isUser: false }
	]); // 用户发过的消息列表

	useEffect(() => {
		updateGreeting();
	}, []);

	const updateGreeting = () => {
		const hour = new Date().getHours();
		if (hour >= 5 && hour < 12) {
			setGreeting("早上好，欢迎使用翌界！");
		} else if (hour >= 12 && hour < 18) {
			setGreeting("下午好，欢迎使用翌界！");
		} else {
			setGreeting("晚上好，欢迎使用翌界！");
		}
	};

	const handleSend = () => {
		if (userInput.trim() !== "") {
			setMessages((prev) => [...prev, { text: userInput, isUser: true }]); // 添加用户消息
			setUserInput(""); // 清空输入框
			// 添加自动回复
			setTimeout(() => {
				setMessages((prev) => [...prev, { text: "好的，正在生成智能家居界面，请稍候", isUser: false }]);
				// 2秒后跳转到MyHomePage
				setTimeout(() => {
					setCurrentPage('home');
				}, 2000);
			}, 500);
		}
	};

	return (
		<div className="bg-gradient-to-tr from-blue-100 via-white to-blue-100 min-h-screen w-full m-0">
			<div className="p-6">
				<style>
					{`
						@font-face {
							font-family: 'DingTalkProgress';
							src: url('/fonts/钉钉进步体.ttf') format('truetype');
							font-weight: normal;
							font-style: normal;
						}
					`}
				</style>
				<div className="flex h-full relative justify-center items-center">
					{/* 左侧导航栏 */}
					<div className="fixed left-6 top-1/2 -translate-y-1/2 w-[100px] bg-white shadow-lg flex flex-col items-center py-8 rounded-2xl space-y-8">
						<div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
							<img
								src="/icons/yijie_logo.svg"
								alt="翌界 logo"
								className="w-full h-full object-contain"
							/>
						</div>
						<div className="relative">
							<Popover>
								<PopoverTrigger isOpen={false} togglePopover={() => { }}>
									<Avatar className="w-16 h-16 cursor-pointer">
										<img
											src="/images/MrsLin_35_north.jpg"
											alt="用户头像"
											className="w-[120%] h-[120%] object-cover"
										/>
									</Avatar>
								</PopoverTrigger>
								<PopoverContent isOpen={false}>
									<div className="space-y-2">
										<Button variant="ghost" className="w-full justify-start gap-2 text-sm">
											<i className="fas fa-user text-gray-600"></i> 用户信息
										</Button>
										<Button variant="ghost" className="w-full justify-start gap-2 text-sm">
											<i className="fas fa-palette text-gray-600"></i> 界面主题
										</Button>
										<Button variant="ghost" className="w-full justify-start gap-2 text-sm">
											<i className="fas fa-language text-gray-600"></i> 语言选择
										</Button>
										<Button variant="ghost" className="w-full justify-start gap-2 text-sm">
											<i className="fas fa-comment-dots text-gray-600"></i> 用户反馈
										</Button>
										<Button variant="ghost" className="w-full justify-start gap-2 text-sm">
											<i className="fas fa-sign-out-alt text-gray-600"></i> 退出登录
										</Button>
									</div>
								</PopoverContent>
							</Popover>
						</div>
						<div className="flex-1 flex flex-col gap-6 justify-center">
							<TooltipProvider>
								<Tooltip content="添加新会话">
									<TooltipTrigger>
										<Button
											variant="ghost"
											size="icon"
											className="!rounded-button hover:bg-blue-50 w-16 h-16 flex items-center justify-center"
										>
											<i className="fas fa-plus text-gray-600 text-3xl"></i>
										</Button>
									</TooltipTrigger>
								</Tooltip>
								<Tooltip content="历史记录">
									<TooltipTrigger>
										<Button
											variant="ghost"
											size="icon"
											className="!rounded-button hover:bg-blue-50 w-16 h-16 flex items-center justify-center"
										>
											<i className="fas fa-history text-gray-600 text-3xl"></i>
										</Button>
									</TooltipTrigger>
								</Tooltip>
							</TooltipProvider>
						</div>
						<div className="mt-auto">
							<Popover>
								<PopoverTrigger isOpen={false} togglePopover={() => { }}>
									<Tooltip content="下载">
										<TooltipTrigger>
											<Button
												variant="ghost"
												size="icon"
												className="!rounded-button hover:bg-blue-50 w-16 h-16 flex items-center justify-center"
											>
												<i className="fas fa-download text-gray-600 text-3xl"></i>
											</Button>
										</TooltipTrigger>
									</Tooltip>
								</PopoverTrigger>
								<PopoverContent isOpen={false}>
									<div className="space-y-2">
										<Button variant="ghost" className="w-full justify-start gap-2 text-sm">
											<i className="fas fa-desktop text-gray-600"></i> 下载桌面端
										</Button>
										<Button variant="ghost" className="w-full justify-start gap-2 text-sm">
											<i className="fas fa-puzzle-piece text-gray-600"></i> 添加浏览器插件
										</Button>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</div>
					{/* 主体内容区 */}
					<div className="flex-1 flex flex-col pl-20 h-full">
						<div className="text-center mb-12 mt-20">
							<h1
								className="text-[60px] font-bold mb-6"
								style={{
									fontFamily: 'DingTalkProgress, sans-serif',
									textShadow: '0 2px 4px rgba(0,0,0,0.1)',
									letterSpacing: '4px',
									background: 'linear-gradient(to bottom, rgba(22, 124, 255, 1), rgba(92, 169, 255, 0.6))',
									WebkitBackgroundClip: 'text',
									backgroundClip: 'text',
									WebkitTextFillColor: 'transparent'
								}}
							>
								翌 界
							</h1>
							<p className="text-gray-600 mb-12 text-2xl">{greeting}</p>
							<div className="flex flex-col items-center justify-center h-full pb-6">
								<div className="w-3/4 bg-blue-200/50 rounded-t-3xl p-8 shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-blue-300 h-[700px] overflow-auto flex flex-col justify-between">
									{/* 对话区域 */}
									<div className="flex flex-col gap-4 overflow-y-auto flex-1">
										{/* 消息列表 */}
										{messages.map((msg, index) => (
											<div key={index} className={`flex gap-4 ${msg.isUser ? 'justify-end' : ''}`}>
												{!msg.isUser && (
													<Avatar className="w-12 h-12">
														<img
															src="https://ai-public.mastergo.com/ai/img_res/40498f8a432cce37978cd3df80f9db7e.jpg"
															alt="AI头像"
														/>
													</Avatar>
												)}
												<div className={`rounded-2xl p-6 shadow-sm max-w-[70%] ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-white'}`}>
													<p className="text-xl text-left">{msg.text}</p>
												</div>
												{msg.isUser && (
													<Avatar className="w-12 h-12">
														<img
															src="/images/MrsLin_35_north.jpg"
															alt="用户头像"
															className="w-[120%] h-[120%] object-cover"
														/>
													</Avatar>
												)}
											</div>
										))}
									</div>

									{/* 输入区域 */}
									<div>
										<div className="relative mb-8">
											<input
												className="bg-white text-2xl py-6 rounded-xl border-2 border-gray-100 w-full pr-28 pl-4"
												placeholder="请输入你想要的界面设计风格..."
												type="text"
												value={userInput}
												onChange={(e) => setUserInput(e.target.value)}
												onKeyDown={(e) => {
													if (e.key === "Enter") handleSend();
												}}
											/>
											<Button
												className="!rounded-xl whitespace-nowrap bg-blue-500 hover:bg-blue-600 text-white absolute right-2 top-1/2 -translate-y-1/2 py-4 px-8 text-xl"
												style={{
													top: '50%',
													bottom: 'auto',
													height: 'calc(100% - 16px)'
												}}
												onClick={handleSend}
											>
												<i className="fas fa-paper-plane mr-2"></i>
												发送
											</Button>
										</div>
										<div className="flex flex-col gap-4">
											<div className="flex gap-4 justify-center">
												{["现代简约风格", "科技感设计", "明亮清新布局"].map((style, i) => (
													<Button
														key={i}
														variant="outline"
														className="bg-white/80 hover:bg-blue-50 rounded-xl py-4 px-10 text-xl w-[240px]"
														onClick={() => {
															setMessages((prev) => [...prev, { text: style, isUser: true }]);
															setTimeout(() => {
																setMessages((prev) => [...prev, { text: "好的，正在生成智能家居界面，请稍候", isUser: false }]);
																setTimeout(() => {
																	setCurrentPage('smart');
																}, 2000);
															}, 500);
														}}
													>
														{style}
													</Button>
												))}
											</div>
											<div className="flex gap-4 justify-center">
												{["深色主题界面", "智能家居界面"].map((style, i) => (
													<Button
														key={i + 3}
														variant="outline"
														className="bg-white/80 hover:bg-blue-50 rounded-xl py-4 px-10 text-xl w-[240px]"
														onClick={() => {
															setMessages((prev) => [...prev, { text: style, isUser: true }]);
															setTimeout(() => {
																setMessages((prev) => [...prev, { text: "好的，正在生成智能家居界面，请稍候", isUser: false }]);
																setTimeout(() => {
																	setCurrentPage('smart');
																}, 2000);
															}, 500);
														}}
													>
														{style}
													</Button>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default YijieMainPage;
