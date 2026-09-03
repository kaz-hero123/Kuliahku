import { Task } from '@/types';
import DeadlineItem from './DeadlineItem';

interface Props {
    title: string;
    tasks: Task[];
    type?: 'overdue' | 'normal' | 'muted';
}

export default function DeadlineGroup({ title, tasks, type = 'normal' }: Props) {
    if (tasks.length === 0) return null;

    return (
        <div className="mb-8 last:mb-0">
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 ${
                type === 'overdue' ? 'text-urgent' : 
                type === 'muted' ? 'text-text-muted' : 'text-text-secondary'
            }`}>
                {title} ({tasks.length})
            </h3>
            
            <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg border border-border">
                <div className="divide-y divide-border">
                    {tasks.map(task => (
                        <DeadlineItem key={task.id} task={task} type={type} />
                    ))}
                </div>
            </div>
        </div>
    );
}
