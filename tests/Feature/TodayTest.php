<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Course;
use App\Models\Task;

class TodayTest extends TestCase
{
    use RefreshDatabase;

    public function test_today_redirects_to_login_if_unauthenticated(): void
    {
        $response = $this->get('/');
        $response->assertRedirect('/login');
    }

    public function test_today_redirects_to_onboarding_if_no_courses(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/');
        $response->assertRedirect('/onboarding');
    }

    public function test_today_renders_successfully_if_onboarded(): void
    {
        $user = User::factory()->create();
        $course = Course::factory()->create(['user_id' => $user->id]);
        
        $response = $this->actingAs($user)->get('/');
        $response->assertStatus(200);
    }
}
