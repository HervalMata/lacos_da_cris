<?php

declare(strict_types=1);

namespace LacosDaCris\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\UploadedFile;

class ProductPhoto extends Model
{
    const BASE_PATH = 'app/public';
    const DIR_PRODUCTS = 'products';
    const PRODUCTS_PATH = self::BASE_PATH . '/' . self::DIR_PRODUCTS;

    protected $fillable = ['file_name', 'product_id'];

    /**
     * @param $productId
     * @return string
     */
    public static function photosPath($productId)
    {
        $path = self::PRODUCTS_PATH;
        return storage_path("{$path}/{$productId}");
    }

    /**
     * @param int $productId
     * @param array $files
     * @return Collection
     * @throws \Exception
     */
    public static function createWithPhotosFiles(int $productId, array $files) : Collection
    {
        try {
            self::uploadFiles($productId, $files);
            \DB::beginTransaction();
            $photos = self::createPhotosModels($productId, $files);
            \DB::commit();
            return new Collection($photos);
        } catch (\Exception $e) {
            \DB::rollBack();
            self::deleteFiles($productId, $files);
            throw $e;
        }

    }

    /**
     * @param int $productId
     * @param array $files
     */
    public static function deleteFiles(int $productId, array $files)
    {
        /** @var UploadedFile $file */
        foreach ($files as $file) {
            $path = self::photosPath($productId);
            $photoPath = "{$path}/{$file->hashName()}";
            if (file_exists($photoPath)) {
                \File::delete($photoPath);
            }
        }
    }

    /**
     * @param int $productId
     * @param array $files
     */
    public static function uploadFiles(int $productId, array $files)
    {
        $dir = self::photosDir($productId);
        /** @var UploadedFile $file */
        foreach ($files as $file) {
            $file->store($dir, ['disk' => 'public']);
        }
    }

    /**
     * @param int $productId
     * @param array $files
     * @return array
     */
    private static function createPhotosModels(int $productId, array $files) : array
    {
        $photos = [];
        /** @var UploadedFile $file */
        foreach ($files as $file) {
            $photos[] = self::create([
                'file_name' => $file->hashName(),
                'product_id' => $productId
            ]);
        }

        return $photos;
    }

    /**
     * @return string
     */
    public function getPhotoUrlAttribute()
    {
        $path = self::photosDir($this->product_id);
        return asset("storage/{$path}/{$this->file_name}");
    }

    /**
     * @param $productId
     * @return string
     */
    public static function photosDir($productId)
    {
        $dir = self::DIR_PRODUCTS;
        return "{$dir}/{$productId}";
    }

    /**
     * @return BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}
