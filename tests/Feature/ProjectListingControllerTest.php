<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

class ProjectControllerTest extends TestCase
{
    use RefreshDatabase; // Resets the database for every test run

    protected function setUp(): void
    {
        parent::setUp();
        // Create a user and authenticate them for all tests in this file
        $this->actingAs(User::factory()->create(['role' => 'freelancer']));
    }

    /** @test */
    public function find_work_page_renders_with_correct_component()
    {
        $this->get(route('jobs.index'))
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Projects/SearchResults')
                ->has('jobs.data')
            );
    }

    /** @test */
    public function budget_filter_returns_only_matching_projects()
    {
        // 1. Create projects with different budgets
        Project::factory()->create(['title' => 'Cheap Job', 'budget_amount' => 50]);
        Project::factory()->create(['title' => 'Expensive Job', 'budget_amount' => 5000]);

        // 2. Request page with min_budget filter
        $response = $this->get(route('jobs.index', ['min_budget' => 1000]));

        // 3. Assert only the expensive job is present
        $response->assertInertia(fn (Assert $page) => $page
            ->has('jobs.data', 1)
            ->where('jobs.data.0.title', 'Expensive Job')
        );
    }

    /** @test */
    public function experience_level_filter_works()
    {
        Project::factory()->create(['experience_level' => 'Entry Level']);
        Project::factory()->create(['experience_level' => 'Expert']);

        $response = $this->get(route('jobs.index', ['experience_levels' => ['Expert']]));

        $response->assertInertia(fn (Assert $page) => $page
            ->has('jobs.data', 1)
            ->where('jobs.data.0.experience_level', 'Expert')
        );
    }
}
