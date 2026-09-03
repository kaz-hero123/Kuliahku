<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AIChatService
{
    /**
     * Ask a question to the AI using the user's data as context.
     */
    public static function ask(User $user, string $question): string
    {
        $context = self::buildContext($user);

        $prompt = "Kamu adalah 'Kuliahku', asisten akademik mahasiswa yang sangat cerdas, suportif, dan ramah. "
                . "Kamu membantu mahasiswa mengatur jadwal dan tugas mereka. Gunakan bahasa Indonesia yang santai tapi profesional. "
                . "Berikut adalah data jadwal kelas dan tugas pengguna saat ini:\n\n"
                . $context . "\n\n"
                . "Pertanyaan mahasiswa:\n" . $question;

        // Try Gemini API first if configured
        if ($apiKey = config('services.gemini.api_key')) {
            return self::askGemini($prompt, $apiKey);
        }

        // Try OpenAI API if configured
        if ($apiKey = config('services.openai.api_key')) {
            return self::askOpenAI($prompt, $apiKey);
        }

        // Fallback simulated response if no API keys are set (for local dev)
        Log::warning('No AI API key found. Simulating response.');
        return self::simulateResponse($question, $user);
    }

    private static function buildContext(User $user): string
    {
        $now = now();
        $context = "Waktu sekarang: " . $now->format('l, d F Y H:i') . ".\n\n";

        // Schedules
        $schedules = $user->schedules()->with('course')->get();
        if ($schedules->isNotEmpty()) {
            $context .= "Jadwal Kelas Mingguan:\n";
            $days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            foreach ($schedules as $s) {
                // Adjusting our DB 0=Mon to PHP 0=Sun mapping if needed, but our DB is 0=Mon, 1=Tue.
                // Actually our day_of_week is 0 for Senin.
                $realDay = $s->day_of_week;
                $dayName = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'][$realDay] ?? 'Unknown';
                
                $context .= "- {$dayName}: {$s->course->name} ({$s->start_time->format('H:i')} - {$s->end_time->format('H:i')})\n";
            }
        } else {
            $context .= "Belum ada jadwal kelas yang ditambahkan.\n";
        }

        $context .= "\n";

        // Tasks
        $tasks = $user->tasks()->active()->with('course')->orderBy('deadline')->get();
        if ($tasks->isNotEmpty()) {
            $context .= "Daftar Tugas Aktif (Belum Selesai):\n";
            foreach ($tasks as $t) {
                $status = $t->deadline < $now ? '[OVERDUE] ' : '';
                $prio = $t->priority === 'urgent' ? ' [URGENT]' : '';
                $context .= "- {$status}{$t->title} (Matkul: {$t->course->name}). Deadline: {$t->deadline->format('d M Y H:i')}{$prio}\n";
            }
        } else {
            $context .= "Saat ini tidak ada tugas yang belum selesai. Semua bersih!\n";
        }

        return $context;
    }

    private static function askGemini(string $prompt, string $apiKey): string
    {
        try {
            $response = Http::post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={$apiKey}", [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ]
            ]);

            if ($response->successful()) {
                return $response->json('candidates.0.content.parts.0.text') ?? 'Maaf, saya tidak mengerti.';
            }

            Log::error('Gemini API Error: ' . $response->body());
            return 'Maaf, terjadi kesalahan saat menghubungi server AI.';
        } catch (\Exception $e) {
            Log::error('Gemini Exception: ' . $e->getMessage());
            return 'Maaf, saya sedang mengalami gangguan sistem.';
        }
    }

    private static function askOpenAI(string $prompt, string $apiKey): string
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
            ])->post("https://api.openai.com/v1/chat/completions", [
                'model' => 'gpt-4o-mini',
                'messages' => [
                    ['role' => 'user', 'content' => $prompt]
                ]
            ]);

            if ($response->successful()) {
                return $response->json('choices.0.message.content') ?? 'Maaf, saya tidak mengerti.';
            }

            Log::error('OpenAI API Error: ' . $response->body());
            return 'Maaf, terjadi kesalahan saat menghubungi server AI.';
        } catch (\Exception $e) {
            Log::error('OpenAI Exception: ' . $e->getMessage());
            return 'Maaf, saya sedang mengalami gangguan sistem.';
        }
    }

    private static function simulateResponse(string $question, User $user): string
    {
        $lower = strtolower($question);
        if (str_contains($lower, 'kelas') || str_contains($lower, 'jadwal')) {
            return "Sepertinya kamu bertanya tentang jadwal. (Catatan: Ini adalah mode simulasi offline karena API Key AI belum diatur).";
        }
        
        if (str_contains($lower, 'tugas') || str_contains($lower, 'deadline')) {
            $count = $user->tasks()->active()->count();
            return "Kamu punya {$count} tugas yang belum selesai. (Catatan: Ini adalah mode simulasi offline).";
        }

        return "Maaf, karena kunci API AI belum dikonfigurasi, saya hanya bisa menjawab secara terbatas. Hubungi admin untuk mengatur `GEMINI_API_KEY` atau `OPENAI_API_KEY`.";
    }
}
