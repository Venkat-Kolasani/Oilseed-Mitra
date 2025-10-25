import React from 'react';
import { DashboardIcon, SchemesIcon, MarketsIcon, SimulateIcon } from './Icons';

interface FeatureCardProps {
    Icon: React.ElementType;
    title: string;
    description: string;
    onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, description, onClick }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer h-full" onClick={onClick}>
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <Icon className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);


const HomePage: React.FC<{ setPage: (page: any) => void }> = ({ setPage }) => {

    const features = [
        {
            Icon: DashboardIcon,
            title: 'Comparative Analysis',
            description: 'Compare oilseeds against other crops to see the real profit potential.',
            page: 'dashboard'
        },
        {
            Icon: SimulateIcon,
            title: 'Profit Simulator',
            description: 'Predict your earnings and make smarter planting choices.',
            page: 'simulate'
        },
        {
            Icon: SchemesIcon,
            title: 'Government Schemes',
            description: 'Easily discover and apply for beneficial government support.',
            page: 'schemes'
        },
        {
            Icon: MarketsIcon,
            title: 'Market Insights',
            description: 'Access real-time Mandi prices and FPO connections.',
            page: 'markets'
        },
    ];


    return (
        <div className="animate-fade-in bg-gray-50">
            {/* Hero Section */}
            <div className="relative text-white text-center py-24 px-4 flex items-center justify-center min-h-[50vh]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                <div className="relative">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-slide-up" style={{ animationDelay: '100ms' }}>Welcome to Oilseed-Mitra</h1>
                    <p className="text-lg md:text-xl mb-6 animate-slide-up" style={{ animationDelay: '200ms' }}>Empowering Your Harvest. Securing Your Future.</p>
                    <button onClick={() => setPage('dashboard')} className="bg-white text-green-700 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300 shadow-lg animate-slide-up" style={{ animationDelay: '300ms' }}>
                        Compare Crops Now
                    </button>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Oilseed-Mitra?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                             <div key={index} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up">
                                <FeatureCard
                                    Icon={feature.Icon}
                                    title={feature.title}
                                    description={feature.description}
                                    onClick={() => setPage(feature.page)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Mission Section */}
             <div className="py-16 bg-white px-4 text-center">
                 <div className="max-w-4xl mx-auto">
                    <h3 className="text-3xl font-bold text-gray-800">Our Mission</h3>
                    <p className="text-gray-600 mt-4 text-lg">
                        To empower Indian farmers by providing data-driven insights and tools that make oilseed cultivation more profitable and sustainable. We aim to reduce our nation's reliance on edible oil imports by helping you make informed decisions, one harvest at a time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;