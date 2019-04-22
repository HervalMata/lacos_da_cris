<?php

namespace LacosDaCris\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use LacosDaCris\Common\OnlyTrashed;
use LacosDaCris\Events\UserCreatedEvent;
use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Http\Filters\UserFilter;
use LacosDaCris\Http\Requests\UserRequest;
use LacosDaCris\Http\Resources\UserResource;
use LacosDaCris\Models\User;

class UsersController extends Controller
{
    use OnlyTrashed;
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $filter = app(UserFilter::class);
        $query = User::query();
        $query = $this->onlyTrashedIfRequested($request, $query);
        $filterQuery = $query->filtered($filter);
        $users = $filter->hasFilterParameter() ? $filterQuery->get() : $filterQuery->paginate(10);
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserRequest $request
     * @return UserResource
     */
    public function store(UserRequest $request)
    {
        $user = User::create($request->all());
        event(new UserCreatedEvent($user));
        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return UserResource
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserRequest $request
     * @param User $user
     * @return UserResource
     */
    public function update(UserRequest $request, User $user)
    {
        $user->fill($request->all());
        $user->save();
        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([], 204);
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    public function restore(User $user)
    {
        $user->restore();
        return response()->json([], 204);
    }
}
