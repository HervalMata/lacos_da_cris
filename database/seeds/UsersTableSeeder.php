<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use LacosDaCris\Models\User;
use LacosDaCris\Models\UserProfile;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \File::deleteDirectory(UserProfile::photosPath(), true);
        factory(User::class, 1)->create([
            'email' => 'admin@user.com',
            'role' => User::ROLE_SELLER
        ])->each(function ($user) {
            Model::reguard();
            $user->updateWithProfile([
                'phone_number' => '+16505551234',
                'photo' => $this->getAdminPhoto()
            ]);
            Model::unguard();
        });

        factory(User::class, 1)->create([
            'email' => 'customer@user.com',
            'role' => User::ROLE_CUSTOMER
        ])->each(function ($user) {
            Model::reguard();
            $user->updateWithProfile([
                'phone_number' => '+16505551235'
            ]);
            Model::unguard();
        });

        factory(User::class, 20)->create([
            'role' => User::ROLE_CUSTOMER
        ]);
    }

    /**
     * @return UploadedFile
     */
    public function getAdminPhoto()
    {
        return new UploadedFile(
            storage_path('app/faker/users/1624_mod.png'),
            str_random(16) . '.jpg'
        );
    }
}
