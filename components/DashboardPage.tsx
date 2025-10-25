import React, { useState } from 'react';
import { cropData, calculateProfit } from '../constants';
import { type Page, type Crop } from '../types';
import { TrophyIcon } from './Icons';

interface DashboardPageProps {
  setPage: (page: Page) => void;
}

const ProfitCard: React.FC<{ crop: Crop, profit: number, isWinner: boolean }> = ({ crop, profit, isWinner }) => (
    <div className={`p-4 rounded-lg shadow-md text-center transition-all duration-300 ${isWinner ? 'bg-green-100 border-2 border-green-500 transform scale-105' : 'bg-white'}`}>
      {isWinner && (
        <div className="flex items-center justify-center text-yellow-500 mb-2">
          <TrophyIcon className="w-5 h-5 mr-1" />
          <span className="font-bold text-sm">PROFITABILITY CHAMPION</span>
        </div>
      )}
      <h3 className={`text-lg font-bold ${isWinner ? 'text-green-800' : 'text-gray-800'}`}>{crop.name}</h3>
      <p className="text-sm text-gray-500 mb-2">Projected Profit / Acre</p>
      <p className={`text-3xl font-bold ${isWinner ? 'text-green-700' : 'text-gray-700'}`}>
        ₹{profit.toLocaleString('en-IN')}
      </p>
    </div>
  );

