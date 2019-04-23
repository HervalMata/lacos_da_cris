<?php
declare(strict_types=1);
namespace LacosDaCris\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use LacosDaCris\Firebase\FirebaseSync;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, SoftDeletes, FirebaseSync;

    const ROLE_SELLER =1;
    const ROLE_CUSTOMER = 2;

    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public static function createCustomer(array $data) : User
    {
        try{
            UserProfile::uploadPhoto($data['photo']);
            \DB::beginTransaction();
            $user = self::createCustomerUser($data);
            UserProfile::saveProfile($user, $data);
            \DB::commit();
        } catch (\Exception $e) {
            UserProfile::deleteFile($data['photo']);
            \DB::rollBack();
            throw $e;
        }
        return $user;
    }

    public static function createCustomerUser(array $data) : User
    {
        $data['password'] = bcrypt(str_random(16));
        $user = User::create($data);
        $user->role = User::ROLE_CUSTOMER;
        $user->save();
        return $user;
    }

    /**
     * @param array $data
     * @return User
     * @throws \Exception
     */
    public function updateWithProfile(array $data) : User
    {
        try{
            if (isset($data['photo'])) {
                UserProfile::uploadPhoto($data['photo']);
            }

            \DB::beginTransaction();
            $this->fill($data);
            $this->save();
            UserProfile::saveProfile($this, $data);
            \DB::commit();
        } catch (\Exception $e) {
            if (isset($data['photo'])) {
                UserProfile::deleteFile($data['photo']);
            }

            \DB::rollBack();
            throw $e;
        }
        return $this;
    }

    /**
     * @param array $attributes
     * @return Authenticatable
     */
    public function fill(array $attributes)
    {
        !isset($attributes['password']) ? : $attributes['password'] = bcrypt($attributes['password']);
        return parent::fill($attributes);
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->id;
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'email' => $this->email,
            'name' => $this->name,
            'profile' => [
                'has_photo' => $this->profile->photo ? true : false,
                'photo_url' => $this->profile->photo_url,
                'phone_number' => $this->profile->phone_number,
                'firebase_uid' => $this->profile->firebase_uid
            ]
        ];
    }

    public function profile()
    {
        return $this->hasOne(UserProfile::class)->withDefault();
    }

    protected function syncFbCreate()
    {
    }

    protected function syncFbUpdate()
    {
    }

    protected function syncFbRemove()
    {
    }

    protected function syncFbSetCustom()
    {
        $this->profile->refresh();

        if ($this->profile->firebase_uid) {
            $database = $this->getFirebaseDatabase();
            $path = 'users/' . $this->profile->firebase_uid;
            $reference = $database->getReference($path);
            $reference->set([
                'name' => $this->name,
                'photo_url' => $this->photo_url,
                'deleted_at' => $this->deleted_at
            ]);
        }
    }
}
