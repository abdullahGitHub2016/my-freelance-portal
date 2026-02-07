import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, projects, filters }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Find Work" />

            <div className="py-12 bg-[#f2f7f2] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Results Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {filters.search ? `Results for "${filters.search}"` : 'Jobs you might like'}
                        </h1>
                        <p className="text-sm text-gray-600">{projects.length} jobs found</p>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-200 divide-y divide-gray-200">
                        {projects.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">No jobs match your search.</div>
                        ) : (
                            projects.map((project) => (
                                <div key={project.id} className="p-6 hover:bg-gray-50 transition group">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <Link
                                                href={route('projects.show', project.id)}
                                                className="text-lg font-bold text-gray-900 group-hover:text-green-700 underline-offset-2"
                                            >
                                                {project.title}
                                            </Link>

                                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                                <span>{project.budget_type === 'fixed' ? 'Fixed-price' : 'Hourly'} - {project.experience_level} - Est. Budget: ${project.budget_amount}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3 text-sm text-gray-700 line-clamp-2">
                                        {project.description}
                                    </div>

                                    {/* Client & Status Badges */}
                                    <div className="mt-4 flex items-center gap-4 text-xs">
                                        <span className="flex items-center text-blue-600 font-semibold">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                            </svg>
                                            Payment Verified
                                        </span>
                                        <span className="text-gray-500">📍 Worldwide</span>
                                        <span className="text-gray-500 font-medium">Proposals: 20 to 50</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
