<?php

namespace LacosDaCris\Http\Controllers\Api;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Http\Resources\UserResource;
use LacosDaCris\Firebase\Auth as FirebaseAuth;
use LacosDaCris\Models\UserProfile;
use LacosDaCris\Rules\FirebaseTokenVerification;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    /**
     * @param Request $request
     * @return array|JsonResponse
     */
    public function login(Request $request)
    {
        $this->validateLogin($request);
        $credentials = $this->credentials($request);
        $token = \JWTAuth::attempt($credentials);
        return $this->responseToken($token);
    }

    /**
     * @param Request $request
     * @return array|JsonResponse
     */
    public function loginFirebase(Request $request)
    {
        $this->validate($request, [
            'token' => new FirebaseTokenVerification()
        ]);

        /** @var FirebaseAuth $firebaseAuth */
        $firebaseAuth = app(FirebaseAuth::class);
        $user = $firebaseAuth->user($request->token);
        $profile = UserProfile::where('phone_number', $user->phoneNumber)->first();
        $token = null;

        if ($profile) {
            $token = \Auth::guard('api')->login($profile->user);
        }

        return $this->responseToken($token);
    }

    /**
     * @return JsonResponse
     */
    public function logout()
    {
        \Auth::guard('api')->logout();
        return response()->json([], 204);
    }

    /**
     * @return UserResource
     */
    public function me()
    {
        $user = \Auth::guard('api')->user();
        return new UserResource($user);
    }

    /**
     * @return array
     */
    public function refresh()
    {
        $token = \Auth::guard('api')->refresh();
        return ['token' => $token];
    }

    /**
     * @param $token
     * @return array|JsonResponse
     */
    private function responseToken($token)
    {
        return $token ?
            ['token' => $token] :
            response()->json([
                'error' => \Lang::get('auth.failed')
            ], 400);
    }
}
