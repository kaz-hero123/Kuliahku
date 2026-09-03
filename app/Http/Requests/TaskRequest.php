<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Validation\Rule;

class TaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->courses()->where('id', $this->input('course_id'))->exists();
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'course_id' => ['required', 'exists:courses,id'],
            'deadline' => ['required', 'date'],
            'priority' => ['required', Rule::in(['normal', 'urgent'])],
            'status' => ['required', Rule::in(['todo', 'in_progress', 'done'])],
        ];
    }
}
