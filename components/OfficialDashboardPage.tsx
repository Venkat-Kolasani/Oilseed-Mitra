import React, { useState } from 'react';
import { type User } from 'firebase/auth';
import { ChartPieIcon, UsersIcon, MegaphoneIcon, UserAddIcon, LocationMarkerIcon } from './Icons';
import { schemesData, cropData } from '../constants';
import { type Farmer } from '../types';
import FarmerListPage from './FarmerListPage';

const mockFarmers: Farmer[] = [
    { id: 'farmer-1', name: 'Rajesh Kumar', phone: '+919876543210', location: 'Alwar, Rajasthan' },
    { id: 'farmer-2', name: 'Suresh Patel', phone: '+919876543211', location: 'Rajkot, Gujarat' },
    { id: 'farmer-3', name: 'Meena Singh', phone: '+919876543212', location: 'Indore, MP' },
    { id: 'farmer-4', name: 'Amit Verma', phone: '+919876543213', location: 'Karnal, Haryana' },
    { id: 'farmer-5', name: 'Priya Sharma', phone: '+919876543214', location: 'Ludhiana, Punjab' },
    { id: 'farmer-6', name: 'Vijay Singh', phone: '+919876543215', location: 'Jaipur, Rajasthan' },
    { id: 'farmer-7', name: 'Anita Devi', phone: '+919876543216', location: 'Patna, Bihar' },
    { id: 'farmer-8', name: 'Ramesh Yadav', phone: '+919876543217', location: 'Lucknow, UP' },
    { id: 'farmer-9', name: 'Sunita Kumari', phone: '+919876543218', location: 'Bhopal, MP' },
    { id: 'farmer-10', name: 'Arjun Reddy', phone: '+919876543219', location: 'Hyderabad, Telangana' },
    { id: 'farmer-11', name: 'Kavita Patil', phone: '+919876543220', location: 'Pune, Maharashtra' },
    { id: 'farmer-12', name: 'Manoj Sharma', phone: '+919876543221', location: 'Agra, UP' },
    { id: 'farmer-13', name: 'Geeta Biswas', phone: '+919876543222', location: 'Kolkata, West Bengal' },
    { id: 'farmer-14', name: 'Sanjay Das', phone: '+919876543223', location: 'Guwahati, Assam' },
    { id: 'farmer-15', name: 'Pooja Mehta', phone: '+919876543224', location: 'Ahmedabad, Gujarat' },
    { id: 'farmer-16', name: 'Vikram Rathore', phone: '+919876543225', location: 'Udaipur, Rajasthan' },
    { id: 'farmer-17', name: 'Deepa Iyer', phone: '+919876543226', location: 'Chennai, Tamil Nadu' },
    { id: 'farmer-18', name: 'Imran Khan', phone: '+919876543227', location: 'Srinagar, J&K' },
    { id: 'farmer-19', name: 'Balaji Rao', phone: '+919876543228', location: 'Bengaluru, Karnataka' },
    { id: 'farmer-20', name: 'Nisha Gupta', phone: '+919876543229', location: 'Chandigarh, Punjab' },
    { id: 'farmer-21', name: 'Kiran Desai', phone: '+919876543230', location: 'Mumbai, Maharashtra' },
    { id: 'farmer-22', name: 'Anil Kumar', phone: '+919876543231', location: 'Ranchi, Jharkhand' },
    { id: 'farmer-23', name: 'Sarita Joshi', phone: '+919876543232', location: 'Dehradun, Uttarakhand' },
    { id: 'farmer-24', name: 'Rajendra Prasad', phone: '+919876543233', location: 'Bhubaneswar, Odisha' },
    { id: 'farmer-25', name: 'Lalita Pawar', phone: '+919876543234', location: 'Nagpur, Maharashtra' },
    { id: 'farmer-26', name: 'Ravi Teja', phone: '+919876543235', location: 'Visakhapatnam, Andhra Pradesh' },
    { id: 'farmer-27', name: 'Sunil Gavaskar', phone: '+919876543236', location: 'Bhubaneswar, Odisha' },
    { id: 'farmer-28', name: 'Alia Bhatt', phone: '+919876543237', location: 'Raipur, Chhattisgarh' },
    { id: 'farmer-29', name: 'Mahesh Babu', phone: '+919876543238', location: 'Tirupati, Andhra Pradesh' },
    { id: 'farmer-30', name: 'Shreya Ghoshal', phone: '+919876543239', location: 'Murshidabad, West Bengal' },
    { id: 'farmer-31', name: 'Harish Chandra', phone: '+919876543240', location: 'Kanpur, UP' },
    { id: 'farmer-32', name: 'Deepika Padukone', phone: '+919876543241', location: 'Mangalore, Karnataka' },
    { id: 'farmer-33', name: 'Virat Kohli', phone: '+919876543242', location: 'Delhi' },
    { id: 'farmer-34', name: 'Priyanka Chopra', phone: '+919876543243', location: 'Jamshedpur, Jharkhand' },
    { id: 'farmer-35', name: 'Amitabh Bachchan', phone: '+919876543244', location: 'Allahabad, UP' },
    { id: 'farmer-36', name: 'Kareena Kapoor', phone: '+919876543245', location: 'Indore, MP' },
    { id: 'farmer-37', name: 'Sachin Tendulkar', phone: '+919876543246', location: 'Mumbai, Maharashtra' },
    { id: 'farmer-38', name: 'Aishwarya Rai', phone: '+919876543247', location: 'Mangalore, Karnataka' },
    { id: 'farmer-39', name: 'Shah Rukh Khan', phone: '+919876543248', location: 'New Delhi' },
    { id: 'farmer-40', name: 'Salman Khan', phone: '+919876543249', location: 'Indore, MP' },
    { id: 'farmer-41', name: 'Hrithik Roshan', phone: '+919876543250', location: 'Mumbai, Maharashtra' },
    { id: 'farmer-42', name: 'Katrina Kaif', phone: '+919876543251', location: 'Jaipur, Rajasthan' },
    { id: 'farmer-43', name: 'Akshay Kumar', phone: '+919876543252', location: 'Amritsar, Punjab' },
    { id: 'farmer-44', name: 'Ranbir Kapoor', phone: '+919876543253', location: 'Mumbai, Maharashtra' },
    { id: 'farmer-45', name: 'Anushka Sharma', phone: '+919876543254', location: 'Ayodhya, UP' },
];

