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
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('user_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('role',['user', 'expert','admin'])->default('user');
            $table->string('profile_picture')->nullable();
            $table->date('dob')->nullable();
            $table->boolean('status')->default(1);   
            $table->timestamp('joined_at')->useCurrent();
            $table->foreignId('admin_id')->constrained();
            $table->foreignId('zodiac_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
