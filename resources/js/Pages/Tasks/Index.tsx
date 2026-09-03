import AppLayout from '@/Components/Layout/AppLayout';
import { useState } from 'react';
import { TasksPageProps } from '@/types';
import TaskForm from '@/Components/Tasks/TaskForm';
import TaskList from '@/Components/Tasks/TaskList';
import KanbanBoard from '@/Components/Tasks/KanbanBoard';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function TasksIndex({ tasks, courses, filters }: TasksPageProps) {
    const [showForm, setShowForm] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

    return (
        <AppLayout 
            title="Daftar Tugas"
            headerAction={
                <div className="flex gap-3">
                    <div className="flex bg-surface rounded-md border border-border p-0.5">
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${viewMode === 'list' ? 'bg-bg text-text shadow-sm' : 'text-text-muted hover:text-text'}`}
                        >
                            List
                        </button>
                        <button 
                            onClick={() => setViewMode('kanban')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${viewMode === 'kanban' ? 'bg-bg text-text shadow-sm' : 'text-text-muted hover:text-text'}`}
                        >
                            Board
                        </button>
                    </div>
                    <PrimaryButton onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Batal' : '+ Tugas Baru'}
                    </PrimaryButton>
                </div>
            }
        >
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {showForm && (
                        <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-border mb-6">
                            <h3 className="text-lg font-semibold text-text mb-4">Tugas Baru</h3>
                            <TaskForm 
                                courses={courses} 
                                onSuccess={() => setShowForm(false)} 
                            />
                        </div>
                    )}

                    {viewMode === 'list' ? (
                        <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg border border-border">
                            <TaskList tasks={tasks} />
                        </div>
                    ) : (
                        <KanbanBoard tasks={tasks} />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
