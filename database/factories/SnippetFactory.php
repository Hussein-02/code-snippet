<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Snippet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Snippet>
 */
class SnippetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Snippet::class;
    
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'code' => $this->faker->text(200),
            'language' => $this->faker->randomElement(['PHP', 'JavaScript', 'Python', 'C++']),
            'description' => $this->faker->sentence(10),
            'is_favorite' => $this->faker->boolean(),
            'user_id' => User::factory(),
        ];
    }
}
