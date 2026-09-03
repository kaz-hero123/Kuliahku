<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
use App\Models\User;
use App\Models\Course;

class TaskFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'course_id' => Course::factory(),
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'deadline' => fake()->dateTimeBetween('now', '+1 week'),
            'priority' => fake()->randomElement(['normal', 'urgent']),
            'status' => fake()->randomElement(['todo', 'in_progress', 'done']),
        ];
    }
}
