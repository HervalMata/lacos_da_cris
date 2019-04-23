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

    public function create(array $data)
    {
        $type = $data['type'];

        switch ($type) {
            case 'audio';
            case 'image';
            case 'text';
        }
    }
}