import { FocusNow } from '@/types';
import { format } from 'date-fns';
import { Link, useForm } from '@inertiajs/react';

export default function FocusNowCard({ focusNow }: { focusNow: FocusNow }) {
    const { patch } = useForm();

    if (focusNow.type === 'empty') {
        return (
            <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg p-8 text-center border border-border">
                <h3 className="text-xl font-semibold text-text mb-2">Tidak ada tugas aktif! 🎉</h3>
                <p className="text-text-secondary mb-6">Waktunya bersantai, atau tambah tugas baru?</p>
                <Link
                    href={route('tasks.index')}
                    className="inline-flex items-center px-4 py-2 bg-accent border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 transition ease-in-out duration-150"
                >
                    Tambah Tugas
                </Link>
            </div>
        );
    }

    const { task, reason, type, nextClass, minutesUntilClass } = focusNow;

    const handleComplete = () => {
        if (task) {
            patch(route('tasks.complete', task.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="bg-accent overflow-hidden shadow-md sm:rounded-xl p-1 text-white">
            <div className="bg-surface/10 rounded-lg p-6 sm:p-8 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold tracking-wider uppercase bg-white/20 px-2 py-1 rounded">
                                Focus Now
                            </span>
                            {type === 'classSoon' && (
                                <span className="text-xs font-semibold bg-warning/90 px-2 py-1 rounded flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Kelas {nextClass?.course?.name} dalam {minutesUntilClass} menit
                                </span>
                            )}
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold mb-1 leading-tight">
                            {task?.title}
                        </h3>
                        <p className="text-white/80 font-medium mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: task?.course?.color }}></span>
                            {task?.course?.name}
                        </p>

                        <div className="space-y-1">
                            <p className="text-sm text-white/90 font-medium">
                                ⏰ Due: {task?.deadline ? format(new Date(task.deadline), 'dd MMM yyyy, HH:mm') : ''}
                                {task?.priority === 'urgent' && (
                                    <span className="ml-2 text-urgent font-bold bg-white/90 px-1.5 py-0.5 rounded text-xs">URGENT</span>
                                )}
                            </p>
                            <p className="text-sm text-white/70">
                                💡 Kenapa ini? {reason}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row md:flex-col gap-3 mt-4 md:mt-0 w-full md:w-auto">
                        <button
                            onClick={handleComplete}
                            className="flex-1 md:flex-none justify-center inline-flex items-center px-6 py-3 bg-white text-accent rounded-lg font-bold shadow hover:bg-gray-50 transition"
                        >
                            ✓ Selesai
                        </button>
                        <button className="flex-1 md:flex-none justify-center inline-flex items-center px-4 py-3 bg-transparent border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition">
                            → Nanti
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
