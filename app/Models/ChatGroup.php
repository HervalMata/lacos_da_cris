<?php
declare(strict_types=1);
namespace LacosDaCris\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\UploadedFile;
use LacosDaCris\Firebase\FirebaseSync;

class ChatGroup extends Model
{
    use SoftDeletes, FirebaseSync;

    const BASE_PATH = 'app/public';
    const DIR_CHAT_GROUPS = 'chat_groups';
    const CHAT_GROUP_PHOTO_PATH = self::BASE_PATH . '/' . self::DIR_CHAT_GROUPS;

    protected $fillable = ['name', 'photo'];
    protected $dates = ['deleted_at'];

    public static function createWithPhoto(array $data) : ChatGroup
    {
        try {
            self::uploadPhoto($data['photo']);
            $data['photo'] = $data['photo']->hashName();
            \DB::beginTransaction();
            $chatGroup = self::create($data);
            \DB::commit();
        } catch (\Exception $e) {
            self::deleteFile($data['photo']);
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
            if (isset($data['photo'])) {
                self::uploadPhoto($data['photo']);
                $this->deletePhoto();
                $data['photo'] = $data['photo']->hashName();
            }

            \DB::beginTransaction();
            $this->fill($data)->save();
            \DB::commit();
            return $this;
        } catch (\Exception $e) {

            if (isset($data['photo'])) {
                self::deleteFile($data['photo']);
            }
            \DB::rollBack();
            throw $e;
        }
        return $this;
    }

    /**
     * @param $photo
     */
    private static function uploadPhoto(UploadedFile $photo)
    {
        $dir = self::photoDir();
        $photo->store($dir, ['disk' => 'public']);
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
     */
    private function deletePhoto()
    {
        $dir = self::photoDir();
        \Storage::disk('public')->delete("{$dir}/{$this->photo}");
    }

    /**
     * @param UploadedFile $photo
     */
    public static function deleteFile(UploadedFile $photo)
    {

         $path = self::photosPath();
         $filePath = "{$path}/{$photo->hashName()}";
         if (file_exists($filePath)) {
                \File::delete($filePath);
         }
    }

    /**
     * @return string
     */
    public function getPhotoUrlAttribute()
    {
        $path = self::photoDir();
        return asset("storage/{$path}/{$this->photo}");
    }

    /**
     * @return string
     */
    public static function photoDir()
    {
        $dir = self::DIR_CHAT_GROUPS;
        return $dir;
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

}
