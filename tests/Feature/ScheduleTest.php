<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\Course;
use App\Models\Schedule;
use App\Models\User;

class ScheduleTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_schedules(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/schedule');
        $response->assertStatus(200);
    }

    public function test_user_can_create_schedule(): void
    {
        $user = User::factory()->create();
        $course = Course::factory()->create(['user_id' => $user->id]);
        $response = $this->actingAs($user)->post('/schedules', [
            'course_id' => $course->id,
            'day_of_week' => 1,
            'start_time' => '08:00',
            'end_time' => '10:00',
        ]);
        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('schedules', ['course_id' => $course->id, 'day_of_week' => 1]);
    }

    public function test_cannot_create_schedule_for_other_user_course(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $otherCourse = Course::factory()->create(['user_id' => $otherUser->id]);
        
        $response = $this->actingAs($user)->post('/schedules', [
            'course_id' => $otherCourse->id,
            'day_of_week' => 1,
            'start_time' => '08:00',
            'end_time' => '10:00',
        ]);
        
        $response->assertStatus(403); // Since authorization in FormRequest will fail
    }
}
