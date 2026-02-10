import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function MyPostings({ auth, projects }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Job Postings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">My Job Postings</h1>
                        <Link
                            href={route('projects.create')}
                            className="bg-green-600 text-white px-4 py-2 rounded-full font-bold hover:bg-green-700"
                        >
                            Post a New Job
                        </Link>
                    </div>

                    {projects.length === 0 ? (
                        <div className="bg-white p-6 text-center rounded-lg shadow">
                            <p className="text-gray-600">You haven't posted any jobs yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {projects.map((project) => (
                                <div key={project.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <Link href={route('projects.show', project.id)} className="text-xl font-bold text-green-700 hover:underline">
                                                {project.title}
                                            </Link>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Posted {new Date(project.created_at).toLocaleDateString()} • {project.category}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 uppercase">
                                                {project.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
                                        <div>
                                            <strong>Budget:</strong> ${project.budget_amount} ({project.budget_type})
                                        </div>
                                        <div>
                                            <strong>Proposals:</strong> {project.proposals_count}
                                        </div>
                                    </div>

                                    <div className="mt-6 flex gap-3">
                                        <Link
                                            href={route('projects.proposals', project.id)}
                                            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md font-medium"
                                        >
                                            Review Proposals
                                        </Link>
                                        <button className="text-sm text-red-600 hover:underline">
                                            Close Job
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
