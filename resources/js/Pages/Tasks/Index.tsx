import AppLayout from '@/Components/Layout/AppLayout';
import { useState } from 'react';
import { TasksPageProps } from '@/types';
import TaskForm from '@/Components/Tasks/TaskForm';
import TaskList from '@/Components/Tasks/TaskList';
import PrimaryButton from '@/Components/PrimaryButton';

export default function TasksIndex({ tasks, courses, filters }: TasksPageProps) {
    const [showForm, setShowForm] = useState(false);

    return (
        <AppLayout 
            title="Daftar Tugas"
            headerAction={
                <PrimaryButton onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Batal' : '+ Tugas Baru'}
                </PrimaryButton>
            }
        >
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {showForm && (
                        <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-border">
                            <h3 className="text-lg font-semibold text-text mb-4">Tugas Baru</h3>
                            <TaskForm 
                                courses={courses} 
                                onSuccess={() => setShowForm(false)} 
                            />
                        </div>
                    )}

                    <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg border border-border">
                        <TaskList tasks={tasks} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
