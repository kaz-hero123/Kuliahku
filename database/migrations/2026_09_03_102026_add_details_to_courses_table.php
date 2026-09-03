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
        Schema::table('courses', function (Blueprint $table) {
            $table->text('description')->nullable()->after('color');
            $table->string('lecturer_name')->nullable()->after('description');
            $table->string('lecturer_contact')->nullable()->after('lecturer_name');
            $table->string('syllabus_url')->nullable()->after('lecturer_contact');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn(['description', 'lecturer_name', 'lecturer_contact', 'syllabus_url']);
        });
    }
};
