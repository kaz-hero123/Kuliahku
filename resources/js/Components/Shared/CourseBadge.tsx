import { Course } from '@/types';

interface Props {
    course?: Course;
    className?: string;
}

export default function CourseBadge({ course, className = '' }: Props) {
    if (!course) return null;

    return (
        <span className={`inline-flex items-center gap-1.5 font-medium text-text-secondary ${className}`}>
            <span 
                className="w-2 h-2 rounded-full flex-shrink-0" 
                style={{ backgroundColor: course.color }}
            />
            <span className="truncate">{course.name}</span>
        </span>
    );
}
