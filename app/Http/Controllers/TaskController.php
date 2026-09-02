<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Task;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = auth()->user()->tasks()->with('course');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('course')) {
            $query->where('course_id', $request->course);
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        return Inertia::render('Tasks/Index', [
            'tasks' => $query->orderBy('deadline')->get(),
            'courses' => auth()->user()->courses()->get(),
            'filters' => $request->only(['status', 'course', 'priority']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'course_id' => 'required|exists:courses,id',
            'deadline' => 'required|date',
            'priority' => 'required|in:normal,urgent',
            'status' => 'required|in:todo,in_progress,done',
        ]);

        if (!$request->user()->courses()->where('id', $validated['course_id'])->exists()) {
            abort(403);
        }

        $request->user()->tasks()->create($validated);

        return back()->with('success', 'Tugas berhasil ditambahkan.');
    }

    public function update(Request $request, Task $task)
    {
        if ($request->user()->id !== $task->user_id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'course_id' => 'required|exists:courses,id',
            'deadline' => 'required|date',
            'priority' => 'required|in:normal,urgent',
            'status' => 'required|in:todo,in_progress,done',
        ]);

        if (!$request->user()->courses()->where('id', $validated['course_id'])->exists()) {
            abort(403);
        }

        $task->update($validated);

        return back()->with('success', 'Tugas diperbarui.');
    }

    public function complete(Request $request, Task $task)
    {
        if ($request->user()->id !== $task->user_id) {
            abort(403);
        }

        $task->update(['status' => 'done']);

        return back()->with('success', 'Tugas selesai! 🎉');
    }

    public function destroy(Request $request, Task $task)
    {
        if ($request->user()->id !== $task->user_id) {
            abort(403);
        }

        $task->delete();

        return back()->with('success', 'Tugas dihapus.');
    }
}
