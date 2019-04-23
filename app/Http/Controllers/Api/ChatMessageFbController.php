<?php

namespace LacosDaCris\Http\Controllers\Api;

use Illuminate\Http\Request;
use LacosDaCris\Firebase\ChatMessageFb;
use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Http\Requests\ChatGroupUserRequest;
use LacosDaCris\Http\Requests\ChatMessageFbRequest;
use LacosDaCris\Models\ChatGroup;

class ChatMessageFbController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param ChatMessageFbRequest $request
     * @param ChatGroup $chat_group
     * @return \Illuminate\Http\Response
     */
    public function store(ChatMessageFbRequest $request, ChatGroup $chat_group)
    {
        $firebaseUid = \Auth::guard('api')->user()->profile->firebase_uid;
        $chatMessageFb = new ChatMessageFb();
        $chatMessageFb->create([
            'firebase_uid' => $firebaseUid,
            'chat_group' => $chat_group
        ] + $request->all());

        return response()->json([], 204);
    }

}
