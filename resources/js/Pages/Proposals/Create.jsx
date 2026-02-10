import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth, project }) {
    // 1. Initialize form to match your ProposalController validation
    const { data, setData, post, processing, errors } = useForm({
        cover_letter: '',
        bid_amount: '',
        estimated_days: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // 2. Post to the proposals.store route with the project ID
        post(route('proposals.store', project.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Submit Proposal" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-6">Submit Proposal for: {project.title}</h2>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Bid Amount */}
                            <div>
                                <label className="block font-medium text-gray-700">Your Bid Amount ($)</label>
                                <input
                                    type="number"
                                    value={data.bid_amount}
                                    onChange={e => setData('bid_amount', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.bid_amount && <div className="text-red-500 text-sm mt-1">{errors.bid_amount}</div>}
                            </div>

                            {/* Estimated Days */}
                            <div>
                                <label className="block font-medium text-gray-700">Estimated Days to Complete</label>
                                <input
                                    type="number"
                                    value={data.estimated_days}
                                    onChange={e => setData('estimated_days', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.estimated_days && <div className="text-red-500 text-sm mt-1">{errors.estimated_days}</div>}
                            </div>

                            {/* Cover Letter */}
                            <div>
                                <label className="block font-medium text-gray-700">Cover Letter</label>
                                <textarea
                                    rows="8"
                                    value={data.cover_letter}
                                    onChange={e => setData('cover_letter', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    placeholder="Describe your relevant experience and how you can help..."
                                ></textarea>
                                {errors.cover_letter && <div className="text-red-500 text-sm mt-1">{errors.cover_letter}</div>}
                            </div>

                            <div className="flex items-center justify-end gap-4">
                                <Link href={route('projects.show', project.id)} className="text-gray-600 hover:underline">
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 disabled:opacity-50"
                                >
                                    {processing ? 'Submitting...' : 'Submit Proposal'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
