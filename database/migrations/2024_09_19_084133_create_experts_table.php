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
        Schema::create('experts', function (Blueprint $table) {
            $table->id();
            $table->text('bio')->nullable();
            $table->longText('about_me')->nullable();
            $table->integer('years_of_exp')->nullable();
            $table->string('contact_detail')->nullable();
            $table->string('expertise')->nullable();
            $table->string('location')->nullable();
            $table->string('profile_picture')->nullable();
            $table->date('dob')->nullable();
            $table->foreignId('account_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experts');
    }
};
