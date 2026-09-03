import { Task } from '@/types';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import CourseBadge from '@/Components/Shared/CourseBadge';

interface Props {
    task: Task;
    type?: 'overdue' | 'normal' | 'muted';
}

export default function DeadlineItem({ task, type = 'normal' }: Props) {
    const { patch } = useForm();

    const handleComplete = () => {
        patch(route('tasks.complete', task.id), { preserveScroll: true });
    };

    return (
        <div className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition ${type === 'overdue' ? 'bg-urgent/5' : ''}`}>
            <button 
                onClick={handleComplete}
                className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-transparent transition-colors ${
                    type === 'overdue' ? 'border-urgent/50 hover:border-urgent hover:text-urgent' : 'border-gray-300 hover:border-success hover:text-success'
                }`}
            >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
            </button>
            
            <div className="flex-1 min-w-0">
                <p className={`font-semibold truncate ${type === 'overdue' ? 'text-urgent' : 'text-text'}`}>
                    {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-text-secondary">
                    <CourseBadge course={task.course} />
                    {task.priority === 'urgent' && (
                        <>
                            <span>•</span>
                            <span className="text-urgent font-bold">URGENT</span>
                        </>
                    )}
                </div>
            </div>

            <div className="text-right shrink-0">
                <p className={`font-medium text-sm ${type === 'overdue' ? 'text-urgent' : 'text-text'}`}>
                    {format(new Date(task.deadline), 'HH:mm')}
                </p>
                <p className="text-xs text-text-muted mt-1">
                    {format(new Date(task.deadline), 'd MMM yyyy', { locale: id })}
                </p>
            </div>
        </div>
    );
}
