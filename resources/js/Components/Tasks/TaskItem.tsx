import { Task } from '@/types';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import CourseBadge from '@/Components/Shared/CourseBadge';

interface Props {
    task: Task;
}

export default function TaskItem({ task }: Props) {
    const { patch, delete: destroy } = useForm();

    const handleComplete = () => {
        patch(route('tasks.complete', task.id), { preserveScroll: true });
    };

    const handleDelete = () => {
        if (confirm('Yakin ingin menghapus tugas ini?')) {
            destroy(route('tasks.destroy', task.id), { preserveScroll: true });
        }
    };

    const isDone = task.status === 'done';

    return (
        <div className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:bg-gray-50 ${isDone ? 'opacity-60 bg-gray-50/50' : ''}`}>
            <div className="flex items-start gap-4">
                {!isDone ? (
                    <button 
                        onClick={handleComplete}
                        className="mt-1 shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-transparent hover:border-success hover:text-success transition-colors"
                        title="Tandai Selesai"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    </button>
                ) : (
                    <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-success flex items-center justify-center text-white">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                )}
                <div>
                    <h4 className={`font-semibold ${isDone ? 'text-text-muted line-through' : 'text-text'}`}>
                        {task.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                        <CourseBadge course={task.course} />
                        {task.priority === 'urgent' && !isDone && (
                            <span className="text-urgent font-bold text-xs uppercase bg-urgent/10 px-1.5 py-0.5 rounded">Urgent</span>
                        )}
                    </div>
                    {task.description && <p className="text-sm text-text-secondary mt-2">{task.description}</p>}
                </div>
            </div>
            
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 sm:gap-2">
                <div className="text-right">
                    <p className="text-sm font-medium text-text">{format(new Date(task.deadline), 'HH:mm')}</p>
                    <p className="text-xs text-text-muted">{format(new Date(task.deadline), 'dd MMM yyyy')}</p>
                </div>
                <button onClick={handleDelete} className="text-xs text-urgent hover:underline">
                    Hapus
                </button>
            </div>
        </div>
    );
}
