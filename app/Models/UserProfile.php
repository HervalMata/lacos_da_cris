<?php
declare(strict_types=1);
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

    public static function createTokenToChangePhoneNumber(UserProfile $profile, $phoneNumber) : string
    {
        $token = base64_encode($phoneNumber);
        $profile->phone_number_token_to_change = $token;
        $profile->save();

        return $token;
    }

    /**
     * @param User $user
     * @param array $data
     * @return UserProfile
     */
    public static function saveProfile(User $user, array $data) : UserProfile
    {
        if (array_key_exists('photo', $data)) {
            self::deletePhoto($user->profile);
            $data['photo'] = UserProfile::getPhotoHashName($data['photo']);
        }

        $user
            ->profile
            ->fill($data)
            ->save();
        return $user->profile;
    }

    /**
     * @param UserProfile $profile
     */
    private static function deletePhoto(UserProfile $profile)
    {
        if (!$profile->photo) {
            return;
        }

        $dir = self::photosDir();
        \Storage::disk('public')->delete("{$dir}/{$profile->photo}");
    }

    /**
     * @param UploadedFile|null $photo
     * @return null|string
     */
    private static function getPhotoHashName(UploadedFile $photo = null)
    {
        return $photo ? $photo->hashName() : null;
    }

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
     * @param UploadedFile|null $photo
     */
    public static function deleteFile(UploadedFile $photo = null)
    {
        if (!$photo) {
            return;
        }
        $path = self::photosPath();
        $photoPath = "{$path}/{$photo->hashName()}";
        if (file_exists($photoPath)) {
            \File::delete($photoPath);
        }
    }

    /**
     * @return string
     */
    public function getPhotoUrlAttribute()
    {
        $path = self::photosDir();
        return $this->photo ? asset("storage/{$path}/{$this->photo}") : 'https://www.gravatar.com/avatar/nouser.jpg';
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
