import { type User } from 'firebase/auth';

export type Crop = {
    name: string;
    cost: number;
    yield: number;
    price: number;
    subsidy: number;
    water: string;
};

export type CropData = {
    [key: string]: Crop;
};

export type Scheme = {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    benefits: string[];
    eligibility: string[];
    howToApply: string[];
    link: string;
};

export type MandiPrice = {
    id: string;
    crop: string;
    price: number;
    market: string;
    date: string;
};

export type FPO = {
    id: string;
    name: string;
    contact: string;
    location: string;
    specialization: string;
};

export type Gamification = {
    points: number;
    badges: string[];
};

export type Profile = {
    name: string;
    phone: string;
    location: string;
};

export type Farmer = {
    id: string;
    name: string;
    phone: string;
    location: string;
};

export type Page = 'home' | 'dashboard' | 'simulate' | 'schemes' | 'markets' | 'profile' | 'official-dashboard';

export type UserRole = 'farmer' | 'official';

export interface SimulatePageProps {
    user: User;
}

export interface ProfilePageProps {
    user: User;
}

export interface LoginPageProps {
    setUserRole: (role: UserRole) => void;
}
