<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 18/04/2019
 * Time: 00:21
 */

namespace LacosDaCris\Http\Controllers\Api;


use Illuminate\Http\JsonResponse;
use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Firebase\Auth as FirebaseAuth;
use LacosDaCris\Http\Requests\CustomerRequest;
use LacosDaCris\Http\Requests\PhoneNumberToUpdateRequest;
use LacosDaCris\Mail\PhoneNumberChangeMail;
use LacosDaCris\Models\User;
use LacosDaCris\Models\UserProfile;

class CustomerController extends Controller
{
    /**
     * @param CustomerRequest $request
     * @return array
     * @throws \Exception
     */
    public function store(CustomerRequest $request)
    {
        $data = $request->all();
        $token = $request->token;
        $data['phone_number'] = $this->getPhoneNumber($token);
        $data['photo'] = $data['photo'] ?? null;
        $user = User::createCustomer($data);
        return [
            'token' => \Auth::guard('api')->login($user)
        ];
    }

    /**
     * @param PhoneNumberToUpdateRequest $request
     * @return JsonResponse
     */
    public function requestPhoneNumberUpdate(PhoneNumberToUpdateRequest $request)
    {
        $user = User::whereEmail($request->email)->first();
        $phoneNumber = $this->getPhoneNumber($request->token);
        $token = UserProfile::createTokenToChangePhoneNumber($user->profile, $phoneNumber);

        \Mail::to($user)->send(new PhoneNumberChangeMail($user, $token));

        return response()->json([], 204);
    }

    /**
     * @param $token
     * @return JsonResponse
     */
    public function updatePhoneNumber($token)
    {
        UserProfile::updatePhoneNumber($token);
        return response()->json([], 204);
    }

    /**
     * @param $token
     * @return string
     */
    private function getPhoneNumber($token)
    {
        $firebaseAuth = app(FirebaseAuth::class);
        return $firebaseAuth->phoneNumber($token);
    }
}