<?php

namespace LacosDaCris\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Http\Requests\ChatGroupUserRequest;
use LacosDaCris\Http\Resources\ChatGroupUserResource;
use LacosDaCris\Models\ChatGroup;
use LacosDaCris\Models\User;

class ChatGroupUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param ChatGroup $chat_group
     * @return ChatGroupUserResource
     */
    public function index(ChatGroup $chat_group)
    {
        return new ChatGroupUserResource($chat_group);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ChatGroupUserRequest $request
     * @param ChatGroup $chat_group
     * @return Response
     */
    public function store(ChatGroupUserRequest $request, ChatGroup $chat_group)
    {
        $chat_group->users()->attach($request->users);
        $users = User::whereIn('id', $request->users)->get();

        return response()->json(new ChatGroupUserResource($chat_group));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param ChatGroup $chat_group
     * @param User $user
     * @return Response
     */
    public function destroy(ChatGroup $chat_group, User $user)
    {
        $chat_group->users()->detach($user->id);
        return response()->json([], 204);
    }
}
