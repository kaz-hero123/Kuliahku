<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Schedule;
use Inertia\Inertia;

use App\Http\Requests\ScheduleRequest;

class ScheduleController extends Controller
{
    public function index()
    {
        return Inertia::render('Schedule/Index', [
            'schedules' => auth()->user()->schedules()->with('course')->get(),
            'courses' => auth()->user()->courses()->get(),
        ]);
    }

    public function store(ScheduleRequest $request)
    {
        $request->user()->schedules()->create($request->validated());

        return back()->with('success', 'Jadwal berhasil ditambahkan.');
    }

    public function update(ScheduleRequest $request, Schedule $schedule)
    {
        if ($request->user()->id !== $schedule->user_id) {
            abort(403);
        }

        $schedule->update($request->validated());

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
