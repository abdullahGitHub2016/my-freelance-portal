<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\ProjectListing;
use App\Models\Proposal;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MarketplaceSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create a Test Client
        $client = User::create([
            'name' => 'John Client',
            'email' => 'client@example.com',
            'password' => Hash::make('password'),
            'role' => 'client',
        ]);

        // 2. Create a Test Freelancer
        $freelancer = User::create([
            'name' => 'Jane Freelancer',
            'email' => 'freelancer@example.com',
            'password' => Hash::make('password'),
            'role' => 'freelancer',
        ]);

        // 3. Create a Project Listing
        $project = ProjectListing::create([
            'client_id' => $client->id,
            'title' => 'Build a Laravel Website',
            'description' => 'Looking for a developer to build a site like Upwork.',
            'category' => 'Web Development',
            'budget_type' => 'fixed',
            'budget_amount' => 1200.00,
            'status' => 'open',
        ]);

        // 4. Create a Proposal linked to that Project
        Proposal::create([
            'job_id' => $project->id,
            'freelancer_id' => $freelancer->id,
            'cover_letter' => 'I am an expert in Laravel and React with 5 years experience.',
            'bid_amount' => 1100.00,
            'estimated_days' => 14,
            'status' => 'pending',
        ]);
    }
}

