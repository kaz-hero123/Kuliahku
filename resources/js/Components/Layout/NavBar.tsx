import { Link, usePage } from '@inertiajs/react';
import { Home, CheckSquare, Calendar, AlertCircle, Settings } from 'lucide-react';

export default function NavBar() {
    const { url } = usePage();

    const navItems = [
        { name: 'Today', href: route('today'), icon: Home, active: url === '/' },
        { name: 'Tasks', href: route('tasks.index'), icon: CheckSquare, active: url.startsWith('/tasks') },
        { name: 'Schedule', href: route('schedule.index'), icon: Calendar, active: url.startsWith('/schedule') },
        { name: 'Deadlines', href: route('deadlines.index'), icon: AlertCircle, active: url.startsWith('/deadlines') },
    ];

    return (
        <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 md:relative md:w-64 md:border-t-0 md:border-r h-16 md:h-screen flex md:flex-col justify-around md:justify-start px-4 md:p-6 z-50">
            <div className="hidden md:flex items-center mb-8">
                <span className="text-xl font-bold text-blue-600">Kuliahku</span>
            </div>
            
            <div className="flex md:flex-col w-full md:gap-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 p-2 md:px-4 md:py-3 rounded-lg transition-colors ${
                                item.active
                                    ? 'text-blue-600 bg-blue-50 font-medium'
                                    : 'text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            <Icon size={20} />
                            <span className="text-[10px] md:text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="hidden md:flex mt-auto">
                <Link
                    href={route('settings.index')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full ${
                        url.startsWith('/settings')
                            ? 'text-blue-600 bg-blue-50 font-medium'
                            : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    <Settings size={20} />
                    <span className="text-sm">Settings</span>
                </Link>
            </div>
        </nav>
    );
}
