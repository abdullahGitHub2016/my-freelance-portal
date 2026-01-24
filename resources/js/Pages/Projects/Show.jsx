import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Show({ auth, project }) {
    const { data, setData, post, processing, errors } = useForm({
        cover_letter: '',
        bid_amount: project.budget_amount || '',
        estimated_days: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('proposals.store', { projectListing: project.id }));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={project.title} />

            <div className="py-12 bg-gray-50">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-4 divide-x divide-gray-200">

                            {/* Main Content Area (3/4) */}
                            <div className="md:col-span-3 p-8">
                                <h1 className="text-2xl font-semibold text-gray-900 mb-4">{project.title}</h1>
                                <div className="flex gap-4 mb-6 text-sm text-green-700 font-medium">
                                    <span>{project.category}</span>
                                    <span className="text-gray-400">•</span>
                                    <span>Posted {new Date(project.created_at).toLocaleDateString()}</span>
                                </div>

                                <div className="prose max-w-none text-gray-800 border-t pt-6 mb-8">
                                    <h3 className="text-lg font-bold mb-2">Job Description</h3>
                                    <p className="whitespace-pre-wrap">{project.description}</p>
                                </div>

                                {/* Proposal Form (Simple/Fixed Cost Logic) */}
                                <div className="border-t pt-8">
                                    <h3 className="text-xl font-bold mb-6">Submit a Proposal</h3>
                                    <form onSubmit={submit} className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Bid Amount</label>
                                                <input type="number" value={data.bid_amount} onChange={e => setData('bid_amount', e.target.value)} className="w-full border-gray-300 rounded-md" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Estimated Days</label>
                                                <input type="number" value={data.estimated_days} onChange={e => setData('estimated_days', e.target.value)} className="w-full border-gray-300 rounded-md" />
                                            </div>
                                        </div>
                                        <textarea rows="6" value={data.cover_letter} onChange={e => setData('cover_letter', e.target.value)} className="w-full border-gray-300 rounded-md" placeholder="Describe your experience..." />
                                        <button disabled={processing} className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-full font-bold transition">
                                            Send for {project.connects_to_apply || 4} Connects
                                        </button>
                                    </form>
                                </div>
                                {/* Main Column: Bottom Section */}
                                <div className="mt-8 border-t pt-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Client's recent history</h3>

                                    <div className="space-y-6">
                                        {/* Static Job Item 1 */}
                                        <div className="border-b pb-6">
                                            <h4 className="text-blue-600 font-medium hover:underline cursor-pointer">
                                                Custom Shopify Site For Hemp Brand
                                            </h4>
                                            <div className="flex items-center mt-1 mb-2">
                                                <div className="flex text-yellow-400 text-xs mr-2">★★★★★</div>
                                                <span className="text-xs text-gray-500 italic">"Syed was AMAZING to work with..."</span>
                                            </div>
                                            <div className="flex gap-4 text-xs text-gray-500">
                                                <span>Fixed-price $250.00</span>
                                                <span>Aug 2025 - Dec 2025</span>
                                            </div>
                                        </div>

                                        {/* Static Job Item 2 */}
                                        <div className="border-b pb-6">
                                            <h4 className="text-blue-600 font-medium hover:underline cursor-pointer">
                                                Affiliate flannel boyz
                                            </h4>
                                            <div className="flex items-center mt-1 mb-2">
                                                <div className="flex text-yellow-400 text-xs mr-2">★★★★★</div>
                                                <span className="text-xs text-gray-500">To freelancer: Nidal D.</span>
                                            </div>
                                            <div className="flex gap-4 text-xs text-gray-500">
                                                <span>Fixed-price</span>
                                                <span>Ongoing</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Sidebar */}
                            <div className="md:col-span-1 space-y-6">
                                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                    <h3 className="font-bold text-gray-900 mb-4">About the client</h3>

                                    {/* Verified Badges */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-700">
                                            <span className="text-blue-600 mr-2">✔️</span> Payment method verified
                                        </div>
                                        <div className="flex items-center text-sm text-gray-700">
                                            <div className="flex text-yellow-400 mr-2">★★★★★</div>
                                            <span className="font-bold">5.00</span>
                                            <span className="text-gray-500 ml-1">of 2 reviews</span>
                                        </div>
                                    </div>

                                    {/* Client Stats */}
                                    <div className="space-y-4 border-t pt-4">
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">United States</p>
                                            <p className="text-xs text-gray-500">Mundelein 3:15 AM</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">19 jobs posted</p>
                                            <p className="text-xs text-gray-500">58% hire rate, 1 open job</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">$4.2K total spent</p>
                                            <p className="text-xs text-gray-500">12 hires, 7 active</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Connects Widget */}
                                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                    <h3 className="font-bold text-gray-900 mb-2">Connects</h3>
                                    <p className="text-sm text-gray-600">Required Connects: <span className="font-bold text-gray-900">14</span></p>
                                    <p className="text-sm text-gray-600">Available: <span className="font-bold text-gray-900">{auth.user.connects || 0}</span></p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
