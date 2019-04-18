<?php

namespace LacosDaCris\Rules;

use Illuminate\Contracts\Validation\Rule;
use LacosDaCris\Firebase\Auth as FirebaseAuth;
use LacosDaCris\Models\UserProfile;

class PhoneNumberUnique implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $firebaseAuth = app(FirebaseAuth::class);
        try{
            $phoneNumber = $firebaseAuth->phoneNumber($value);
            $profile = UserProfile::where('phone_number', $phoneNumber)->first();
            return $profile == null;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Phone number has used..';
    }
}