<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Course>
 */
use App\Models\User;

class CourseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => fake()->words(3, true),
            'code' => strtoupper(fake()->bothify('??###')),
            'color' => fake()->hexColor(),
        ];
    }
}
