import NavLink from '@/Components/NavLink';
import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ children }) {
    const { auth, filters } = usePage().props;
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('projects.index'), { ...filters, search }, { preserveState: true });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center flex-1">
                            <Link href="/" className="text-2xl font-black text-green-600 mr-8 tracking-tighter">JobBoard</Link>

                            <div className="hidden space-x-8 sm:flex mr-8">
                                <NavLink href={route('projects.index')} active={route().current('projects.*')}>Find Work</NavLink>
                                <NavLink href={route('proposals.index')} active={route().current('proposals.index')}>My Proposals</NavLink>
                            </div>

                            <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search for jobs"
                                    className="w-full rounded-full border-gray-300 pl-10 focus:ring-green-500 focus:border-green-500"
                                />
                                <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    );
}
