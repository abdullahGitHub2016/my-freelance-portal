import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

const handleStatus = (proposalId, newStatus) => {
    if (confirm(`Are you sure you want to ${newStatus} this proposal?`)) {
        router.patch(route('proposals.update-status', proposalId), {
            status: newStatus
        }, {
            preserveScroll: true,
        });
    }
};

export default function Proposals({ auth, project, proposals }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Review Proposals - ${project.title}`} />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">
                        Proposals for: <span className="text-green-700">{project.title}</span>
                    </h2>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {proposals.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">No proposals received yet.</div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {proposals.map((proposal) => (
                                    <div key={proposal.id} className="p-8 hover:bg-gray-50 transition">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-4">
                                                {/* Placeholder for Profile Pic */}
                                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
                                                    {proposal.freelancer.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-900">{proposal.freelancer.name}</h3>
                                                    <p className="text-sm text-gray-500">
                                                        📍 {proposal.freelancer.address?.country?.name || 'Location hidden'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-gray-900">${proposal.bid_amount}</p>
                                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Bid</p>
                                            </div>
                                        </div>

                                        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Cover Letter</h4>
                                            <p className="text-gray-700 text-sm whitespace-pre-wrap">{proposal.cover_letter}</p>
                                        </div>

                                        <div className="mt-6 flex gap-4">
                                            {proposal.status === 'pending' ? (
                                                <>
                                                    <button
                                                        onClick={() => handleStatus(proposal.id, 'accepted')}
                                                        className="px-6 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition"
                                                    >
                                                        Accept Proposal
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatus(proposal.id, 'declined')}
                                                        className="px-6 py-2 border border-red-300 text-red-600 font-bold rounded-full hover:bg-red-50 transition"
                                                    >
                                                        Decline
                                                    </button>
                                                </>
                                            ) : (
                                                <span className={`px-4 py-2 rounded-full font-bold text-sm uppercase ${proposal.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                                    }`}>
                                                    Status: {proposal.status}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