const ProfitChart: React.FC<{ crop1Data: Crop, crop2Data: Crop }> = ({ crop1Data, crop2Data }) => {
    const revenue1 = crop1Data.yield * crop1Data.price;
    const profit1 = revenue1 - crop1Data.cost + crop1Data.subsidy;
    const revenue2 = crop2Data.yield * crop2Data.price;
    const profit2 = revenue2 - crop2Data.cost + crop2Data.subsidy;

    const allValues = [revenue1, crop1Data.cost, profit1, revenue2, crop2Data.cost, profit2];
    const maxValue = Math.max(...allValues.filter(v => v > 0));
    
    const getBarHeight = (value: number) => {
        if (maxValue === 0 || value < 0) return '0%';
        return `${(value / maxValue) * 100}%`;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow mt-8 animate-slide-up">
            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Financial Breakdown</h2>
            <div className="flex justify-center space-x-6 text-xs mb-4 text-gray-600">
                <span><span className="inline-block w-3 h-3 bg-green-500 mr-1 rounded-sm align-middle"></span>Revenue</span>
                <span><span className="inline-block w-3 h-3 bg-red-500 mr-1 rounded-sm align-middle"></span>Cost</span>
                <span><span className="inline-block w-3 h-3 bg-blue-500 mr-1 rounded-sm align-middle"></span>Net Profit</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-6 h-56 items-end">
                    {/* Crop 1 Bars */}
                    <div className="text-center">
                        <div className="flex justify-center items-end h-full space-x-3">
                            <div className="w-10 group" title={`Gross Revenue: ₹${revenue1.toLocaleString('en-IN')}`}>
                                <div className="bg-green-500 rounded-t-md transition-all duration-500 group-hover:brightness-110" style={{ height: getBarHeight(revenue1) }}></div>
                            </div>
                            <div className="w-10 group" title={`Total Cost: ₹${crop1Data.cost.toLocaleString('en-IN')}`}>
                                 <div className="bg-red-500 rounded-t-md transition-all duration-500 group-hover:brightness-110" style={{ height: getBarHeight(crop1Data.cost) }}></div>
                            </div>
                            <div className="w-10 group" title={`Net Profit: ₹${profit1.toLocaleString('en-IN')}`}>
                                 <div className="bg-blue-500 rounded-t-md transition-all duration-500 group-hover:brightness-110" style={{ height: getBarHeight(profit1) }}></div>
                            </div>
                        </div>
                        <p className="font-bold mt-2 text-gray-700 text-sm">{crop1Data.name}</p>
                    </div>
                    {/* Crop 2 Bars */}
                    <div className="text-center">
                        <div className="flex justify-center items-end h-full space-x-3">
                             <div className="w-10 group" title={`Gross Revenue: ₹${revenue2.toLocaleString('en-IN')}`}>
                                 <div className="bg-green-500 rounded-t-md transition-all duration-500 group-hover:brightness-110" style={{ height: getBarHeight(revenue2) }}></div>
                            </div>
                            <div className="w-10 group" title={`Total Cost: ₹${crop2Data.cost.toLocaleString('en-IN')}`}>
                                 <div className="bg-red-500 rounded-t-md transition-all duration-500 group-hover:brightness-110" style={{ height: getBarHeight(crop2Data.cost) }}></div>
                            </div>
                            <div className="w-10 group" title={`Net Profit: ₹${profit2.toLocaleString('en-IN')}`}>
                                 <div className="bg-blue-500 rounded-t-md transition-all duration-500 group-hover:brightness-110" style={{ height: getBarHeight(profit2) }}></div>
                            </div>
                        </div>
                        <p className="font-bold mt-2 text-gray-700 text-sm">{crop2Data.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


const DashboardPage: React.FC<DashboardPageProps> = ({ setPage }) => {
    const [crop1, setCrop1] = useState('Paddy');
    const [crop2, setCrop2] = useState('Sunflower');

    const cropOptions = Object.keys(cropData);
    const data1 = cropData[crop1];
    const data2 = cropData[crop2];
    const profit1 = calculateProfit(data1);
    const profit2 = calculateProfit(data2);
    
    const isProfit1Winner = profit1 >= profit2;

    // FIX: Explicitly type `metrics` as a union of string literals to prevent indexing errors.
    const metrics: ('cost' | 'yield' | 'price' | 'subsidy' | 'water')[] = ['cost', 'yield', 'price', 'subsidy', 'water'];
    const metricLabels: { [key: string]: string } = {
        cost: 'Avg. Cost (per Acre)',
        yield: 'Avg. Yield (Quintal/Acre)',
        price: 'MSP/Avg. Price (per Quintal)',
        subsidy: 'Govt. Subsidy (per Acre)',
        water: 'Water Requirement',
    };

    return (
        <div className="p-4 animate-fade-in bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Comparative Dashboard</h1>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label htmlFor="crop1" className="block text-sm font-medium text-gray-700">Crop 1</label>
                    <select id="crop1" value={crop1} onChange={(e) => setCrop1(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md shadow-sm">
                        {cropOptions.map(crop => <option key={crop} value={crop}>{crop}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="crop2" className="block text-sm font-medium text-gray-700">Crop 2</label>
                    <select id="crop2" value={crop2} onChange={(e) => setCrop2(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md shadow-sm">
                        {cropOptions.map(crop => <option key={crop} value={crop}>{crop}</option>)}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Metric</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">{data1.name}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">{data2.name}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {metrics.map((metric) => (
                            <tr key={metric} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{metricLabels[metric]}</td>
                                {/* FIX: Add type checking before calling toLocaleString to handle both number and string values. */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {typeof data1[metric] === 'number' 
                                        ? `${metric === 'cost' || metric === 'price' || metric === 'subsidy' ? '₹' : ''}${(data1[metric] as number).toLocaleString('en-IN')}` 
                                        : data1[metric]}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {typeof data2[metric] === 'number' 
                                        ? `${metric === 'cost' || metric === 'price' || metric === 'subsidy' ? '₹' : ''}${(data2[metric] as number).toLocaleString('en-IN')}` 
                                        : data2[metric]}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Financial Breakdown Chart */}
            <ProfitChart crop1Data={data1} crop2Data={data2} />

            {/* Profit Analysis Section */}
            <div className="mt-8 animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Profit Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfitCard crop={data1} profit={profit1} isWinner={isProfit1Winner} />
                <ProfitCard crop={data2} profit={profit2} isWinner={!isProfit1Winner} />
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="mt-8 text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
              <p className="text-gray-600 mb-4">Curious about your own farm? Dive deeper with our simulator.</p>
              <button
                onClick={() => setPage('simulate')}
                className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105"
              >
                Simulate Your Profitability
              </button>
            </div>

             <div className="mt-8 text-center text-sm text-gray-500">
                Promoting oilseed farming for a self-reliant India.
            </div>
        </div>
    );
};

export default DashboardPage;