const StatCard: React.FC<{ title: string; value: string | number; description: string }> = ({ title, value, description }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
);

const TabButton: React.FC<{ Icon: React.ElementType; label: string; isActive: boolean; onClick: () => void; }> = ({ Icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-green-600 text-white shadow' : 'text-gray-600 hover:bg-green-100'}`}>
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
    </button>
);

// New visualization components
const cropAdoptionData = [
    { year: 2022, mustard: 320, soybean: 210, paddy: 450, wheat: 500 },
    { year: 2023, mustard: 380, soybean: 290, paddy: 400, wheat: 480 },
    { year: 2024, mustard: 450, soybean: 350, paddy: 350, wheat: 450 },
];

const farmerLocations = [
    { name: 'Rajasthan', count: 250, pos: { top: '35%', left: '23%' } },
    { name: 'Madhya Pradesh', count: 310, pos: { top: '48%', left: '35%' } },
    { name: 'Maharashtra', count: 180, pos: { top: '60%', left: '28%' } },
    { name: 'Uttar Pradesh', count: 420, pos: { top: '38%', left: '45%' } },
    { name: 'Punjab', count: 90, pos: { top: '22%', left: '30%' } },
];

const FarmerLocationMap = () => (
    <div className="bg-white p-6 rounded-lg shadow h-full">
        <h2 className="text-xl font-semibold text-gray-800">Farmer Locations</h2>
        <p className="text-sm text-gray-500 mb-4">Geographical distribution of registered farmers.</p>
        <div className="relative w-full aspect-square bg-green-50 rounded-lg border">
            <svg viewBox="0 0 500 500" className="absolute w-full h-full text-green-200" fill="currentColor">
                {/* Simplified India Map SVG Path */}
                <path d="M250 20 L271 25 L350 70 L405 100 L430 150 L420 200 L440 250 L400 300 L350 340 L370 400 L320 450 L250 480 L180 450 L130 400 L150 340 L100 300 L60 250 L80 200 L70 150 L95 100 L150 70 L229 25 Z" />
            </svg>
            {farmerLocations.map(loc => (
                <div key={loc.name} className="absolute group" style={{ top: loc.pos.top, left: loc.pos.left, transform: 'translate(-50%, -50%)' }}>
                    <LocationMarkerIcon className="w-8 h-8 text-green-700 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 cursor-pointer" />
                    <div className="absolute bottom-full mb-2 w-max p-2 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2 left-1/2 z-10 pointer-events-none">
                        {loc.name}: {loc.count} farmers
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const CropAdoptionChart = () => {
    const totalByYear = cropAdoptionData.map(d => d.mustard + d.soybean + d.paddy + d.wheat);
    const maxTotal = Math.max(...totalByYear);
    const colors = { mustard: 'bg-yellow-500', soybean: 'bg-green-500', paddy: 'bg-blue-500', wheat: 'bg-orange-500' };

    return (
        <div className="bg-white p-6 rounded-lg shadow h-full">
            <h2 className="text-xl font-semibold text-gray-800">Crop Adoption Over Time</h2>
            <p className="text-sm text-gray-500 mb-4">Yearly cultivation trends within the community.</p>
             <div className="flex justify-around items-end h-80 p-4 bg-gray-50 rounded-lg border">
                {cropAdoptionData.map((data) => (
                    <div key={data.year} className="flex flex-col items-center w-1/4 h-full">
                        <div className="w-16 h-full flex flex-col-reverse rounded-t-md overflow-hidden">
                            {Object.keys(colors).map(crop => (
                                <div
                                    key={crop}
                                    className={`${colors[crop as keyof typeof colors]} transition-all duration-300`}
                                    style={{ height: `${((data[crop as keyof typeof data] as number) / maxTotal) * 100}%` }}
                                    title={`${crop.charAt(0).toUpperCase() + crop.slice(1)}: ${data[crop as keyof typeof data]}`}
                                ></div>
                            ))}
                        </div>
                        <span className="mt-2 text-sm font-medium text-gray-600">{data.year}</span>
                    </div>
                ))}
            </div>
             <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-sm">
                    {Object.keys(colors).map(crop => (
                        <div key={crop} className="flex items-center justify-center sm:justify-start">
                            <span className={`w-3.5 h-3.5 ${colors[crop as keyof typeof colors]} rounded-sm mr-2 border border-gray-300`}></span>
                            <span className="text-gray-700">{crop.charAt(0).toUpperCase() + crop.slice(1)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const OfficialDashboardPage: React.FC<{ user: User }> = ({ user }) => {
    const [activeTab, setActiveTab] = useState('analytics');
    const [farmers, setFarmers] = useState<Farmer[]>(mockFarmers);
    const [showOnboardForm, setShowOnboardForm] = useState(false);
    const [newFarmer, setNewFarmer] = useState({ name: '', phone: '', location: '' });
    const [announcements, setAnnouncements] = useState<string[]>(["Market prices for mustard are expected to rise next week.", "Last date for PMFBY enrollment is approaching."]);
    const [newAnnouncement, setNewAnnouncement] = useState('');

    const handleOnboardFarmer = (e: React.FormEvent) => {
        e.preventDefault();
        const newFarmerData: Farmer = { id: `farmer-${Date.now()}`, ...newFarmer };
        setFarmers([newFarmerData, ...farmers]);
        setNewFarmer({ name: '', phone: '', location: '' });
        setShowOnboardForm(false);
    };
    
    const handleSendAnnouncement = () => {
        if(newAnnouncement.trim()) {
            setAnnouncements([newAnnouncement, ...announcements]);
            setNewAnnouncement('');
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'analytics':
                return <AnalyticsTab />;
            case 'farmers':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-end">
                            <button onClick={() => setShowOnboardForm(true)} className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                <UserAddIcon className="w-5 h-5" />
                                <span>Onboard New Farmer</span>
                            </button>
                        </div>
                        {showOnboardForm && (
                            <form onSubmit={handleOnboardFarmer} className="bg-white p-6 rounded-lg shadow animate-fade-in space-y-4">
                                <h3 className="text-lg font-semibold">New Farmer Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input type="text" placeholder="Full Name" value={newFarmer.name} onChange={(e) => setNewFarmer({...newFarmer, name: e.target.value})} className="p-2 border rounded" required />
                                    <input type="tel" placeholder="Phone Number" value={newFarmer.phone} onChange={(e) => setNewFarmer({...newFarmer, phone: e.target.value})} className="p-2 border rounded" required />
                                    <input type="text" placeholder="Location (e.g., Village, District)" value={newFarmer.location} onChange={(e) => setNewFarmer({...newFarmer, location: e.target.value})} className="p-2 border rounded" required />
                                </div>
                                <div className="flex gap-4">
                                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">Add Farmer</button>
                                    <button type="button" onClick={() => setShowOnboardForm(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Cancel</button>
                                </div>
                            </form>
                        )}
                        <FarmerListPage farmers={farmers} />
                    </div>
                );
            case 'announcements':
                return (
                    <div className="bg-white p-6 rounded-lg shadow">
                         <h2 className="text-xl font-semibold text-gray-800 mb-4">Broadcast Announcement</h2>
                         <div className="flex flex-col sm:flex-row gap-2 mb-6">
                             <textarea value={newAnnouncement} onChange={(e) => setNewAnnouncement(e.target.value)} placeholder="Type your message here..." className="flex-grow p-2 border rounded-lg focus:ring-green-500 focus:border-green-500"></textarea>
                             <button onClick={handleSendAnnouncement} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Send</button>
                         </div>
                         <h3 className="text-lg font-semibold text-gray-700 mb-2">Sent Announcements</h3>
                         <ul className="space-y-3 list-disc list-inside text-gray-600">
                             {announcements.map((ann, i) => <li key={i}>{ann}</li>)}
                         </ul>
                    </div>
                );
            default: return null;
        }
    };
    
    return (
        <div className="p-4 md:p-8 animate-fade-in bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Community Portal</h1>
            <p className="text-gray-600 mb-6">Welcome, {user.displayName || 'Official'}. Manage your community here.</p>
            <div className="flex space-x-2 md:space-x-4 mb-6 border-b pb-2">
                <TabButton Icon={ChartPieIcon} label="Analytics" isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
                <TabButton Icon={UsersIcon} label="Farmer Management" isActive={activeTab === 'farmers'} onClick={() => setActiveTab('farmers')} />
                <TabButton Icon={MegaphoneIcon} label="Announcements" isActive={activeTab === 'announcements'} onClick={() => setActiveTab('announcements')} />
            </div>
            <div>{renderContent()}</div>
        </div>
    );
};

const AnalyticsTab = () => (
    <div className="space-y-8 animate-fade-in">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Registered Farmers" value="1,250" description="Total users in region" />
            <StatCard title="Simulations Run" value="5,678" description="Most popular: Mustard" />
            <StatCard title="Top Viewed Scheme" value="PM-KISAN" description="2,450 views" />
            <StatCard title="Announcements Sent" value="12" description="This month" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CropAdoptionChart />
            <FarmerLocationMap />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-800">Crop Simulation Trends</h2>
                <p className="text-sm text-gray-500 mb-4">Most frequently simulated crops by farmers.</p>
                <div className="space-y-4">
                     {['Mustard', 'Soybean', 'Sunflower', 'Paddy', 'Groundnut'].map((crop, index) => (
                        <li key={crop} className="list-none">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-700">{crop}</span>
                                <span className="text-sm font-medium text-gray-500">{[45, 30, 15, 8, 2][index]}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${[45, 30, 15, 8, 2][index]}%` }}></div>
                            </div>
                        </li>
                    ))}
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-800">Scheme Interest Distribution</h2>
                <p className="text-sm text-gray-500 mb-4">Most viewed schemes on the platform.</p>
                <ul className="space-y-2">
                    {schemesData.slice(0, 5).map(scheme => (
                         <li key={scheme.id} className="flex justify-between p-2 rounded-md hover:bg-gray-50">
                             <span className="text-gray-700 text-sm">{scheme.name}</span>
                             <span className="font-semibold text-green-700 text-sm">{Math.floor(Math.random() * 1000) + 200} views</span>
                         </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

export default OfficialDashboardPage;