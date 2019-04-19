<?php

namespace LacosDaCris\Http\Controllers\Api;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use LacosDaCris\Http\Requests\ChatGroupCreateRequest;
use LacosDaCris\Http\Resources\ChatGroupResource;
use LacosDaCris\Models\ChatGroup;
use Illuminate\Http\Request;

class ChatGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        $chat_groups = ChatGroup::paginate();
        return ChatGroupResource::collection($chat_groups);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ChatGroupCreateRequest $request
     * @return ChatGroupResource
     * @throws \Exception
     */
    public function store(ChatGroupCreateRequest $request)
    {
        $chat_group = ChatGroup::createWithPhoto($request->all());
        return new ChatGroupResource($chat_group);
    }

    /**
     * Display the specified resource.
     *
     * @param  \LacosDaCris\Models\ChatGroup  $chatGroup
     * @return ChatGroupResource
     */
    public function show(ChatGroup $chat_group)
    {
        return new ChatGroupResource($chat_group);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param ChatGroup $chat_group
     * @return ChatGroupResource
     * @throws \Exception
     */
    public function update(Request $request, ChatGroup $chat_group)
    {
        $chat_group->updateWithPhoto($request->all());
        return new ChatGroupResource($chat_group);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param ChatGroup $chat_group
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(ChatGroup $chat_group)
    {
        $chat_group->delete();
        return response()->json([], 204);
    }
}
