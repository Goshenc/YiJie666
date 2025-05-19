import React, { forwardRef } from "react";

// 定义 PopoverTriggerProps 接口，包含 isOpen、togglePopover 和 children 属性
interface PopoverTriggerProps {
	isOpen: boolean;
	togglePopover: () => void;
	children: React.ReactNode; // 明确包含 children 属性，类型为 React.ReactNode
}

const PopoverTrigger = forwardRef<HTMLDivElement, PopoverTriggerProps>(
	({ isOpen, togglePopover, children }, ref) => {
		return (
			<div
				ref={ref}
				className="focus:outline-none"
				onClick={togglePopover}
			>
				{children}
			</div>
		);
	}
);

// 定义 PopoverContentProps 接口，包含 isOpen 和 children 属性
interface PopoverContentProps {
	isOpen: boolean;
	children: React.ReactNode; // 明确包含 children 属性，类型为 React.ReactNode
}

const PopoverContent: React.FC<PopoverContentProps> = ({ isOpen, children }) => {
	return (
		<div style={{ display: isOpen ? 'block' : 'none' }}>
			{children}
		</div>
	);
};

// 定义 Popover 组件的类型，这里可以根据实际情况进一步完善
interface PopoverProps {
	children: React.ReactNode; // 明确包含 children 属性，类型为 React.ReactNode
}

const Popover: React.FC<PopoverProps> = ({ children }) => {
	return <div>{children}</div>;
};

// 导出组件
export { Popover, PopoverTrigger, PopoverContent };