import AppLayout from '@/Components/Layout/AppLayout';
import PageHeader from '@/Components/Layout/PageHeader';
import TaskList from '@/Components/Tasks/TaskList';
import TaskForm from '@/Components/Tasks/TaskForm';
import { Course, Task } from '@/types';
import { useState } from 'react';

interface Props {
    tasks: Task[];
    courses: Course[];
    filters: any;
}

export default function TasksPage({ tasks, courses, filters }: Props) {
    const [showForm, setShowForm] = useState(false);

    return (
        <AppLayout title="Tasks">
            <PageHeader 
                title="Tasks" 
                description="Manage your assignments and to-dos." 
                action={
                    <button 
                        onClick={() => setShowForm(!showForm)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                        {showForm ? 'Cancel' : 'New Task'}
                    </button>
                }
            />
            
            <div className="flex flex-col gap-6">
                {showForm && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h3 className="font-medium text-gray-900 mb-4">Create New Task</h3>
                        <TaskForm courses={courses} onSuccess={() => setShowForm(false)} onCancel={() => setShowForm(false)} />
                    </div>
                )}
                
                <div>
                    <TaskList tasks={tasks} courses={courses} />
                </div>
            </div>
        </AppLayout>
    );
}
