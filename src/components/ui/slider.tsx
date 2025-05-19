import React from 'react';

interface SliderProps {
	value: number[];
	onValueChange: (value: number[]) => void;
	min: number;
	max: number;
	step: number;
	className?: string;
}

const Slider: React.FC<SliderProps> = ({ value, onValueChange, min, max, step, className }) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseFloat(e.target.value);
		onValueChange([newValue]);
	};

	return (
		<input
			type="range"
			min={min}
			max={max}
			step={step}
			value={value[0]}
			onChange={handleChange}
			className={`w-full h-3 appearance-none bg-gray-200 rounded-full focus:outline-none focus:ring-green-500 focus:border-green-500 ${className}`}
		/>
	);
};

export default Slider;
