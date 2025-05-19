import React from 'react';

interface CheckboxProps {
	id: string;
	className?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	checked?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, className, onChange, checked }) => {
	return (
		<input
			type="checkbox"
			id={id}
			className={`${className} focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded transition-colors duration-200 hover:border-blue-400`}
			onChange={onChange}
			checked={checked}
		/>
	);
};

export default Checkbox;
