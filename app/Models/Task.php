<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'course_id', 'deadline', 'priority', 'status'];

    protected function casts(): array
    {
        return [
            'deadline' => 'datetime',
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

    // Scopes
    public function scopeActive(Builder $query): void
    {
        $query->where('status', '!=', 'done');
    }

    public function scopeDueToday(Builder $query): void
    {
        $query->active()
            ->whereDate('deadline', today());
    }

    public function scopeOverdue(Builder $query): void
    {
        $query->active()
            ->where('deadline', '<', now());
    }

    public function scopeUpcoming(Builder $query): void
    {
        $query->active()
            ->where('deadline', '>=', now())
            ->orderBy('deadline');
    }
}
