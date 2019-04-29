<?php

use LacosDaCris\Models\ChatGroup;

class ChatMessagesLargeFbSeeder extends ChatMessagesFbSeeder
{
    protected $numMessages = 100;


    /**
     * @return \Illuminate\Support\Collection|ChatGroup[]
     */
    protected function getChatGroups()
    {

        return ChatGroup::whereId(1)->get();
    }

}