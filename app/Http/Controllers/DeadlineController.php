<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DeadlineController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $tasks = $user->tasks()->active()->with('course')->orderBy('deadline')->get();

        $now = now();
        $today = today();
        $tomorrow = today()->addDay();
        $nextWeek = today()->addDays(7);

        $grouped = [
            'overdue' => $tasks->filter(fn ($t) => $t->deadline < $now)->values(),
            'today' => $tasks->filter(fn ($t) => $t->deadline >= $now && $t->deadline < $tomorrow)->values(),
            'tomorrow' => $tasks->filter(fn ($t) => $t->deadline >= $tomorrow && $t->deadline < $today->copy()->addDays(2))->values(),
            'thisWeek' => $tasks->filter(fn ($t) => $t->deadline >= $today->copy()->addDays(2) && $t->deadline < $nextWeek)->values(),
            'later' => $tasks->filter(fn ($t) => $t->deadline >= $nextWeek)->values(),
        ];

        return Inertia::render('Deadlines/Index', [
            'groupedTasks' => $grouped
        ]);
    }
}
