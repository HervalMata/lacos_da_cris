<?php
declare(strict_types=1);
namespace LacosDaCris\Models;

use Fico7489\Laravel\Pivot\Traits\PivotEventTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\UploadedFile;
use LacosDaCris\Firebase\FirebaseSync;

class ChatGroup extends Model
{
    use SoftDeletes, FirebaseSync, PivotEventTrait;

    const BASE_PATH       = 'app/public';
    const DIR_CHAT_GROUPS       = 'chat_groups';
    const CHAT_GROUP_PHOTO_PATH = self::BASE_PATH . '/' . self::DIR_CHAT_GROUPS;

    protected $fillable = ['name', 'photo'];
    protected $dates = ['deleted_at'];

    /**
     * @param array $data
     * @return ChatGroup
     * @throws \Exception
     */
    public static function createWithPhoto(array $data) : ChatGroup
    {
        try {
            $photo = $data['photo'];
            self::uploadPhoto($data['photo']);
            $data['photo'] = $data['photo']->hashName();
            \DB::beginTransaction();
            $chatGroup = self::create($data);
            \DB::commit();
        }catch (\Exception $e){
            //excluir a photo - roll back
            self::deleteFile($photo);
            \DB::rollBack();
            throw $e;
        }

        return $chatGroup;
    }

    /**
     * @param array $data
     * @return ChatGroup
     * @throws \Exception
     */
    public function updateWithPhoto(array $data) : ChatGroup
    {
        try {
            if(isset($data['photo'])){
                self::uploadPhoto($data['photo']);
                $this->deletePhoto();
                $data['photo'] = $data['photo']->hashName();
            }

            \DB::beginTransaction();
            $this->fill($data)->save();
            \DB::commit();
        }catch (\Exception $e){
            //excluir a photo - roll back
            if(isset($data['photo'])){
                self::deleteFile($data['photo']);
            }
            \DB::rollBack();
            throw $e;
        }

        return $this;
    }

    /**
     * @param UploadedFile $photo
     */
    private static function uploadPhoto(UploadedFile $photo)
    {
        $dir = self::photoDir();
        $photo->store($dir, ['disk' => 'public']);
    }

    /**
     * @param UploadedFile $photo
     */
    private static function deleteFile(UploadedFile $photo)
    {
        $path = self::photosPath();
        $filePath = "{$path}/{$photo->hashName()}";

        if(file_exists($filePath)){
            \File::delete($filePath);
        }
    }

    /**
     *
     */
    private function deletePhoto()
    {
        $dir = self::photoDir();
        \Storage::disk('public')->delete("{$dir}/{$this->photo}");
    }

    /**
     * @return string
     */
    private static function photosPath()
    {
        $path = self::CHAT_GROUP_PHOTO_PATH;
        return storage_path($path);
    }

    /**
     * @return string
     */
    private static function photoDir(){
        $dir = self::DIR_CHAT_GROUPS;
        return $dir;
    }

    /**
     * @return BelongsToMany
     */
    public function users(){
        return $this->belongsToMany(User::class);
    }

    /**
     *
     */
    protected function syncFbRemove(){
        $this->syncFbSet();
    }

    /**
     * @param null $operation
     */
    protected function syncFbSet($operation = null){
        $data = $this->toArray();
        $data['photo_url'] = $this->photo_url_base;
        unset($data['photo']);
        $this->setTimestamps($data, $operation);
        $this->getModelReference()->update($data);
    }

    /**
     *
     */
    public function updateInFb()
    {
        $this->syncFbSet(self::$OPERATION_UPDATE);
    }

    /**
     * @return string
     */
    public function getPhotoUrlAttribute(){
        return asset("storage/{$this->photo_url_base}");
    }

    /**
     * @return string
     */
    public function getPhotoUrlBaseAttribute(){
        $path = self::photoDir();
        return "{$path}/{$this->photo}";
    }

    /**
     * @param $model
     * @param $relationName
     * @param $pivotIds
     * @param $pivotIdsAttribute
     */
    protected function syncPivotAttached($model, $relationName, $pivotIds, $pivotIdsAttribute)
    {
        $users = User::whereIn('id', $pivotIds)->get();

        $data = [];
        foreach ($users as $user) {
            $data["chat_groups_users/{$model->id}/{$user->profile->firebase_uid}"] = true;
        }

        $this->getFirebaseDatabase()->getReference()->update($data);
    }

    /**
     * @param $model
     * @param $relationName
     * @param $pivotIds
     */
    protected function syncPivotDetached($model, $relationName, $pivotIds)
    {
        $users = User::whereIn('id', $pivotIds)->get();

        $data = [];
        foreach ($users as $user) {
            $data["chat_groups_users/{$model->id}/{$user->profile->firebase_uid}"] = true;
        }

        $this->getFirebaseDatabase()->getReference()->update($data);
    }

}
