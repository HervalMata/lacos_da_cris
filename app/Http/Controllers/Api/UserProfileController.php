<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 18/04/2019
 * Time: 01:04
 */

namespace LacosDaCris\Http\Controllers\Api;


use Illuminate\Http\Request;
use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Firebase\Auth as FirebaseAuth;
use LacosDaCris\Http\Resources\UserResource;

class UserProfileController extends Controller
{
    /**
     * @param Request $request
     * @return UserResource
     */
    public function update(Request $request)
    {
        $data = $request->all();
        if ($request->has('token')) {
            $token = $request->token;
            $data["phone_number"] = $this->getPhoneNumber($token);
        }

        $data['photo'] = $data['photo'] ?? null;
        $user = \Auth::guard('api')->user();
        $user->updateWithProfile($data);

        return new UserResource($user);
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