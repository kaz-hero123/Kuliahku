import { PropsWithChildren } from 'react';
import NavBar from './NavBar';
import { Head } from '@inertiajs/react';

interface Props {
    title?: string;
}

export default function AppLayout({ title, children }: PropsWithChildren<Props>) {
    return (
        <div className="min-h-screen bg-[#FAFAF8] flex flex-col md:flex-row">
            {title && <Head title={title} />}
            
            <NavBar />

            <main className="flex-1 w-full max-w-2xl mx-auto p-4 md:p-8 pb-24 md:pb-8">
                {children}
            </main>
        </div>
    );
}
