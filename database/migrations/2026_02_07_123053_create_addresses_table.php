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
    Schema::create('addresses', function (Blueprint $table) {
        // Change the . to -> here
        $table->id();

        $table->foreignId('user_id')->constrained()->onDelete('cascade');

        $table->unsignedBigInteger('country_id')->nullable();
        $table->unsignedBigInteger('state_id')->nullable();
        $table->unsignedBigInteger('city_id')->nullable();

        $table->string('address_line')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
