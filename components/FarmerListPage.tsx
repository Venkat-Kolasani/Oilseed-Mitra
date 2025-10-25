import React, { useState, useMemo } from 'react';
import { type Farmer } from '../types';

interface FarmerListPageProps {
    farmers: Farmer[];
}

const FarmerListPage: React.FC<FarmerListPageProps> = ({ farmers }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFarmers = useMemo(() => {
        if (!searchQuery) {
            return farmers;
        }
        return farmers.filter(farmer =>
            farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            farmer.phone.includes(searchQuery)
        );
    }, [farmers, searchQuery]);

    return (
        <div className="bg-white p-6 rounded-lg shadow animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Registered Farmers ({filteredFarmers.length})</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredFarmers.length > 0 ? (
                            filteredFarmers.map(farmer => (
                                <tr key={farmer.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{farmer.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farmer.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farmer.location}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">No farmers found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FarmerListPage;
