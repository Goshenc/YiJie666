import React, { useState } from 'react';

interface SelectProps {
	defaultValue?: string;
	className?: string;
	children?: React.ReactNode;
}

interface SelectTriggerProps {
	className?: string;
	children?: React.ReactNode;
	onClick?: () => void; // 添加 onClick 属性
}

interface SelectValueProps {
	children?: React.ReactNode;
}

interface SelectContentProps {
	isOpen: boolean;
	className?: string;
	children?: React.ReactNode;
}

interface SelectItemProps {
	value: string;
	children: React.ReactNode;
	onClick: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ defaultValue, className, children }) => {
	const [selectedValue, setSelectedValue] = useState(defaultValue || '');
	const [isOpen, setIsOpen] = useState(false);

	const handleItemClick = (value: string) => {
		setSelectedValue(value);
		setIsOpen(false);
	};

	return (
		<div className={className}>
			{children}
			<SelectContent isOpen={isOpen} className="absolute bg-white shadow-md">
				{React.Children.map(children, (child) => {
					if (React.isValidElement(child) && child.type === SelectItem) {
						// 确保 child 的类型断言正确
						const selectItemChild = child as React.ReactElement<SelectItemProps>;
						return React.cloneElement(selectItemChild, {
							value: selectItemChild.props.value,
							onClick: handleItemClick
						});
					}
					return child;
				})}
			</SelectContent>
		</div>
	);
};

const SelectTrigger: React.FC<SelectTriggerProps> = ({ className, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<button className={className} onClick={handleClick}>
			{children}
		</button>
	);
};

const SelectValue: React.FC<SelectValueProps> = ({ children }) => {
	return (
		<span>
			{children}
		</span>
	);
};

const SelectContent: React.FC<SelectContentProps> = ({ isOpen, className, children }) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			{children}
		</div>
	);
};

const SelectItem: React.FC<SelectItemProps> = ({ value, children, onClick }) => {
	return (
		<button onClick={() => onClick(value)}>
			{children}
		</button>
	);
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
