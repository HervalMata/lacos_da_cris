<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 23/04/2019
 * Time: 15:46
 */

namespace LacosDaCris\Firebase;


use Illuminate\Http\UploadedFile;
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
                $this->upload($data['content']);
                $uploadFile = $data['content'];
                $fileUrl = $this->groupFilesDir() . '/' . $uploadFile->buildFileName($uploadFile);
                $data['content'] = $fileUrl;
        }

        $reference = $this->getMessagesReference();
        $newReference = $reference->push([
            'type'   => $data['type'],
            'content'   => $data['content'],
            'created_at'   => ['.sv' => 'timestamp'],
            'user_id'   => $data['firebase_uid'],
        ]);

        $this->setLastMessage($newReference->getKey());
    }

    /**
     * @param UploadedFile $file
     */
    private function upload(UploadedFile $file)
    {
        $file->store($this->groupFilesDir(), $this->buildFileName($file), ['disk' => 'public']);
    }

    /**
     * @return Reference
     */
    private function getMessagesReference()
    {
        $path = "{$this->getChatGroupsMessagesReference()}/messages";
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

    /**
     * @return string
     */
    private function groupFilesDir()
    {
        return ChatGroup::DIR_CHAT_GROUPS . '/' . $this->chatGroup->id . '/messages_files';
    }

    /**
     * @param UploadedFile $file
     * @return string
     */
    private function buildFileName(UploadedFile $file)
    {
        switch ($file->getMimeType()) {
            case 'audio/x-hx-aac-adts':
                return "{$file->hashName()}aac";
            default:
                return $file->hashName();
        }
    }

    private function setLastMessage($messageUid)
    {
        $path = "{$this->getChatGroupsMessagesReference()}/last_message_id";
        $reference = $this->getFirebaseDatabase()->getReference($path);
        $reference->set($messageUid);

    }

    private function getChatGroupsMessagesReference()
    {
        return "/chat_groups_messages/{$this->chatGroup->id}";
    }
}