import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category: '',
        budget_type: 'fixed',
        budget_amount: '',
        experience_level: 'intermediate',
        duration: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Post a Job" />
            <div className="py-12 px-4">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-6">Create a Job Post</h2>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="e.g. React Developer for Upwork Clone" />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>
                        <div>
                            <label>Category</label>
                            <select
                                value={data.category}
                                onChange={e => setData('category', e.target.value)}
                                className="w-full border-gray-300 rounded"
                            >
                                <option value="">Select a Category</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile Development">Mobile Development</option>
                                <option value="Design">Design</option>
                                <option value="Writing">Writing</option>
                            </select>
                            {/* This will show you the exact error Laravel is sending back */}
                            {errors.category && <div className="text-red-500 text-sm">{errors.category}</div>}
                        </div>

                        {/* Experience Level */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                            <select value={data.experience_level} onChange={e => setData('experience_level', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                <option value="entry">Entry</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="expert">Expert</option>
                            </select>
                        </div>

                        {/* Budget Section */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Budget Type</label>
                                <select value={data.budget_type} onChange={e => setData('budget_type', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                    <option value="fixed">Fixed Price</option>
                                    <option value="hourly">Hourly Rate</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
                                <input type="number" value={data.budget_amount} onChange={e => setData('budget_amount', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea rows="5" value={data.description} onChange={e => setData('description', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" disabled={processing} className="bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 disabled:opacity-50">
                                {processing ? 'Posting...' : 'Post Job'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
