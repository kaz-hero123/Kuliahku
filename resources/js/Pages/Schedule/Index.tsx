import AppLayout from '@/Components/Layout/AppLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import WeeklyGrid from '@/Components/Schedule/WeeklyGrid';
import ScheduleForm from '@/Components/Schedule/ScheduleForm';
import { Course, Schedule } from '@/types';

interface Props {
    schedules: Schedule[];
    courses: Course[];
}

export default function SchedulePage({ schedules, courses }: Props) {
    if (courses.length === 0) {
        return (
            <AppLayout title="Schedule">
                <PageHeader title="Weekly Schedule" />
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
                    <p className="text-gray-500 mb-4">You need to add courses before creating a schedule.</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout title="Schedule">
            <PageHeader title="Weekly Schedule" description="Manage your class times." />
            
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-8">
                        <h3 className="font-medium text-gray-900 mb-4">Add Class Time</h3>
                        <ScheduleForm courses={courses} />
                    </div>
                </div>
                
                <div className="w-full md:w-2/3">
                    <WeeklyGrid schedules={schedules} />
                </div>
            </div>
        </AppLayout>
    );
}
