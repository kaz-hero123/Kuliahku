<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\Course;
use App\Models\Task;
use App\Models\User;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_tasks(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/tasks');
        $response->assertStatus(200);
    }

    public function test_user_can_create_task(): void
    {
        $user = User::factory()->create();
        $course = Course::factory()->create(['user_id' => $user->id]);
        $response = $this->actingAs($user)->post('/tasks', [
            'course_id' => $course->id,
            'title' => 'Tugas 1',
            'deadline' => '2026-10-10',
            'priority' => 'normal',
            'status' => 'todo',
        ]);
        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('tasks', ['title' => 'Tugas 1', 'user_id' => $user->id]);
    }

    public function test_user_can_complete_task(): void
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id, 'status' => 'todo']);
        $response = $this->actingAs($user)->patch("/tasks/{$task->id}/complete");
        $this->assertDatabaseHas('tasks', ['id' => $task->id, 'status' => 'done']);
    }
}
