<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Prism\Prism\Facades\Prism;
use Prism\Prism\Enums\Provider;

class TestAiCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-ai';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test the newly installed Prism AI skill using Gemini';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('🤖 Menghubungi otak AI Gemini Pro menggunakan skill Prism...');

        try {
            $response = Prism::text()
                ->using(Provider::Gemini, 'gemini-1.5-pro')
                ->withPrompt('Kamu adalah asisten Kuliahku. Berikan 1 kata motivasi singkat dan 1 kalimat super pendek untuk menyemangati mahasiswa yang sedang malas mengerjakan project Laravel. Format santai ala anak IT.')
                ->generate();

            $this->newLine();
            $this->info('✨ Jawaban AI:');
            $this->line($response->text);
            $this->newLine();

            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error('Gagal: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
