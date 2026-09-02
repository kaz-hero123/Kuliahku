import { ReactNode } from 'react';

interface Props {
    title: string;
    description?: string;
    action?: ReactNode;
}

export default function PageHeader({ title, description, action }: Props) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {description && (
                    <p className="text-gray-500 text-sm mt-1">{description}</p>
                )}
            </div>
            {action && (
                <div>
                    {action}
                </div>
            )}
        </div>
    );
}
