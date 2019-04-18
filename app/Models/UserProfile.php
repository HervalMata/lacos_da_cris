<?php

namespace LacosDaCris\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class UserProfile extends Model
{
    const BASE_PATH = 'app/public';
    const DIR_USERS = 'users';
    const DIR_USER_PHOTO = self::DIR_USERS . '/photos';
    const USER_PHOTP_PATH = self::BASE_PATH . '/' . self::DIR_USER_PHOTO;

    protected $fillable = ['photo', 'phone_number'];

    /**
     * @return string
     */
    public static function photosPath()
    {
        $path = self::USER_PHOTP_PATH;
        return storage_path("{$path}");
    }

    /**
     * @return string
     */
    public static function photosDir()
    {
        $dir = self::DIR_USER_PHOTO;
        return "{$dir}";
    }

    /**
     * @param UploadedFile|null $photo
     */
    public static function uploadPhoto(UploadedFile $photo = null)
    {
        if (!$photo) {
            return;
        }
        $dir = self::photosDir();
        $photo->store($dir, ['disk' => 'public']);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
