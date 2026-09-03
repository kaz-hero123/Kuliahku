interface Props {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}

export default function EmptyState({ title, description, icon, action, className = '' }: Props) {
    return (
        <div className={`p-8 md:p-12 text-center flex flex-col items-center justify-center ${className}`}>
            {icon && (
                <div className="text-text-muted mb-4 opacity-50">
                    {icon}
                </div>
            )}
            <h4 className="text-lg font-semibold text-text mb-2">{title}</h4>
            {description && (
                <p className="text-sm text-text-secondary max-w-sm mb-6">{description}</p>
            )}
            {action && (
                <div>{action}</div>
            )}
        </div>
    );
}
