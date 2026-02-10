// resources/js/Pages/Dashboard.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// MAKE SURE { auth } IS HERE IN THE BRACKETS
export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user} // Passing the user to the layout we fixed earlier
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Using auth.user.name safely */}
                            Welcome back, {auth.user.name}! You are logged in as a <span className="font-bold text-green-600 uppercase">{auth.user.role}</span>.
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
