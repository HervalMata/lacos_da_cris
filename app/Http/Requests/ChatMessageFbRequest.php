<?php

namespace LacosDaCris\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use LacosDaCris\Models\User;

class ChatMessageFbRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->groupHasUser() | $this->hasSeller();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'type' => 'required|in:text,audio,image',
            'content' => 'required'
        ];
    }

    private function groupHasUser()
    {
        $chatGroup = $this->route('chat_group');
        $user = \Auth::guard('api')->user();

        return $chatGroup->users()->where('user_id', $user->id)->exists();
    }

    private function hasSeller()
    {
        $user = \Auth::guard('api')->user();
        return $user->role == User::ROLE_SELLER;
    }
}
