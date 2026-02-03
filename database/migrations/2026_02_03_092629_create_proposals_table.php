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
        Schema::create('proposals', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('job_id');
            $table->unsignedBigInteger('freelancer_id')->index('proposals_freelancer_id_foreign');
            $table->text('cover_letter');
            $table->decimal('bid_amount', 12);
            $table->integer('bid_connects')->default(0);
            $table->enum('status', ['pending', 'shortlisted', 'accepted', 'rejected', 'withdrawn'])->default('pending');
            $table->integer('estimated_days')->nullable();
            $table->timestamps();

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
