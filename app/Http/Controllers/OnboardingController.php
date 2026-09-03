<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;

class OnboardingController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()->hasCompletedOnboarding()) {
            return redirect()->route('today');
        }

        return Inertia::render('Onboarding/Index');
    }

    public function complete(Request $request)
    {
        $request->validate([
            'course_name' => 'required|string|max:255',
        ]);

        $request->user()->courses()->create([
            'name' => $request->course_name,
            'color' => '#2563EB', // Default blue
        ]);

        return redirect()->route('today')->with('success', 'Selamat datang di Kuliahku!');
    }
}
