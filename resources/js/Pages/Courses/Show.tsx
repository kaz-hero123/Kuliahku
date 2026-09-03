import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Components/Layout/AppLayout';
import { Course, Schedule, Task } from '@/types';
import TaskList from '@/Components/Tasks/TaskList';
import WeeklyGrid from '@/Components/Schedule/WeeklyGrid';
import PrimaryButton from '@/Components/PrimaryButton';
import TaskForm from '@/Components/Tasks/TaskForm';

interface CourseShowProps {
    course: Course & {
        schedules: Schedule[];
        tasks: Task[];
    };
}

export default function CourseShow({ course }: CourseShowProps) {
    const [showTaskForm, setShowTaskForm] = useState(false);

    return (
        <AppLayout 
            title={`Workspace: ${course.name}`}
            headerAction={
                <PrimaryButton onClick={() => setShowTaskForm(!showTaskForm)}>
                    {showTaskForm ? 'Batal' : '+ Tugas Baru'}
                </PrimaryButton>
            }
        >
            <Head title={`${course.name} - Workspace`} />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Header Info Card */}
                    <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg border-l-4 p-6 border-y border-r border-border" style={{ borderLeftColor: course.color }}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold text-text mb-1">{course.name}</h2>
                                {course.code && <p className="text-text-muted text-sm mb-4 font-mono">{course.code}</p>}
                                
                                <p className="text-text-secondary text-sm max-w-2xl mb-4">
                                    {course.description || 'Belum ada deskripsi untuk mata kuliah ini.'}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/50">
                            <div>
                                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Dosen Pengampu</h4>
                                <p className="text-sm text-text">{course.lecturer_name || '-'}</p>
                                {course.lecturer_contact && <p className="text-xs text-accent mt-0.5">{course.lecturer_contact}</p>}
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Silabus & Referensi</h4>
                                {course.syllabus_url ? (
                                    <a href={course.syllabus_url} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
                                        Buka Silabus ↗
                                    </a>
                                ) : (
                                    <p className="text-sm text-text-muted">-</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {showTaskForm && (
                        <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-border">
                            <h3 className="text-lg font-semibold text-text mb-4">Tugas Baru: {course.name}</h3>
                            <TaskForm 
                                courses={[course]} 
                                defaultCourseId={course.id}
                                onSuccess={() => setShowTaskForm(false)} 
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Tasks */}
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                                    Tugas Mata Kuliah
                                    <span className="bg-bg text-text-muted text-xs px-2 py-0.5 rounded-full font-medium">
                                        {course.tasks.length}
                                    </span>
                                </h3>
                                <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg border border-border">
                                    {course.tasks.length > 0 ? (
                                        <TaskList tasks={course.tasks} hideCourseBadge />
                                    ) : (
                                        <div className="p-12 text-center text-text-muted">
                                            <p>Belum ada tugas untuk mata kuliah ini.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Schedule Info */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-text mb-4">Jadwal Kelas</h3>
                                <div className="bg-surface shadow-sm sm:rounded-lg border border-border p-4">
                                    {course.schedules.length > 0 ? (
                                        <div className="space-y-4">
                                            {course.schedules.map(schedule => {
                                                const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
                                                const dayName = days[schedule.day_of_week] || 'Unknown';
                                                return (
                                                    <div key={schedule.id} className="flex justify-between items-center border-b border-border/50 pb-3 last:border-0 last:pb-0">
                                                        <div>
                                                            <p className="font-semibold text-text text-sm">{dayName}</p>
                                                            <p className="text-xs text-text-muted mt-0.5">{schedule.start_time.substring(0,5)} - {schedule.end_time.substring(0,5)}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            {schedule.room && <span className="px-2 py-1 bg-bg border border-border text-xs rounded-md text-text-secondary">{schedule.room}</span>}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-text-muted text-center py-4">Tidak ada jadwal terdaftar.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
