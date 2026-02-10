import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function SearchResults({ auth, jobs, filters }) {
    const getProposalRange = (count) => {
        if (count < 5) return 'Less than 5';
        if (count <= 10) return '5 to 10';
        if (count <= 20) return '10 to 20';
        return '20 to 50';
    };

    const handleFilterChange = (key, value) => {
        router.get(route('projects.index'), { ...filters, [key]: value }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Search Jobs" />
            <div className="py-12 bg-[#f2f7f2] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">

                    {/* RESTORED SIDEBAR */}
                    <aside className="w-full md:w-1/4 space-y-6">
                        <h3 className="font-bold text-xl text-gray-900">Filter By</h3>
                        <div className="space-y-4">
                            <h4 className="font-bold text-sm text-gray-700">Experience Level</h4>
                            {['entry', 'intermediate', 'expert'].map(level => (
                                <label key={level} className="flex items-center gap-2 text-sm capitalize cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filters.experience_levels?.includes(level)}
                                        onChange={() => handleFilterChange('experience_levels', level)}
                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                    {level}
                                </label>
                            ))}
                        </div>
                    </aside>

                    {/* JOB LISTINGS */}
                    <main className="w-full md:w-3/4 space-y-4">
                        {jobs.data.map((job) => (
                            <div key={job.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-sm transition">
                                <Link href={route('projects.show', job.id)} className="text-xl font-bold hover:text-green-700">
                                    {job.title}
                                </Link>
                                <div className="mt-2 text-sm text-gray-500">
                                    {job.budget_type} - {job.experience_level} - ${job.budget_amount}
                                </div>
                                <p className="mt-4 text-gray-700 text-sm line-clamp-2">{job.description}</p>

                                <div className="mt-6 flex items-center gap-6 text-xs">
                                    <span className={`flex items-center font-bold ${job.client?.email_verified_at ? 'text-blue-600' : 'text-gray-400'}`}>
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                                        Payment Verified
                                    </span>
                                    <span className="text-gray-500">📍 {job.country ? job.country.name : 'Worldwide'}</span>
                                    <span>Proposals: <b>{getProposalRange(job.proposals_count)}</b></span>
                                </div>
                            </div>
                        ))}
                    </main>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
