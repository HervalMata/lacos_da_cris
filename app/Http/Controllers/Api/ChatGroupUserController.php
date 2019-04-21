<?php

namespace LacosDaCris\Http\Controllers\Api;

use Illuminate\Http\Request;
use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Http\Resources\ChatGroupUserResource;
use LacosDaCris\Models\ChatGroup;

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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
