import React, { useState, useEffect, useRef } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../services/firebase';
import { type UserRole, type LoginPageProps } from '../types';

const LoginPage: React.FC<LoginPageProps> = ({ setUserRole }) => {
    const [phoneNumber, setPhoneNumber] = useState('+91');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [_userRole, _setUserRole] = useState<UserRole>('farmer');
    const recaptchaContainerRef = useRef<HTMLDivElement>(null);
    const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);

    useEffect(() => {
        if (!auth) {
            setError("Firebase Auth is not initialized.");
            return;
        }
        if (isFirebaseConfigured && recaptchaContainerRef.current && !recaptchaVerifier.current) {
            recaptchaVerifier.current = new RecaptchaVerifier(recaptchaContainerRef.current, {
                'size': 'invisible',
                'callback': () => {
                    // reCAPTCHA solved
                }
            }, auth);
        }
    }, []);

    const handleRoleChange = (role: UserRole) => {
        _setUserRole(role);
        setUserRole(role);
    };

    const handleSendOtp = async () => {
        setError('');
        if (!auth) {
            setError("Firebase Auth is not initialized.");
            return;
        }
        if (phoneNumber.length < 13) {
            setError('Please enter a valid 10-digit phone number with country code.');
            return;
        }
        
        setLoading(true);
        try {
            let result: ConfirmationResult;
            if (isFirebaseConfigured) {
                if (!recaptchaVerifier.current) {
                    setError('reCAPTCHA not initialized.');
                    setLoading(false);
                    return;
                }
                result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier.current);
            } else {
                result = await (auth as any).signInWithPhoneNumber(phoneNumber);
            }
            setConfirmationResult(result);
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/captcha-check-failed') {
                 setError('reCAPTCHA check failed. Please ensure you are not blocking pop-ups.');
            } else {
                setError(err.message || 'Failed to send OTP. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setError('');
        if (!confirmationResult) {
            setError('Please send OTP first.');
            return;
        }
        if (otp.length !== 6) {
            setError('OTP must be 6 digits.');
            return;
        }
        setLoading(true);
        try {
            await confirmationResult.confirm(otp);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const UserRoleToggle = () => (
        <div className="flex justify-center items-center bg-gray-200 rounded-full p-1">
            <button
                onClick={() => handleRoleChange('farmer')}
                className={`w-1/2 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${_userRole === 'farmer' ? 'bg-green-600 text-white shadow' : 'text-gray-600'}`}>
                Farmer
            </button>
            <button
                onClick={() => handleRoleChange('official')}
                className={`w-1/2 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${_userRole === 'official' ? 'bg-green-600 text-white shadow' : 'text-gray-600'}`}>
                Official
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center p-4" style={{backgroundImage: "url('https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop')"}}>
            <div ref={recaptchaContainerRef}></div>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 space-y-6 z-10 animate-fade-in">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-green-700">Oilseed-Mitra</h1>
                    <p className="text-gray-500 mt-2">Your Farming Companion</p>
                </div>

                <UserRoleToggle />

                {error && <p className="text-red-500 text-sm text-center bg-red-100 p-3 rounded-lg">{error}</p>}
                
                {!isFirebaseConfigured && <div className="text-center bg-yellow-100 p-3 rounded-lg text-sm text-yellow-800">
                    <p><b>Demo Mode:</b> Use any 10-digit phone number and any 6-digit OTP to continue.</p>
                </div>}

                {!confirmationResult ? (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 sr-only">Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter your phone number"
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm"
                            />
                        </div>
                        <button onClick={handleSendOtp} disabled={loading || !auth} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 transition-colors">
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4 animate-fade-in">
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 sr-only">Enter OTP</label>
                            <input
                                id="otp"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter 6-digit OTP"
                                maxLength={6}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm"
                            />
                        </div>
                        <button onClick={handleVerifyOtp} disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 transition-colors">
                            {loading ? 'Verifying...' : 'Verify & Login'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;