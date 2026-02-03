<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/xxxx_xx_xx_create_jobs_table.php
    public function up(): void
    {
        Schema::create('project_listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('category'); // e.g., 'Web Development', 'Design'

            // Budgeting
            $table->enum('budget_type', ['fixed', 'hourly'])->default('fixed');
            $table->decimal('budget_amount', 12, 2)->nullable();

            // Settings & Metadata
            $table->enum('experience_level', ['entry', 'intermediate', 'expert'])->default('intermediate');
            $table->string('duration')->nullable(); // e.g., '1-3 months'
            $table->enum('status', ['open', 'in_progress', 'completed', 'cancelled'])->default('open');

            $table->json('skills_required')->nullable(); // Store tags like ["React", "Laravel"]
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
