import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// Add Link here! 👇
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, project }) {
    // Initialize form with existing database values
    const { data, setData, put, processing, errors } = useForm({
        title: project.title || '',
        description: project.description || '',
        category: project.category || '',
        budget_type: project.budget_type || 'fixed',
        budget_amount: project.budget_amount || '',
        experience_level: project.experience_level || 'intermediate',
        duration: project.duration || '',
        status: project.status || 'open',
    });

    const submit = (e) => {
        e.preventDefault();
        // Ziggy helper needs the ID to build the URL /projects/{id}
        put(route('projects.update', project.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Edit ${project.title}`} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Job Posting</h2>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Project Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>

                        {/* Category & Status Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select value={data.category} onChange={e => setData('category', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                    <option value="Web Development">Web Development</option>
                                    <option value="Mobile App">Mobile App</option>
                                    <option value="Design">Design</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Listing Status</label>
                                <select value={data.status} onChange={e => setData('status', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                    <option value="open">Open</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>

                        {/* Budget Section */}
                        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Budget Type</label>
                                <div className="mt-2 space-x-4">
                                    <label className="inline-flex items-center">
                                        <input type="radio" name="budget_type" value="fixed" checked={data.budget_type === 'fixed'} onChange={e => setData('budget_type', e.target.value)} className="text-green-600" />
                                        <span className="ml-2">Fixed</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input type="radio" name="budget_type" value="hourly" checked={data.budget_type === 'hourly'} onChange={e => setData('budget_type', e.target.value)} className="text-green-600" />
                                        <span className="ml-2">Hourly</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
                                <input type="number" value={data.budget_amount} onChange={e => setData('budget_amount', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                                {errors.budget_amount && <p className="text-red-500 text-xs mt-1">{errors.budget_amount}</p>}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                rows="6"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            ></textarea>
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>

                        <div className="flex items-center justify-end gap-4">
                            <Link href={route('projects.my-postings')} className="text-gray-600 hover:underline">Cancel</Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 disabled:opacity-50 shadow-lg shadow-green-100"
                            >
                                {processing ? 'Saving...' : 'Update Project'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
