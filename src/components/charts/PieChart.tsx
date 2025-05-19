import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface PieChartParams {
	name: string;
	percent: number;
}

interface PieChartProps {
	data: { value: number; name: string; itemStyle: { color: string } }[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
	const chartRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (chartRef.current) {
			const chart = echarts.init(chartRef.current);
			const option = {
				animation: false,
				series: [
					{
						type: 'pie',
						radius: ['60%', '85%'],
						data,
						label: {
							show: true,
							position: 'outside',
							formatter: function (params: PieChartParams) {
								const name = params.name;
								const value = params.percent.toFixed(1);
								if (name === '客厅') {
									return '客: ' + value + '%';
								} else if (name === '工作室') {
									return '工: ' + value + '%';
								} else {
									return name + ': ' + value + '%';
								}
							},
							fontSize: 12,
							color: '#666',
						},
					},
				],
			};
			chart.setOption(option);
		}
	}, [data]);

	return <div ref={chartRef} style={{ height: '200px' }}></div>;
};

export default PieChart;