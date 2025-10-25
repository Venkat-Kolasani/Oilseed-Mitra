import { type CropData, type Crop, type Scheme, type MandiPrice, type FPO } from './types';

export const cropData: CropData = {
    'Paddy': { name: 'Paddy', cost: 15000, yield: 25, price: 2183, subsidy: 1000, water: 'High' },
    'Mustard': { name: 'Mustard', cost: 8000, yield: 10, price: 5450, subsidy: 1500, water: 'Low' },
    'Soybean': { name: 'Soybean', cost: 12000, yield: 12, price: 4200, subsidy: 1200, water: 'Medium' },
    'Groundnut': { name: 'Groundnut', cost: 18000, yield: 8, price: 6377, subsidy: 1000, water: 'Medium' },
    'Sunflower': { name: 'Sunflower', cost: 12000, yield: 8, price: 6760, subsidy: 1300, water: 'Low-Medium' },
    'Wheat': { name: 'Wheat', cost: 10000, yield: 20, price: 2275, subsidy: 800, water: 'Medium' },
    'Cotton': { name: 'Cotton', cost: 20000, yield: 7, price: 6620, subsidy: 500, water: 'High' },
};

export const calculateProfit = (crop: Crop): number => {
    if (!crop) return 0;
    return (crop.yield * crop.price) - crop.cost + crop.subsidy;
};

