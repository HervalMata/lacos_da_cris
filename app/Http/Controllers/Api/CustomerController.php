<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 18/04/2019
 * Time: 00:21
 */

namespace LacosDaCris\Http\Controllers\Api;


use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Firebase\Auth as FirebaseAuth;
use LacosDaCris\Http\Requests\CustomerRequest;
use LacosDaCris\Models\User;

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
     * @param $token
     * @return string
     */
    private function getPhoneNumber($token)
    {
        $firebaseAuth = app(FirebaseAuth::class);
        return $firebaseAuth->phoneNumber($token);
    }
}