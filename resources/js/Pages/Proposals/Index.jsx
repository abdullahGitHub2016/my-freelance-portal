import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, proposals }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800">My Proposals</h2>}
        >
            <Head title="My Proposals" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {proposals.length === 0 ? (
                            <p className="text-gray-500">You haven't submitted any proposals yet.</p>
                        ) : (
                            <div className="space-y-6">
                                {proposals.map((proposal) => (
                                    <div key={proposal.id} className="p-4 border rounded-lg hover:bg-gray-50">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                {/* Accessing the relationship we just fixed */}
                                                <h3 className="text-lg font-bold text-blue-600">
                                                    {proposal.project_listing?.title || 'Project Deleted'}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Submitted: {new Date(proposal.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 uppercase">
                                                {proposal.status}
                                            </span>
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-gray-700 line-clamp-2 italic">
                                                "{proposal.cover_letter}"
                                            </p>
                                        </div>

                                        <div className="mt-4 flex gap-4 text-sm font-medium">
                                            <span>Bid: ${proposal.bid_amount}</span>
                                            <span>Duration: {proposal.estimated_days} days</span>
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
