import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Task } from '@/types';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
    id: string;
    title: string;
    tasks: Task[];
}

export default function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
    return (
        <div className="flex flex-col bg-bg border border-border rounded-lg overflow-hidden h-full">
            <div className="p-3 border-b border-border bg-surface flex justify-between items-center">
                <h3 className="font-semibold text-text text-sm">{title}</h3>
                <span className="bg-bg text-text-muted text-xs px-2 py-0.5 rounded-full font-medium">
                    {tasks.length}
                </span>
            </div>
            
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 p-3 min-h-[150px] transition-colors ${
                            snapshot.isDraggingOver ? 'bg-accent/5' : ''
                        }`}
                    >
                        {tasks.map((task, index) => (
                            <KanbanCard key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
