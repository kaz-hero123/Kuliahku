import { Schedule } from '@/types';
import { format } from 'date-fns';

export default function TodayClasses({ classes }: { classes: Schedule[] }) {
    if (classes.length === 0) {
        return (
            <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-border h-full flex flex-col">
                <h3 className="text-lg font-semibold text-text mb-4">Kelas Hari Ini</h3>
                <div className="flex-1 flex items-center justify-center text-text-muted text-sm">
                    Tidak ada jadwal kelas hari ini.
                </div>
            </div>
        );
    }

    const now = new Date();
    const currentTime = format(now, 'HH:mm');

    return (
        <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold text-text mb-4">Kelas Hari Ini</h3>
            <div className="space-y-4">
                {classes.map((cls) => {
                    const isPast = cls.end_time < currentTime;
                    const isNow = cls.start_time <= currentTime && cls.end_time >= currentTime;

                    return (
                        <div 
                            key={cls.id} 
                            className={`flex gap-4 p-3 rounded-lg border-l-4 transition ${
                                isNow ? 'bg-accent/5 border-accent' : 
                                isPast ? 'opacity-50 grayscale border-border' : 'border-transparent hover:bg-gray-50'
                            }`}
                        >
                            <div className="text-right min-w-[70px]">
                                <div className={`font-semibold ${isNow ? 'text-accent' : 'text-text'}`}>
                                    {cls.start_time.substring(0, 5)}
                                </div>
                                <div className="text-xs text-text-muted">
                                    {cls.end_time.substring(0, 5)}
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold text-text flex items-center gap-2">
                                    {cls.course?.name}
                                    {isNow && <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>}
                                </div>
                                <div className="text-sm text-text-secondary">
                                    {cls.room || 'Ruangan belum diatur'} • {cls.lecturer || '-'}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
