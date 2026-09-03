import { Task } from '@/types';
import TaskItem from './TaskItem';
import EmptyState from '@/Components/Shared/EmptyState';

interface Props {
    tasks: Task[];
    hideCourseBadge?: boolean;
}

export default function TaskList({ tasks, hideCourseBadge = false }: Props) {
    if (tasks.length === 0) {
        return (
            <EmptyState 
                title="Tidak ada tugas"
                description="Kamu tidak memiliki tugas yang cocok dengan filter saat ini."
            />
        );
    }

    return (
        <div className="divide-y divide-border">
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} hideCourseBadge={hideCourseBadge} />
            ))}
        </div>
    );
}
