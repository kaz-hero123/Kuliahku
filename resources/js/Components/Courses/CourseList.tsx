import { Course } from '@/types';
import { useForm } from '@inertiajs/react';
import EmptyState from '@/Components/Shared/EmptyState';

interface Props {
    courses: Course[];
}

export default function CourseList({ courses }: Props) {
    const { delete: destroy } = useForm();

    const handleDeleteCourse = (id: number) => {
        if (confirm('Yakin ingin menghapus mata kuliah ini? Semua tugas dan jadwal kelas yang terhubung juga akan ikut terhapus!')) {
            destroy(route('courses.destroy', id), { preserveScroll: true });
        }
    };

    if (courses.length === 0) {
        return (
            <EmptyState 
                title="Belum ada Mata Kuliah"
                description="Tambahkan mata kuliah pertamamu menggunakan form di atas."
            />
        );
    }

    return (
        <div className="bg-surface border border-border sm:rounded-lg overflow-hidden">
            <ul className="divide-y divide-border">
                {courses.map(course => (
                    <li key={course.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: course.color }}></span>
                            <div>
                                <h4 className="font-semibold text-text">{course.name}</h4>
                                {course.code && <p className="text-xs text-text-muted font-mono">{course.code}</p>}
                            </div>
                        </div>
                        <button onClick={() => handleDeleteCourse(course.id)} className="text-xs text-urgent hover:underline">
                            Hapus
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
