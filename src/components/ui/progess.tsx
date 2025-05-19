import React from 'react';

interface ProgressProps {
	value: number;
	className?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, className }) => {
	return (
		<div className={`${className} relative`}>
			<div className="h-4 rounded-full bg-gray-200 overflow-hidden">
				<div className="h-full bg-blue-500" style={{ width: `${value}%` }}></div>
			</div>
		</div>
	);
};

export default Progress;