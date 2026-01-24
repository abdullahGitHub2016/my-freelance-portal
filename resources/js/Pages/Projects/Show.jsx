import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Show({ auth, project }) {
    // 1. DYNAMIC CONFIGURATION
    const jobConfig = {
        type: 'fixed', // Toggle: 'fixed' or 'hourly'
        postedTime: 'Posted yesterday',
        location: 'Worldwide',
        connectsRequired: 14,
        experienceLevel: 'Expert',
        experienceDesc: 'I am willing to pay higher rates for the most experienced freelancers',
        projectType: 'Ongoing project',
        // ADDED SKILLS HERE
        skills: [
            'Figma', 'UX & UI', 'Responsive Design',
            'HTML5', 'CSS 3', 'JavaScript', 'Web Design'
        ],
        activity: {
            proposals: '50+',
            interviewing: 0,
            invitesSent: 0,
            unansweredInvites: 0
        },
        clientStats: {
            rating: '5.00',
            reviewCount: 2,
            location: 'United States',
            localTime: '3:15 AM',
            totalSpent: '$4.2K',
            hires: 12,
            activeCount: 7,
            hireRate: '58%'
        },
        history: [
            { id: 1, title: 'Custom Shopify Site For Hemp Brand', rating: 5, feedback: 'Syed was AMAZING to work with...', amount: '$250.00', date: 'Aug 2025 - Dec 2025' },
            { id: 2, title: 'Affiliate flannel boyz', rating: 5, feedback: 'Great experience!', amount: '$500.00', date: 'Jul 2025 - Oct 2025' }
        ]
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        cover_letter: '',
        bid_amount: project.budget_amount || '',
        estimated_days: '',
        hourly_rate: '',
    });

    const serviceFee = jobConfig.type === 'fixed'
        ? (data.bid_amount * 0.10).toFixed(2)
        : (data.hourly_rate * 0.10).toFixed(2);

    const receiveAmount = jobConfig.type === 'fixed'
        ? (data.bid_amount - serviceFee).toFixed(2)
        : (data.hourly_rate - serviceFee).toFixed(2);

    const submit = (e) => {
        e.preventDefault();
        const projectId = project?.id || project?.data?.id;
        post(route('proposals.store', { projectListing: projectId }));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={project.title} />

            <div className="py-12 bg-[#f2f7f2] min-h-screen">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-4 divide-x divide-gray-200">

                            {/* Main Content (Left) */}
                            <div className="md:col-span-3 p-8">
                                <h1 className="text-2xl font-medium text-gray-900 mb-2">{project.title}</h1>

                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 border-b pb-4">
                                    <span className="text-green-700 font-medium hover:underline cursor-pointer">Web Design</span>
                                    <span>•</span>
                                    <span>{jobConfig.postedTime}</span>
                                    <span>•</span>
                                    <span>🌐 {jobConfig.location}</span>
                                </div>

                                <div className="mb-8 border-b pb-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Summary</h3>
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{project.description}</p>
                                </div>

                                {/* SKILLS AND EXPERTISE SECTION */}
                                <div className="mb-8 border-b pb-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Skills and Expertise</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {jobConfig.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-1 px-4 rounded-full transition cursor-pointer"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Activity Section */}
                                <div className="mb-8 border-b pb-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Activity on this job</h3>
                                    <div className="space-y-2 text-sm text-gray-700">
                                        <p>Proposals: <span className="font-bold text-gray-900 ml-4">{jobConfig.activity.proposals}</span></p>
                                        <p>Interviewing: <span className="font-bold text-gray-900 ml-4">{jobConfig.activity.interviewing}</span></p>
                                        <p>Invites sent: <span className="font-bold text-gray-900 ml-4">{jobConfig.activity.invitesSent}</span></p>
                                    </div>
                                </div>

                                {/* Terms / Bidding Section */}
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
                                    <h3 className="text-xl font-bold mb-6">Terms</h3>
                                    <form onSubmit={submit} className="space-y-6">
                                        <div className="flex justify-between items-center border-b pb-6">
                                            <div>
                                                <h4 className="font-bold text-gray-900">
                                                    {jobConfig.type === 'fixed' ? 'Your bid amount' : 'Your hourly rate'}
                                                </h4>
                                                <p className="text-sm text-gray-500">Total amount the client will see on your proposal</p>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="mr-2 font-bold">$</span>
                                                <input
                                                    type="number"
                                                    value={jobConfig.type === 'fixed' ? data.bid_amount : data.hourly_rate}
                                                    onChange={e => jobConfig.type === 'fixed' ? setData('bid_amount', e.target.value) : setData('hourly_rate', e.target.value)}
                                                    className="w-32 border-gray-300 rounded-lg text-right font-bold focus:ring-green-500 focus:border-green-500"
                                                />
                                                {jobConfig.type === 'hourly' && <span className="ml-2 text-gray-500">/hr</span>}
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center border-b pb-6">
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-green-700">You'll Receive</h4>
                                                <p className="text-sm text-gray-500">After 10% Upwork Service Fee</p>
                                            </div>
                                            <div className="font-bold text-lg text-green-700">
                                                ${receiveAmount}{jobConfig.type === 'hourly' && '/hr'}
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Cover Letter</label>
                                            <textarea
                                                rows="6"
                                                value={data.cover_letter}
                                                onChange={e => setData('cover_letter', e.target.value)}
                                                className="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                                placeholder="Explain why you are the best fit for this project..."
                                            ></textarea>
                                        </div>

                                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-10 rounded-full transition shadow-md">
                                            Submit for {jobConfig.connectsRequired} Connects
                                        </button>
                                    </form>
                                </div>

                                {/* Client History */}
                                <div className="border-t pt-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6">Client's recent history</h3>
                                    {jobConfig.history.map((item) => (
                                        <div key={item.id} className="mb-6 border-b pb-4 last:border-0">
                                            <h4 className="text-green-700 font-medium hover:underline cursor-pointer">{item.title}</h4>
                                            <div className="flex items-center gap-1 my-1 text-yellow-400 text-xs">★★★★★</div>
                                            <p className="text-sm text-gray-600 italic">"{item.feedback}"</p>
                                            <div className="flex gap-4 mt-2 text-xs text-gray-400 font-medium uppercase">
                                                <span>{item.amount}</span>
                                                <span>{item.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sidebar Area (Right) */}
                            <div className="md:col-span-1 p-6 bg-white space-y-8">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-4">About the client</h3>
                                    <p className="text-sm text-blue-600 font-medium mb-3">Payment verified ✅</p>
                                    <div className="text-sm space-y-3">
                                        <div>
                                            <p className="font-bold text-gray-900">{jobConfig.clientStats.location}</p>
                                            <p className="text-gray-500 text-xs uppercase">{jobConfig.clientStats.localTime}</p>
                                        </div>
                                        <div className="border-t pt-3">
                                            <p className="font-bold text-gray-900">{jobConfig.clientStats.hireRate} Hire Rate</p>
                                            <p className="text-gray-500 text-xs">{jobConfig.clientStats.totalSpent} total spent</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
