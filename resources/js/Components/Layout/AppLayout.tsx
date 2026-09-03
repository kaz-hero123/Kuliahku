import { PropsWithChildren, ReactNode } from 'react';
import NavBar from './NavBar';
import PageHeader from './PageHeader';

interface Props {
    title?: string;
    headerAction?: ReactNode;
}

export default function AppLayout({ title, headerAction, children }: PropsWithChildren<Props>) {
    return (
        <div className="min-h-screen bg-bg">
            <NavBar />
            
            {title && (
                <PageHeader title={title} action={headerAction} />
            )}

            <main>{children}</main>
        </div>
    );
}
