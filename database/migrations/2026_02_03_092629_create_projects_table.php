<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('client_id')->index('projects_client_id_foreign');
            $table->string('title');
            $table->text('description');
            $table->string('category');
            $table->enum('budget_type', ['fixed', 'hourly'])->default('fixed');
            $table->decimal('budget_amount', 12)->nullable();
            $table->enum('experience_level', ['entry', 'intermediate', 'expert'])->default('intermediate');
            $table->string('duration')->nullable();
            $table->enum('status', ['open', 'in_progress', 'completed', 'cancelled'])->default('open');
            $table->json('skills_required')->nullable();
            $table->integer('connects_required')->default(4);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
