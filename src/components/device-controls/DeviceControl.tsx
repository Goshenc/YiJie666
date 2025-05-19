import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch } from '@/components/ui/switch';
import {
	DndContext,
	closestCenter,
	useSensor,
	useSensors,
	PointerSensor,
	TouchSensor,
} from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DeviceControlProps {
	icon: any;
	name: string;
	isChecked: boolean;
	onToggle: () => void;
	onClick: () => void;
	isDragging: boolean;
}

const DeviceControl = forwardRef<HTMLDivElement, DeviceControlProps>((props, ref) => {
	const switchRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(props.isDragging);
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				delay: 300, // 长按300ms触发拖拽
				tolerance: 5,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 300, // 长按300ms触发拖拽
				tolerance: 5,
			},
		})
	);

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id: props.name });

	const handleClick = (e: React.MouseEvent) => {
		if (switchRef.current && switchRef.current.contains(e.target as Node)) {
			// 点击在开关上，只切换状态
			props.onToggle();
		} else if (!isDragging) {
			// 点击在其他区域，打开对应遥控
			props.onClick();
		}
	};

	useEffect(() => {
		setIsDragging(props.isDragging);
	}, [props.isDragging]);

	return (
		<DndContext collisionDetection={closestCenter} sensors={sensors}>
			<SortableContext
				items={[props.name]}
				strategy={rectSortingStrategy}
			>
				<div
					ref={(node) => {
						setNodeRef(node);
						if (typeof ref === 'function') {
							ref(node);
						}
					}}
					onClick={handleClick}
					style={{
						transform: CSS.Transform.toString(transform),
						transition,
						cursor: 'grab',
						zIndex: isDragging ? 9999 : 1
					}}
					{...attributes}
					{...listeners}
					className="bg-[#c2dbc2] p-4 rounded-lg flex items-center justify-between cursor-pointer"
				>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-[#C2DBC2] flex items-center justify-center text-[#2D5A27]">
							<FontAwesomeIcon icon={props.icon} />
						</div>
						<div>
							<div className="font-medium">{props.name}</div>
							<div className="text-xs text-gray-500">
								{props.isChecked ? '已开启' : '已关闭'}
							</div>
						</div>
					</div>
					<div ref={switchRef}>
						<Switch
							checked={props.isChecked}
							onCheckedChange={props.onToggle}
						/>
					</div>
				</div>
			</SortableContext>
		</DndContext>
	);
});

export default DeviceControl;