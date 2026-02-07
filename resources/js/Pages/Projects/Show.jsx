import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ auth, project, is_favorited, proposals_count }) {
    // Local state for the heart icon to make it "Live" instantly
    const [fav, setFav] = useState(is_favorited);

    const { data, setData, post, processing, errors } = useForm({
        cover_letter: '',
        bid_amount: project.budget_amount || '',
        estimated_days: '',
    });

    // Toggle Favorite Logic
    const toggleFavorite = () => {
        setFav(!fav);
        router.post(route('projects.favorite', project.id), {}, {
            preserveScroll: true,
        });
    };

    // Upwork-style proposal range calculator
    const getProposalRange = (count) => {
        if (count < 5) return 'Less than 5';
        if (count <= 10) return '5 to 10';
        if (count <= 15) return '10 to 15';
        if (count <= 20) return '15 to 20';
        if (count <= 50) return '20 to 50';
        return '50+';
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('proposals.store', { project: project.id }));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={project.title} />

            <div className="py-12 bg-[#f2f7f2] min-h-screen">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-4 divide-x divide-gray-200">

                            {/* Main Content */}
                            <div className="md:col-span-3 p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h1 className="text-2xl font-medium text-gray-900">{project.title}</h1>
                                    <button
                                        onClick={toggleFavorite}
                                        className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition"
                                    >
                                        <svg
                                            className={`w-6 h-6 ${fav ? 'fill-green-600 text-green-600' : 'text-gray-400'}`}
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>

                                <p className="text-gray-800 mb-8 whitespace-pre-wrap leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Proposal Form */}
                                <form onSubmit={submit} className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
                                    <h3 className="font-bold text-lg">Submit a Proposal</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Bid Amount ($)</label>
                                            <input type="number" value={data.bid_amount} onChange={e => setData('bid_amount', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Estimated Days</label>
                                            <input type="number" value={data.estimated_days} onChange={e => setData('estimated_days', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
                                        <textarea rows="5" value={data.cover_letter} onChange={e => setData('cover_letter', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm"></textarea>
                                        {errors.cover_letter && <p className="text-red-500 text-xs mt-1">{errors.cover_letter}</p>}
                                    </div>
                                    <button disabled={processing} className="bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition">
                                        Submit Proposal
                                    </button>
                                </form>
                            </div>

                            {/* Sidebar */}
                            <div className="p-6 bg-white space-y-6">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-4">About the client</h3>
                                    <div className="flex items-center text-blue-600 font-medium text-sm mb-1">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                        </svg>
                                        Payment Verified
                                    </div>
                                    <p className="text-sm text-gray-600">📍 Worldwide</p>
                                </div>

                                <div className="border-t pt-4">
                                    <h3 className="font-bold text-gray-900 mb-2">Activity on this job</h3>
                                    <p className="text-sm text-gray-700">
                                        Proposals: <span className="font-medium">{getProposalRange(proposals_count)}</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
