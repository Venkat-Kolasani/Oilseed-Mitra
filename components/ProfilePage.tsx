

import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db, appId, isFirebaseConfigured, doc, onSnapshot } from '../services/firebase';
import { type Profile, type Gamification, type ProfilePageProps } from '../types';

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [gamification, setGamification] = useState<Gamification | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        };

        const profileRef = doc(db, `artifacts/${appId}/users/${user.uid}/profile`);
        const gamificationRef = doc(db, `artifacts/${appId}/users/${user.uid}/gamification`);

        const unsubProfile = onSnapshot(profileRef, (doc) => {
            if (doc.exists()) {
                setProfile(doc.data() as Profile);
            }
            setLoading(false);
        });

        const unsubGamification = onSnapshot(gamificationRef, (doc) => {
            if (doc.exists()) {
                setGamification(doc.data() as Gamification);
            }
        });

        return () => {
            unsubProfile();
            unsubGamification();
        };
    }, [user]);

    if (loading) {
        return <div className="p-4 text-center">Loading profile...</div>;
    }

    if (!user) {
        return <div className="p-4 text-center">No user data found. Please try logging in again.</div>;
    }

    return (
        <div className="p-4 animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h1>
            {!isFirebaseConfigured && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                    <p className="font-bold">Demo Mode</p>
                    <p>Showing mock data because Firebase is not configured.</p>
                </div>
            )}
            <div className="bg-white p-6 rounded-lg shadow space-y-4">
                {profile ? (
                    <div>
                        <p><span className="font-medium text-gray-600">Name:</span> {profile.name}</p>
                        <p><span className="font-medium text-gray-600">Phone:</span> {profile.phone || user.phoneNumber}</p>
                        <p><span className="font-medium text-gray-600">Location:</span> {profile.location}</p>
                    </div>
                ) : <p className="text-gray-500">No profile information found.</p>}

                {gamification && (
                    <div className="pt-4 border-t border-gray-200">
                        <h2 className="text-lg font-semibold text-green-700 mb-2">My Progress</h2>
                        <p><span className="font-medium text-gray-600">My Points:</span> {gamification.points}</p>
                        <p><span className="font-medium text-gray-600">Badges:</span> {gamification.badges.join(', ')}</p>
                    </div>
                )}
                
                <p className="text-xs text-gray-400 pt-4">UID: {user.uid}</p>

                <button
                    onClick={() => signOut(auth)}
                    className="w-full mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;