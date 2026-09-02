import { Course, Schedule } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface Props {
    courses: Course[];
    schedule?: Schedule;
    onSuccess?: () => void;
}

export default function ScheduleForm({ courses, schedule, onSuccess }: Props) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        course_id: schedule?.course_id || (courses.length > 0 ? courses[0].id : ''),
        day_of_week: schedule?.day_of_week ?? 0,
        start_time: schedule ? schedule.start_time.substring(0, 5) : '08:00',
        end_time: schedule ? schedule.end_time.substring(0, 5) : '09:40',
        room: schedule?.room || '',
        lecturer: schedule?.lecturer || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        if (schedule) {
            put(route('schedules.update', schedule.id), {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                }
            });
        } else {
            post(route('schedules.store'), {
                onSuccess: () => {
                    reset('start_time', 'end_time', 'room');
                    onSuccess?.();
                }
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Course</label>
                <select
                    value={data.course_id}
                    onChange={e => setData('course_id', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                >
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                </select>
                {errors.course_id && <p className="text-red-600 text-xs mt-1">{errors.course_id}</p>}
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Day</label>
                <select
                    value={data.day_of_week}
                    onChange={e => setData('day_of_week', parseInt(e.target.value))}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                >
                    {DAYS.map((day, i) => (
                        <option key={i} value={i}>{day}</option>
                    ))}
                </select>
                {errors.day_of_week && <p className="text-red-600 text-xs mt-1">{errors.day_of_week}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                        type="time"
                        value={data.start_time}
                        onChange={e => setData('start_time', e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                    />
                    {errors.start_time && <p className="text-red-600 text-xs mt-1">{errors.start_time}</p>}
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">End Time</label>
                    <input
                        type="time"
                        value={data.end_time}
                        onChange={e => setData('end_time', e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                    />
                    {errors.end_time && <p className="text-red-600 text-xs mt-1">{errors.end_time}</p>}
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Room (Optional)</label>
                <input
                    type="text"
                    value={data.room}
                    onChange={e => setData('room', e.target.value)}
                    placeholder="e.g. Lab 1"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.room && <p className="text-red-600 text-xs mt-1">{errors.room}</p>}
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Lecturer (Optional)</label>
                <input
                    type="text"
                    value={data.lecturer}
                    onChange={e => setData('lecturer', e.target.value)}
                    placeholder="e.g. Dr. Ahmad"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.lecturer && <p className="text-red-600 text-xs mt-1">{errors.lecturer}</p>}
            </div>

            <div className="flex justify-end pt-2">
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                    {schedule ? 'Update Schedule' : 'Add to Schedule'}
                </button>
            </div>
        </form>
    );
}
