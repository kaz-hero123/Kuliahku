import { Schedule } from '@/types';
import CourseBadge from '@/Components/Shared/CourseBadge';
import { useForm } from '@inertiajs/react';

interface Props {
    schedules: Schedule[];
    allowDelete?: boolean;
}

export default function WeeklyGrid({ schedules, allowDelete = false }: Props) {
    const { delete: destroy } = useForm();
    
    const days = [
        { num: 0, name: 'Senin' },
        { num: 1, name: 'Selasa' },
        { num: 2, name: 'Rabu' },
        { num: 3, name: 'Kamis' },
        { num: 4, name: 'Jumat' },
        { num: 5, name: 'Sabtu' },
    ];

    const getSchedulesForDay = (dayNum: number) => {
        return schedules
            .filter(s => s.day_of_week === dayNum)
            .sort((a, b) => a.start_time.localeCompare(b.start_time));
    };

    const handleDeleteSchedule = (id: number) => {
        if (confirm('Yakin ingin menghapus jadwal ini?')) {
            destroy(route('schedules.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {days.map(day => {
                const daySchedules = getSchedulesForDay(day.num);
                const isToday = new Date().getDay() - 1 === day.num; // JS Date: 0=Sun. Our DB: 0=Mon
                
                return (
                    <div key={day.num} className={`bg-surface overflow-hidden shadow-sm sm:rounded-lg border ${isToday ? 'border-accent shadow-md ring-1 ring-accent' : 'border-border'}`}>
                        <div className={`px-6 py-4 border-b flex justify-between items-center ${isToday ? 'bg-accent/5 border-accent/20' : 'border-border'}`}>
                            <h3 className={`font-semibold ${isToday ? 'text-accent' : 'text-text'}`}>
                                {day.name} {isToday && <span className="text-xs font-normal ml-2 bg-accent text-white px-2 py-0.5 rounded-full">Hari Ini</span>}
                            </h3>
                            <span className="text-xs text-text-muted">{daySchedules.length} Kelas</span>
                        </div>
                        <div className="p-4 space-y-3 min-h-[150px]">
                            {daySchedules.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-text-muted text-sm py-8">
                                    Tidak ada kelas
                                </div>
                            ) : (
                                daySchedules.map(schedule => (
                                    <div key={schedule.id} className="p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-gray-200 transition group relative">
                                        <div className="flex justify-between items-start mb-2">
                                            <CourseBadge course={schedule.course} className="text-sm" />
                                            {allowDelete && (
                                                <button 
                                                    onClick={() => handleDeleteSchedule(schedule.id)} 
                                                    className="opacity-0 group-hover:opacity-100 text-xs text-urgent hover:underline transition-opacity"
                                                >
                                                    Hapus
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-text-secondary">
                                            <span>{schedule.start_time.substring(0,5)} - {schedule.end_time.substring(0,5)}</span>
                                            {schedule.room && <span className="bg-white px-1.5 py-0.5 rounded shadow-sm border border-gray-100">{schedule.room}</span>}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
