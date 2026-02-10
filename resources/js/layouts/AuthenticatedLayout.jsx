import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Logo */}
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <span className="text-2xl font-black text-green-600 tracking-tighter">upwork<span className="text-gray-900">clone</span></span>
                                </Link>
                            </div>

                            {/* Inside the navigation links div of AuthenticatedLayout.jsx */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">

                                {/* COMMON HOME LINK (Optional) */}
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>

                                {/* FREELANCER SPECIFIC LINKS */}
                                {user.role === 'freelancer' && (
                                    <>
                                        <NavLink href={route('projects.index')} active={route().current('projects.index')}>
                                            Find Work
                                        </NavLink>
                                        <NavLink href={route('proposals.index')} active={route().current('proposals.index')}>
                                            My Proposals
                                        </NavLink>
                                    </>
                                )}

                                {/* CLIENT SPECIFIC LINKS */}
                                {user.role === 'client' && (
                                    <>
                                        <NavLink href={route('projects.create')} active={route().current('projects.create')}>
                                            Post a Job
                                        </NavLink>
                                        {/* Logic for 'My Jobs' where the client sees their postings */}
                                        <NavLink href={route('projects.my-postings')} active={route().current('projects.my-postings')}>
                                            All Postings
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* SETTINGS DROPDOWN - The missing Logout is here */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                                                {user.name}
                                                <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        {/* LOGOUT OPTION RESTORED */}
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Heading */}
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {/* Page Content */}
            <main>{children}</main>
        </div>
    );
}
