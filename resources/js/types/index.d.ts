export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export interface Course {
    id: number;
    name: string;
    code: string | null;
    color: string;
}

export interface Schedule {
    id: number;
    course_id: number;
    course?: Course;
    day_of_week: number;
    start_time: string;
    end_time: string;
    room: string | null;
    lecturer: string | null;
}

export interface Task {
    id: number;
    course_id: number;
    course?: Course;
    title: string;
    description: string | null;
    deadline: string;
    priority: 'normal' | 'urgent';
    status: 'todo' | 'in_progress' | 'done';
    created_at: string;
    updated_at: string;
}

export interface FocusNow {
    type: 'focus' | 'classSoon' | 'empty' | 'allDone';
    task?: Task;
    reason?: string;
    nextClass?: Schedule;
    minutesUntilClass?: number;
}
