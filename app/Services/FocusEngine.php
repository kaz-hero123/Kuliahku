<?php

namespace App\Services;

use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Carbon;

class FocusEngine
{
    /**
     * Recommends the single most important task to work on right now,
     * taking into account urgency, priority, staleness, and the user's schedule.
     *
     * @param User $user
     * @return array|null
     */
    public static function recommend(User $user): ?array
    {
        $tasks = $user->tasks()
            ->active()
            ->with('course')
            ->get();

        if ($tasks->isEmpty()) {
            return ['type' => 'empty'];
        }

        $now = now();

        // Score each task
        $scored = $tasks->map(function (Task $task) use ($now) {
            $hoursUntilDue = $now->diffInHours($task->deadline, false);
            // diffInHours is positive if deadline is in the future, negative if in the past
            
            // 1. URGENCY (0-100)
            $urgency = match(true) {
                $hoursUntilDue < 0   => 100,  // Overdue
                $hoursUntilDue < 12  => 95,   // Due within 12h
                $hoursUntilDue < 24  => 90,   // Due today
                $hoursUntilDue < 48  => 70,   // Due tomorrow
                $hoursUntilDue < 72  => 50,   // Due in 2-3 days
                $hoursUntilDue < 168 => 30,   // Due this week
                default              => 10,   // Due later
            };

            // 2. PRIORITY BOOST
            $priorityBoost = $task->priority === 'urgent' ? 20 : 0;

            // 3. STALENESS (older tasks get slight boost)
            $daysOld = $task->created_at->diffInDays($now);
            $staleness = min($daysOld, 5);

            $score = $urgency + $priorityBoost + $staleness;

            // Generate reason
            $reasons = [];
            if ($hoursUntilDue < 0) {
                $reasons[] = 'Sudah lewat deadline';
            } elseif ($hoursUntilDue < 24) {
                $reasons[] = 'Deadline hari ini';
            } elseif ($hoursUntilDue < 48) {
                $reasons[] = 'Deadline besok';
            } else {
                $reasons[] = 'Deadline dalam ' . ceil($hoursUntilDue / 24) . ' hari';
            }

            if ($priorityBoost > 0) {
                $reasons[] = 'Prioritas urgent';
            }

            return [
                'task'    => $task,
                'score'   => $score,
                'reason'  => implode(' · ', $reasons),
            ];
        })->sortByDesc('score');

        $top = $scored->first();

        // Check if student has class soon
        $nextClass = $user->schedules()
            ->today()
            ->with('course')
            ->where('start_time', '>', $now->format('H:i:s'))
            ->orderBy('start_time')
            ->first();

        if ($nextClass) {
            $classStartTime = $now->copy()->setTimeFromTimeString($nextClass->start_time->format('H:i:s'));
            $minutesUntilClass = $now->diffInMinutes($classStartTime, false);

            if ($minutesUntilClass > 0 && $minutesUntilClass < 60) {
                return [
                    'type'              => 'classSoon',
                    'task'              => $top['task'],
                    'reason'            => $top['reason'],
                    'nextClass'         => $nextClass,
                    'minutesUntilClass' => $minutesUntilClass,
                ];
            }
        }

        return [
            'type'   => 'focus',
            'task'   => $top['task'],
            'reason' => $top['reason'],
        ];
    }
}
