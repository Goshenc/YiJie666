import React, { useState } from 'react';
import MyHomePage from './garbage-pages/MyHomePage';
import DevicePage from './garbage-pages/DevicePage';
import LoginPage from './pages/LoginPage';
import AnalysisPage from './garbage-pages/AnalysisPage';
import GarbageHeader1 from "./garbage-components/shared/GarbageHeader1";
import GarbageSidebar2 from "./garbage-components/shared/GarbageSidebar2";
import Sidebar from './garbage-components/shared/Sidebar';
import Header from './garbage-components/shared/Header';
import YijieMainPage from './garbage-pages/YijieMainPageGarbage';
import GarbageInterface1 from './garbage-pages/GarbageInterface1';
import GarbageInterface2 from './garbage-pages/GarbageInterface2';
import GarbageInterface3 from './garbage-pages/GarbageInterface3';
import AIGenerate from './garbage-pages/AIGenerate';
import { PageType } from './types';

const AppGarbage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<PageType>('yijie');

    const shouldShowSidebarAndHeader = ['home', 'devices', 'analysis'].includes(currentPage);

    const getHeaderComponent = () => {
        if (currentPage === 'home0' || currentPage === 'garbage3') {
            return <GarbageHeader1 currentPage={currentPage} setCurrentPage={setCurrentPage} />;
        }
        return shouldShowSidebarAndHeader && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />;
    };

    const getSidebarComponent = () => {
        if (currentPage === 'home0' || currentPage === 'garbage3') {
            return <GarbageSidebar2 currentPage={currentPage} setCurrentPage={setCurrentPage} />;
        }
        return shouldShowSidebarAndHeader && <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />;
    };

    return (
        <div className="min-h-screen bg-[#f0f5f0] text-gray-800">
            <div className="min-h-screen">
                {getHeaderComponent()}
                <div className="flex">
                    {getSidebarComponent()}
                    <main className="flex-1">
                        {currentPage === 'home0' && <MyHomePage />}
                        {currentPage === 'home' && <MyHomePage />}
                        {currentPage === 'devices' && <DevicePage />}
                        {currentPage === 'login' && <LoginPage setCurrentPage={setCurrentPage} />}
                        {currentPage === 'analysis' && <AnalysisPage setCurrentPage={setCurrentPage} />}
                        {currentPage === 'yijie' && <YijieMainPage setCurrentPage={setCurrentPage} />}
                        {currentPage === 'garbage1' && <GarbageInterface1 setCurrentPage={setCurrentPage} />}
                        {currentPage === 'garbage2' && <GarbageInterface2 setCurrentPage={setCurrentPage} />}
                        {currentPage === 'garbage3' && <GarbageInterface3 setCurrentPage={setCurrentPage} />}
                        {currentPage === 'AIGenerate' && <AIGenerate setCurrentPage={setCurrentPage} />}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AppGarbage;
