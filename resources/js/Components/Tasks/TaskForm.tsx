import { Course, Task } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Props {
    courses: Course[];
    task?: Task;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function TaskForm({ courses, task, onSuccess, onCancel }: Props) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: task?.title || '',
        description: task?.description || '',
        course_id: task?.course_id || (courses.length > 0 ? courses[0].id : ''),
        deadline: task?.deadline ? new Date(task.deadline).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
        priority: task?.priority || 'normal',
        status: task?.status || 'todo',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        if (task) {
            put(route('tasks.update', task.id), {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                }
            });
        } else {
            post(route('tasks.store'), {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                }
            });
        }
    };

    if (courses.length === 0) {
        return (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center text-sm text-gray-500">
                You need to add a course first before creating a task.
            </div>
        );
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                <input
                    type="text"
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                    placeholder="e.g. Read chapter 4"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                />
                {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Course</label>
                <select
                    value={data.course_id}
                    onChange={e => setData('course_id', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                >
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                </select>
                {errors.course_id && <p className="text-red-600 text-xs mt-1">{errors.course_id}</p>}
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Deadline</label>
                <input
                    type="datetime-local"
                    value={data.deadline}
                    onChange={e => setData('deadline', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                />
                {errors.deadline && <p className="text-red-600 text-xs mt-1">{errors.deadline}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Priority</label>
                    <select
                        value={data.priority}
                        onChange={e => setData('priority', e.target.value as 'normal' | 'urgent')}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>
                
                {task && (
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={data.status}
                            onChange={e => setData('status', e.target.value as 'todo' | 'in_progress' | 'done')}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
                {onCancel && (
                    <button 
                        type="button" 
                        onClick={onCancel}
                        className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                    {task ? 'Save' : 'Add Task'}
                </button>
            </div>
        </form>
    );
}
