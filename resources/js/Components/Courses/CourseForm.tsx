import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

interface Props {
    onSuccess?: () => void;
}

export default function CourseForm({ onSuccess }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        code: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('courses.store'), {
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
                    <InputLabel htmlFor="name" value="Nama Mata Kuliah *" />
                    <TextInput 
                        id="name" 
                        value={data.name} 
                        onChange={e => setData('name', e.target.value)} 
                        className="mt-1 block w-full" 
                        isFocused 
                        required 
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="code" value="Kode Mata Kuliah (Opsional)" />
                    <TextInput 
                        id="code" 
                        value={data.code} 
                        onChange={e => setData('code', e.target.value)} 
                        className="mt-1 block w-full" 
                        placeholder="CT101" 
                    />
                    <InputError message={errors.code} className="mt-2" />
                </div>
            </div>
            <div className="flex justify-end">
                <PrimaryButton disabled={processing}>Simpan Mata Kuliah</PrimaryButton>
            </div>
        </form>
    );
}
