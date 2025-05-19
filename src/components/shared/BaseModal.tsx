import React, { useRef, useEffect } from 'react';

// 自定义钩子，用于实现背景虚化和禁用除指定元素外的控件
const useBackdropBlurAndDisableOutside = (isOpen: boolean, onClose: () => void) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) {
				event.preventDefault();
				event.stopPropagation();
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('click', handleClickOutside, true);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [isOpen, onClose]);

	const backdrop = isOpen && (
		<div className="fixed inset-0 bg-black opacity-50 z-40 backdrop-blur-sm" />
	);

	return { modalRef, backdrop };
};

interface BaseModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, children }) => {
	const { modalRef, backdrop } = useBackdropBlurAndDisableOutside(isOpen, onClose);

	if (!isOpen) return null;

	return (
		<>
			{backdrop}
			<div
				ref={modalRef}
				className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#E0EBE0] p-6 rounded-lg shadow-xl z-50"
			>
				{children}
			</div>
		</>
	);
};

export default BaseModal;