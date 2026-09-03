import { formatDistanceToNow, isPast } from 'date-fns';
import { id } from 'date-fns/locale';

interface Props {
    deadline: string;
    className?: string;
}

export default function TimeRemaining({ deadline, className = '' }: Props) {
    const date = new Date(deadline);
    const overdue = isPast(date);
    
    // Custom distance string for "X hari lagi" or "terlewat X hari"
    let distanceStr = formatDistanceToNow(date, { locale: id });
    
    // Normalize string somewhat to sound natural
    if (overdue) {
        distanceStr = `Terlewat ${distanceStr}`;
    } else {
        distanceStr = `Sisa ${distanceStr}`;
    }

    return (
        <span className={`text-xs ${overdue ? 'text-urgent font-semibold' : 'text-text-secondary'} ${className}`}>
            {distanceStr}
        </span>
    );
}
