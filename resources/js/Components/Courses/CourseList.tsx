import { Course } from '@/types';
import CourseForm from './CourseForm';
import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function CourseList({ courses }: { courses: Course[] }) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const deleteCourse = (id: number) => {
        if (confirm('Are you sure you want to delete this course? All associated tasks and schedules will be deleted.')) {
            router.delete(route('courses.destroy', id));
        }
    };

    return (
        <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                {courses.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No courses added yet.</div>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {courses.map(course => (
                            <li key={course.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                {editingId === course.id ? (
                                    <CourseForm 
                                        course={course} 
                                        onSuccess={() => setEditingId(null)} 
                                        onCancel={() => setEditingId(null)} 
                                    />
                                ) : (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: course.color }}></div>
                                            <div>
                                                <p className="font-medium text-gray-900">{course.name}</p>
                                                {course.code && <p className="text-xs text-gray-500">{course.code}</p>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setEditingId(course.id)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                                <Pencil size={16} />
                                            </button>
                                            <button onClick={() => deleteCourse(course.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {editingId === null && (
                <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4 shadow-sm">
                    <h3 className="font-medium text-gray-900 mb-3">Add New Course</h3>
                    <CourseForm />
                </div>
            )}
        </div>
    );
}
