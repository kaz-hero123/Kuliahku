import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from '@/types';
import CourseBadge from '@/Components/Shared/CourseBadge';
import TimeRemaining from '@/Components/Shared/TimeRemaining';

interface KanbanCardProps {
    task: Task;
    index: number;
}

export default function KanbanCard({ task, index }: KanbanCardProps) {
    const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'done';

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`
                        p-3 mb-2 bg-surface border rounded-md shadow-sm transition-all duration-200
                        ${snapshot.isDragging ? 'shadow-lg rotate-2 scale-105 z-50 ring-2 ring-accent' : 'hover:border-accent hover:shadow-md'}
                        ${isOverdue ? 'border-urgent bg-red-50' : 'border-border'}
                        ${task.status === 'done' ? 'opacity-70 bg-gray-50' : ''}
                    `}
                    style={provided.draggableProps.style}
                >
                    <div className="flex justify-between items-start mb-2">
                        <CourseBadge course={task.course} />
                        {task.priority === 'urgent' && (
                            <span className="text-[10px] font-bold text-urgent bg-red-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                                Urgent
                            </span>
                        )}
                    </div>
                    
                    <h4 className={`text-sm font-medium mb-2 ${task.status === 'done' ? 'line-through text-text-muted' : 'text-text'}`}>
                        {task.title}
                    </h4>
                    
                    <div className="flex justify-between items-center text-xs text-text-muted mt-2 pt-2 border-t border-border/50">
                        <TimeRemaining deadline={task.deadline} />
                    </div>
                </div>
            )}
        </Draggable>
    );
}
