<?php

namespace Database\Seeders;

use App\Models\Snippet;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SnippetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Snippet::factory(50)->create();
    }
}
