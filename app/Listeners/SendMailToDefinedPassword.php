<?php

namespace LacosDaCris\Listeners;

use LacosDaCris\Events\UserCreatedEvent;
use LacosDaCris\Models\User;
use Notification;

class SendMailToDefinedPassword
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserCreatedEvent  $event
     * @return void
     */
    public function handle(UserCreatedEvent $event)
    {
        /** @var User $user */
        $user = $event->getUser();
        $token = \Password::broker()->createToken($user);

        $user->sendPasswordResetNotification($token);
        //$user->notify(new Notification($token));
    }
}
