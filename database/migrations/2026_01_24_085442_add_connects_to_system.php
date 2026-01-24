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
        // 1. Add balance to users table
        Schema::table('users', function (Blueprint $table) {
            // Default 50 connects for new users, placed after the role column
            $table->integer('connects_balance')->default(50)->after('role');
        });

        // 2. Add cost to project_listings table
        Schema::table('project_listings', function (Blueprint $table) {
            // Defines how many connects a freelancer needs to spend to apply
            $table->integer('connects_required')->default(4)->after('skills_required');
        });

        // 3. Create connects_transactions table for a full audit trail
        Schema::create('connects_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('amount'); // Negative for spending, positive for purchasing/refunds
            $table->string('description'); // e.g., "Bid on: Build a Laravel Website"
            $table->timestamps();
        });
        
        // 4. Add bid_connects to proposals table for "Boosted" bids
        Schema::table('proposals', function (Blueprint $table) {
            $table->integer('bid_connects')->default(0)->after('bid_amount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('connects_transactions');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('connects_balance');
        });

        Schema::table('project_listings', function (Blueprint $table) {
            $table->dropColumn('connects_required');
        });

        Schema::table('proposals', function (Blueprint $table) {
            $table->dropColumn('bid_connects');
        });
    }
};