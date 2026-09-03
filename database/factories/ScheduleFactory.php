<?php

namespace Database\Factories;

use App\Models\Schedule;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Schedule>
 */
use App\Models\User;
use App\Models\Course;

class ScheduleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'course_id' => Course::factory(),
            'day_of_week' => fake()->numberBetween(0, 6),
            'start_time' => '08:00',
            'end_time' => '09:40',
            'room' => fake()->word(),
            'lecturer' => fake()->name(),
        ];
    }
}
