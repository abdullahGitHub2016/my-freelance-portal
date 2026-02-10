import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, proposals }) {
    const [selectedProposal, setSelectedProposal] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Proposals</h2>}>
            <Head title="My Proposals" />

            <div className="py-12 bg-[#f2f7f2] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Active proposals ({proposals.length})</h2>
                        </div>

                        <div className="divide-y divide-gray-200">
                            {proposals.map((proposal) => (
                                <div
                                    key={proposal.id}
                                    className="p-6 hover:bg-gray-50 transition cursor-pointer"
                                    onClick={() => setSelectedProposal(proposal)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-green-700">{proposal.project?.title}</h3>
                                            <p className="text-sm text-gray-500">Submitted {new Date(proposal.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 uppercase">
                                            {proposal.status}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-gray-600 text-sm line-clamp-2 italic">"{proposal.cover_letter}"</p>
                                    <div className="mt-4 text-sm font-bold text-gray-900">${proposal.bid_amount} bid</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* SIMPLE DETAIL MODAL */}
            {selectedProposal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedProposal(null)}>
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Proposal Details</h2>
                            <button onClick={() => setSelectedProposal(null)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Project</h4>
                                <Link href={route('projects.show', selectedProposal.project.id)} className="text-lg font-bold text-green-700 hover:underline">
                                    {selectedProposal.project.title}
                                </Link>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">My Cover Letter</h4>
                                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 italic">
                                    "{selectedProposal.cover_letter}"
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t pt-6">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Bid Amount</h4>
                                    <p className="text-xl font-bold text-gray-900">${selectedProposal.bid_amount}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Estimated Delivery</h4>
                                    <p className="text-xl font-bold text-gray-900">{selectedProposal.estimated_days} Days</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedProposal(null)}
                            className="mt-8 w-full py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition"
                        >
                            Close Preview
                        </button>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
