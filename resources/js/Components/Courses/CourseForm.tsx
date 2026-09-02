import { Course } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Props {
    course?: Course;
    onSuccess?: () => void;
    onCancel?: () => void;
}

const COLORS = [
    '#2563EB', '#DC2626', '#16A34A', '#D97706', '#9333EA', 
    '#DB2777', '#0891B2', '#4F46E5', '#EA580C', '#65A30D'
];

export default function CourseForm({ course, onSuccess, onCancel }: Props) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: course?.name || '',
        code: course?.code || '',
        color: course?.color || COLORS[0],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        if (course) {
            put(route('courses.update', course.id), {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                }
            });
        } else {
            post(route('courses.store'), {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                }
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-4 w-full">
            <div>
                <input
                    type="text"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    placeholder="Course Name (e.g. Data Structures)"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                />
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        value={data.code}
                        onChange={e => setData('code', e.target.value)}
                        placeholder="Code (Optional)"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {errors.code && <p className="text-red-600 text-xs mt-1">{errors.code}</p>}
                </div>
                
                <div>
                    <input
                        type="color"
                        value={data.color}
                        onChange={e => setData('color', e.target.value)}
                        className="h-10 w-12 rounded-md border-gray-300 shadow-sm cursor-pointer p-1"
                    />
                </div>
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
                    {course ? 'Save' : 'Add Course'}
                </button>
            </div>
        </form>
    );
}
