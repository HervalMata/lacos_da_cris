<?php

namespace LacosDaCris\Models;

use Illuminate\Database\Eloquent\Model;

class ProductPhoto extends Model
{
    protected $fillable = ['file_name', 'product_id'];
}