<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\Course;
use App\Models\User;

class CourseTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_course(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->post('/courses', [
            'name' => 'Matematika Dasar',
            'code' => 'MAT101',
            'color' => '#ff0000',
        ]);
        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('courses', ['name' => 'Matematika Dasar', 'user_id' => $user->id]);
    }

    public function test_user_can_update_course(): void
    {
        $user = User::factory()->create();
        $course = Course::factory()->create(['user_id' => $user->id]);
        $response = $this->actingAs($user)->put("/courses/{$course->id}", [
            'name' => 'Matematika Lanjut',
            'code' => 'MAT201',
            'color' => '#00ff00',
        ]);
        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('courses', ['name' => 'Matematika Lanjut']);
    }

    public function test_user_can_delete_course(): void
    {
        $user = User::factory()->create();
        $course = Course::factory()->create(['user_id' => $user->id]);
        $response = $this->actingAs($user)->delete("/courses/{$course->id}");
        $this->assertDatabaseMissing('courses', ['id' => $course->id]);
    }
}
