<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Course;
use App\Models\Task;
use App\Models\Schedule;
use App\Services\FocusEngine;

class FocusEngineTest extends TestCase
{
    use RefreshDatabase;

    public function test_focus_engine_returns_empty_when_no_tasks()
    {
        $user = User::factory()->create();
        
        $recommendation = FocusEngine::recommend($user);
        
        $this->assertEquals('empty', $recommendation['type']);
    }

    public function test_focus_engine_prioritizes_overdue_tasks()
    {
        $user = User::factory()->create();
        $course = Course::factory()->create(['user_id' => $user->id]);
        
        $taskFuture = Task::factory()->create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'deadline' => now()->addDays(2),
            'status' => 'todo'
        ]);

        $taskOverdue = Task::factory()->create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'deadline' => now()->subDay(),
            'status' => 'todo'
        ]);

        $recommendation = FocusEngine::recommend($user);
        
        $this->assertEquals('focus', $recommendation['type']);
        $this->assertEquals($taskOverdue->id, $recommendation['task']->id);
        $this->assertStringContainsString('Sudah lewat deadline', $recommendation['reason']);
    }

    public function test_focus_engine_prioritizes_urgent_tasks()
    {
        $user = User::factory()->create();
        $course = Course::factory()->create(['user_id' => $user->id]);
        
        $taskNormal = Task::factory()->create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'deadline' => now()->addDays(2),
            'priority' => 'normal',
            'status' => 'todo'
        ]);

        $taskUrgent = Task::factory()->create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'deadline' => now()->addDays(2),
            'priority' => 'urgent',
            'status' => 'todo'
        ]);

        $recommendation = FocusEngine::recommend($user);
        
        $this->assertEquals($taskUrgent->id, $recommendation['task']->id);
        $this->assertStringContainsString('Prioritas urgent', $recommendation['reason']);
    }

    public function test_focus_engine_returns_class_soon_if_class_within_an_hour()
    {
        $user = User::factory()->create();
        $course = Course::factory()->create(['user_id' => $user->id]);
        
        Task::factory()->create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'deadline' => now()->addDays(2),
            'status' => 'todo'
        ]);

        $now = now();
        $dayOfWeek = $now->dayOfWeekIso - 1;

        Schedule::factory()->create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'day_of_week' => $dayOfWeek,
            'start_time' => $now->copy()->addMinutes(30)->format('H:i'),
            'end_time' => $now->copy()->addHours(2)->format('H:i'),
        ]);

        $recommendation = FocusEngine::recommend($user);
        
        $this->assertEquals('classSoon', $recommendation['type']);
        $this->assertGreaterThanOrEqual(29, $recommendation['minutesUntilClass']);
        $this->assertLessThanOrEqual(30, $recommendation['minutesUntilClass']);
    }
}
