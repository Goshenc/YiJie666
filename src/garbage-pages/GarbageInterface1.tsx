import React, { useState, useEffect } from "react";
import { PageType } from "../types";
import SmartHomeButton from "../components/SmartHomeButton";

import "swiper/css";
import "swiper/css/pagination";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { faTv, faBox, faLightbulb, faWifi, faThermometerHalf } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // 引入返回箭头图标

import DeviceControl from "../components/device-controls/DeviceControl";
import TVModal from "../components/modals/TVModal";
import FridgeModal from "../components/modals/FridgeModal";
import LightModal from "../components/modals/LightModal";
import ThermostatModal from "../components/modals/ThermostatModal";

interface GarbageInterface1Props {
	setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
}

const GarbageInterface1: React.FC<GarbageInterface1Props> = ({ setCurrentPage }) => {
	const [isTVModalOpen, setIsTVModalOpen] = useState(false);
	const [isFridgeModalOpen, setIsFridgeModalOpen] = useState(false);
	const [isLightModalOpen, setIsLightModalOpen] = useState(false);
	const [isThermostatModalOpen, setIsThermostatModalOpen] = useState(false);
	const [showSmartHomeButton, setShowSmartHomeButton] = useState(() => {
		const stored = localStorage.getItem("showSmartHomeButton");
		return stored ? JSON.parse(stored) : false;
	});

	const [devices, setDevices] = useState<{
		[key: string]: boolean;
	}>(() => {
		const storedDevices = localStorage.getItem("devicesStatus");
		try {
			return storedDevices ? JSON.parse(storedDevices) : {
				TV: false,
				Fridge: false,
				Light: false,
				Wifi: false,
				Thermostat: false,
			};
		} catch (error) {
			console.error("Error parsing stored devices:", error);
			return {
				TV: false,
				Fridge: false,
				Light: false,
				Wifi: false,
				Thermostat: false,
			};
		}
	});

	useEffect(() => {
		localStorage.setItem("showSmartHomeButton", JSON.stringify(showSmartHomeButton));
	}, [showSmartHomeButton]);

	const toggleDevice = (deviceName: string, newValue?: boolean) => {
		const updatedDevices = {
			...devices,
			[deviceName]: newValue !== undefined ? newValue : !devices[deviceName]
		};
		setDevices(updatedDevices);
		try {
			localStorage.setItem("devicesStatus", JSON.stringify(updatedDevices));
		} catch (error) {
			console.error("Error saving devices:", error);
		}
	};

	const handleBackToYijie = () => {
		setCurrentPage('AIGenerate');
	};

	const handleSmartHomeClick = () => {
		setCurrentPage('home');
	};

	return (
		<div className="min-h-screen bg-[#f0f5f0] text-gray-800">
			<main className="flex-1 p-6">
				{/* 返回按钮 */}
				<div className="flex items-center justify-between mb-4">
					<button
						className="flex items-center text-gray-600 hover:text-gray-800"
						onClick={handleBackToYijie}
					>
						<i className="fa-solid fa-arrow-left mr-2"></i>
						返回翌界聊天界面
					</button>
					<SmartHomeButton setCurrentPage={setCurrentPage} />
				</div>
				<div className="grid grid-cols-5 mt-6">
					<div className="bg-[#c2dbc2] p-4 rounded-l-lg">
						<div className="text-base text-gray-700">电力</div>
						<div className="text-4xl font-bold mt-2">745<span className="text-sm text-gray-700 ml-2">度</span></div>
					</div>
					<div className="bg-[#c2dbc2] p-4">
						<div className="text-base text-gray-700">湿度</div>
						<div className="text-4xl font-bold mt-2">20.0<span className="text-sm text-gray-700 ml-2">相对值</span></div>
					</div>
					<div className="bg-[#c2dbc2] p-4">
						<div className="text-base text-gray-700">室内</div>
						<div className="text-4xl font-bold mt-2">15.3<span className="text-sm text-gray-700 ml-2">温度值</span></div>
					</div>
					<div className="bg-[#c2dbc2] p-4">
						<div className="text-base text-gray-700">水量</div>
						<div className="text-4xl font-bold mt-2">494<span className="text-sm text-gray-700 ml-2">立方米</span></div>
					</div>
					<div className="bg-[#c2dbc2] p-4 rounded-r-lg">
						<div className="text-base text-gray-700">网络</div>
						<div className="text-4xl font-bold mt-2">45.3<span className="text-sm text-gray-700 ml-2">MBPS</span></div>
					</div>
				</div>
				<div className="grid grid-cols-5 gap-2 mt-6">
					<DeviceControl
						icon={faTv}
						name="电视"
						isChecked={devices.TV}
						onToggle={() => toggleDevice("TV")}
						onClick={() => setIsTVModalOpen(true)}
						isDragging={false}
					/>
					<DeviceControl
						icon={faBox}
						name="冰箱"
						isChecked={devices.Fridge}
						onToggle={() => toggleDevice("Fridge")}
						onClick={() => setIsFridgeModalOpen(true)}
						isDragging={false}
					/>
					<DeviceControl
						icon={faLightbulb}
						name="灯光"
						isChecked={devices.Light}
						onToggle={() => toggleDevice("Light")}
						onClick={() => setIsLightModalOpen(true)}
						isDragging={false}
					/>
					<DeviceControl
						icon={faWifi}
						name="Wifi"
						isChecked={devices.Wifi}
						onToggle={() => toggleDevice("Wifi")}
						onClick={() => null}
						isDragging={false}
					/>
					<DeviceControl
						icon={faThermometerHalf}
						name="恒温器"
						isChecked={devices.Thermostat}
						onToggle={() => toggleDevice("Thermostat")}
						onClick={() => setIsThermostatModalOpen(true)}
						isDragging={false}
					/>
				</div>
				<TVModal
					isOpen={isTVModalOpen}
					onClose={() => setIsTVModalOpen(false)}
					toggleTV={() => toggleDevice("TV")}
				/>
				<FridgeModal
					isOpen={isFridgeModalOpen}
					onClose={() => setIsFridgeModalOpen(false)}
					toggleFridge={() => toggleDevice("Fridge")}
				/>
				<LightModal
					isOpen={isLightModalOpen}
					onClose={() => setIsLightModalOpen(false)}
					isLightOn={devices.Light}
					setIsLightOn={(value) => toggleDevice("Light", value)}
				/>
				<ThermostatModal
					isOpen={isThermostatModalOpen}
					onClose={() => setIsThermostatModalOpen(false)}
					isThermostatOn={devices.Thermostat}
					toggleThermostat={() => toggleDevice("Thermostat")}
				/>
			</main>
		</div>
	);
};

export default GarbageInterface1;