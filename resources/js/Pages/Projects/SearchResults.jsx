import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function SearchResults({ auth, jobs, filters }) {

    // Lively range calculation for proposals
    const getProposalRange = (count) => {
        if (count < 5) return 'Less than 5';
        if (count <= 10) return '5 to 10';
        if (count <= 20) return '10 to 20';
        if (count <= 50) return '20 to 50';
        return '50+';
    };

    const handleFilterChange = (key, value) => {
        router.get(route('projects.index'), { ...filters, [key]: value }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Search Results" />

            <div className="py-12 bg-[#f2f7f2] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-8">

                        {/* LEFT PANEL FILTERS */}
                        <div className="w-full md:w-1/4 space-y-6">
                            <h3 className="font-bold text-gray-900">Filter By</h3>
                            <div>
                                <h4 className="text-sm font-bold text-gray-700 mb-2">Experience Level</h4>
                                {['Entry', 'Intermediate', 'Expert'].map(level => (
                                    <label key={level} className="flex items-center gap-2 text-sm mb-1 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={filters.experience_levels?.includes(level.toLowerCase())}
                                            onChange={() => handleFilterChange('experience_levels', level.toLowerCase())}
                                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        />
                                        {level}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* MAIN RESULTS PANEL */}
                        <div className="w-full md:w-3/4">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
                                {jobs.data.map((job) => (
                                    <div key={job.id} className="p-6 hover:bg-gray-50 transition group">
                                        <Link href={route('projects.show', job.id)} className="text-lg font-bold text-gray-900 group-hover:text-green-700">
                                            {job.title}
                                        </Link>

                                        <div className="mt-2 text-sm text-gray-500">
                                            {job.budget_type} - {job.experience_level} - Est. Budget: ${job.budget_amount}
                                        </div>

                                        <p className="mt-4 text-gray-700 line-clamp-2 text-sm">
                                            {job.description}
                                        </p>

                                        {/* LIVELY DYNAMIC BADGES */}
                                        <div className="mt-6 flex items-center gap-6 text-xs">
                                            {/* Dynamic Payment Status */}
                                            <span className={`flex items-center font-bold ${job.client?.payment_verified ? 'text-blue-600' : 'text-gray-400'}`}>
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                                </svg>
                                                {job.client?.payment_verified ? 'Payment Verified' : 'Payment Unverified'}
                                            </span>

                                            {/* DYNAMIC LOCATION: Changed from static 'Worldwide' */}
                                            <span className="text-gray-500 flex items-center">
                                                <span className="mr-1">📍</span> {job.location || 'Remote'}
                                            </span>

                                            {/* Dynamic Proposals Range */}
                                            <span className="text-gray-600">
                                                Proposals: <span className="font-bold">{getProposalRange(job.proposals_count || 0)}</span>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
