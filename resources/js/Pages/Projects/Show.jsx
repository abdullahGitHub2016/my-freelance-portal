import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, project, hasSubmittedProposal }) {
    // Agile Memory: Check if the current user is the one who posted the job
    const isOwner = auth.user.id === project.client_id;

    const postedDate = new Date(project.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={project.title} />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">

                    {/* LEFT: JOB CONTENT */}
                    <div className="w-full lg:w-3/4 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">{project.title}</h1>

                        <div className="flex flex-wrap gap-4 text-sm text-green-700 font-medium mb-8 border-b pb-6">
                            <span className="bg-green-50 px-3 py-1 rounded-full capitalize">{project.category}</span>
                            <span>Posted {postedDate}</span>
                            <span className="flex items-center gap-1">📍 {project.country?.name || 'Worldwide'}</span>
                        </div>

                        <div className="prose max-w-none text-gray-700 mb-10">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Job Description</h3>
                            <p className="whitespace-pre-wrap">{project.description}</p>
                        </div>
                    </div>

                    {/* RIGHT: DYNAMIC ACTION SIDEBAR */}
                    <div className="w-full lg:w-1/4 space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">

                            {isOwner ? (
                                /* CLIENT VIEW: If I am the boss of this job */
                                <div className="space-y-3">
                                    <h4 className="text-sm font-bold text-gray-900 mb-4">You posted this job</h4>
                                    <Link
                                        href={route('projects.proposals', project.id)}
                                        className="block w-full text-center py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition"
                                    >
                                        Review Proposals
                                    </Link>
                                    <button className="w-full py-3 border border-gray-300 text-gray-600 font-bold rounded-full hover:bg-gray-100 transition">
                                        Edit Posting
                                    </button>
                                </div>
                            ) : (
                                /* FREELANCER VIEW: If I am looking for work */
                                <div className="space-y-3">
                                    {hasSubmittedProposal ? (
                                        <button disabled className="w-full py-3 bg-gray-100 text-gray-400 font-bold rounded-full flex items-center justify-center gap-2 border border-gray-200">
                                            Applied
                                        </button>
                                    ) : (
                                        <Link
                                            href={route('proposals.create', project.id)}
                                            className="block w-full text-center py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition"
                                        >
                                            Apply Now
                                        </Link>
                                    )}
                                    <button className="w-full py-3 border-2 border-green-600 text-green-600 font-bold rounded-full hover:bg-green-50 transition">
                                        Save Job
                                    </button>
                                </div>
                            )}

                            {/* Client Info Section - Only relevant to show to freelancers */}
                            {!isOwner && (
                                <div className="mt-6 pt-6 border-t">
                                    <p className="text-xs text-gray-500 font-bold mb-4 uppercase">About the client</p>
                                    <p className="text-sm font-bold text-gray-900">{project.client?.name}</p>
                                    <p className="text-xs text-gray-500">Member since {new Date(project.client?.created_at).getFullYear()}</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
