import React, { useState } from 'react';
import { type User } from 'firebase/auth';
import { type Page, type UserRole } from '../types';
import HomePage from './HomePage';
import DashboardPage from './DashboardPage';
import SimulatePage from './SimulatePage';
import SchemesPage from './SchemesPage';
import MarketsPage from './MarketsPage';
import ProfilePage from './ProfilePage';
import OfficialDashboardPage from './OfficialDashboardPage';
import { HomeIcon, DashboardIcon, SimulateIcon, SchemesIcon, MarketsIcon, ProfileIcon } from './Icons';

interface MainAppProps {
  user: User;
  userRole: UserRole;
}

const MainApp: React.FC<MainAppProps> = ({ user, userRole }) => {
    const defaultPage: Page = userRole === 'official' ? 'official-dashboard' : 'home';
    const [page, setPage] = useState<Page>(defaultPage);

    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage setPage={setPage} />;
            case 'dashboard':
                return <DashboardPage setPage={setPage} />;
            case 'simulate':
                return <SimulatePage user={user} />;
            case 'schemes':
                return <SchemesPage />;
            case 'markets':
                return <MarketsPage />;
            case 'profile':
                return <ProfilePage user={user} />;
            case 'official-dashboard':
                return <OfficialDashboardPage user={user} />;
            default:
                return <HomePage setPage={setPage} />;
        }
    };

    const farmerNavItems = [
        { id: 'home', label: 'Home', icon: HomeIcon },
        { id: 'dashboard', label: 'Compare', icon: DashboardIcon },
        { id: 'simulate', label: 'Simulate', icon: SimulateIcon },
        { id: 'schemes', label: 'Schemes', icon: SchemesIcon },
        { id: 'markets', label: 'Markets', icon: MarketsIcon },
        { id: 'profile', label: 'Profile', icon: ProfileIcon },
    ];
    
    const officialNavItems = [
        { id: 'official-dashboard', label: 'Dashboard', icon: DashboardIcon },
        { id: 'profile', label: 'Profile', icon: ProfileIcon },
    ];

    // Official Layout: Sidebar on Desktop, Bottom Nav on Mobile
    if (userRole === 'official') {
        return (
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-xl font-bold text-green-700">Oilseed-Mitra</h2>
                    </div>
                    <nav className="flex-grow">
                        <ul>
                            {officialNavItems.map(item => (
                                <li key={item.id}>
                                    <a href="#" onClick={(e) => { e.preventDefault(); setPage(item.id as Page); }} className={`flex items-center px-6 py-4 text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors ${page === item.id ? 'bg-green-100 text-green-800 font-semibold border-r-4 border-green-500' : ''}`}>
                                        <item.icon className="h-6 w-6 mr-3" />
                                        <span>{item.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <main className="flex-1 overflow-y-auto">
                    {renderPage()}
                </main>
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-t-lg border-t border-gray-200 flex justify-around z-20">
                    {officialNavItems.map(item => (
                        <a href="#" key={item.id} onClick={(e) => { e.preventDefault(); setPage(item.id as Page); }} className={`flex flex-col items-center justify-center w-full py-2 ${page === item.id ? 'text-green-600' : 'text-gray-500'}`}>
                            <item.icon className="h-6 w-6" />
                            <span className="text-xs">{item.label}</span>
                        </a>
                    ))}
                </nav>
                <div className="md:hidden h-16"></div> 
            </div>
        );
    }

    // Farmer Layout: Bottom Nav on ALL screen sizes
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <main className="flex-1 overflow-y-auto pb-16">
                {renderPage()}
            </main>
            <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-t-lg border-t border-gray-200 flex justify-around z-20">
                {farmerNavItems.map(item => (
                    <a href="#" key={item.id} onClick={(e) => { e.preventDefault(); setPage(item.id as Page); }} className={`flex flex-col items-center justify-center w-full py-2 transition-colors duration-200 ${page === item.id ? 'text-green-600' : 'text-gray-500 hover:text-green-500'}`}>
                        <item.icon className="h-6 w-6" />
                        <span className="text-xs mt-1">{item.label}</span>
                    </a>
                ))}
            </nav>
        </div>
    );
};

export default MainApp;