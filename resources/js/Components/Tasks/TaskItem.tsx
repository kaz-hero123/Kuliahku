import { Task } from '@/types';
import { Calendar, CheckCircle2, Clock, Trash2, Pencil } from 'lucide-react';
import { router } from '@inertiajs/react';
import { format, isPast, isToday, isTomorrow } from 'date-fns';

interface Props {
    task: Task;
    onEdit: () => void;
}

export default function TaskItem({ task, onEdit }: Props) {
    const isDone = task.status === 'done';
    
    const completeTask = () => {
        if (!isDone) {
            router.patch(route('tasks.complete', task.id));
        }
    };
    
    const deleteTask = () => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(route('tasks.destroy', task.id));
        }
    };

    const deadlineDate = new Date(task.deadline);
    const overdue = isPast(deadlineDate) && !isDone;
    
    let deadlineText = format(deadlineDate, 'MMM d, h:mm a');
    if (isToday(deadlineDate)) deadlineText = `Today, ${format(deadlineDate, 'h:mm a')}`;
    else if (isTomorrow(deadlineDate)) deadlineText = `Tomorrow, ${format(deadlineDate, 'h:mm a')}`;

    return (
        <div className={`p-4 flex flex-col sm:flex-row gap-4 bg-white border rounded-lg transition-shadow shadow-sm hover:shadow-md ${isDone ? 'opacity-60 border-gray-200' : (task.priority === 'urgent' ? 'border-red-200' : 'border-gray-200')}`}>
            <button 
                onClick={completeTask}
                className={`mt-1 flex-shrink-0 transition-colors ${isDone ? 'text-green-500 cursor-default' : 'text-gray-300 hover:text-green-500'}`}
            >
                <CheckCircle2 size={24} />
            </button>
            
            <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: task.course?.color }}>
                        {task.course?.code || task.course?.name}
                    </span>
                    {task.priority === 'urgent' && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">Urgent</span>
                    )}
                </div>
                
                <h3 className={`font-medium ${isDone ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {task.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs">
                    <div className={`flex items-center gap-1 ${overdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                        <Calendar size={14} />
                        {deadlineText}
                        {overdue && ' (Overdue)'}
                    </div>
                </div>
            </div>
            
            <div className="flex items-start gap-2">
                <button onClick={onEdit} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Pencil size={16} />
                </button>
                <button onClick={deleteTask} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}
