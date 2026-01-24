import React, { useState, useEffect } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TwoFactorAuthenticationForm() {
    const { auth } = usePage().props;

    // 1. Top-level Hooks (Must be here to avoid "Invalid Hook Call")
    const { post, delete: destroy, processing } = useForm();
    const [qrCode, setQrCode] = useState(null);
    const [recoveryCodes, setRecoveryCodes] = useState([]);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [enabling, setEnabling] = useState(false);

    // Check if 2FA is fully active (confirmed by user)
    const twoFactorEnabled = !enabling && auth.user?.two_factor_confirmed_at;

    // --- Actions ---

    const showQrCode = () => {
        return axios.get(route('two-factor.qr-code')).then((response) => {
            setQrCode(response.data.svg);
        }).catch(error => {
            if (error.response.status === 423) {
                console.log("Password confirmation required to view QR.");
            }
        });
    };

    const showRecoveryCodes = () => {
        return axios.get(route('two-factor.recovery-codes')).then((response) => {
            setRecoveryCodes(response.data);
        });
    };

    const enableTwoFactorAuthentication = () => {
        setEnabling(true);
        post(route('two-factor.enable'), {
            preserveScroll: true,
            onSuccess: () => Promise.all([showQrCode(), showRecoveryCodes()]),
            onFinish: () => setEnabling(false),
        });
    };

    const confirmTwoFactorAuthentication = () => {
        // This finalized the 2FA setup with the 6-digit code from your phone
        router.post(route('two-factor.confirm'), {
            code: confirmationCode,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setQrCode(null);
                setRecoveryCodes([]);
                setConfirmationCode('');
            },
        });
    };

    const disableTwoFactorAuthentication = () => {
        destroy(route('two-factor.disable'), {
            preserveScroll: true,
            onSuccess: () => {
                setQrCode(null);
                setRecoveryCodes([]);
            },
        });
    };

    // Auto-load QR if user started the process but didn't finish
    useEffect(() => {
        if (auth.user?.two_factor_secret && !auth.user?.two_factor_confirmed_at) {
            showQrCode();
            showRecoveryCodes();
        }
    }, [auth.user]);

    return (
        <div className="p-6 bg-white border rounded-xl shadow-sm space-y-6">
            <div>
                <h3 className="text-lg font-bold text-gray-900">Two Factor Authentication</h3>
                <p className="text-sm text-gray-500">
                    Add additional security to your account using a mobile authenticator app.
                </p>
            </div>

            <hr />

            {/* STATUS MESSAGE */}
            {twoFactorEnabled ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
                    ✓ You have fully enabled and confirmed two-factor authentication.
                </div>
            ) : (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm font-medium">
                    ! You have not enabled two-factor authentication yet.
                </div>
            )}

            {/* MAIN UI LOGIC */}
            <div className="mt-4">
                {!twoFactorEnabled ? (
                    <div>
                        {qrCode ? (
                            <div className="space-y-6">
                                <div className="p-4 bg-gray-50 rounded-lg border border-dashed text-center">
                                    <p className="text-sm font-semibold mb-4">
                                        Scan this QR code with Google Authenticator or Authy:
                                    </p>
                                    <div
                                        className="inline-block p-2 bg-white border rounded shadow-sm"
                                        dangerouslySetInnerHTML={{ __html: qrCode }}
                                    />
                                </div>

                                {/* CONFIRMATION INPUT */}
                                <div className="space-y-2 max-w-xs">
                                    <label className="text-sm font-bold">Verification Code</label>
                                    <Input
                                        placeholder="Enter 6-digit code"
                                        value={confirmationCode}
                                        onChange={(e) => setConfirmationCode(e.target.value)}
                                        maxLength={6}
                                    />
                                    <Button
                                        className="w-full"
                                        onClick={confirmTwoFactorAuthentication}
                                        disabled={confirmationCode.length !== 6}
                                    >
                                        Confirm & Activate 2FA
                                    </Button>
                                </div>

                                {recoveryCodes.length > 0 && (
                                    <div className="mt-4 p-4 bg-gray-900 text-white rounded-lg">
                                        <p className="text-xs font-bold mb-2 uppercase text-gray-400">Recovery Codes</p>
                                        <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                                            {recoveryCodes.map(code => <div key={code}>{code}</div>)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Button onClick={enableTwoFactorAuthentication} disabled={processing}>
                                Enable 2FA Setup
                            </Button>
                        )}
                    </div>
                ) : (
                    <Button variant="destructive" onClick={disableTwoFactorAuthentication} disabled={processing}>
                        Disable Two-Factor Authentication
                    </Button>
                )}
            </div>
        </div>
    );
}
