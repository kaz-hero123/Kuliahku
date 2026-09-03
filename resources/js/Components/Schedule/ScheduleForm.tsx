import { useForm } from '@inertiajs/react';
import { Course } from '@/types';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

interface Props {
    courses: Course[];
    onSuccess?: () => void;
}

export default function ScheduleForm({ courses, onSuccess }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        course_id: courses.length > 0 ? courses[0].id : '',
        day_of_week: '0',
        start_time: '08:00',
        end_time: '09:40',
        room: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('schedules.store'), {
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess();
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <InputLabel htmlFor="course_id" value="Mata Kuliah *" />
                    <select id="course_id" value={data.course_id} onChange={e => setData('course_id', e.target.value)} className="mt-1 block w-full border-border focus:border-accent focus:ring-accent rounded-md shadow-sm">
                        <option value="" disabled>Pilih...</option>
                        {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <InputError message={errors.course_id} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="day_of_week" value="Hari *" />
                    <select id="day_of_week" value={data.day_of_week} onChange={e => setData('day_of_week', e.target.value)} className="mt-1 block w-full border-border focus:border-accent focus:ring-accent rounded-md shadow-sm">
                        <option value="0">Senin</option>
                        <option value="1">Selasa</option>
                        <option value="2">Rabu</option>
                        <option value="3">Kamis</option>
                        <option value="4">Jumat</option>
                        <option value="5">Sabtu</option>
                    </select>
                    <InputError message={errors.day_of_week} className="mt-2" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <InputLabel htmlFor="start_time" value="Jam Mulai *" />
                    <TextInput type="time" id="start_time" value={data.start_time} onChange={e => setData('start_time', e.target.value)} className="mt-1 block w-full" required />
                    <InputError message={errors.start_time} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="end_time" value="Jam Selesai *" />
                    <TextInput type="time" id="end_time" value={data.end_time} onChange={e => setData('end_time', e.target.value)} className="mt-1 block w-full" required />
                    <InputError message={errors.end_time} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="room" value="Ruangan" />
                    <TextInput id="room" value={data.room} onChange={e => setData('room', e.target.value)} className="mt-1 block w-full" placeholder="R 101" />
                    <InputError message={errors.room} className="mt-2" />
                </div>
            </div>
            <div className="flex justify-end">
                <PrimaryButton disabled={processing}>Simpan Jadwal</PrimaryButton>
            </div>
        </form>
    );
}
