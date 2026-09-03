<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Course;

use App\Http\Requests\CourseRequest;

class CourseController extends Controller
{
    public function store(CourseRequest $request)
    {
        $request->user()->courses()->create($request->validated());

        return back()->with('success', 'Mata kuliah berhasil ditambahkan.');
    }

    public function show(Request $request, Course $course)
    {
        if ($request->user()->id !== $course->user_id) {
            abort(403);
        }

        $course->load(['schedules', 'tasks' => function ($query) {
            $query->orderBy('status')->orderBy('deadline');
        }]);

        return inertia('Courses/Show', [
            'course' => $course,
        ]);
    }

    public function update(CourseRequest $request, Course $course)
    {
        if ($request->user()->id !== $course->user_id) {
            abort(403);
        }

        $course->update($request->validated());

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
