import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Components/Layout/AppLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FormEventHandler } from 'react';

export default function Onboarding() {
    const { data, setData, post, processing, errors } = useForm({
        course_name: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('onboarding.complete'));
    };

    return (
        <AppLayout title="Selamat Datang">
            <div className="py-12">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-text mb-2">Selamat datang di Kuliahku! 🎉</h2>
                    <p className="text-text-secondary text-sm">
                        Mari mulai dengan menambahkan satu mata kuliah pertamamu. Kamu bisa menambahkan yang lain nanti.
                    </p>
                </div>

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="course_name" value="Nama Mata Kuliah" />

                        <TextInput
                            id="course_name"
                            type="text"
                            name="course_name"
                            value={data.course_name}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            isFocused={true}
                            onChange={(e) => setData('course_name', e.target.value)}
                            placeholder="Contoh: Algoritma Pemrograman"
                        />

                        <InputError message={errors.course_name} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-6">
                        <PrimaryButton className="w-full justify-center text-center py-3" disabled={processing}>
                            Mulai Kuliahku &rarr;
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