export const schemesData: Scheme[] = [
    {
        id: 'nmeo-op',
        name: 'National Mission on Edible Oils - Oil Palm (NMEO-OP)',
        shortDescription: 'A special mission to boost domestic oil palm cultivation and production.',
        description: 'With a focus on increasing edible oil production, this mission provides significant subsidies for planting materials, inputs, and maintenance, aiming to make India self-sufficient in edible oils.',
        benefits: [
            'Financial assistance of ₹29,000 per hectare for planting material.',
            'Support for maintenance and intercropping during the gestation period.',
            'Price assurance for farmers with a viability price formula.',
            'Special focus on North-Eastern states and Andaman & Nicobar Islands.'
        ],
        eligibility: [
            'All farmers, with a special focus on those in identified zones suitable for oil palm.',
            'Availability of assured irrigation is necessary.'
        ],
        howToApply: [
            'Contact the State Department of Horticulture/Agriculture.',
            'Identified companies in the oil palm sector can also assist with applications.',
            'Submit land documents and proof of irrigation facilities.'
        ],
        link: 'https://nmeo.dac.gov.in/'
    },
    {
         id: 'nfsm-os',
         name: 'National Food Security Mission (NFSM) - Oilseeds',
         shortDescription: 'Financial assistance for seeds, demonstrations, and equipment to boost oilseed production.',
         description: 'A centrally sponsored scheme focused on increasing the production of oilseeds and reducing the import burden. It provides support to farmers through various interventions.',
         benefits: [
             'Subsidies on high-yielding seed varieties.',
             'Funding for block demonstrations to showcase modern techniques.',
             'Support for purchasing improved farm machinery.',
             'Assistance for irrigation and water-saving devices.',
         ],
         eligibility: [
             'All farmers are eligible.',
             'Focus on small and marginal farmers.',
             'Assistance is provided through state agriculture departments.'
         ],
         howToApply: [
             'Contact the local District Agriculture Officer or Krishi Vigyan Kendra (KVK).',
             'Register on the state\'s agriculture department portal.',
             'Submit the application form with required land documents.',
             'Receive benefits directly or through authorized dealers.'
         ],
         link: 'https://www.nfsm.gov.in/'
     },
     {
         id: 'pm-kisan',
         name: 'PM-KISAN',
         shortDescription: 'Income support of ₹6,000/year to all landholding farmer families.',
         description: 'Pradhan Mantri Kisan Samman Nidhi is a central sector scheme with 100% funding from the Government of India. It provides income support to all landholding farmer families in the country to supplement their financial needs.',
         benefits: [
             'Direct income support of ₹6,000 per year.',
             'Payment in three equal installments of ₹2,000.',
             'Money is directly transferred to the bank accounts of the beneficiaries.'
         ],
         eligibility: [
             'All landholding farmer families.',
             'The farmer must be an Indian citizen.',
             'Certain exclusion criteria apply (e.g., institutional landholders, high-income individuals).'
         ],
         howToApply: [
             'Visit the official PM-KISAN portal (pmkisan.gov.in).',
             'Click on "New Farmer Registration".',
             'Enter Aadhaar number, mobile number, and select state.',
             'Fill in the personal and land details and submit the form.',
             'Alternatively, contact the local Patwari, revenue officer, or Common Service Centre (CSC).'
         ],
         link: 'https://pmkisan.gov.in/'
     },
     {
         id: 'pmfby',
         name: 'PMFBY',
         shortDescription: 'Comprehensive insurance cover against crop failure to stabilize farmers\' income.',
         description: 'Pradhan Mantri Fasal Bima Yojana (PMFBY) is the government-sponsored crop insurance scheme that integrates multiple stakeholders on a single platform.',
         benefits: [
             'Low premium rates for farmers (2% for Kharif, 1.5% for Rabi, 5% for commercial/horticultural crops).',
             'Covers yield losses due to non-preventable risks, such as natural fire, lightning, storm, hail, cyclone, etc.',
             'Provides full insurance cover against crop loss.',
         ],
         eligibility: [
             'All farmers including sharecroppers and tenant farmers growing notified crops in the notified areas are eligible for coverage.',
             'Compulsory for loanee farmers availing crop loans.',
             'Voluntary for non-loanee farmers.'
         ],
         howToApply: [
             'Contact your nearest bank, PAC, or insurance agent.',
             'Enroll through the National Crop Insurance Portal (pmfby.gov.in).',
             'Provide necessary documents like land records, bank passbook, and Aadhaar card.',
             'Pay the premium amount to complete the enrollment.'
         ],
         link: 'https://pmfby.gov.in/'
     },
     {
        id: 'kcc',
        name: 'Kisan Credit Card (KCC) Scheme',
        shortDescription: 'Provides farmers with timely access to credit for their agricultural needs.',
        description: 'The KCC scheme aims at providing adequate and timely credit support from the banking system under a single window to the farmers for their cultivation & other needs as indicated below.',
        benefits: [
            'Revolving cash credit facility. Unlimited withdrawals and repayments within the limit.',
            'Credit for cultivation, post-harvest expenses, and consumption requirements.',
            'Interest subvention/prompt repayment incentive for farmers.',
            'Coverage under crop insurance for notified crops.'
        ],
        eligibility: [
            'All farmers - individuals/joint borrowers who are owner cultivators.',
            'Tenant farmers, oral lessees & sharecroppers.',
            'Self Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers.'
        ],
        howToApply: [
            'Approach a Commercial Bank, RRB, or Cooperative Bank.',
            'Fill out the application form available on the bank\'s website or at the branch.',
            'Submit the form along with land documents and a passport-size photograph.',
            'The bank will assess the application and sanction the KCC limit.'
        ],
        link: 'https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-finance/kisan-credit-card'
    }
 ];

 export const mandiPricesData: MandiPrice[] = [
    { id: 'mandi1', crop: 'Mustard', price: 5650, market: 'Alwar, Rajasthan', date: 'Yesterday' },
    { id: 'mandi2', crop: 'Soybean', price: 4350, market: 'Indore, MP', date: 'Today' },
    { id: 'mandi3', crop: 'Paddy (Basmati)', price: 3800, market: 'Karnal, Haryana', date: 'Today' },
    { id: 'mandi4', crop: 'Groundnut', price: 6500, market: 'Rajkot, Gujarat', date: 'Yesterday' },
    { id: 'mandi5', crop: 'Wheat', price: 2350, market: 'Ludhiana, Punjab', date: 'Today' },
    { id: 'mandi6', crop: 'Sunflower', price: 6800, market: 'Gulbarga, Karnataka', date: 'Yesterday' },
    { id: 'mandi7', crop: 'Cotton', price: 6700, market: 'Adilabad, Telangana', date: 'Today' },
    { id: 'mandi8', crop: 'Mustard', price: 5500, market: 'Agra, UP', date: 'Today' },
    { id: 'mandi9', crop: 'Soybean', price: 4400, market: 'Ujjain, MP', date: 'Yesterday' },
    { id: 'mandi10', crop: 'Sesame', price: 14500, market: 'Jaipur, Rajasthan', date: 'Today' },
    { id: 'mandi11', crop: 'Safflower', price: 5200, market: 'Solapur, Maharashtra', date: 'Today' },
    { id: 'mandi12', crop: 'Linseed', price: 4800, market: 'Sagar, MP', date: 'Yesterday' },
    { id: 'mandi13', crop: 'Castor Seed', price: 5800, market: 'Patan, Gujarat', date: 'Today' },
 ];

 export const fposData: FPO[] = [
    { id: 'fpo1', name: 'Sahyadri Farmer Producer Co.', contact: '9876543210', location: 'Nashik, Maharashtra', specialization: 'Grapes, Vegetables' },
    { id: 'fpo2', name: 'MahaFPC', contact: '9876543211', location: 'Pune, Maharashtra', specialization: 'Pulses, Grains, Oilseeds' },
    { id: 'fpo3', name: 'VAPCOL', contact: '9876543212', location: 'Jaipur, Rajasthan', specialization: 'Organic Produce, Spices' },
    { id: 'fpo4', name: 'Chaitanya Godavari FPO', contact: '9876543213', location: 'East Godavari, AP', specialization: 'Paddy, Coconut' },
    { id: 'fpo5', name: 'Greenfuture Farmer Producer Company Ltd', contact: '9876543214', location: 'Dharwad, Karnataka', specialization: 'Cotton, Millets' },
    { id: 'fpo6', name: 'Marutham Sustainable Agriculture FPC', contact: '9876543215', location: 'Madurai, Tamil Nadu', specialization: 'Oilseeds, Organic Farming' },
    { id: 'fpo7', name: 'Devbhumi Natural Products Producer Co.', contact: '9876543216', location: 'Almora, Uttarakhand', specialization: 'Herbs, Honey, Spices' },
    { id: 'fpo8', name: 'Basar Agrarian Producer Co. Ltd.', contact: '9876543217', location: 'Basar, Arunachal Pradesh', specialization: 'Kiwi, Oranges, Large Cardamom' },
];