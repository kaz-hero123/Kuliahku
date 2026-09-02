<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Schedule;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index()
    {
        return Inertia::render('Schedule/Index', [
            'schedules' => auth()->user()->schedules()->with('course')->get(),
            'courses' => auth()->user()->courses()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'day_of_week' => 'required|integer|min:0|max:6',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'room' => 'nullable|string|max:255',
            'lecturer' => 'nullable|string|max:255',
        ]);

        if (!$request->user()->courses()->where('id', $validated['course_id'])->exists()) {
            abort(403);
        }

        $request->user()->schedules()->create($validated);

        return back()->with('success', 'Jadwal berhasil ditambahkan.');
    }

    public function update(Request $request, Schedule $schedule)
    {
        if ($request->user()->id !== $schedule->user_id) {
            abort(403);
        }

        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'day_of_week' => 'required|integer|min:0|max:6',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'room' => 'nullable|string|max:255',
            'lecturer' => 'nullable|string|max:255',
        ]);

        if (!$request->user()->courses()->where('id', $validated['course_id'])->exists()) {
            abort(403);
        }

        $schedule->update($validated);

        return back()->with('success', 'Jadwal diperbarui.');
    }

    public function destroy(Request $request, Schedule $schedule)
    {
        if ($request->user()->id !== $schedule->user_id) {
            abort(403);
        }

        $schedule->delete();

        return back()->with('success', 'Jadwal dihapus.');
    }
}
