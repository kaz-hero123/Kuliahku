<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Schedule extends Model
{
    protected $fillable = ['course_id', 'day_of_week', 'start_time', 'end_time', 'room', 'lecturer'];

    protected function casts(): array
    {
        return [
            'start_time' => 'datetime:H:i',
            'end_time'   => 'datetime:H:i',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function scopeToday(Builder $query): void
    {
        // Carbon: 0=Sun, 1=Mon. We store 0=Mon, so convert.
        $dayOfWeek = now()->dayOfWeekIso - 1; // ISO: 1=Mon → 0=Mon
        $query->where('day_of_week', $dayOfWeek)
            ->orderBy('start_time');
    }
}
