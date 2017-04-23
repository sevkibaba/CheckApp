<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model{

	protected $table = 'products'; //eloquate looks for the plural of the class name, you don't need to write this

	protected $fillable = [

		'user_id',
		'product_id',
		'name',
		'price',

	];

	public function setPrice($price){ //use this function to change the price of a product.

		$this->update([
				'price' => $price
			]);

	}

}