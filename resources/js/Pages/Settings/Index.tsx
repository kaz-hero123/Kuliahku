import AppLayout from '@/Components/Layout/AppLayout';
import { Head } from '@inertiajs/react';
import { Course, Schedule, PageProps } from '@/types';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import CourseForm from '@/Components/Courses/CourseForm';
import CourseList from '@/Components/Courses/CourseList';
import ScheduleForm from '@/Components/Schedule/ScheduleForm';
import WeeklyGrid from '@/Components/Schedule/WeeklyGrid';

interface SettingsProps extends PageProps {
    courses: Course[];
    schedules: Schedule[];
}

export default function SettingsIndex({ courses, schedules }: SettingsProps) {
    const [activeTab, setActiveTab] = useState<'courses' | 'schedule'>('courses');
    const [showForm, setShowForm] = useState(false);

    return (
        <AppLayout title="Pengaturan Akademi">
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Tabs */}
                    <div className="flex space-x-4 border-b border-border mb-6 px-4 sm:px-0">
                        <button
                            onClick={() => { setActiveTab('courses'); setShowForm(false); }}
                            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === 'courses' 
                                ? 'border-accent text-accent' 
                                : 'border-transparent text-text-secondary hover:text-text hover:border-gray-300'
                            }`}
                        >
                            Manajemen Mata Kuliah
                        </button>
                        <button
                            onClick={() => { setActiveTab('schedule'); setShowForm(false); }}
                            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === 'schedule' 
                                ? 'border-accent text-accent' 
                                : 'border-transparent text-text-secondary hover:text-text hover:border-gray-300'
                            }`}
                        >
                            Jadwal Kelas
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Header & Action Button */}
                        <div className="flex justify-between items-center px-4 sm:px-0">
                            <div>
                                <h3 className="text-lg font-semibold text-text">
                                    {activeTab === 'courses' ? 'Mata Kuliah Anda' : 'Jadwal Mingguan Anda'}
                                </h3>
                                <p className="text-sm text-text-secondary mt-1">
                                    {activeTab === 'courses' 
                                        ? 'Kelola mata kuliah untuk memberi label pada tugas dan jadwal.' 
                                        : 'Atur jadwal kelas mingguanmu agar Focus Now bisa bekerja maksimal.'}
                                </p>
                            </div>
                            <PrimaryButton onClick={() => setShowForm(!showForm)}>
                                {showForm ? 'Batal' : (activeTab === 'courses' ? '+ Mata Kuliah' : '+ Jadwal')}
                            </PrimaryButton>
                        </div>

                        {/* Forms */}
                        {showForm && activeTab === 'courses' && (
                            <div className="bg-surface p-6 rounded-lg shadow-sm border border-border">
                                <h4 className="font-semibold text-text mb-4">Tambah Mata Kuliah</h4>
                                <CourseForm onSuccess={() => setShowForm(false)} />
                            </div>
                        )}

                        {showForm && activeTab === 'schedule' && (
                            <div className="bg-surface p-6 rounded-lg shadow-sm border border-border">
                                <h4 className="font-semibold text-text mb-4">Tambah Jadwal Kelas</h4>
                                {courses.length === 0 ? (
                                    <div className="text-sm text-urgent p-4 bg-urgent/10 rounded-md">
                                        Anda harus menambahkan Mata Kuliah terlebih dahulu sebelum dapat membuat jadwal.
                                    </div>
                                ) : (
                                    <ScheduleForm courses={courses} onSuccess={() => setShowForm(false)} />
                                )}
                            </div>
                        )}

                        {/* Lists */}
                        {activeTab === 'courses' ? (
                            <CourseList courses={courses} />
                        ) : (
                            <WeeklyGrid schedules={schedules} allowDelete={true} />
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
