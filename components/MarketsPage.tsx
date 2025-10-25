import React, { useState } from 'react';
import { mandiPricesData, fposData } from '../constants';

type Tab = 'mandis' | 'fpos';

const MarketsPage: React.FC = () => {
    const [tab, setTab] = useState<Tab>('mandis');

    const renderContent = () => {
        if (tab === 'mandis') {
            return mandiPricesData.length > 0 ? (
                <>
                    <p className="text-xs text-gray-500 text-center mb-4">Prices are indicative and updated daily.</p>
                    <ul className="divide-y divide-gray-200">
                        {mandiPricesData.map(item => (
                            <li key={item.id} className="py-4 flex justify-between items-center">
                                <div>
                                    <p className="text-md font-medium text-gray-900">{item.crop}</p>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                        <span>{item.market}</span>
                                        <span className="mx-1.5">&bull;</span>
                                        <span className={`font-medium ${item.date === 'Today' ? 'text-green-600' : 'text-gray-500'}`}>{item.date}</span>
                                    </div>
                                </div>
                                <p className="text-md font-semibold text-green-700">₹{item.price.toLocaleString('en-IN')}/Quintal</p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : <p className="text-gray-500 mt-4 text-center">No Mandi prices found.</p>;
        }

        if (tab === 'fpos') {
            return fposData.length > 0 ? (
                 <ul className="divide-y divide-gray-200">
                    {fposData.map(item => (
                        <li key={item.id} className="py-4">
                            <p className="text-md font-medium text-gray-900">{item.name}</p>
                            <div className="text-sm text-gray-600 mt-1 space-y-0.5">
                                <p><span className="font-medium text-gray-800">Specialization:</span> {item.specialization}</p>
                                <p><span className="font-medium text-gray-800">Location:</span> {item.location}</p>
                                <p><span className="font-medium text-gray-800">Contact:</span> <a href={`tel:${item.contact}`} className="text-green-600 hover:underline">{item.contact}</a></p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : <p className="text-gray-500 mt-4 text-center">No FPOs found.</p>;
        }
    };

    return (
        <div className="p-4 animate-fade-in bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Markets & FPOs</h1>
            <div className="mb-4 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setTab('mandis')} className={`${tab === 'mandis' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}>
                        Nearby Mandis
                    </button>
                    <button onClick={() => setTab('fpos')} className={`${tab === 'fpos' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}>
                        Find FPOs
                    </button>
                </nav>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                {renderContent()}
            </div>
        </div>
    );
};

export default MarketsPage;