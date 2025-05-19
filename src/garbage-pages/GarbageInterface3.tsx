"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSnowflake,
	faTv,
	faLightbulb,
	faBox
} from "@fortawesome/free-solid-svg-icons";
import DeviceControl from "@/components/device-controls/DeviceControl";
import TVModal from "../components/modals/TVModal";
import FridgeModal from "../components/modals/FridgeModal";
import LightModal from "../components/modals/LightModal";
import ThermostatModal from "../components/modals/ThermostatModal";
import {
	DndContext,
	closestCenter,
	useSensors,
	useSensor,
	PointerSensor,
	TouchSensor,
	DragStartEvent,
	DragEndEvent
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { PageType } from "../types";
import SmartHomeButton from "../components/SmartHomeButton";

interface GarbageInterface3Props {
	setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
}

const GarbageInterface3: React.FC<GarbageInterface3Props> = ({ setCurrentPage }) => {
	
	const storedDevices = localStorage.getItem("devicesStatus");
	const initialDevices = storedDevices
		? JSON.parse(storedDevices)
		: {
			恒温器: false,
			电视: false,
			灯光: false,
			冰箱: false
		};

	const [devices, setDevices] = useState(initialDevices);
	const storedOrder = localStorage.getItem("deviceOrder");
	const initialOrder = storedOrder
		? JSON.parse(storedOrder).filter((device: string) =>
			["恒温器", "电视", "灯光", "冰箱"].includes(device))
		: ["恒温器", "电视", "灯光", "冰箱"];
	const [deviceOrder, setDeviceOrder] = useState(initialOrder);

	const [isTVModalOpen, setIsTVModalOpen] = useState(false);
	const [isFridgeModalOpen, setIsFridgeModalOpen] = useState(false);
	const [isLightModalOpen, setIsLightModalOpen] = useState(false);
	const [isThermostatModalOpen, setIsThermostatModalOpen] = useState(false);

	const [draggingId, setDraggingId] = useState<string | null>(null);

	const [showSmartHomeButton, setShowSmartHomeButton] = useState(() => {
		const stored = localStorage.getItem("showSmartHomeButton");
		return stored ? JSON.parse(stored) : false;
	});

	const handleBackToYijie = () => {
		setCurrentPage('AIGenerate');
	};

	useEffect(() => {
		localStorage.setItem("devicesStatus", JSON.stringify(devices));
		localStorage.setItem("deviceOrder", JSON.stringify(deviceOrder));
		localStorage.setItem("showSmartHomeButton", JSON.stringify(showSmartHomeButton));
	}, [devices, deviceOrder, showSmartHomeButton]);

	const toggleDevice = (deviceName: string, newValue?: boolean) => {
		const updatedDevices = {
			...devices,
			[deviceName]: newValue !== undefined ? newValue : !devices[deviceName],
		};
		setDevices(updatedDevices);
		try {
			localStorage.setItem("devicesStatus", JSON.stringify(updatedDevices));
		} catch (error) {
			console.error("Error saving devices:", error);
		}
	};

	const handleDragStart = (event: DragStartEvent) => {
		setDraggingId(event.active.id.toString());
	};

	const handleDragEnd = (event: DragEndEvent) => {
		setDraggingId(null);
		const { active, over } = event;
		if (over && active.id !== over.id) {
			const oldIndex = deviceOrder.findIndex((device: string) => device === active.id.toString());
			const newIndex = over ? deviceOrder.findIndex((device: string) => device === over.id.toString()) : -1;
			if (newIndex !== -1) {
				const newOrder = arrayMove(deviceOrder, oldIndex, newIndex);
				setDeviceOrder(newOrder);
				localStorage.setItem("deviceOrder", JSON.stringify(newOrder));
			}
		}
	};

	const handleSmartHomeClick = () => {
		setCurrentPage('home');
	};

	return (
		<div className="min-h-screen bg-[#f0f5f0] text-gray-800">
			<div className="flex-1 p-8">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center">
						<h1 className="text-2xl font-bold">设备</h1>
						<button
							className="flex items-center text-gray-600 hover:text-gray-800 ml-4"
							onClick={handleBackToYijie}
						>
							<i className="fa-solid fa-arrow-left mr-2"></i>
							返回翌界聊天界面
						</button>
					</div>
					<SmartHomeButton setCurrentPage={setCurrentPage} />
				</div>
				<div className="grid grid-cols-4 gap-6 mt-6">
					<DndContext
						collisionDetection={closestCenter}
						onDragStart={handleDragStart}
						onDragEnd={handleDragEnd}
						sensors={useSensors(
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
						)}
					>
						<SortableContext
							items={deviceOrder}
							strategy={rectSortingStrategy}
						>
							{deviceOrder.map((deviceName: string, index: number) => {
								const deviceIcons: { [key: string]: any } = {
									恒温器: faSnowflake,
									电视: faTv,
									灯光: faLightbulb,
									冰箱: faBox
								};
								const icon = deviceIcons[deviceName];
								return (
									<DeviceControl
										key={deviceName}
										icon={icon}
										name={deviceName}
										isChecked={devices[deviceName]}
										onToggle={() => toggleDevice(deviceName)}
										onClick={() => {
											switch (deviceName) {
												case "电视":
													setIsTVModalOpen(true);
													break;
												case "冰箱":
													setIsFridgeModalOpen(true);
													break;
												case "灯光":
													setIsLightModalOpen(true);
													break;
												case "恒温器":
													setIsThermostatModalOpen(true);
													break;
												default:
													console.log(`Open ${deviceName} Modal`);
											}
										}}
										isDragging={draggingId === deviceName}
									/>
								);
							})}
						</SortableContext>
					</DndContext>
				</div>
			</div>
			<TVModal
				isOpen={isTVModalOpen}
				onClose={() => setIsTVModalOpen(false)}
				toggleTV={() => toggleDevice("电视")}
			/>
			<FridgeModal
				isOpen={isFridgeModalOpen}
				onClose={() => setIsFridgeModalOpen(false)}
				toggleFridge={() => toggleDevice("冰箱")}
			/>
			<LightModal
				isOpen={isLightModalOpen}
				onClose={() => setIsLightModalOpen(false)}
				isLightOn={devices.灯光}
				setIsLightOn={(value) => toggleDevice("灯光", value)}
			/>
			<ThermostatModal
				isOpen={isThermostatModalOpen}
				onClose={() => setIsThermostatModalOpen(false)}
				isThermostatOn={devices.恒温器}
				toggleThermostat={() => toggleDevice("恒温器")}
			/>
		</div>
	);
};

export default GarbageInterface3;
