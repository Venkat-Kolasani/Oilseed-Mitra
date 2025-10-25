import React, { useState, useEffect } from 'react';
import { cropData } from '../constants';
import { updateGamificationPoints } from '../services/firebase';
import { type Crop, type SimulatePageProps } from '../types';

interface Result {
    totalProfit: number;
    profitRangeLow: number;
    profitRangeHigh: number;
}

const SimulatePage: React.FC<SimulatePageProps> = ({ user }) => {
    const [selectedCrop, setSelectedCrop] = useState('Mustard');
    const [acres, setAcres] = useState(1);
    const [result, setResult] = useState<Result | null>(null);

    // Advanced options state
    const [marketPrice, setMarketPrice] = useState(cropData[selectedCrop].price);
    const [priceUnit, setPriceUnit] = useState<'quintal' | 'kg'>('quintal');
    const [yieldVariability, setYieldVariability] = useState(15); // Default variability of +/- 15%

    useEffect(() => {
        // Update market price when crop changes
        const newPrice = cropData[selectedCrop].price;
        setMarketPrice(newPrice);
        setPriceUnit('quintal'); // Reset to default unit
        setResult(null); // Clear previous results
    }, [selectedCrop]);

    const handlePriceUnitChange = (newUnit: 'quintal' | 'kg') => {
        if (newUnit === priceUnit) return;

        let newPrice;
        if (newUnit === 'kg') {
            // converting from quintal to kg
            newPrice = marketPrice / 100;
        } else {
            // converting from kg to quintal
            newPrice = marketPrice * 100;
        }
        setMarketPrice(parseFloat(newPrice.toFixed(2)));
        setPriceUnit(newUnit);
    };

    const handleCalculate = () => {
        const crop: Crop = cropData[selectedCrop];
        if (!crop || acres <= 0 || !user) return;

        // Normalize the price to 'per quintal' for calculation
        const pricePerQuintal = priceUnit === 'kg' ? marketPrice * 100 : marketPrice;

        const profitPerAcre = (crop.yield * pricePerQuintal) - crop.cost + crop.subsidy;
        const totalProfit = profitPerAcre * acres;
        const lowYield = crop.yield * (1 - yieldVariability / 100);
        const highYield = crop.yield * (1 + yieldVariability / 100);
        const profitRangeLow = ((lowYield * pricePerQuintal) - crop.cost + crop.subsidy) * acres;
        const profitRangeHigh = ((highYield * pricePerQuintal) - crop.cost + crop.subsidy) * acres;

        setResult({
            totalProfit,
            profitRangeLow,
            profitRangeHigh,
        });

        // Award gamification points
        updateGamificationPoints(user.uid, 25);
    };

    return (
        <div className="p-4 animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Profitability Simulator</h1>

            <div className="bg-white p-6 rounded-lg shadow space-y-6">
                {/* Basic Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="crop" className="block text-sm font-medium text-gray-700">Select Crop</label>
                        <select id="crop" value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md shadow-sm">
                            {Object.keys(cropData).map(crop => <option key={crop} value={crop}>{crop}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="acres" className="block text-sm font-medium text-gray-700">Enter Acres</label>
                        <input type="number" id="acres" value={acres} onChange={(e) => setAcres(Number(e.target.value))} min="1" className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                    </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-4 pt-4 border-t">
                     <h3 className="text-lg font-medium text-gray-800">Advanced Options</h3>
                     {/* Market Price Input */}
                    <div>
                        <label htmlFor="marketPrice" className="block text-sm font-medium text-gray-700">Expected Market Price</label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">₹</span>
                            <input type="number" id="marketPrice" value={marketPrice} onChange={(e) => setMarketPrice(Number(e.target.value))} className="flex-1 min-w-0 block w-full px-3 py-2 border-gray-300 focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                            <select value={priceUnit} onChange={(e) => handlePriceUnitChange(e.target.value as 'quintal' | 'kg')} className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-600 text-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                                <option value="quintal">per Quintal</option>
                                <option value="kg">per Kg</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* Yield Variability Slider */}
                    <div>
                        <label htmlFor="yieldVariability" className="block text-sm font-medium text-gray-700">
                            Yield Variability <span className="text-green-600 font-semibold">(+/- {yieldVariability}%)</span>
                        </label>
                        <input 
                            type="range" 
                            id="yieldVariability" 
                            min="0" 
                            max="50" 
                            value={yieldVariability} 
                            onChange={(e) => setYieldVariability(Number(e.target.value))} 
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2 accent-green-600"
                        />
                         <div className="flex justify-between text-xs text-gray-500 px-1">
                            <span>0%</span>
                            <span>25%</span>
                            <span>50%</span>
                        </div>
                    </div>
                </div>

                <button onClick={handleCalculate} className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out">
                    Calculate
                </button>
            </div>

            {result && (
                <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg shadow-md animate-slide-up">
                    <h2 className="text-lg font-semibold text-green-800 mb-2">Simulation Result for {acres} Acre(s)</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">Total Projected Profit:</span>
                            <span className="font-bold text-xl text-green-700">₹{result.totalProfit.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Profit Range (based on yield):</span>
                            <span className="font-medium text-gray-800">
                                ₹{result.profitRangeLow.toLocaleString('en-IN')} - ₹{result.profitRangeHigh.toLocaleString('en-IN')}
                            </span>
                        </div>
                         <p className="text-xs text-gray-500 pt-2">
                            * Profit range is calculated based on a yield variability of +/- {yieldVariability}%. This is an estimate and actual results may vary.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SimulatePage;