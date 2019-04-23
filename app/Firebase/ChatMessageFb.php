<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 23/04/2019
 * Time: 15:46
 */

namespace LacosDaCris\Firebase;


class ChatMessageFb
{
    use FirebaseSync;

    private $chatGroup;

    public function create(array $data)
    {
        $this->chatGroup = $data['chat_group'];
        $type = $data['type'];

        switch ($type) {
            case 'audio';
            case 'image';
            case 'text';
        }

        $reference = $this->getMessageReference();
        $reference->push([
            'type'   => $data['type'],
            'content'   => $data['content'],
            'created_at'   => ['.sv' => 'timestamp'],
            'user_id'   => $data['firebase_uid'],
        ]);
    }

    private function getMessageReference()
    {
        $path = "/chat_groups/{$this->chatGroup->id}/messages";
        return $this->getFirebaseDatabase()->getReference($path);
    }
}