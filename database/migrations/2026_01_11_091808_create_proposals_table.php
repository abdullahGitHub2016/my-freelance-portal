<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/xxxx_xx_xx_create_proposals_table.php
    public function up(): void
    {
        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            // Change 'jobs' to 'project_listings'
            $table->foreignId('job_id')
                ->constrained('project_listings')
                ->onDelete('cascade');
            $table->foreignId('freelancer_id')->constrained('users')->onDelete('cascade');

            $table->text('cover_letter');
            $table->decimal('bid_amount', 12, 2);

            // Proposal Status Logic
            $table->enum('status', ['pending', 'shortlisted', 'accepted', 'rejected', 'withdrawn'])
                ->default('pending');

            $table->integer('estimated_days')->nullable();
            $table->timestamps();

            // Prevent a freelancer from bidding on the same job twice
            $table->unique(['job_id', 'freelancer_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proposals');
    }
};
