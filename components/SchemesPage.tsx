import React, { useState } from 'react';
import { schemesData } from '../constants';
import { type Scheme } from '../types';

const SchemeCard: React.FC<{ scheme: Scheme, onSelect: () => void }> = ({ scheme, onSelect }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={onSelect}>
        <h3 className="text-xl font-bold text-green-700 mb-2">{scheme.name}</h3>
        <p className="text-gray-600 text-sm">{scheme.shortDescription}</p>
    </div>
);

const SchemeDetail: React.FC<{ scheme: Scheme, onBack: () => void }> = ({ scheme, onBack }) => (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
        <button onClick={onBack} className="text-green-600 hover:underline mb-4 text-sm">&larr; Back to all schemes</button>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{scheme.name}</h2>
        <p className="text-gray-600 mb-4">{scheme.description}</p>
        
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-700">Benefits:</h4>
                <ul className="list-disc list-inside text-gray-600 pl-4">
                    {scheme.benefits.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">Eligibility:</h4>
                <ul className="list-disc list-inside text-gray-600 pl-4">
                    {scheme.eligibility.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">How to Apply:</h4>
                 <ul className="list-disc list-inside text-gray-600 pl-4">
                    {scheme.howToApply.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
        </div>
        <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-150">
            Visit Official Website
        </a>
    </div>
);


const SchemesPage: React.FC = () => {
    const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

    if (selectedScheme) {
        return (
            <div className="p-4 animate-fade-in bg-gray-50 min-h-screen">
                <SchemeDetail scheme={selectedScheme} onBack={() => setSelectedScheme(null)} />
            </div>
        )
    }

    return (
        <div className="p-4 animate-fade-in bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Government Schemes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schemesData.map(scheme => (
                    <SchemeCard key={scheme.id} scheme={scheme} onSelect={() => setSelectedScheme(scheme)} />
                ))}
            </div>
        </div>
    );
};

export default SchemesPage;
