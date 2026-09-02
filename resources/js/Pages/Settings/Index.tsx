import AppLayout from '@/Components/Layout/AppLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import CourseList from '@/Components/Courses/CourseList';
import { Course, Schedule } from '@/types';

interface Props {
    courses: Course[];
    schedules: Schedule[];
}

export default function Settings({ courses, schedules }: Props) {
    return (
        <AppLayout title="Settings">
            <PageHeader title="Settings" description="Manage your courses and schedule." />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-bold mb-4 text-text">Courses</h2>
                    <CourseList courses={courses} />
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-4 text-text">Weekly Schedule</h2>
                    <p className="text-gray-500 text-sm mb-4">Schedule management coming next.</p>
                    {/* <ScheduleGrid schedules={schedules} /> */}
                </div>
            </div>
        </AppLayout>
    );
}
