import React from 'react';

interface InputProps {
	type: string;
	placeholder: string;
	className?: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder, className = '' }) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			className={`${className} border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent`}
		/>
	);
};

export default Input;