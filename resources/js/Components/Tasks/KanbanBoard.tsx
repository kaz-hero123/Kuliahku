import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { router } from '@inertiajs/react';
import { Task } from '@/types';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
    tasks: Task[];
}

export default function KanbanBoard({ tasks: initialTasks }: KanbanBoardProps) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    // Sync state if props change (e.g. after a task is added/deleted via other means)
    useEffect(() => {
        setTasks(initialTasks);
    }, [initialTasks]);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const task = tasks.find((t) => t.id.toString() === draggableId);
        if (!task) return;

        const newStatus = destination.droppableId as Task['status'];
        
        // Optimistic UI update
        const newTasks = Array.from(tasks);
        const taskIndex = newTasks.findIndex(t => t.id === task.id);
        
        if (taskIndex !== -1) {
            newTasks[taskIndex] = { ...task, status: newStatus };
            setTasks(newTasks);
        }

        // Send to backend
        if (task.status !== newStatus) {
            router.patch(route('tasks.updateStatus', task.id), {
                status: newStatus
            }, {
                preserveScroll: true,
                preserveState: true, // we manually manage the state
                onError: () => {
                    // Revert if error
                    setTasks(initialTasks);
                }
            });
        }
    };

    const todoTasks = tasks.filter(t => t.status === 'todo');
    const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
    const doneTasks = tasks.filter(t => t.status === 'done');

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-220px)] min-h-[500px]">
                <KanbanColumn id="todo" title="To Do" tasks={todoTasks} />
                <KanbanColumn id="in_progress" title="In Progress" tasks={inProgressTasks} />
                <KanbanColumn id="done" title="Done" tasks={doneTasks} />
            </div>
        </DragDropContext>
    );
}
