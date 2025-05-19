import React, { useEffect } from 'react';

interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && open) {
				onOpenChange(false);
			}
		};

		if (open) {
			document.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [open, onOpenChange]);

	if (!open) {
		return null;
	}

	return (
		<div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50" onClick={() => onOpenChange(false)}>
			<div className="bg-white rounded-lg p-6 relative" onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

interface DialogContentProps {
	className?: string;
	children: React.ReactNode;
}

const DialogContent: React.FC<DialogContentProps> = ({ className, children }) => {
	return (
		<div className={`${className}`}>
			{children}
		</div>
	);
};

export { Dialog, DialogContent };
