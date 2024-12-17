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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->longText('review_text');
            $table->integer('rating')->nullable();
            // $table->foreignId('user_id')->constrained();
            // $table->foreignId('expert_id')->constrained();

               $table->unsignedBigInteger('user_id');  // Define the account_id column
               $table->unsignedBigInteger('expert_id'); // Define the following_id column   

               $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
               $table->foreign('expert_id')->references('id')->on('experts')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
