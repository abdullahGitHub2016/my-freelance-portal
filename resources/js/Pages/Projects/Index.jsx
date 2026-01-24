import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, projects }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Find Work</h2>}
        >
            <Head title="Browse Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-4">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white p-6 shadow sm:rounded-lg hover:border-blue-500 border-2 border-transparent transition-all">
                            <div className="flex justify-between">
                                <h3 className="text-xl font-bold text-blue-600">
                                    <Link href={route('projects.show', project.id)}>{project.title}</Link>
                                </h3>
                                <span className="font-bold text-lg">${project.budget_amount}</span>
                            </div>

                            <p className="text-sm text-gray-500 mb-4">
                                Posted by {project.client.name} • {project.category}
                            </p>

                            <p className="text-gray-700 line-clamp-3 mb-4">
                                {project.description}
                            </p>

                            <Link
                                href={route('projects.show', project.id)}
                                className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500"
                            >
                                View Details & Apply
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
