import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Show({ auth, project, stats, hasSubmittedProposal }) {
    // Determine if the logged-in user is the one who posted the job
    const isOwner = auth.user.id === project.client_id;
    const isFreelancer = auth.user.role === 'freelancer';

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={project.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Main Content Area */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6 pb-6 border-bottom border-gray-100">
                                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                                        {project.category}
                                    </span>
                                    <span>Posted {new Date(project.created_at).toLocaleDateString()}</span>
                                    <span className="capitalize">Level: {project.experience_level}</span>
                                </div>

                                <div className="prose max-w-none text-gray-700 leading-relaxed">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Description</h3>
                                    <p className="whitespace-pre-wrap">{project.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / Actions Area */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900">${project.budget_amount}</h3>
                                    <p className="text-sm text-gray-500 capitalize">{project.budget_type} Price</p>
                                </div>

                                <div className="space-y-4">
                                    {/* ACTION BUTTONS */}

                                    {isOwner ? (
                                        <>
                                            <Link
                                                href={route('projects.edit', project.id)}
                                                className="block w-full text-center bg-blue-600 text-white font-bold py-3 rounded-full hover:bg-blue-700 transition"
                                            >
                                                Edit Posting
                                            </Link>
                                            <Link
                                                href={route('projects.proposals', project.id)}
                                                className="block w-full text-center border border-green-600 text-green-600 font-bold py-3 rounded-full hover:bg-green-50 transition"
                                            >
                                                Review Proposals ({stats.proposals_count})
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            {hasSubmittedProposal ? (
                                                <div className="bg-blue-50 text-blue-700 p-4 rounded-lg text-center font-medium border border-blue-100">
                                                    ✓ Proposal Submitted
                                                </div>
                                            ) : (
                                                isFreelancer && (
                                                    <Link
    href={route('proposals.create', project.id)} // Must pass project.id
    className="block w-full text-center bg-green-600 text-white font-bold py-3 rounded-full hover:bg-green-700 transition"
>
    Apply Now
</Link>
                                                )
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <h4 className="font-semibold text-gray-900 mb-3">Job Details</h4>
                                    <ul className="text-sm space-y-3 text-gray-600">
                                        <li className="flex justify-between">
                                            <span>Connects Required:</span>
                                            <span className="font-medium text-gray-900">{project.connects_required}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Duration:</span>
                                            <span className="font-medium text-gray-900">{project.duration || 'Not specified'}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Client Info Card */}
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-2">About the Client</h4>
                                <p className="text-sm text-gray-600 mb-2">{project.client?.name}</p>
                                {stats.is_verified && (
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold uppercase">
                                        Payment Verified
                                    </span>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
