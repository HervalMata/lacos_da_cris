<?php

namespace LacosDaCris\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use LacosDaCris\Models\User;

class PhoneNumberChangeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $url;
    private $token;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->route('customers.web_phone_number_update', ['token' => $this->token]);
        return $this->view('mails.phone_number_change_email');
    }
}
