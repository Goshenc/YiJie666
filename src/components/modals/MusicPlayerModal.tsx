import React, { useState } from 'react';
import BaseModal from '../shared/BaseModal'; // 根据实际路径调整
import Button from "@/components/ui/button";
import Slider from "@/components/ui/slider";

// 定义 MusicPlayerModal 组件的 props 类型
interface MusicPlayerModalProps {
	showMusicDialog: boolean;
	setShowMusicDialog: (value: boolean) => void;
	isSpeakerOn: boolean;
	toggleSpeaker: () => void;
}

const MusicPlayerModal: React.FC<MusicPlayerModalProps> = ({
	showMusicDialog,
	setShowMusicDialog,
	isSpeakerOn,
	toggleSpeaker
}) => {
	const [currentSpeed, setCurrentSpeed] = useState('1x');
	const [currentQuality, setCurrentQuality] = useState('标准');
	const [volume, setVolume] = useState([24]);
	const [showPlaylist, setShowPlaylist] = useState(false);
	const [currentSong, setCurrentSong] = useState('月光 - 陈宏达');
	const playlist = [
		'月光 - 陈宏达',
		'漫步人生路 - 邓丽君',
		'逆光 - 孙燕姿',
		'城里的月光 - 许美静',
		'海阔天空 - Beyond',
		'后来 - 刘若英',
		'但愿人长久 - 王菲',
		'恋曲1990 - 罗大佑'
	];

	const handlePrevSong = () => {
		const currentIndex = playlist.indexOf(currentSong);
		const newIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;
		setCurrentSong(playlist[newIndex]);
	};

	const handleNextSong = () => {
		const currentIndex = playlist.indexOf(currentSong);
		const newIndex = currentIndex < playlist.length - 1 ? currentIndex + 1 : 0;
		setCurrentSong(playlist[newIndex]);
	};

	return (
		<BaseModal isOpen={showMusicDialog} onClose={() => setShowMusicDialog(false)}>
			<div className="bg-[#E0EBE0] p-6 max-w-md mx-auto">
				<h2 className="text-[#1F2937] text-xl font-semibold mb-4">智能音响控制面板</h2>
				<div className="space-y-6">
					{/* 显示屏 */}
					<div className="bg-[#1F2937] rounded-lg p-6">
						<div className="text-white">
							{showPlaylist ? (
								<div className="space-y-4">
									<div className="text-lg font-semibold mb-4">播放列表</div>
									<div className="space-y-2">
										{playlist.map((song, index) => (
											<div
												key={index}
												className={`p-3 rounded-lg cursor-pointer hover:bg-gray-700 flex items-center justify-between ${currentSong === song ? 'bg-gray-700' : ''}`}
												onClick={() => {
													setCurrentSong(song);
													setShowPlaylist(false);
												}}
											>
												<span>{song}</span>
												{currentSong === song && (
													<i className="fas fa-volume-up text-green-400"></i>
												)}
											</div>
										))}
									</div>
								</div>
							) : (
								<div className="text-center space-y-4">
									<div className="text-2xl font-bold">{currentSong}</div>
									<div className="flex justify-center items-center space-x-8">
										<button onClick={handlePrevSong}>
											<i className="fas fa-backward text-xl"></i>
										</button>
										<button onClick={() => toggleSpeaker()}>
											<i className={`fas ${isSpeakerOn ? 'fa-pause' : 'fa-play'} text-2xl`}></i>
										</button>
										<button onClick={handleNextSong}>
											<i className="fas fa-forward text-xl"></i>
										</button>
									</div>
									<div className="text-sm space-x-4">
										<span>{currentSpeed}</span>
										<span>·</span>
										<span>{currentQuality}</span>
									</div>
								</div>
							)}
						</div>
					</div>
					{/* 开关按钮 */}
					<Button
						variant="ghost"
						className="w-full py-6 bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] text-xl font-bold!rounded-button"
						onClick={toggleSpeaker}
					>
						<i className={`fas fa-power-off mr-3`}></i>
						{isSpeakerOn ? '关闭' : '开启'}
					</Button>
					{/* 音量控制 */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<i className="fas fa-volume-up text-[#2D5A27] text-xl mr-3"></i>
								<span className="text-[#2D5A27] text-lg">音量</span>
							</div>
							<span className="text-[#2D5A27] text-lg">{volume[0]}%</span>
						</div>
						<Slider
							value={volume}
							onValueChange={setVolume}
							max={100}
							min={0}
							step={1}
							className="w-full h-3"
						/>
					</div>
					{/* 倍速和音质控制 */}
					<div className="grid grid-cols-2 gap-4">
						<Button
							variant="ghost"
							className="bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2]!rounded-button py-4"
							onClick={() => {
								const speeds = ['0.5x', '1x', '2x'];
								const currentIndex = speeds.indexOf(currentSpeed);
								const nextIndex = (currentIndex + 1) % speeds.length;
								setCurrentSpeed(speeds[nextIndex]);
							}}
						>
							<i className="fas fa-tachometer-alt mr-2"></i>
							{currentSpeed}
						</Button>
						<Button
							variant="ghost"
							className="bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2]!rounded-button py-4"
							onClick={() => {
								const qualities = ['标准', '无损', '臻品'];
								const currentIndex = qualities.indexOf(currentQuality);
								const nextIndex = (currentIndex + 1) % qualities.length;
								setCurrentQuality(qualities[nextIndex]);
							}}
						>
							<i className="fas fa-music mr-2"></i>
							{currentQuality}
						</Button>
					</div>
					{/* 返回歌单按钮 */}
					<Button
						variant="ghost"
						className="w-full py-6 bg-[#C2DBC2] text-[#2D5A27] hover:bg-[#B2CBB2] text-xl font-bold!rounded-button"
						onClick={() => setShowPlaylist(true)}
					>
						<i className="fas fa-list-ul mr-3"></i>
						返回歌单
					</Button>
				</div>
			</div>
		</BaseModal>
	);
};

export default MusicPlayerModal;