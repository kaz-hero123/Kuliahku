import AppLayout from '@/Components/Layout/AppLayout';
import { Head } from '@inertiajs/react';
import { DeadlinesPageProps } from '@/types';
import DeadlineGroup from '@/Components/Deadlines/DeadlineGroup';
import EmptyState from '@/Components/Shared/EmptyState';

export default function DeadlinesIndex({ groupedTasks }: DeadlinesPageProps) {
    const hasNoTasks = Object.values(groupedTasks).every(group => group.length === 0);

    return (
        <AppLayout title="Semua Deadline">
            <div className="py-8">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {hasNoTasks ? (
                        <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg border border-border">
                            <EmptyState 
                                title="Semua Bersih! ✨"
                                description="Tidak ada tugas aktif atau deadline mendatang."
                            />
                        </div>
                    ) : (
                        <>
                            <DeadlineGroup title="Overdue" tasks={groupedTasks.overdue} type="overdue" />
                            <DeadlineGroup title="Hari Ini" tasks={groupedTasks.today} />
                            <DeadlineGroup title="Besok" tasks={groupedTasks.tomorrow} />
                            <DeadlineGroup title="Minggu Ini" tasks={groupedTasks.thisWeek} />
                            <DeadlineGroup title="Nanti" tasks={groupedTasks.later} type="muted" />
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
