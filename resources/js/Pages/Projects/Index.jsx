import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function SearchResults({ auth }) {
    // This simulates the dynamic list from your search result text
    const searchJobs = [
        {
            id: 101,
            title: "Laravel Developer Needed to Build Web Push Notification Panel",
            posted: "13 minutes ago",
            paymentVerified: false,
            rating: 0,
            spent: "$0",
            location: "India",
            type: "Hourly",
            level: "Intermediate",
            duration: "Less than 1 month",
            workload: "Less than 30 hrs/week",
            description: "I’m looking for an experienced Laravel developer to build a custom web push notification system similar to tools like Larapush or OneSignal...",
            skills: ["Flutter", "iOS Development", "Smartphone", "Android App Development"],
            proposals: "Less than 5"
        },
        {
            id: 102,
            title: "Laravel/Security/Malware cleaning/check logs",
            posted: "1 hour ago",
            paymentVerified: true,
            rating: 4.8,
            spent: "$100K+",
            location: "Italy",
            type: "Hourly",
            rate: "$15.00 - $47.00",
            level: "Expert",
            duration: "Less than 1 month",
            description: "We are looking for an experienced Laravel / Vue.js developer with strong security skills to urgently assist with cleaning and securing...",
            skills: ["Laravel", "PHP", "JavaScript"],
            proposals: "20 to 50"
        }
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Search Results - Jobs" />

            <div className="bg-[#f2f7f2] min-h-screen py-8 font-sans text-[#001e00]">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Top Search Bar */}
                    <div className="mb-6 flex gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search for jobs"
                                className="w-full pl-10 pr-4 py-2 border-gray-300 rounded-lg focus:ring-green-600 focus:border-green-600"
                                defaultValue="Laravel"
                            />
                            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                        </div>
                        <button className="bg-green-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-green-700">Search</button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* LEFT SIDEBAR: FILTERS */}
                        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
                            <div>
                                <h3 className="font-bold text-lg mb-4">Category</h3>
                                <select className="w-full border-gray-300 rounded-md text-sm">
                                    <option>Select Categories</option>
                                </select>
                            </div>

                            {/* Experience Level Filter */}
                            <div className="border-t pt-4">
                                <h4 className="font-bold mb-3">Experience level</h4>
                                <div className="space-y-2 text-sm">
                                    <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-green-600"/> Entry Level (31)</label>
                                    <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-green-600"/> Intermediate (399)</label>
                                    <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-green-600"/> Expert (272)</label>
                                </div>
                            </div>

                            {/* Job Type / Budget Filter */}
                            <div className="border-t pt-4">
                                <h4 className="font-bold mb-3">Job type</h4>
                                <div className="space-y-2 text-sm">
                                    <label className="flex items-center gap-2 font-medium"><input type="checkbox" className="rounded text-green-600"/> Hourly (418)</label>
                                    <label className="flex items-center gap-2 font-medium"><input type="checkbox" className="rounded text-green-600"/> Fixed-Price (284)</label>
                                    <div className="pl-6 space-y-2 text-gray-600">
                                        <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-green-600"/> Less than $100</label>
                                        <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-green-600"/> $100 to $500</label>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h4 className="font-bold mb-3">Client info</h4>
                                <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded text-green-600"/> Payment verified (618)</label>
                            </div>
                        </aside>

                        {/* MAIN FEED: SEARCH RESULTS */}
                        <main className="flex-1 space-y-4">
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

                                {/* Sort Header */}
                                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                    <span className="text-sm font-medium">Sort by: <span className="text-green-700 cursor-pointer">Best Matches</span></span>
                                </div>

                                {searchJobs.map((job) => (
                                    <div key={job.id} className="p-6 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer group relative">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="text-xs text-gray-500 italic">Posted {job.posted}</p>
                                            <button className="text-gray-400 hover:text-green-600">❤️</button>
                                        </div>

                                        <Link href={`/jobs/${job.id}`}>
                                            <h3 className="text-xl font-medium text-[#001e00] group-hover:text-green-700 mb-2">
                                                {job.title}
                                            </h3>
                                        </Link>

                                        {/* Meta Row: Rate, Level, Time */}
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-3">
                                            <span className="font-medium text-gray-900">{job.type}{job.rate ? `: ${job.rate}` : ''}</span>
                                            <span>•</span>
                                            <span>{job.level}</span>
                                            <span>•</span>
                                            <span>Est. time: {job.duration}</span>
                                        </div>

                                        <p className="text-sm text-gray-700 line-clamp-3 mb-4 leading-relaxed">
                                            {job.description}
                                        </p>

                                        {/* Skills Row */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {job.skills.map((skill) => (
                                                <span key={skill} className="bg-[#e4ebe4] text-[#001e00] text-xs px-3 py-1 rounded-full font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Client Trust Footer */}
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 border-t pt-4 mt-4">
                                            <span className="flex items-center gap-1">
                                                {job.paymentVerified ? (
                                                    <span className="text-blue-600 font-bold flex items-center">
                                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">Unverified</span>
                                                )}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="text-yellow-500">★★★★★</span>
                                                <span className="font-bold text-gray-700">{job.rating}</span>
                                            </span>
                                            <span><b>{job.spent}</b> spent</span>
                                            <span>📍 {job.location}</span>
                                            <span className="ml-auto font-medium">Proposals: <span className="font-bold text-gray-900">{job.proposals}</span></span>
                                        </div>
                                    </div>
                                ))}

                                {/* Pagination Simulation */}
                                <div className="p-6 flex justify-center items-center gap-4 text-sm font-medium">
                                    <button className="text-gray-400">&lt;</button>
                                    <span className="bg-green-700 text-white w-8 h-8 flex items-center justify-center rounded-full">1</span>
                                    <button className="text-green-700">2</button>
                                    <button className="text-green-700">3</button>
                                    <button className="text-green-700">&gt;</button>
                                </div>
                            </div>
                        </main>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
