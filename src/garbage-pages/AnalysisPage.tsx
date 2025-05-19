// 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果
import React from 'react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Progress from "@/components/ui/progess";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageType } from "../types";

// 修改 SelectTriggerProps 接口，添加 onClick 属性
interface SelectTriggerProps {
	className?: string;
	children?: React.ReactNode;
	onClick?: () => void;
}

interface AnalysisPageProps {
	setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({ setCurrentPage }) => {
	const chartRef = useRef<HTMLDivElement>(null);
	const [selectedValue, setSelectedValue] = useState('thisMonth'); // 用于存储选中的值
	const [isOpen, setIsOpen] = useState(false); // 用于控制下拉内容的显示状态

	const handleBackToYijie = () => {
		setCurrentPage('AIGenerate');
	};

	useEffect(() => {
		if (chartRef.current) {
			const myChart = echarts.init(chartRef.current);
			const option = {
				animation: false,
				tooltip: {
					trigger: 'axis'
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					data: ['一', '二', '三', '四', '五', '六', '日'],
					axisLine: {
						lineStyle: {
							color: '#4a5568'
						}
					},
					axisPointer: {
						value: 6,
						status: true,
						lineStyle: {
							color: '#3A7233',
							width: 3
						},
						handle: {
							show: true,
							color: '#3A7233'
						}
					}
				},
				yAxis: {
					type: 'value',
					axisLine: {
						lineStyle: {
							color: '#4a5568'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#2d3748'
						}
					}
				},
				series: [
					{
						name: '卧室',
						type: 'line',
						data: [150, 450, 500, 550, 400, 450, 350],
						smooth: true,
						lineStyle: {
							color: '#4DABF7'
						}
					},
					{
						name: '工作室',
						type: 'line',
						data: [100, 400, 420, 450, 470, 420, 480],
						smooth: true,
						lineStyle: {
							color: '#FFA94D'
						}
					},
					{
						name: '书房',
						type: 'line',
						data: [50, 300, 320, 350, 340, 320, 300],
						smooth: true,
						lineStyle: {
							color: '#FF6B6B'
						}
					},
					{
						name: '厨房',
						type: 'line',
						data: [20, 150, 200, 250, 200, 180, 150],
						smooth: true,
						lineStyle: {
							color: '#CC5DE8'
						}
					}
				]
			};
			myChart.setOption(option);
		}
	}, []);

	const handleItemClick = (value: string) => {
		setSelectedValue(value);
		setIsOpen(false);
	};

	return (
		<div className="min-h-screen bg-slate-900 text-white">
			<div className="max-w-[1440px] mx-auto">
				<div className="flex">
					{/* 主要内容区域 */}
					<main className="flex-1 p-6 bg-[#F0F5F0]">
						<div className="mb-8">
							<div className="flex items-center justify-between">
								<h2 className="text-2xl font-bold text-[#1F2937]">智能分析</h2>
								<button
									className="flex items-center text-gray-600 hover:text-gray-800"
									onClick={handleBackToYijie}
								>
									<i className="fa-solid fa-arrow-left mr-2"></i>
									返回翌界聊天界面
								</button>
							</div>
							<Card className="bg-[#C2DBC2] p-6 border-none mt-6">
								<div className="flex items-center justify-between mb-6">
									<h3 className="text-xl font-semibold">能源消耗</h3>
									<Select defaultValue={selectedValue}>
										<SelectTrigger className="w-32 bg-[#E0EBE0] text-[#1F2937]" onClick={() => setIsOpen(!isOpen)}>
											<SelectValue>{selectedValue}</SelectValue>
										</SelectTrigger>
										<SelectContent isOpen={isOpen}>
											<SelectItem value="thisMonth" onClick={handleItemClick}>这个月</SelectItem>
											<SelectItem value="lastMonth" onClick={handleItemClick}>上个月</SelectItem>
											<SelectItem value="lastThreeMonths" onClick={handleItemClick}>近三个月</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="grid grid-cols-4 gap-4 mb-6">
									<div className="relative">
										<div className="w-24 h-24 mx-auto">
											<div className="absolute inset-0 flex items-center justify-center">
												<span className="text-xl font-bold">12%</span>
											</div>
											<svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
												<path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E9ECEF" strokeWidth="4" />
												<path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4DABF7" strokeWidth="4" strokeDasharray={`${12}, 100`} />
											</svg>
										</div>
										<div className="text-sm text-slate-600 text-center mt-2">卧室</div>
									</div>
									<div className="relative">
										<div className="w-24 h-24 mx-auto">
											<div className="absolute inset-0 flex items-center justify-center">
												<span className="text-xl font-bold">16%</span>
											</div>
											<svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
												<path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E9ECEF" strokeWidth="4" />
												<path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#FFA94D" strokeWidth="4" strokeDasharray={`${16}, 100`} />
											</svg>
										</div>
										<div className="text-sm text-slate-600 text-center mt-2">工作室</div>
									</div>
									<div className="relative">
										<div className="w-24 h-24 mx-auto">
											<div className="absolute inset-0 flex items-center justify-center">
												<span className="text-xl font-bold">32%</span>
											</div>
											<svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
												<path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E9ECEF" strokeWidth="4" />
												<path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#FF6B6B" strokeWidth="4" strokeDasharray={`${32}, 100`} />
											</svg>
										</div>
										<div className="text-sm text-slate-600 text-center mt-2">书房</div>
									</div>
									<div className="relative">
										<div className="w-24 h-24 mx-auto">
											<div className="absolute inset-0 flex items-center justify-center">
												<span className="text-xl font-bold">18%</span>
											</div>
											<svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
												<path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E9ECEF" strokeWidth="4" />
												<path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#CC5DE8" strokeWidth="4" strokeDasharray={`${18}, 100`} />
											</svg>
										</div>
										<div className="text-sm text-slate-600 text-center mt-2">厨房</div>
									</div>
								</div>
								<div ref={chartRef} style={{ height: '400px' }}></div>
							</Card>
							<div className="grid grid-cols-4 gap-4 mt-6">
								<Card className="p-4 bg-[#C2DBC2] border-none">
									<div className="flex items-center justify-between mb-4">
										<h3>摄像头</h3>
										<Select defaultValue={selectedValue}>
											<SelectTrigger className="w-32 bg-[#E0EBE0] text-[#1F2937]" onClick={() => setIsOpen(!isOpen)}>
												<SelectValue>{selectedValue}</SelectValue>
											</SelectTrigger>
											<SelectContent isOpen={isOpen}>
												<SelectItem value="thisMonth" onClick={handleItemClick}>这个月</SelectItem>
												<SelectItem value="lastMonth" onClick={handleItemClick}>上个月</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="flex items-center gap-4">
										<div className="relative w-24 h-24">
											<div className="absolute inset-0 flex items-center justify-center">
												<i className="fas fa-video text-[#3A7233] text-2xl"></i>
											</div>
											<svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
												<path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E9ECEF" strokeWidth="4" />
												<path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3A7233" strokeWidth="4" strokeDasharray={`${75}, 100`} />
											</svg>
										</div>
										<div className="flex-1">
											<div className="text-lg font-semibold">57:03:24</div>
											<div className="text-sm text-slate-600">320 Wh (-24%)</div>
										</div>
									</div>
								</Card>
								<Card className="p-4 bg-[#C2DBC2] border-none">
									<div className="flex items-center justify-between mb-4">
										<h3>水量</h3>
										<Select defaultValue={selectedValue}>
											<SelectTrigger className="w-32 bg-[#E0EBE0] text-[#1F2937]" onClick={() => setIsOpen(!isOpen)}>
												<SelectValue>{selectedValue}</SelectValue>
											</SelectTrigger>
											<SelectContent isOpen={isOpen}>
												<SelectItem value="thisMonth" onClick={handleItemClick}>这个月</SelectItem>
												<SelectItem value="lastMonth" onClick={handleItemClick}>上个月</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="flex items-center gap-4">
										<div className="relative w-24 h-24">
											<div className="absolute inset-0 flex items-center justify-center">
												<i className="fas fa-tint text-[#3A7233] text-2xl"></i>
											</div>
											<svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
												<path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E9ECEF" strokeWidth="4" />
												<path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3A7233" strokeWidth="4" strokeDasharray={`${65}, 100`} />
											</svg>
										</div>
										<div className="flex-1">
											<div className="text-lg font-semibold">57:03:24</div>
											<div className="text-sm text-slate-600">320 Wh (-24%)</div>
										</div>
									</div>
								</Card>
								<Card className="p-4 bg-[#C2DBC2] border-none">
									<div className="flex items-center justify-between mb-4">
										<h3>大灯</h3>
										<Select defaultValue={selectedValue}>
											<SelectTrigger className="w-32 bg-[#E0EBE0] text-[#1F2937]" onClick={() => setIsOpen(!isOpen)}>
												<SelectValue>{selectedValue}</SelectValue>
											</SelectTrigger>
											<SelectContent isOpen={isOpen}>
												<SelectItem value="thisMonth" onClick={handleItemClick}>这个月</SelectItem>
												<SelectItem value="lastMonth" onClick={handleItemClick}>上个月</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="flex items-center gap-4">
										<div className="relative w-24 h-24">
											<div className="absolute inset-0 flex items-center justify-center">
												<i className="fas fa-lightbulb text-[#3A7233] text-2xl"></i>
											</div>
											<svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
												<path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E9ECEF" strokeWidth="4" />
												<path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3A7233" strokeWidth="4" strokeDasharray={`${85}, 100`} />
											</svg>
										</div>
										<div className="flex-1">
											<div className="text-lg font-semibold">57:03:24</div>
											<div className="text-sm text-slate-600">320 Wh (-24%)</div>
										</div>
									</div>
								</Card>
								<Card className="p-4 bg-[#C2DBC2] border-none">
									<div className="flex items-center justify-between mb-4">
										<h3>插座</h3>
										<Select defaultValue={selectedValue}>
											<SelectTrigger className="w-32 bg-[#E0EBE0] text-[#1F2937]" onClick={() => setIsOpen(!isOpen)}>
												<SelectValue>{selectedValue}</SelectValue>
											</SelectTrigger>
											<SelectContent isOpen={isOpen}>
												<SelectItem value="thisMonth" onClick={handleItemClick}>这个月</SelectItem>
												<SelectItem value="lastMonth" onClick={handleItemClick}>上个月</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="flex items-center gap-4">
										<div className="relative w-24 h-24">
											<div className="absolute inset-0 flex items-center justify-center">
												<i className="fas fa-plug text-[#3A7233] text-2xl"></i>
											</div>
											<svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
												<path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E9ECEF" strokeWidth="4" />
												<path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3A7233" strokeWidth="4" strokeDasharray={`${70}, 100`} />
											</svg>
										</div>
										<div className="flex-1">
											<div className="text-lg font-semibold">57:03:24</div>
											<div className="text-sm text-slate-600">420 Kwh (-24%)</div>
										</div>
									</div>
								</Card>
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default AnalysisPage;
