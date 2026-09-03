import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function NavBar() {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <nav className="border-b border-border bg-surface sticky top-0 z-40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex shrink-0 items-center">
                            <Link href="/" className="font-bold text-xl tracking-tight text-accent flex items-center gap-2">
                                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                                </div>
                                <span className="hidden sm:inline">Kuliahku</span>
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <NavLink href={route('today')} active={route().current('today')}>
                                Hari Ini
                            </NavLink>
                            <NavLink href={route('tasks.index')} active={route().current('tasks.index')}>
                                Tugas
                            </NavLink>
                            <NavLink href={route('schedule.index')} active={route().current('schedule.index')}>
                                Jadwal
                            </NavLink>
                            <NavLink href={route('deadlines.index')} active={route().current('deadlines.index')}>
                                Deadlines
                            </NavLink>
                            <NavLink href={route('settings.index')} active={route().current('settings.index')}>
                                Pengaturan
                            </NavLink>
                        </div>
                    </div>

                    <div className="hidden sm:ms-6 sm:flex sm:items-center">
                        <div className="relative ms-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-surface px-3 py-2 text-sm font-medium leading-4 text-text-secondary transition duration-150 ease-in-out hover:text-text focus:outline-none"
                                        >
                                            {user.name}
                                            <svg className="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="-me-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-text-muted transition duration-150 ease-in-out hover:bg-gray-100 hover:text-text focus:bg-gray-100 focus:text-text focus:outline-none"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden border-t border-border bg-surface'}>
                <div className="space-y-1 pb-3 pt-2">
                    <ResponsiveNavLink href={route('today')} active={route().current('today')}>Hari Ini</ResponsiveNavLink>
                    <ResponsiveNavLink href={route('tasks.index')} active={route().current('tasks.index')}>Tugas</ResponsiveNavLink>
                    <ResponsiveNavLink href={route('schedule.index')} active={route().current('schedule.index')}>Jadwal</ResponsiveNavLink>
                    <ResponsiveNavLink href={route('deadlines.index')} active={route().current('deadlines.index')}>Deadlines</ResponsiveNavLink>
                    <ResponsiveNavLink href={route('settings.index')} active={route().current('settings.index')}>Pengaturan</ResponsiveNavLink>
                </div>
                <div className="border-t border-border pb-1 pt-4">
                    <div className="px-4">
                        <div className="text-base font-medium text-text">{user.name}</div>
                        <div className="text-sm font-medium text-text-muted">{user.email}</div>
                    </div>
                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                        <ResponsiveNavLink method="post" href={route('logout')} as="button">Log Out</ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
