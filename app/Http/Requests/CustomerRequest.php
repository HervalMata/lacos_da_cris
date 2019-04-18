<?php

namespace LacosDaCris\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use LacosDaCris\Rules\FirebaseTokenVerification;
use LacosDaCris\Rules\PhoneNumberUnique;

class CustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users,email',
            'photo' => 'image|max:' . (3 * 2014),
            'token' => [
                'required',
                new FirebaseTokenVerification(),
                new PhoneNumberUnique()
                ]
        ];
    }
}
