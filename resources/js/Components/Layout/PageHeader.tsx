import { ReactNode } from 'react';
import { Head } from '@inertiajs/react';

interface Props {
    title: string;
    action?: ReactNode;
}

export default function PageHeader({ title, action }: Props) {
    return (
        <header className="bg-surface border-b border-border">
            <Head title={title} />
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-text leading-tight">{title}</h2>
                    {action && <div>{action}</div>}
                </div>
            </div>
        </header>
    );
}
