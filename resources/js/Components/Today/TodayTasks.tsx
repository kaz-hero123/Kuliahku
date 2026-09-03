import { Task } from '@/types';
import { format } from 'date-fns';
import { Link, useForm } from '@inertiajs/react';

export default function TodayTasks({ tasks, overdueCount }: { tasks: Task[], overdueCount: number }) {
    const { patch } = useForm();

    const handleComplete = (taskId: number) => {
        patch(route('tasks.complete', taskId), {
            preserveScroll: true,
        });
    };

    return (
        <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-border flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-text flex items-center gap-2">
                    Tugas Hari Ini
                    {tasks.length > 0 && (
                        <span className="bg-accent/10 text-accent text-xs font-bold px-2 py-0.5 rounded-full">
                            {tasks.length}
                        </span>
                    )}
                </h3>
                {overdueCount > 0 && (
                    <Link href={route('deadlines.index')} className="text-xs font-bold text-urgent bg-urgent/10 px-2 py-1 rounded">
                        {overdueCount} OVERDUE
                    </Link>
                )}
            </div>

            {tasks.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-text-muted text-sm">
                    Hore! Tidak ada tugas deadline hari ini.
                </div>
            ) : (
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-gray-300 transition group bg-white">
                            <button 
                                onClick={() => handleComplete(task.id)}
                                className="mt-0.5 w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center text-transparent hover:border-success hover:text-success transition-colors"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                            </button>
                            
                            <div className="flex-1">
                                <div className="flex justify-between items-start gap-2">
                                    <div className="font-medium text-text">{task.title}</div>
                                    <div className="text-xs font-semibold text-text-muted bg-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                                        {format(new Date(task.deadline), 'HH:mm')}
                                    </div>
                                </div>
                                <div className="text-xs mt-1 flex items-center gap-2">
                                    <span className="flex items-center gap-1 font-medium text-text-secondary">
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: task.course?.color }}></span>
                                        {task.course?.name}
                                    </span>
                                    {task.priority === 'urgent' && (
                                        <span className="text-urgent font-bold uppercase text-[10px] tracking-wider">Urgent</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
