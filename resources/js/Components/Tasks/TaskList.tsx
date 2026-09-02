import { Course, Task } from '@/types';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { useState } from 'react';

interface Props {
    tasks: Task[];
    courses: Course[];
}

export default function TaskList({ tasks, courses }: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);

    if (tasks.length === 0) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
                <p className="text-gray-500">No tasks found. You're all caught up!</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tasks.map(task => (
                editingId === task.id ? (
                    <div key={task.id} className="bg-white border border-blue-200 rounded-lg p-4 shadow-sm">
                        <TaskForm 
                            courses={courses} 
                            task={task} 
                            onSuccess={() => setEditingId(null)} 
                            onCancel={() => setEditingId(null)} 
                        />
                    </div>
                ) : (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        onEdit={() => setEditingId(task.id)} 
                    />
                )
            ))}
        </div>
    );
}
