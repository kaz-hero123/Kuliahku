import AppLayout from '@/Components/Layout/AppLayout';
import { Schedule, Course, PageProps } from '@/types';
import WeeklyGrid from '@/Components/Schedule/WeeklyGrid';
import { Link } from '@inertiajs/react';

interface ScheduleProps extends PageProps {
    schedules: Schedule[];
    courses: Course[];
}

export default function ScheduleIndex({ schedules }: ScheduleProps) {
    return (
        <AppLayout 
            title="Jadwal Mingguan"
            headerAction={
                <Link 
                    href={route('settings.index')} 
                    className="inline-flex items-center px-4 py-2 bg-surface border border-border rounded-md font-semibold text-xs text-text-secondary uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Atur Jadwal
                </Link>
            }
        >
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <WeeklyGrid schedules={schedules} allowDelete={false} />
                </div>
            </div>
        </AppLayout>
    );
}
