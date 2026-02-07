<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('proposals', function (Blueprint $table) {
            // Renames the column to match your 'Project' model naming
            $table->renameColumn('job_id', 'project_id');
        });
    }

    public function down(): void
    {
        Schema::table('proposals', function (Blueprint $table) {
            // Rollback logic
            $table->renameColumn('project_id', 'job_id');
        });
    }
};
