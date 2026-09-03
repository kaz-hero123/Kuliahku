<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'code' => ['nullable', 'string', 'max:50'],
            'color' => ['required', 'string', 'max:7'],
            'description' => ['nullable', 'string'],
            'lecturer_name' => ['nullable', 'string', 'max:255'],
            'lecturer_contact' => ['nullable', 'string', 'max:255'],
            'syllabus_url' => ['nullable', 'url', 'max:2048'],
        ];
    }
}
