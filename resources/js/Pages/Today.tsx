import AppLayout from '@/Components/Layout/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { TodayPageProps } from '@/types';
import FocusNowCard from '@/Components/Today/FocusNowCard';
import TodayClasses from '@/Components/Today/TodayClasses';
import TodayTasks from '@/Components/Today/TodayTasks';
import Chatbot from '@/Components/Chat/Chatbot';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function Today({
    todayClasses,
    tasksDueToday,
    focusNow,
    upcomingDeadlines,
    overdueCount,
}: TodayPageProps) {
    const today = new Date();

    return (
        <AppLayout title="Hari Ini">
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* 1. Focus Now Card */}
                    <FocusNowCard focusNow={focusNow} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 2. Today's Classes */}
                        <TodayClasses classes={todayClasses} />

                        {/* 3. Tasks Due Today */}
                        <TodayTasks tasks={tasksDueToday} overdueCount={overdueCount} />
                    </div>

                    {/* 4. Upcoming Deadlines (Mini view) */}
                    {upcomingDeadlines.length > 0 && (
                        <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-text">Deadline Mendatang</h3>
                                <Link href={route('deadlines.index')} className="text-sm text-accent hover:underline">
                                    Lihat semua &rarr;
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {upcomingDeadlines.map((task) => (
                                    <div key={task.id} className="flex justify-between items-center text-sm border-b border-border pb-2 last:border-0 last:pb-0">
                                        <div>
                                            <p className="font-medium text-text">{task.title}</p>
                                            <p className="text-text-muted text-xs">{task.course?.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-text-secondary">{format(new Date(task.deadline), 'd MMM, HH:mm')}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* AI Assistant Chatbot */}
            <Chatbot />
        </AppLayout>
    );
}
