<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Course;

class CourseController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:50',
            'color' => 'required|string|max:7',
        ]);

        $request->user()->courses()->create($validated);

        return back()->with('success', 'Mata kuliah berhasil ditambahkan.');
    }

    public function update(Request $request, Course $course)
    {
        if ($request->user()->id !== $course->user_id) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:50',
            'color' => 'required|string|max:7',
        ]);

        $course->update($validated);

        return back()->with('success', 'Mata kuliah diperbarui.');
    }

    public function destroy(Request $request, Course $course)
    {
        if ($request->user()->id !== $course->user_id) {
            abort(403);
        }

        $course->delete();

        return back()->with('success', 'Mata kuliah dihapus.');
    }
}
