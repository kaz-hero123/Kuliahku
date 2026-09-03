<?php

namespace App\Http\Controllers;

use App\Services\FocusEngine;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodayController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Redirect to onboarding if no courses yet
        if (!$user->hasCompletedOnboarding()) {
            return redirect()->route('onboarding');
        }

        return Inertia::render('Today', [
            'todayClasses' => $user->schedules()
                ->today()
                ->with('course')
                ->get(),

            'tasksDueToday' => $user->tasks()
                ->dueToday()
                ->with('course')
                ->orderBy('deadline')
                ->get(),

            'focusNow' => FocusEngine::recommend($user),

            'upcomingDeadlines' => $user->tasks()
                ->upcoming()
                ->with('course')
                ->take(3)
                ->get(),

            'overdueCount' => $user->tasks()->overdue()->count(),
        ]);
    }
}
