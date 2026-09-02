import { Schedule } from '@/types';
import { Clock, MapPin, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function WeeklyGrid({ schedules }: { schedules: Schedule[] }) {
    const deleteSchedule = (id: number) => {
        if (confirm('Are you sure you want to delete this schedule block?')) {
            router.delete(route('schedules.destroy', id));
        }
    };

    return (
        <div className="space-y-6">
            {DAYS.map((day, index) => {
                const daySchedules = schedules
                    .filter(s => s.day_of_week === index)
                    .sort((a, b) => a.start_time.localeCompare(b.start_time));

                if (daySchedules.length === 0) return null;

                return (
                    <div key={day} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                            <h3 className="font-medium text-gray-900">{day}</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {daySchedules.map(schedule => (
                                <div key={schedule.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50">
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-full min-h-[40px] rounded-full mt-1" style={{ backgroundColor: schedule.course?.color }}></div>
                                        <div>
                                            <p className="font-medium text-gray-900">{schedule.course?.name}</p>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {schedule.start_time.substring(0, 5)} - {schedule.end_time.substring(0, 5)}
                                                </div>
                                                {schedule.room && (
                                                    <div className="flex items-center gap-1">
                                                        <MapPin size={14} />
                                                        {schedule.room}
                                                    </div>
                                                )}
                                                {schedule.lecturer && (
                                                    <div className="flex items-center gap-1">
                                                        <span>{schedule.lecturer}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <button onClick={() => deleteSchedule(schedule.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}

            {schedules.length === 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
                    <p className="text-gray-500">No classes scheduled yet.</p>
                </div>
            )}
        </div>
    );
}
