import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import { debounce } from "lodash";

export default function SearchResults({ auth, jobs, filters }) {
    // 1. Local State for Filters
    const [params, setParams] = useState({
        search: filters.search || '',
        experience_levels: filters.experience_levels || [],
        budget_type: filters.budget_type || '',
        min_budget: filters.min_budget || '',
        max_budget: filters.max_budget || '',
    });

    // 2. Debounced Search Function (to avoid hitting DB on every keystroke)
    const requestSearch = useCallback(
        debounce((query) => {
            router.get(route('projects.index'), query, {
                preserveState: true,
                replace: true,
                preserveScroll: true
            });
        }, 300),
        []
    );

    // 3. Handle Checkbox Toggles
    const handleFilterChange = (key, value) => {
        let newParams = { ...params };

        if (key === 'experience_levels') {
            const current = [...params.experience_levels];
            const index = current.indexOf(value);
            index > -1 ? current.splice(index, 1) : current.push(value);
            newParams.experience_levels = current;
        } else {
            newParams[key] = value;
        }

        setParams(newParams);
        requestSearch(newParams);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Search Results" />

            <div className="bg-[#f2f7f2] min-h-screen py-8 text-[#001e00]">
                <div className="max-w-[1400px] mx-auto px-4 lg:px-8">

                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* LEFT SIDEBAR FILTERS */}
                        <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
                            <h2 className="text-2xl font-medium mb-6">Filter By</h2>

                            {/* Experience Level */}
                            <div>
                                <h3 className="font-bold mb-4">Experience level</h3>
                                <div className="space-y-3">
                                    {['Entry Level', 'Intermediate', 'Expert'].map(level => (
                                        <label key={level} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                checked={params.experience_levels.includes(level)}
                                                onChange={() => handleFilterChange('experience_levels', level)}
                                            />
                                            <span className="text-sm group-hover:text-green-700">{level}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Job Type */}
                            <div className="border-t pt-6">
                                <h3 className="font-bold mb-4">Job type</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="job_type"
                                            className="w-5 h-5 text-green-600 focus:ring-green-500"
                                            checked={params.budget_type === 'hourly'}
                                            onChange={() => handleFilterChange('budget_type', 'hourly')}
                                        />
                                        <span className="text-sm">Hourly</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="job_type"
                                            className="w-5 h-5 text-green-600 focus:ring-green-500"
                                            checked={params.budget_type === 'fixed'}
                                            onChange={() => handleFilterChange('budget_type', 'fixed')}
                                        />
                                        <span className="text-sm">Fixed-Price</span>
                                    </label>
                                </div>
                            </div>

                            {/* Budget Range Inputs */}
                            <div className="border-t pt-6">
                                <h3 className="font-bold mb-4">Budget</h3>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        className="w-full text-sm border-gray-300 rounded-md"
                                        value={params.min_budget}
                                        onChange={(e) => handleFilterChange('min_budget', e.target.value)}
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        className="w-full text-sm border-gray-300 rounded-md"
                                        value={params.max_budget}
                                        onChange={(e) => handleFilterChange('max_budget', e.target.value)}
                                    />
                                </div>
                            </div>
                        </aside>

                        {/* MAIN JOB FEED */}
                        <main className="flex-1">
                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                                <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-4">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            placeholder="Search for jobs..."
                                            className="w-full border-gray-300 rounded-full pl-10 h-10"
                                            value={params.search}
                                            onChange={(e) => handleFilterChange('search', e.target.value)}
                                        />
                                        <span className="absolute left-4 top-2.5">🔍</span>
                                    </div>
                                </div>

                                {jobs.data.length > 0 ? (
                                    jobs.data.map((job) => (
                                        <div key={job.id} className="p-6 border-b border-gray-100 hover:bg-gray-50 transition">
                                            <div className="flex justify-between items-start">
                                                <Link href={route('projects.show', job.id)}>
                                                    <h3 className="text-xl font-medium text-green-700 hover:underline mb-2">
                                                        {job.title}
                                                    </h3>
                                                </Link>
                                                <button className="text-gray-400 hover:text-green-600 border rounded-full p-2">❤️</button>
                                            </div>

                                            <div className="text-sm text-gray-500 mb-3 flex gap-4">
                                                <span>{job.budget_type === 'fixed' ? 'Fixed-price' : 'Hourly'}</span>
                                                <span>•</span>
                                                <span>{job.experience_level}</span>
                                                <span>•</span>
                                                <span>Est. Budget: ${job.budget_amount}</span>
                                            </div>

                                            <p className="text-sm text-gray-700 line-clamp-3 mb-4 leading-relaxed">
                                                {job.description}
                                            </p>

                                            <div className="flex items-center gap-6 text-xs text-gray-400">
                                                <span className="flex items-center gap-1 font-bold text-blue-600">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                                                    Payment Verified
                                                </span>
                                                <span>📍 worldwide</span>
                                                <span>Proposals: <b>20 to 50</b></span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center text-gray-500">
                                        No jobs found matching your filters.
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
