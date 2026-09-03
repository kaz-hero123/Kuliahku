import { useForm } from '@inertiajs/react';
import { Course } from '@/types';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

interface Props {
    courses: Course[];
    defaultCourseId?: number;
    onSuccess?: () => void;
}

export default function TaskForm({ courses, defaultCourseId, onSuccess }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm<{
        title: string;
        description: string;
        course_id: number | string;
        deadline: string;
        priority: 'normal' | 'urgent';
    }>({
        title: '',
        description: '',
        course_id: defaultCourseId || (courses.length > 0 ? courses[0].id : ''),
        deadline: '',
        priority: 'normal',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('tasks.store'), {
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
                    <InputLabel htmlFor="title" value="Judul Tugas" />
                    <TextInput 
                        id="title" 
                        value={data.title} 
                        onChange={e => setData('title', e.target.value)} 
                        className="mt-1 block w-full" 
                        isFocused 
                    />
                    <InputError message={errors.title} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="course_id" value="Mata Kuliah" />
                    <select 
                        id="course_id" 
                        value={data.course_id} 
                        onChange={e => setData('course_id', e.target.value)} 
                        className="mt-1 block w-full border-border focus:border-accent focus:ring-accent rounded-md shadow-sm"
                    >
                        <option value="" disabled>Pilih Mata Kuliah...</option>
                        {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <InputError message={errors.course_id} className="mt-2" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <InputLabel htmlFor="deadline" value="Deadline" />
                    <TextInput 
                        type="datetime-local" 
                        id="deadline" 
                        value={data.deadline} 
                        onChange={e => setData('deadline', e.target.value)} 
                        className="mt-1 block w-full" 
                    />
                    <InputError message={errors.deadline} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="priority" value="Prioritas" />
                    <select 
                        id="priority" 
                        value={data.priority} 
                        onChange={e => setData('priority', e.target.value as any)} 
                        className="mt-1 block w-full border-border focus:border-accent focus:ring-accent rounded-md shadow-sm"
                    >
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgent</option>
                    </select>
                    <InputError message={errors.priority} className="mt-2" />
                </div>
            </div>
            <div>
                <InputLabel htmlFor="description" value="Catatan Tambahan (Opsional)" />
                <textarea 
                    id="description" 
                    value={data.description || ''} 
                    onChange={e => setData('description', e.target.value)} 
                    className="mt-1 block w-full border-border focus:border-accent focus:ring-accent rounded-md shadow-sm" 
                    rows={2}
                ></textarea>
            </div>
            <div className="flex justify-end">
                <PrimaryButton disabled={processing}>Simpan Tugas</PrimaryButton>
            </div>
        </form>
    );
}
