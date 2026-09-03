<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AIChatService;

class ChatController extends Controller
{
    public function ask(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:1000'
        ]);

        $reply = AIChatService::ask($request->user(), $request->message);

        return response()->json([
            'reply' => $reply
        ]);
    }
}
