<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 23/04/2019
 * Time: 15:46
 */

namespace LacosDaCris\Firebase;


use Kreait\Firebase\Database\Reference;
use LacosDaCris\Models\ChatGroup;

class ChatMessageFb
{
    use FirebaseSync;

    private $chatGroup;

    /**
     * @param array $data
     */
    public function create(array $data)
    {
        $this->chatGroup = $data['chat_group'];
        $type = $data['type'];

        switch ($type) {
            case 'audio';
            case 'image';
            case 'text';
        }

        $reference = $this->getMessagesReference();
        $reference->push([
            'type'   => $data['type'],
            'content'   => $data['content'],
            'created_at'   => ['.sv' => 'timestamp'],
            'user_id'   => $data['firebase_uid'],
        ]);
    }

    /**
     * @return Reference
     */
    private function getMessagesReference()
    {
        $path = "/chat_groups/{$this->chatGroup->id}/messages";
        return $this->getFirebaseDatabase()->getReference($path);
    }

    /**
     * @param ChatGroup $chatGroup
     */
    public function deleteMessages(ChatGroup $chatGroup)
    {
        $this->chatGroup = $chatGroup;
        $this->getMessagesReference()->remove();
    }
}