import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface BarChartProps {
	xData: string[];
	yData: number[];
}

const BarChart: React.FC<BarChartProps> = ({ xData, yData }) => {
	const chartRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (chartRef.current) {
			const chart = echarts.init(chartRef.current);
			const option = {
				animation: false,
				grid: {
					top: '10%',
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					data: xData,
					axisLine: { show: false },
					axisTick: { show: false },
					axisLabel: { color: '#2d5a27' },
				},
				yAxis: {
					type: 'value',
					show: false,
				},
				series: [
					{
						data: yData,
						type: 'bar',
						barWidth: '40%',
						itemStyle: {
							color: '#3a7233',
						},
					},
				],
			};
			chart.setOption(option);
		}
	}, [xData, yData]);

	return <div ref={chartRef} style={{ height: '150px' }}></div>;
};

export default BarChart;