<?php

use Illuminate\Database\Seeder;
use LacosDaCris\Models\ChatGroup;
use Illuminate\Support\Collection;
use Illuminate\Http\UploadedFile;
use LacosDaCris\Models\User;

class ChatGroupsTableSeeder extends Seeder
{
    private $allFakerPhotos;
    private $fakerPhotosPath = 'app/faker/chat_groups';

    /**
     *
     */
    public function run()
    {
        $this->allFakerPhotos = $this->getFakerPhotos();
        $this->deleteAllPhotosInChatGroupsPath();
        $self = $this;
        $customerDefault = User::whereEmail('customer@user.com')->first();
        /** @var \Illuminate\Database\Eloquent\Collection $otherCustomers */

        $otherCustomers = User
            ::whereRole(User::ROLE_CUSTOMER)
            ->whereNotIn('id', [$customerDefault->id])->get();
        factory(ChatGroup::class, 10)
            ->make()
            ->each(function ($group) use($self, $otherCustomers){
                $group = ChatGroup::createWithPhoto([
                    'name' => $group->name,
                    'photo' => $self->getUploadedFile()
                ]);
                $customerId = $otherCustomers
                    ->random(10)
                    ->pluck('id')->toArray();

                $group->users()->attach($customerId);
            });
    }

    /**
     * @return Collection
     */
    private function getFakerPhotos(): Collection
    {
        $path = storage_path($this->fakerPhotosPath);
        return collect(\File::allFiles($path));
    }

    /**
     *
     */
    private function deleteAllPhotosInChatGroupsPath(){
        $path = ChatGroup::CHAT_GROUP_PHOTO_PATH;
        \File::deleteDirectory(storage_path($path), true);
    }

    /**
     * @return UploadedFile
     */
    private function getUploadedFile(){
        /** @var SplFileInfo $photoFile */
        $photoFile = $this->allFakerPhotos->random();
        $uploadFile = new \Illuminate\Http\UploadedFile(
            $photoFile->getRealPath(),
            str_random(16) . '.' . $photoFile->getExtension()
        );
        return $uploadFile;
    }

}
