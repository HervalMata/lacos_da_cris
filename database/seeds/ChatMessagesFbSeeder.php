<?php

use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use LacosDaCris\Firebase\ChatMessageFb;
use LacosDaCris\Models\ChatGroup;
use LacosDaCris\Models\User;
use Faker\Factory as FakerFactory;

class ChatMessagesFbSeeder extends Seeder
{
    private $allfakerFilles;
    private $fakerFilesPath = 'app/faker/chat_message_files';
    protected $numMessages = 10;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $this->allfakerFilles = $this->getFakerFiles();
        /** @var EloquentCollection $chatGroups */
        $chatGroups = $this->getChatGroups();
        $users = User::all();
        $chatMessage = new ChatMessageFb();
        $self = $this;

        $chatGroups->each(function ($group) use ($users, $chatMessage, $self) {
            $chatMessage->deleteMessages($group);
            foreach (range(1, $self->numMessages) as $value) {
                $textOrFile = rand(1, 10) % 2 == 0 ? 'text' : 'file';

                if ($textOrFile == 'text') {
                    $content = FakerFactory::create()->sentence(10);
                    $type = 'text';
                } else {
                    $content = $self->getUploadFile();
                    $type = $content->getExtension() === 'aac' ? 'audio' : 'image';
                }


                $chatMessage->create([
                    'chat_group' => $group,
                    'content' => $content,
                    'type' => $type,
                    'firebase_uid' => $users->random()->profile->firebase_uid
                ]);
            }
        });
    }

    /**
     * @return Collection
     */
    private function getFakerFiles() : Collection
    {
        $path = storage_path($this->fakerFilesPath);
        return collect(\File::allFiles($path));
    }

    /**
     * @return Collection|ChatGroup[]
     */
    protected function getChatGroups()
    {
        return ChatGroup::all();
    }

    /**
     * @return UploadedFile
     */
    private function getUploadFile() : UploadedFile
    {
        $photoFile = $this->allfakerFilles->random();
        $uploadFile = new UploadedFile(
            $photoFile->getRealPath(),
            str_random(16). '.' . $photoFile->getExtension()
        );
        return $uploadFile;
    }

}