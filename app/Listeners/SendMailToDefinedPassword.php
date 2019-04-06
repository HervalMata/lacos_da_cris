<?php

namespace LacosDaCris\Listeners;

use LacosDaCris\Events\UserCreatedEvent;

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
        //
    }
}
