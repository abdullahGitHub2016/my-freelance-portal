import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, proposals }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Proposals</h2>}
        >
            <Head title="My Proposals" />

            <div className="py-12 bg-[#f2f7f2] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Active proposals ({proposals.length})</h2>
                        </div>

                        {proposals.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                You haven't submitted any proposals yet.
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {proposals.map((proposal) => (
                                    <div key={proposal.id} className="p-6 hover:bg-gray-50 transition">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                {/* FIXED: Using proposal.project and adding Link back to project */}
                                                <Link
                                                    href={route('projects.show', proposal.project.id)}
                                                    className="text-lg font-bold text-green-700 hover:underline"
                                                >
                                                    {proposal.project?.title || 'Project Deleted'}
                                                </Link>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Submitted: {new Date(proposal.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 uppercase">
                                                {proposal.status}
                                            </span>
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-gray-700 line-clamp-2 italic text-sm">
                                                "{proposal.cover_letter}"
                                            </p>
                                        </div>

                                        <div className="mt-4 flex gap-6 text-sm font-medium border-t pt-4">
                                            <div className="flex flex-col">
                                                <span className="text-gray-500 text-xs">Your Bid</span>
                                                <span className="text-gray-900 font-bold">${proposal.bid_amount}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-gray-500 text-xs">Duration</span>
                                                <span className="text-gray-900 font-bold">{proposal.estimated_days} days</span>
                                            </div>
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
